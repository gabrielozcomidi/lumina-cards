import { LitElement, html, svg, PropertyValues, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { luminaTokens } from '../../styles/tokens';
import { sharedStyles } from '../../styles/shared';
import { roomCardStyles } from './styles';
import { LuminaRoomCardConfig, LightEntityConfig } from '../../types';
import { HomeAssistant } from '../../types/ha-types';
import {
  getEntity,
  isEntityAvailable,
  lightsOnCount,
  lightsOnPercentage,
  getVolumePercent,
  formatTemperature,
} from '../../utils/ha-helpers';
import { computeArcDash } from '../../utils/svg-helpers';
import { resolveImageUrl } from '../../utils/assets-3d';

import '../../components/lumina-bottom-sheet';

// Climate mode → ring color mapping (matches climate card MODE_COLORS)
const CLIMATE_RING_COLORS: Record<string, string> = {
  cool: 'var(--lumina-primary)',       // blue
  heat: 'var(--lumina-secondary)',     // yellow
  heat_cool: 'var(--lumina-tertiary)', // green
  auto: 'var(--lumina-tertiary)',      // green
  dry: 'var(--lumina-on-surface-variant)',
  fan_only: 'var(--lumina-primary)',   // blue
};

// Ring geometry for the 52px action buttons
const RING_SIZE = 60;
const RING_RADIUS = 26;
const RING_STROKE = 2;
const RING_ARC_SPAN = 360;

@customElement('ha-lumina-room-card')
export class HaLuminaRoomCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: LuminaRoomCardConfig;
  @state() private _activeSheet: 'lights' | 'climate' | 'media' | 'vacuum' | 'room' | null = null;

  // Cached sub-card configs to avoid creating new objects on every render
  private _lightConfig: Record<string, unknown> | null = null;
  private _climateConfig: Record<string, unknown> | null = null;
  private _mediaConfig: Record<string, unknown> | null = null;
  private _vacuumConfig: Record<string, unknown> | null = null;
  private _roomPopupConfig: Record<string, unknown> | null = null;

  static styles = [luminaTokens, sharedStyles, roomCardStyles];

  public setConfig(config: LuminaRoomCardConfig): void {
    if (!config.name) {
      throw new Error('Please define a name for the room card');
    }
    this._config = {
      show_climate: true,
      show_media: true,
      show_vacuum: true,
      ...config,
    };
    this._rebuildSubConfigs();
  }

  private _rebuildSubConfigs(): void {
    const c = this._config;
    this._lightConfig = { type: 'custom:ha-lumina-light-card', entities: c.light_entities || [], image: c.image, scenes: c.light_scenes };
    this._climateConfig = { type: 'custom:ha-lumina-climate-card', entity: c.climate_entity || '', image: c.image, show_fan_speed: true, show_humidity: true };
    // Support both legacy media_entity and new media_entities array
    const mediaEntities = c.media_entities?.length
      ? c.media_entities
      : c.media_entity ? [{ entity: c.media_entity }] : [];
    this._mediaConfig = { type: 'custom:ha-lumina-media-card', entities: mediaEntities, audio_format_entity: c.audio_format_entity, mass_config_entry_id: c.mass_config_entry_id, image: c.image, show_source: true, show_progress: true, show_speaker_management: true };
    this._vacuumConfig = { type: 'custom:ha-lumina-vacuum-card', entity: c.vacuum_entity || '', image: c.image, show_fan_speed: true };
    this._roomPopupConfig = {
      type: 'custom:ha-lumina-room-popup',
      name: c.name,
      image: c.image,
      temperature_entity: c.temperature_entity,
      light_entities: c.light_entities,
      climate_entity: c.climate_entity,
      media_entity: c.media_entity,
      vacuum_entity: c.vacuum_entity,
    };
  }

  public getCardSize(): number {
    return 4;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('ha-lumina-room-card-editor');
  }

  static getStubConfig(): LuminaRoomCardConfig {
    return {
      type: 'custom:ha-lumina-room-card',
      name: 'Living Room',
      image: '',
      light_entities: [],
      show_climate: true,
      show_media: true,
      show_vacuum: true,
    };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config') || changed.has('_activeSheet')) return true;
    if (!changed.has('hass') || !this._config) return false;

    const oldHass = changed.get('hass') as HomeAssistant | undefined;
    if (!oldHass) return true;

    const trackedEntities = [
      this._config.temperature_entity,
      this._config.humidity_entity,
      ...this._lightEntityIds,
      this._config.climate_entity,
      this._config.media_entity,
      ...(this._config.media_entities || []).map((e) => typeof e === 'string' ? e : e.entity),
      this._config.audio_format_entity,
      this._config.vacuum_entity,
    ].filter(Boolean) as string[];

    return trackedEntities.some(
      (id) => oldHass.states[id] !== this.hass.states[id],
    );
  }

  // ─── Computed State ───────────────────────────────

  /** Extract entity IDs from the mixed string/object array */
  private get _lightEntityIds(): string[] {
    return (this._config.light_entities || []).map(
      (e) => typeof e === 'string' ? e : e.entity,
    );
  }

  private get _lightsOn(): number {
    return lightsOnCount(this.hass, this._lightEntityIds);
  }

  private get _lightsTotal(): number {
    return this._lightEntityIds.length;
  }

  private get _lightsPercent(): number {
    return lightsOnPercentage(this.hass, this._lightEntityIds);
  }

  private get _climateEntity() {
    return getEntity(this.hass, this._config.climate_entity);
  }

  private get _climateActive(): boolean {
    const e = this._climateEntity;
    return !!e && e.state !== 'off' && isEntityAvailable(e);
  }

  private get _mediaEntityIds(): string[] {
    if (this._config.media_entities?.length) {
      return this._config.media_entities.map((e) => typeof e === 'string' ? e : e.entity).filter(Boolean);
    }
    return this._config.media_entity ? [this._config.media_entity] : [];
  }

  private get _mediaEntity() {
    // Return first active, or first configured
    const playing = this._mediaEntityIds.find((id) => {
      const e = getEntity(this.hass, id);
      return e?.state === 'playing';
    });
    return getEntity(this.hass, playing || this._mediaEntityIds[0]);
  }

  private get _mediaActive(): boolean {
    return this._mediaEntityIds.some((id) => {
      const e = getEntity(this.hass, id);
      return !!e && (e.state === 'playing' || e.state === 'paused');
    });
  }

  private get _vacuumEntity() {
    return getEntity(this.hass, this._config.vacuum_entity);
  }

  private get _vacuumActive(): boolean {
    return this._vacuumEntity?.state === 'cleaning';
  }

  private get _batteryPercent(): number {
    const entity = this._vacuumEntity;
    if (!entity) return 0;
    return (entity.attributes.battery_level as number) || 0;
  }

  private get _activeDeviceCount(): number {
    let count = 0;
    count += this._lightsOn;
    if (this._climateActive) count++;
    if (this._mediaActive) count++;
    if (this._vacuumActive) count++;
    return count;
  }

  private get _temperatureValue(): string | null {
    const entity = getEntity(this.hass, this._config.temperature_entity);
    if (!entity || !isEntityAvailable(entity)) return null;
    const val = parseFloat(entity.state);
    if (isNaN(val)) return null;
    const unit = entity.attributes.unit_of_measurement || '°';
    return `${Math.round(val)}${unit}`;
  }

  private get _humidityValue(): string | null {
    const entity = getEntity(this.hass, this._config.humidity_entity);
    if (!entity || !isEntityAvailable(entity)) return null;
    const val = parseFloat(entity.state);
    if (isNaN(val)) return null;
    return `${Math.round(val)}%`;
  }

  private get _climateMode(): string {
    return this._climateEntity?.state || 'off';
  }

  private get _climateRingColor(): string {
    return CLIMATE_RING_COLORS[this._climateMode] || 'var(--lumina-primary)';
  }

  // ─── Ring SVG Helper ──────────────────────────────

  private _renderActionRing(value: number, color: string) {
    const { dashArray, dashOffset } = computeArcDash(
      RING_RADIUS, value, 0, 100, RING_ARC_SPAN,
    );
    const { dashArray: trackDash } = computeArcDash(
      RING_RADIUS, 100, 0, 100, RING_ARC_SPAN,
    );
    const center = RING_SIZE / 2;

    return svg`
      <svg class="action-ring-svg" width="${RING_SIZE}" height="${RING_SIZE}" viewBox="0 0 ${RING_SIZE} ${RING_SIZE}">
        <circle class="track" cx="${center}" cy="${center}" r="${RING_RADIUS}"
          stroke="${color}" stroke-width="${RING_STROKE}"
          stroke-dasharray="${trackDash}" stroke-dashoffset="0" />
        <circle class="value-arc" cx="${center}" cy="${center}" r="${RING_RADIUS}"
          stroke="${color}" stroke-width="${RING_STROKE}"
          stroke-dasharray="${dashArray}" stroke-dashoffset="${dashOffset}"
          stroke-linecap="round"
          transform="rotate(-90 ${center} ${center})" />
      </svg>
    `;
  }

  // ─── Sheet Controls ───────────────────────────────

  private _openSheet(type: 'lights' | 'climate' | 'media' | 'vacuum' | 'room'): void {
    this._activeSheet = type;
  }

  private _closeSheet(): void {
    this._activeSheet = null;
  }

  // ─── Render ───────────────────────────────────────

  protected render() {
    if (!this._config || !this.hass) return nothing;

    const lightsActive = this._lightsOn > 0;
    const climateActive = this._climateActive;
    const mediaActive = this._mediaActive;
    const vacuumActive = this._vacuumActive;

    return html`
      <ha-card>
        <div class="room-card">
          <!-- 3D Background Element -->
          ${resolveImageUrl(this._config.image)
            ? html`
                <div class="room-bg">
                  <img src="${resolveImageUrl(this._config.image)}" alt="" loading="lazy" />
                </div>
              `
            : nothing}

          <!-- Header: Room Name + Device Count + Sensors -->
          <div class="room-header">
            <span class="room-name">${this._config.name}</span>
            ${this._temperatureValue || this._humidityValue ? html`
              <div class="room-sensors">
                ${this._temperatureValue ? html`
                  <span class="sensor-item">
                    <ha-icon icon="mdi:thermometer"></ha-icon>${this._temperatureValue}
                  </span>
                ` : nothing}
                ${this._humidityValue ? html`
                  <span class="sensor-item">
                    <ha-icon icon="mdi:water-percent"></ha-icon>${this._humidityValue}
                  </span>
                ` : nothing}
              </div>
            ` : nothing}
            <span class="device-count">${this._activeDeviceCount} device${this._activeDeviceCount !== 1 ? 's' : ''} active</span>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <!-- Lights -->
            <div
              class="action-btn ${lightsActive ? 'lights-active' : ''} ${!this._lightsTotal ? 'hidden' : ''}"
              @click=${() => this._openSheet('lights')}
            >
              <div class="action-ring-wrapper">
                <div class="action-icon-circle">
                  <ha-icon icon="mdi:lightbulb"></ha-icon>
                </div>
                ${lightsActive ? this._renderActionRing(this._lightsPercent, 'var(--lumina-secondary)') : nothing}
              </div>
              <span class="action-label">${this._config.lights_label || 'Lights'}</span>
            </div>

            <!-- Climate -->
            <div
              class="action-btn ${climateActive ? `climate-active climate-${this._climateMode}` : ''} ${!this._config.show_climate || !this._config.climate_entity ? 'hidden' : ''}"
              @click=${() => this._openSheet('climate')}
            >
              <div class="action-ring-wrapper">
                <div class="action-icon-circle">
                  <ha-icon icon="mdi:thermometer"></ha-icon>
                </div>
                ${climateActive ? this._renderActionRing(50, this._climateRingColor) : nothing}
              </div>
              <span class="action-label">${this._config.climate_label || 'Climate'}</span>
            </div>

            <!-- Media (no ring — just shows active glow when playing) -->
            <div
              class="action-btn ${mediaActive ? 'media-active' : ''} ${!this._config.show_media || !this._mediaEntityIds.length ? 'hidden' : ''}"
              @click=${() => this._openSheet('media')}
            >
              <div class="action-ring-wrapper">
                <div class="action-icon-circle">
                  <ha-icon icon="mdi:play-circle"></ha-icon>
                </div>
              </div>
              <span class="action-label">${this._config.media_label || 'Media'}</span>
            </div>

            <!-- Clean -->
            <div
              class="action-btn ${vacuumActive ? 'vacuum-active' : ''} ${!this._config.show_vacuum || !this._config.vacuum_entity ? 'hidden' : ''}"
              @click=${() => this._openSheet('vacuum')}
            >
              <div class="action-ring-wrapper">
                <div class="action-icon-circle">
                  <ha-icon icon="mdi:robot-vacuum"></ha-icon>
                </div>
                ${vacuumActive ? this._renderActionRing(this._batteryPercent, 'var(--lumina-tertiary)') : nothing}
              </div>
              <span class="action-label">${this._config.vacuum_label || 'Clean'}</span>
            </div>
          </div>
        </div>

        <!-- Bottom Sheets -->
        <lumina-bottom-sheet
          .open=${this._activeSheet === 'lights'}
          title="Lights"
          @sheet-closed=${this._closeSheet}
        >
          <ha-lumina-light-card
            .hass=${this.hass}
            .config=${this._lightConfig}
          ></ha-lumina-light-card>
        </lumina-bottom-sheet>

        <lumina-bottom-sheet
          .open=${this._activeSheet === 'climate'}
          title="Climate"
          @sheet-closed=${this._closeSheet}
        >
          <ha-lumina-climate-card
            .hass=${this.hass}
            .config=${this._climateConfig}
          ></ha-lumina-climate-card>
        </lumina-bottom-sheet>

        <lumina-bottom-sheet
          .open=${this._activeSheet === 'media'}
          title="Media"
          @sheet-closed=${this._closeSheet}
        >
          <ha-lumina-media-card
            .hass=${this.hass}
            .config=${this._mediaConfig}
          ></ha-lumina-media-card>
        </lumina-bottom-sheet>

        <lumina-bottom-sheet
          .open=${this._activeSheet === 'vacuum'}
          title="Cleaning"
          @sheet-closed=${this._closeSheet}
        >
          <ha-lumina-vacuum-card
            .hass=${this.hass}
            .config=${this._vacuumConfig}
          ></ha-lumina-vacuum-card>
        </lumina-bottom-sheet>

        <lumina-bottom-sheet
          .open=${this._activeSheet === 'room'}
          title=${this._config.name}
          @sheet-closed=${this._closeSheet}
        >
          <ha-lumina-room-popup
            .hass=${this.hass}
            .config=${this._roomPopupConfig}
          ></ha-lumina-room-popup>
        </lumina-bottom-sheet>
      </ha-card>
    `;
  }
}
