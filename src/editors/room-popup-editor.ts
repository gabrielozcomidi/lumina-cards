import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LuminaRoomPopupConfig } from '../types';
import { HomeAssistant } from '../types/ha-types';
import { loadHaElements, fireConfigChanged } from '../utils/editor-helpers';

@customElement('ha-lumina-room-popup-editor')
export class HaLuminaRoomPopupEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: LuminaRoomPopupConfig;
  @state() private _haLoaded = false;

  static styles = css`
    :host { display: block; }
    .editor { display: flex; flex-direction: column; gap: 16px; padding: 16px 0; }
    .editor-section { font-size: 1rem; font-weight: 600; color: var(--primary-text-color); margin-top: 8px; padding-bottom: 4px; border-bottom: 1px solid var(--divider-color); }
    .entity-row { display: flex; gap: 8px; align-items: center; }
    .entity-row ha-entity-picker { flex: 1; }
    .remove-btn { cursor: pointer; color: var(--error-color, #db4437); --mdc-icon-size: 20px; }
    .add-btn { cursor: pointer; color: var(--primary-color); font-size: 0.875rem; font-weight: 500; padding: 8px; }
    .loading { padding: 24px; text-align: center; color: var(--secondary-text-color); }
    .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
    .toggle-label { font-size: 0.875rem; font-weight: 500; color: var(--primary-text-color); }
  `;

  public setConfig(config: LuminaRoomPopupConfig): void { this._config = { ...config }; }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await loadHaElements();
    this._haLoaded = true;
  }

  private _dispatch(): void { fireConfigChanged(this, this._config); }
  private _set(field: string, value: unknown): void {
    this._config = { ...this._config, [field]: value }; this._dispatch();
  }

  private _lightChanged(i: number, v: string): void {
    const e = [...(this._config.light_entities || [])]; e[i] = v; this._set('light_entities', e);
  }
  private _addLight(): void { this._set('light_entities', [...(this._config.light_entities || []), '']); }
  private _removeLight(i: number): void {
    const e = [...(this._config.light_entities || [])]; e.splice(i, 1); this._set('light_entities', e);
  }

  protected render() {
    if (!this._config || !this.hass) return html``;
    if (!this._haLoaded) return html`<div class="loading">Loading editor...</div>`;

    return html`
      <div class="editor">
        <div class="editor-section">Room Info</div>
        <ha-textfield label="Room Name" .value=${this._config.name || ''}
          @input=${(e: Event) => this._set('name', (e.target as HTMLInputElement).value)}></ha-textfield>

        <div class="editor-section">Temperature</div>
        <ha-entity-picker .hass=${this.hass} label="Temperature Sensor"
          .value=${this._config.temperature_entity || ''} .includeDomains=${['sensor']}
          @value-changed=${(e: CustomEvent) => this._set('temperature_entity', e.detail.value)}
          allow-custom-entity></ha-entity-picker>

        <div class="editor-section">Lights</div>
        ${(this._config.light_entities || []).map((id, i) => html`
          <div class="entity-row">
            <ha-entity-picker .hass=${this.hass} label="Light ${i + 1}" .value=${id}
              .includeDomains=${['light']}
              @value-changed=${(e: CustomEvent) => this._lightChanged(i, e.detail.value)}
              allow-custom-entity></ha-entity-picker>
            <ha-icon class="remove-btn" icon="mdi:close" @click=${() => this._removeLight(i)}></ha-icon>
          </div>
        `)}
        <div class="add-btn" @click=${this._addLight}>+ Add Light</div>

        <div class="editor-section">Climate</div>
        <ha-entity-picker .hass=${this.hass} label="Climate Entity"
          .value=${this._config.climate_entity || ''} .includeDomains=${['climate']}
          @value-changed=${(e: CustomEvent) => this._set('climate_entity', e.detail.value)}
          allow-custom-entity></ha-entity-picker>

        <div class="editor-section">Media</div>
        <ha-entity-picker .hass=${this.hass} label="Media Player"
          .value=${this._config.media_entity || ''} .includeDomains=${['media_player']}
          @value-changed=${(e: CustomEvent) => this._set('media_entity', e.detail.value)}
          allow-custom-entity></ha-entity-picker>

        <div class="editor-section">Vacuum</div>
        <ha-entity-picker .hass=${this.hass} label="Vacuum"
          .value=${this._config.vacuum_entity || ''} .includeDomains=${['vacuum']}
          @value-changed=${(e: CustomEvent) => this._set('vacuum_entity', e.detail.value)}
          allow-custom-entity></ha-entity-picker>

        <div class="editor-section">Display</div>
        <div class="toggle-row">
          <span class="toggle-label">Fullscreen Popup</span>
          <ha-switch .checked=${this._config.fullscreen === true}
            @change=${(e: Event) => this._set('fullscreen', (e.target as HTMLInputElement).checked || undefined)}
          ></ha-switch>
        </div>
      </div>
    `;
  }
}
