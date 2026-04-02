import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LuminaWeatherCardConfig } from '../types';
import { HomeAssistant } from '../types/ha-types';
import { loadHaElements, fireConfigChanged } from '../utils/editor-helpers';

@customElement('ha-lumina-weather-card-editor')
export class HaLuminaWeatherCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: LuminaWeatherCardConfig;
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
    .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
    .loading { padding: 24px; text-align: center; color: var(--secondary-text-color); }
    ha-select { width: 100%; }
  `;

  public setConfig(config: LuminaWeatherCardConfig): void {
    this._config = { ...config };
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await loadHaElements();
    this._haLoaded = true;
  }

  private _dispatch(): void {
    fireConfigChanged(this, this._config);
  }

  private _set(field: string, value: unknown): void {
    this._config = { ...this._config, [field]: value };
    this._dispatch();
  }

  protected render() {
    if (!this._config || !this.hass) return html``;
    if (!this._haLoaded) return html`<div class="loading">Loading editor...</div>`;

    return html`
      <div class="editor">
        <div class="editor-section">Weather Entity</div>
        <div class="editor-row">
          <ha-entity-picker
            .hass=${this.hass}
            label="Weather Entity"
            .value=${this._config.entity || ''}
            .includeDomains=${['weather']}
            @value-changed=${(e: CustomEvent) => this._set('entity', e.detail.value)}
            allow-custom-entity
          ></ha-entity-picker>
        </div>

        <div class="editor-row">
          <ha-textfield
            label="Name Override"
            .value=${this._config.name || ''}
            @input=${(e: Event) => this._set('name', (e.target as HTMLInputElement).value || undefined)}
          ></ha-textfield>
        </div>

        <div class="editor-section">Display Options</div>

        <div class="editor-row">
          <span class="editor-label">Card Layout</span>
          <ha-select
            label="Layout"
            .value=${this._config.layout || (this._config.compact ? 'compact' : 'full')}
            @selected=${(e: CustomEvent) => {
              const val = (e.target as any).value;
              if (val) {
                this._config = { ...this._config, layout: val, compact: undefined } as any;
                this._dispatch();
              }
            }}
            fixedMenuPosition
            naturalMenuWidth
          >
            <mwc-list-item value="full">Full (all sections)</mwc-list-item>
            <mwc-list-item value="room">Room Card Size</mwc-list-item>
            <mwc-list-item value="compact">Compact (single line)</mwc-list-item>
          </ha-select>
        </div>

        <div class="toggle-row">
          <span class="editor-label">Show Hourly Forecast</span>
          <ha-switch
            .checked=${this._config.show_forecast_hourly !== false}
            @change=${(e: Event) => this._set('show_forecast_hourly', (e.target as HTMLInputElement).checked)}
          ></ha-switch>
        </div>

        <div class="toggle-row">
          <span class="editor-label">Show Daily Forecast</span>
          <ha-switch
            .checked=${this._config.show_forecast_daily !== false}
            @change=${(e: Event) => this._set('show_forecast_daily', (e.target as HTMLInputElement).checked)}
          ></ha-switch>
        </div>

        <div class="toggle-row">
          <span class="editor-label">Show Details (wind, humidity, UV, pressure)</span>
          <ha-switch
            .checked=${this._config.show_details !== false}
            @change=${(e: Event) => this._set('show_details', (e.target as HTMLInputElement).checked)}
          ></ha-switch>
        </div>
      </div>
    `;
  }
}
