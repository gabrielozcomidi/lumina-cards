import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LuminaInfoCardConfig, InfoCardMode } from '../types';
import { HomeAssistant } from '../types/ha-types';
import { loadHaElements, fireConfigChanged } from '../utils/editor-helpers';

const MODES: { value: InfoCardMode; label: string; icon: string; hint: string }[] = [
  { value: 'air_quality', label: 'Air Quality', icon: 'mdi:leaf', hint: 'AQI sensor (e.g. sensor.aqi)' },
  { value: 'moon_phase', label: 'Moon Phase', icon: 'mdi:moon-waning-crescent', hint: 'sensor.moon_phase' },
  { value: 'precipitation', label: 'Precipitation', icon: 'mdi:weather-rainy', hint: 'Rain/snow sensor or weather attr' },
  { value: 'sun_cycle', label: 'Sun Cycle', icon: 'mdi:white-balance-sunny', hint: 'sun.sun (built-in)' },
  { value: 'sun_moon', label: 'Sun & Moon', icon: 'mdi:theme-light-dark', hint: 'sun.sun + sensor.moon_phase' },
  { value: 'weather_alert', label: 'Weather Alerts', icon: 'mdi:alert', hint: 'Alert binary_sensor or sensor' },
];

@customElement('ha-lumina-info-card-editor')
export class HaLuminaInfoCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: LuminaInfoCardConfig;
  @state() private _haLoaded = false;
  @state() private _openSections: Record<string, boolean> = { mode: true };

  static styles = css`
    :host { display: block; }
    .editor { display: flex; flex-direction: column; gap: 12px; padding: 16px 0; }
    .editor-row { display: flex; flex-direction: column; gap: 4px; }
    .editor-label { font-size: 0.875rem; font-weight: 500; color: var(--primary-text-color); }
    .editor-hint { font-size: 0.75rem; color: var(--secondary-text-color); margin-top: 2px; }
    .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
    .loading { padding: 24px; text-align: center; color: var(--secondary-text-color); }

    /* ─── Collapsible Sections ──────────────────────── */
    .section-collapsible {
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      overflow: hidden;
    }
    .section-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 14px; cursor: pointer; user-select: none;
      background: var(--card-background-color, #1a1a1d);
      transition: background 0.2s;
    }
    .section-header:hover { background: var(--secondary-background-color, #222); }
    .section-header-left { display: flex; align-items: center; gap: 10px; }
    .section-header-left ha-icon { --mdc-icon-size: 20px; color: var(--primary-color); }
    .section-title { font-size: 0.9375rem; font-weight: 600; color: var(--primary-text-color); }
    .section-chevron {
      --mdc-icon-size: 20px; color: var(--secondary-text-color);
      transition: transform 0.25s ease;
    }
    .section-chevron.open { transform: rotate(180deg); }
    .section-body {
      max-height: 0; overflow: hidden;
      transition: max-height 0.3s ease, padding 0.3s ease;
      padding: 0 14px;
    }
    .section-body.open { max-height: 2000px; padding: 12px 14px 16px; }

    /* ─── Mode Grid ──────────────────────── */
    .mode-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
    }
    .mode-option {
      display: flex; flex-direction: column; align-items: center; gap: 6px;
      padding: 14px 8px; border-radius: 10px; cursor: pointer;
      background: var(--card-background-color, #1a1a1d);
      border: 2px solid transparent;
      transition: border-color 0.2s, background 0.2s;
      text-align: center;
    }
    .mode-option:hover {
      border-color: rgba(133, 173, 255, 0.2);
      background: var(--secondary-background-color, #222);
    }
    .mode-option.selected {
      border-color: #85adff;
      background: rgba(133, 173, 255, 0.08);
    }
    .mode-option ha-icon { --mdc-icon-size: 24px; color: var(--secondary-text-color); }
    .mode-option.selected ha-icon { color: #85adff; }
    .mode-option-label { font-size: 0.75rem; font-weight: 600; color: var(--primary-text-color); }
    .mode-option.selected .mode-option-label { color: #85adff; }
  `;

  public setConfig(config: LuminaInfoCardConfig): void {
    this._config = { ...config };
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await loadHaElements();
    this._haLoaded = true;
  }

  private _dispatch(): void { fireConfigChanged(this, this._config); }

  private _set(field: string, value: unknown): void {
    this._config = { ...this._config, [field]: value };
    this._dispatch();
  }

  private _toggleSection(key: string): void {
    this._openSections = { ...this._openSections, [key]: !this._openSections[key] };
  }

  protected render() {
    if (!this._config || !this.hass) return html``;
    if (!this._haLoaded) return html`<div class="loading">Loading editor...</div>`;

    const currentMode = MODES.find(m => m.value === this._config.mode);

    return html`
      <div class="editor">

        <!-- ─── Mode Selection (Collapsible) ─── -->
        <div class="section-collapsible">
          <div class="section-header" @click=${() => this._toggleSection('mode')}>
            <div class="section-header-left">
              <ha-icon icon="${currentMode?.icon || 'mdi:information'}"></ha-icon>
              <span class="section-title">${currentMode?.label || 'Select Mode'}</span>
            </div>
            <ha-icon class="section-chevron ${this._openSections['mode'] ? 'open' : ''}" icon="mdi:chevron-down"></ha-icon>
          </div>
          <div class="section-body ${this._openSections['mode'] ? 'open' : ''}">
            <div class="mode-grid">
              ${MODES.map(m => html`
                <div class="mode-option ${this._config.mode === m.value ? 'selected' : ''}"
                  @click=${() => this._set('mode', m.value)}>
                  <ha-icon icon="${m.icon}"></ha-icon>
                  <span class="mode-option-label">${m.label}</span>
                </div>
              `)}
            </div>
            ${currentMode ? html`<span class="editor-hint">${currentMode.hint}</span>` : ''}
          </div>
        </div>

        <!-- ─── Entity (Collapsible) ─── -->
        <div class="section-collapsible">
          <div class="section-header" @click=${() => this._toggleSection('entity')}>
            <div class="section-header-left">
              <ha-icon icon="mdi:link-variant"></ha-icon>
              <span class="section-title">Entity</span>
            </div>
            <ha-icon class="section-chevron ${this._openSections['entity'] ? 'open' : ''}" icon="mdi:chevron-down"></ha-icon>
          </div>
          <div class="section-body ${this._openSections['entity'] ? 'open' : ''}">
            <div class="editor-row">
              <ha-entity-picker
                .hass=${this.hass}
                label="Primary Entity"
                .value=${this._config.entity || ''}
                @value-changed=${(e: CustomEvent) => this._set('entity', e.detail.value)}
                allow-custom-entity
              ></ha-entity-picker>
            </div>

            ${this._config.mode === 'sun_moon' ? html`
              <div class="editor-row" style="margin-top: 8px;">
                <ha-entity-picker
                  .hass=${this.hass}
                  label="Moon Entity"
                  .value=${this._config.moon_entity || ''}
                  .includeDomains=${['sensor']}
                  @value-changed=${(e: CustomEvent) => this._set('moon_entity', e.detail.value)}
                  allow-custom-entity
                ></ha-entity-picker>
                <span class="editor-hint">sensor.moon_phase from the Moon integration</span>
              </div>
            ` : nothing}

            <div class="editor-row" style="margin-top: 8px;">
              <ha-textfield
                label="Name Override"
                .value=${this._config.name || ''}
                @input=${(e: Event) => this._set('name', (e.target as HTMLInputElement).value || undefined)}
              ></ha-textfield>
            </div>
          </div>
        </div>

        <!-- ─── Display (Collapsible) ─── -->
        <div class="section-collapsible">
          <div class="section-header" @click=${() => this._toggleSection('display')}>
            <div class="section-header-left">
              <ha-icon icon="mdi:palette-outline"></ha-icon>
              <span class="section-title">Display</span>
            </div>
            <ha-icon class="section-chevron ${this._openSections['display'] ? 'open' : ''}" icon="mdi:chevron-down"></ha-icon>
          </div>
          <div class="section-body ${this._openSections['display'] ? 'open' : ''}">
            <div class="toggle-row">
              <span class="editor-label">Compact (single line)</span>
              <ha-switch
                .checked=${this._config.compact === true}
                @change=${(e: Event) => this._set('compact', (e.target as HTMLInputElement).checked || undefined)}
              ></ha-switch>
            </div>
            <div class="toggle-row">
              <span class="editor-label">Show Card Background</span>
              <ha-switch .checked=${this._config.show_background !== false}
                @change=${(e: Event) => this._set('show_background', (e.target as HTMLInputElement).checked)}
              ></ha-switch>
            </div>
          </div>
        </div>

      </div>
    `;
  }
}
