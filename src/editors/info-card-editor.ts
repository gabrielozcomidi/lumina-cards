import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LuminaInfoCardConfig, InfoCardMode } from '../types';
import { HomeAssistant } from '../types/ha-types';
import { loadHaElements, fireConfigChanged } from '../utils/editor-helpers';

const MODES: { value: InfoCardMode; label: string; hint: string }[] = [
  { value: 'air_quality', label: 'Air Quality', hint: 'AQI sensor (e.g. sensor.aqi)' },
  { value: 'moon_phase', label: 'Moon Phase', hint: 'sensor.moon_phase' },
  { value: 'precipitation', label: 'Precipitation', hint: 'Rain/snow sensor or weather attr' },
  { value: 'sun_cycle', label: 'Sun Cycle', hint: 'sun.sun (built-in)' },
  { value: 'sun_moon', label: 'Sun & Moon', hint: 'sun.sun + sensor.moon_phase' },
  { value: 'weather_alert', label: 'Weather Alerts', hint: 'Alert binary_sensor or sensor' },
];

@customElement('ha-lumina-info-card-editor')
export class HaLuminaInfoCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: LuminaInfoCardConfig;
  @state() private _haLoaded = false;

  static styles = css`
    :host { display: block; }
    .editor { display: flex; flex-direction: column; gap: 16px; padding: 16px 0; }
    .editor-section {
      font-size: 1rem; font-weight: 600; color: var(--primary-text-color);
      margin-top: 8px; padding-bottom: 4px; border-bottom: 1px solid var(--divider-color);
    }
    .editor-row { display: flex; flex-direction: column; gap: 4px; }
    .editor-label { font-size: 0.875rem; font-weight: 500; color: var(--primary-text-color); }
    .editor-hint { font-size: 0.75rem; color: var(--secondary-text-color); margin-top: 2px; }
    .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
    .loading { padding: 24px; text-align: center; color: var(--secondary-text-color); }
    ha-select { width: 100%; }

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

  protected render() {
    if (!this._config || !this.hass) return html``;
    if (!this._haLoaded) return html`<div class="loading">Loading editor...</div>`;

    const currentMode = MODES.find(m => m.value === this._config.mode);

    return html`
      <div class="editor">
        <div class="editor-section">Info Card Mode</div>

        <div class="mode-grid">
          ${MODES.map(m => html`
            <div class="mode-option ${this._config.mode === m.value ? 'selected' : ''}"
              @click=${() => this._set('mode', m.value)}>
              <ha-icon icon="${m.value === 'air_quality' ? 'mdi:leaf' :
                m.value === 'moon_phase' ? 'mdi:moon-waning-crescent' :
                m.value === 'precipitation' ? 'mdi:weather-rainy' :
                m.value === 'sun_cycle' ? 'mdi:white-balance-sunny' :
                m.value === 'sun_moon' ? 'mdi:theme-light-dark' :
                'mdi:alert'}"></ha-icon>
              <span class="mode-option-label">${m.label}</span>
            </div>
          `)}
        </div>
        ${currentMode ? html`<span class="editor-hint">${currentMode.hint}</span>` : ''}

        <div class="editor-section">Entity</div>

        <div class="editor-row">
          <ha-entity-picker
            .hass=${this.hass}
            label="Entity"
            .value=${this._config.entity || ''}
            @value-changed=${(e: CustomEvent) => this._set('entity', e.detail.value)}
            allow-custom-entity
          ></ha-entity-picker>
        </div>

        ${this._config.mode === 'sun_moon' ? html`
          <div class="editor-row">
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
        ` : ''}

        <div class="editor-row">
          <ha-textfield
            label="Name Override"
            .value=${this._config.name || ''}
            @input=${(e: Event) => this._set('name', (e.target as HTMLInputElement).value || undefined)}
          ></ha-textfield>
        </div>

        <div class="toggle-row">
          <span class="editor-label">Compact (single line)</span>
          <ha-switch
            .checked=${this._config.compact === true}
            @change=${(e: Event) => this._set('compact', (e.target as HTMLInputElement).checked || undefined)}
          ></ha-switch>
        </div>
      </div>
    `;
  }
}
