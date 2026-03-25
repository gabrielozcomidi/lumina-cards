import { LitElement, html, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { luminaTokens } from '../../styles/tokens';
import { sharedStyles } from '../../styles/shared';
import { lightCardStyles } from './styles';
import { LuminaLightCardConfig, LightEntityConfig } from '../../types';
import { HomeAssistant, LightEntity } from '../../types/ha-types';
import { render3dBackground } from '../../utils/render-3d-bg';
import {
  getEntity,
  entityName,
  averageBrightness,
  callService,
} from '../../utils/ha-helpers';
import { debounce } from '../../utils/debounce';

import '../../components/lumina-ring';
import '../../components/lumina-chip';
import '../../components/lumina-slider';

const COLOR_PRESETS: Array<{ name: string; rgb: [number, number, number]; css: string }> = [
  { name: 'Warm White', rgb: [255, 180, 107], css: '#ffb46b' },
  { name: 'Cool White', rgb: [200, 220, 255], css: '#c8dcff' },
  { name: 'Red', rgb: [255, 50, 50], css: '#ff3232' },
  { name: 'Orange', rgb: [255, 140, 0], css: '#ff8c00' },
  { name: 'Yellow', rgb: [255, 220, 0], css: '#ffdc00' },
  { name: 'Green', rgb: [0, 220, 80], css: '#00dc50' },
  { name: 'Cyan', rgb: [0, 210, 255], css: '#00d2ff' },
  { name: 'Blue', rgb: [50, 100, 255], css: '#3264ff' },
  { name: 'Purple', rgb: [160, 50, 255], css: '#a032ff' },
  { name: 'Pink', rgb: [255, 80, 180], css: '#ff50b4' },
];

/** Normalize entity config: supports both "light.x" string and {entity, name, icon} object */
function normalizeEntity(cfg: string | LightEntityConfig): { id: string; customName?: string; customIcon?: string } {
  if (typeof cfg === 'string') return { id: cfg };
  return { id: cfg.entity, customName: cfg.name, customIcon: cfg.icon };
}

@customElement('ha-lumina-light-card')
export class HaLuminaLightCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: LuminaLightCardConfig;

  @state() private _expandedId: string | null = null;

  private _pressTimer: ReturnType<typeof setTimeout> | undefined;
  private _pressedId: string | null = null;
  private _didLongPress = false;

  static styles = [luminaTokens, sharedStyles, lightCardStyles];

  private _debouncedBrightness = debounce((entityId: string, brightness: number) => {
    callService(this.hass, 'light', 'turn_on', { entity_id: entityId, brightness_pct: brightness });
  }, 150);

  private _debouncedMasterBrightness = debounce((brightness: number) => {
    this._entityIds.forEach((id) => {
      const entity = getEntity(this.hass, id);
      if (entity && entity.state === 'on') {
        callService(this.hass, 'light', 'turn_on', { entity_id: id, brightness_pct: brightness });
      }
    });
  }, 150);

  private _debouncedColorTemp = debounce((kelvin: number) => {
    this._entityIds.forEach((id) => {
      const entity = getEntity(this.hass, id) as LightEntity | undefined;
      if (entity && entity.state === 'on' && entity.attributes.supported_color_modes?.includes('color_temp')) {
        callService(this.hass, 'light', 'turn_on', { entity_id: id, color_temp_kelvin: kelvin });
      }
    });
  }, 150);

  public setConfig(config: LuminaLightCardConfig): void {
    if (!config.entities || !config.entities.length) throw new Error('Please define at least one light entity');
    this.config = { show_color_temp: true, show_individual_controls: true, ...config };
  }

  public getCardSize(): number { return 5; }
  static getConfigElement(): HTMLElement { return document.createElement('ha-lumina-light-card-editor'); }
  static getStubConfig() { return { type: 'custom:ha-lumina-light-card', entities: [], show_color_temp: true }; }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('config') || changed.has('_expandedId')) return true;
    if (!changed.has('hass') || !this.config) return false;
    const oldHass = changed.get('hass') as HomeAssistant | undefined;
    if (!oldHass) return true;
    return this._entityIds.some((id) => oldHass.states[id] !== this.hass.states[id]);
  }

  // ─── Normalized entities ──────────────────────────

  private get _normalized(): Array<{ id: string; customName?: string; customIcon?: string }> {
    return (this.config.entities || []).map(normalizeEntity);
  }

  private get _entityIds(): string[] {
    return this._normalized.map((e) => e.id);
  }

  private _getEntity(id: string): LightEntity | undefined {
    return getEntity(this.hass, id) as LightEntity | undefined;
  }

  private _getName(id: string, customName?: string): string {
    if (customName) return customName;
    const entity = this._getEntity(id);
    return entity ? entityName(entity) : id;
  }

  // ─── Computed ─────────────────────────────────────

  private get _avgBrightness(): number { return averageBrightness(this.hass, this._entityIds); }
  private get _onCount(): number { return this._entityIds.filter((id) => this._getEntity(id)?.state === 'on').length; }

  private get _hasColorTemp(): boolean {
    return this._entityIds.some((id) => this._getEntity(id)?.attributes.supported_color_modes?.includes('color_temp'));
  }

  private get _avgColorTemp(): number {
    const temps = this._entityIds
      .map((id) => this._getEntity(id))
      .filter((e) => e?.state === 'on' && e?.attributes.color_temp_kelvin)
      .map((e) => (e!.attributes.color_temp_kelvin as number) || 3500);
    if (!temps.length) return 3500;
    return Math.round(temps.reduce((a, b) => a + b, 0) / temps.length);
  }

  // ─── Light helpers ────────────────────────────────

  private _hasBrightness(entity: LightEntity): boolean {
    const modes = entity.attributes.supported_color_modes || [];
    // 'onoff' is the only mode that doesn't support brightness
    return modes.length > 0 && !modes.every((m) => m === 'onoff');
  }

  private _isGroup(entity: LightEntity): boolean {
    return Array.isArray(entity.attributes.entity_id) && entity.attributes.entity_id.length > 0;
  }

  private _hasColor(entity: LightEntity): boolean {
    return (entity.attributes.supported_color_modes || []).some((m) => ['rgb', 'rgbw', 'rgbww', 'hs', 'xy'].includes(m));
  }

  private _hasEffects(entity: LightEntity): boolean {
    return Array.isArray(entity.attributes.effect_list) && entity.attributes.effect_list.length > 0;
  }

  // ─── Actions ──────────────────────────────────────

  private _toggleLight(id: string): void { callService(this.hass, 'light', 'toggle', { entity_id: id }); }
  private _turnAllOff(): void { callService(this.hass, 'light', 'turn_off', { entity_id: this._entityIds }); }
  private _turnAllOn(): void { callService(this.hass, 'light', 'turn_on', { entity_id: this._entityIds }); }
  private _activateScene(id: string): void { callService(this.hass, 'scene', 'turn_on', { entity_id: id }); }
  private _setColor(id: string, rgb: [number, number, number]): void {
    callService(this.hass, 'light', 'turn_on', { entity_id: id, rgb_color: rgb });
  }
  private _setEffect(id: string, effect: string): void {
    callService(this.hass, 'light', 'turn_on', { entity_id: id, effect });
  }

  // ─── Press Handling ───────────────────────────────

  private _pressTarget: HTMLElement | null = null;

  private _onPointerDown(id: string, e: PointerEvent): void {
    this._didLongPress = false;
    this._pressedId = id;
    const target = e.currentTarget as HTMLElement;
    this._pressTarget = target;
    target.classList.add('pressing');
    // Capture pointer so scrolling doesn't steal it
    target.setPointerCapture(e.pointerId);
    this._pressTimer = setTimeout(() => {
      this._didLongPress = true;
      target.classList.remove('pressing');
      this._expandedId = this._expandedId === id ? null : id;
    }, 500);
  }

  private _onPointerUp(id: string, e: PointerEvent): void {
    const target = this._pressTarget || e.currentTarget as HTMLElement;
    target.classList.remove('pressing');
    if (this._pressTimer) { clearTimeout(this._pressTimer); this._pressTimer = undefined; }
    if (!this._didLongPress && this._pressedId === id) this._toggleLight(id);
    this._pressedId = null;
    this._pressTarget = null;
    this._didLongPress = false;
  }

  private _onPointerCancel(): void {
    if (this._pressTarget) this._pressTarget.classList.remove('pressing');
    if (this._pressTimer) { clearTimeout(this._pressTimer); this._pressTimer = undefined; }
    this._pressedId = null;
    this._pressTarget = null;
  }

  private _onPointerLeave(e: PointerEvent): void {
    // With pointer capture, pointerleave only fires when capture is released
    if (this._pressTarget) this._pressTarget.classList.remove('pressing');
    if (this._pressTimer) { clearTimeout(this._pressTimer); this._pressTimer = undefined; }
    this._pressedId = null;
    this._pressTarget = null;
  }

  // ─── Render: Expand Panel ─────────────────────────

  private _renderExpandPanel(id: string, entity: LightEntity) {
    const isGroup = this._isGroup(entity);
    const hasColor = this._hasColor(entity);
    const hasEffects = this._hasEffects(entity);
    const currentEffect = entity.attributes.effect as string | undefined;
    const currentRgb = entity.attributes.rgb_color;

    return html`
      <div class="light-expand ${this._expandedId === id ? 'open' : ''}">
        <div class="expand-section">

          ${hasColor ? html`
            <span class="expand-label">Color</span>
            <div class="color-presets">
              ${COLOR_PRESETS.map((c) => {
                const isSelected = currentRgb &&
                  Math.abs(currentRgb[0] - c.rgb[0]) < 30 &&
                  Math.abs(currentRgb[1] - c.rgb[1]) < 30 &&
                  Math.abs(currentRgb[2] - c.rgb[2]) < 30;
                return html`
                  <div class="color-dot ${isSelected ? 'selected' : ''}"
                    style="background: ${c.css}" title="${c.name}"
                    @click=${() => this._setColor(id, c.rgb)}></div>
                `;
              })}
            </div>
          ` : nothing}

          ${hasEffects ? html`
            <span class="expand-label">Effect</span>
            <div class="effect-select-wrapper">
              <select class="effect-select"
                @change=${(e: Event) => this._setEffect(id, (e.target as HTMLSelectElement).value)}>
                <option value="solid" ?selected=${!currentEffect || currentEffect === 'solid'}>Solid</option>
                ${(entity.attributes.effect_list || []).map((effect) => html`
                  <option value="${effect}" ?selected=${currentEffect === effect}>${effect}</option>
                `)}
              </select>
              <span class="effect-select-arrow"><ha-icon icon="mdi:chevron-down"></ha-icon></span>
            </div>
          ` : nothing}

          ${isGroup ? html`
            <span class="expand-label">Group Lights</span>
            <div class="group-members">
              ${(entity.attributes.entity_id || []).map((memberId: string) => {
                const member = this._getEntity(memberId);
                if (!member) return nothing;
                const memberOn = member.state === 'on';
                const memberBrt = memberOn ? Math.round(((member.attributes.brightness as number) || 0) / 255 * 100) : 0;
                return html`
                  <div class="group-member">
                    <div class="group-member-dot ${memberOn ? 'on' : 'off'}"></div>
                    <span class="group-member-name">${entityName(member)}</span>
                    <div class="group-member-slider">
                      <lumina-slider .value=${memberBrt} .min=${0} .max=${100}
                        color="var(--lumina-secondary)"
                        @value-changed=${(e: CustomEvent) => this._debouncedBrightness(memberId, e.detail.value)}
                      ></lumina-slider>
                    </div>
                  </div>
                `;
              })}
            </div>
          ` : nothing}

          ${!hasColor && !hasEffects && !isGroup ? html`
            <span class="expand-label" style="color: var(--lumina-outline)">No extra controls available</span>
          ` : nothing}
        </div>
      </div>
    `;
  }

  // ─── Render ───────────────────────────────────────

  protected render() {
    if (!this.config || !this.hass) return nothing;

    const avgBrightness = this._avgBrightness;
    const onCount = this._onCount;
    const total = this._entityIds.length;

    return html`
      <div class="light-card" style="position:relative;">
        ${render3dBackground(this.config.image, true)}
        <div class="lumina-3d-content">
        <!-- Hero Ring + All On/Off underneath -->
        <div class="hero-section">
          <lumina-ring .value=${avgBrightness} .size=${160} .strokeWidth=${4}
            color="var(--lumina-secondary)" ?inactive=${onCount === 0}>
            <span class="hero-value">${avgBrightness}%</span>
            <span class="hero-label">Brightness</span>
          </lumina-ring>

          <div class="hero-actions">
            <lumina-chip icon="mdi:lightbulb-on" label="All On" variant="secondary" @click=${this._turnAllOn}></lumina-chip>
            <lumina-chip icon="mdi:lightbulb-off" label="All Off" variant="error" @click=${this._turnAllOff}></lumina-chip>
          </div>
        </div>

        <!-- Master Controls -->
        <div class="master-controls">
          <div class="slider-row">
            <div class="slider-label">
              <span class="slider-label-text"><ha-icon icon="mdi:brightness-6"></ha-icon> Master Brightness</span>
              <span class="slider-value">${avgBrightness}%</span>
            </div>
            <lumina-slider .value=${avgBrightness} .min=${0} .max=${100}
              color="var(--lumina-secondary)"
              @value-changed=${(e: CustomEvent) => this._debouncedMasterBrightness(e.detail.value)}
            ></lumina-slider>
          </div>

          ${this.config.show_color_temp && this._hasColorTemp ? html`
            <div class="slider-row">
              <div class="slider-label">
                <span class="slider-label-text"><ha-icon icon="mdi:thermometer"></ha-icon> Color Temperature</span>
                <span class="slider-value">${this._avgColorTemp}K</span>
              </div>
              <lumina-slider .value=${this._avgColorTemp} .min=${2000} .max=${6500}
                variant="gradient"
                @value-changed=${(e: CustomEvent) => this._debouncedColorTemp(e.detail.value)}
              ></lumina-slider>
            </div>
          ` : nothing}
        </div>

        <!-- Individual Lights -->
        ${this.config.show_individual_controls !== false ? html`
          <div class="lights-section">
            <span class="lights-section-header">${onCount}/${total} Lights On</span>

            ${this._normalized.map(({ id, customName, customIcon }) => {
              const entity = this._getEntity(id);
              if (!entity) return nothing;
              const isOn = entity.state === 'on';
              const hasBrightness = this._hasBrightness(entity);
              const brightness = isOn && hasBrightness ? Math.round(((entity.attributes.brightness as number) || 0) / 255 * 100) : 0;
              const hasExpand = this._isGroup(entity) || this._hasColor(entity) || this._hasEffects(entity);
              const displayName = this._getName(id, customName);
              const icon = customIcon || 'mdi:lightbulb';

              return html`
                <div class="light-item ${isOn ? 'on' : ''}">
                  <div class="light-item-row">
                    <button class="light-circle ${isOn ? 'on' : ''}"
                      @pointerdown=${(e: PointerEvent) => this._onPointerDown(id, e)}
                      @pointerup=${(e: PointerEvent) => this._onPointerUp(id, e)}
                      @pointercancel=${this._onPointerCancel}
                      @pointerleave=${this._onPointerLeave}>
                      <ha-icon icon="${icon}"></ha-icon>
                    </button>

                    <div class="light-item-info">
                      <span class="light-item-name">${displayName}</span>
                      ${isOn && hasBrightness ? html`
                        <div class="light-item-slider">
                          <lumina-slider .value=${brightness} .min=${1} .max=${100}
                            color="var(--lumina-secondary)"
                            @value-changed=${(e: CustomEvent) => this._debouncedBrightness(id, e.detail.value)}
                          ></lumina-slider>
                        </div>
                      ` : nothing}
                    </div>

                    ${hasBrightness
                      ? html`<span class="light-item-pct ${isOn ? 'on' : ''}">${isOn ? `${brightness}%` : 'Off'}</span>`
                      : html`<span class="light-item-toggle ${isOn ? 'on' : ''}" @click=${(e: Event) => { e.stopPropagation(); this._toggleLight(id); }}>${isOn ? 'On' : 'Off'}</span>`
                    }
                  </div>

                  ${hasExpand ? this._renderExpandPanel(id, entity) : nothing}
                </div>
              `;
            })}
          </div>
        ` : nothing}

        <!-- Scenes -->
        ${this.config.scenes?.length ? html`
          <div class="scenes-section">
            <span class="scenes-header">Scenes</span>
            <div class="scenes-row">
              ${this.config.scenes.map((scene) => html`
                <lumina-chip .icon=${scene.icon} .label=${scene.name}
                  @click=${() => this._activateScene(scene.entity_id)}></lumina-chip>
              `)}
            </div>
          </div>
        ` : nothing}
      </div><!-- /lumina-3d-content -->
      </div>
    `;
  }
}
