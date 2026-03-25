import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LuminaVacuumCardConfig } from '../types';
import { HomeAssistant } from '../types/ha-types';
import { loadHaElements, fireConfigChanged } from '../utils/editor-helpers';

@customElement('ha-lumina-vacuum-card-editor')
export class HaLuminaVacuumCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: LuminaVacuumCardConfig;
  @state() private _haLoaded = false;

  static styles = css`
    :host { display: block; }
    .editor { display: flex; flex-direction: column; gap: 16px; padding: 16px 0; }
    .editor-section { font-size: 1rem; font-weight: 600; color: var(--primary-text-color); margin-top: 8px; padding-bottom: 4px; border-bottom: 1px solid var(--divider-color); }
    .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
    .toggle-label { font-size: 0.875rem; font-weight: 500; }
    .loading { padding: 24px; text-align: center; color: var(--secondary-text-color); }
  `;

  public setConfig(config: LuminaVacuumCardConfig): void { this._config = { ...config }; }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await loadHaElements();
    this._haLoaded = true;
  }

  private _dispatch(): void { fireConfigChanged(this, this._config); }
  private _set(field: string, value: unknown): void {
    this._config = { ...this._config, [field]: value }; this._dispatch();
  }

  protected render() {
    if (!this._config || !this.hass) return html``;
    if (!this._haLoaded) return html`<div class="loading">Loading editor...</div>`;

    return html`
      <div class="editor">
        <div class="editor-section">Vacuum Entity</div>
        <ha-entity-picker .hass=${this.hass} label="Vacuum"
          .value=${this._config.entity || ''} .includeDomains=${['vacuum']}
          @value-changed=${(e: CustomEvent) => this._set('entity', e.detail.value)}
          allow-custom-entity></ha-entity-picker>

        <div class="editor-section">Options</div>
        <div class="toggle-row">
          <span class="toggle-label">Show Fan Speed</span>
          <ha-switch .checked=${this._config.show_fan_speed !== false}
            @change=${(e: Event) => this._set('show_fan_speed', (e.target as HTMLInputElement).checked)}></ha-switch>
        </div>
      </div>
    `;
  }
}
