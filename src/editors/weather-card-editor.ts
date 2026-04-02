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

    .layout-grid {
      display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;
    }
    .layout-option {
      display: flex; flex-direction: column; align-items: center; gap: 6px;
      padding: 12px 8px; border-radius: 10px; cursor: pointer;
      background: var(--card-background-color, #1a1a1d);
      border: 2px solid transparent;
      transition: border-color 0.2s, background 0.2s;
      text-align: center;
    }
    .layout-option:hover {
      border-color: rgba(133, 173, 255, 0.2);
      background: var(--secondary-background-color, #222);
    }
    .layout-option.selected {
      border-color: #85adff;
      background: rgba(133, 173, 255, 0.08);
    }
    .layout-option ha-icon { --mdc-icon-size: 22px; color: var(--secondary-text-color); }
    .layout-option.selected ha-icon { color: #85adff; }
    .layout-option-label { font-size: 0.6875rem; font-weight: 600; color: var(--primary-text-color); }
    .layout-option.selected .layout-option-label { color: #85adff; }
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
          <div class="layout-grid">
            ${(['full', 'room', 'compact'] as const).map(l => {
              const current = this._config.layout || (this._config.compact ? 'compact' : 'full');
              const icons: Record<string, string> = { full: 'mdi:view-dashboard', room: 'mdi:card-outline', compact: 'mdi:text-short' };
              const labels: Record<string, string> = { full: 'Full', room: 'Room Size', compact: 'Compact' };
              return html`
                <div class="layout-option ${current === l ? 'selected' : ''}"
                  @click=${() => { this._config = { ...this._config, layout: l, compact: undefined } as any; this._dispatch(); }}>
                  <ha-icon icon="${icons[l]}"></ha-icon>
                  <span class="layout-option-label">${labels[l]}</span>
                </div>
              `;
            })}
          </div>
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
