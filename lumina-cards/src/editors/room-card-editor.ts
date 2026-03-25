import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LuminaRoomCardConfig } from '../types';
import { HomeAssistant } from '../types/ha-types';
import { ASSETS_3D, resolveImageUrl } from '../utils/assets-3d';
import { loadHaElements, fireConfigChanged } from '../utils/editor-helpers';

@customElement('ha-lumina-room-card-editor')
export class HaLuminaRoomCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: LuminaRoomCardConfig;
  @state() private _haLoaded = false;

  static styles = css`
    :host { display: block; }
    .editor { display: flex; flex-direction: column; gap: 16px; padding: 16px 0; }
    .editor-row { display: flex; flex-direction: column; gap: 4px; }
    .editor-label { font-size: 0.875rem; font-weight: 500; color: var(--primary-text-color); }
    .editor-sublabel { font-size: 0.75rem; color: var(--secondary-text-color); }
    .editor-section {
      font-size: 1rem; font-weight: 600; color: var(--primary-text-color);
      margin-top: 8px; padding-bottom: 4px; border-bottom: 1px solid var(--divider-color);
    }
    .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
    .entity-row { display: flex; gap: 8px; align-items: center; }
    .entity-row ha-entity-picker { flex: 1; }
    .add-btn {
      cursor: pointer; color: var(--primary-color); font-size: 0.875rem;
      font-weight: 500; padding: 8px; display: flex; align-items: center; gap: 4px;
    }
    .remove-btn { cursor: pointer; color: var(--error-color, #db4437); --mdc-icon-size: 20px; }

    /* ─── 3D Asset List with Preview ──────────────── */
    .asset-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 8px;
      max-height: 280px;
      overflow-y: auto;
    }
    .asset-list::-webkit-scrollbar { width: 4px; }
    .asset-list::-webkit-scrollbar-track { background: transparent; }
    .asset-list::-webkit-scrollbar-thumb { background: var(--divider-color); border-radius: 9999px; }

    .asset-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 12px;
      border-radius: 10px;
      background: var(--card-background-color, #1a1a1d);
      border: 2px solid transparent;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
    }
    .asset-item:hover {
      border-color: rgba(133, 173, 255, 0.2);
      background: var(--secondary-background-color, #222);
    }
    .asset-item.selected {
      border-color: #85adff;
      background: rgba(133, 173, 255, 0.08);
    }
    .asset-preview {
      width: 56px;
      height: 56px;
      border-radius: 8px;
      background: #111;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .asset-preview img {
      width: 48px;
      height: 48px;
      object-fit: contain;
      filter: drop-shadow(0 0 6px rgba(0,0,0,0.4));
    }
    .asset-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
      min-width: 0;
    }
    .asset-name {
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .asset-category {
      font-size: 0.6875rem;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .asset-check {
      color: #85adff;
      --mdc-icon-size: 20px;
      flex-shrink: 0;
    }

    .custom-url-note { font-size: 0.75rem; color: var(--secondary-text-color); margin-top: 4px; }
    .loading { padding: 24px; text-align: center; color: var(--secondary-text-color); }

    /* ─── Label Inputs Row ────────────────────────── */
    .label-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
  `;

  public setConfig(config: LuminaRoomCardConfig): void {
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

  private _selectAsset(key: string): void {
    this._set('image', this._config.image === key ? '' : key);
  }

  private _lightChanged(i: number, v: string): void {
    const e = [...(this._config.light_entities || [])]; e[i] = v;
    this._set('light_entities', e);
  }

  private _addLight(): void {
    this._set('light_entities', [...(this._config.light_entities || []), '']);
  }

  private _removeLight(i: number): void {
    const e = [...(this._config.light_entities || [])]; e.splice(i, 1);
    this._set('light_entities', e);
  }

  protected render() {
    if (!this._config || !this.hass) return html``;
    if (!this._haLoaded) return html`<div class="loading">Loading editor...</div>`;

    const img = this._config.image || '';
    const isCustomUrl = img.startsWith('http') || img.startsWith('/');

    return html`
      <div class="editor">
        <!-- ─── Room Name ──────────────────────────── -->
        <div class="editor-section">Room Info</div>
        <div class="editor-row">
          <ha-textfield
            label="Room Name"
            .value=${this._config.name || ''}
            @input=${(e: Event) => this._set('name', (e.target as HTMLInputElement).value)}
          ></ha-textfield>
        </div>

        <!-- ─── 3D Asset List with Preview ─────────── -->
        <div class="editor-section">3D Room Element</div>
        <div class="editor-sublabel">Select a built-in 3D asset or enter a custom image URL</div>

        <div class="asset-list">
          ${ASSETS_3D.map((asset) => {
            const selected = img === asset.key;
            return html`
              <div class="asset-item ${selected ? 'selected' : ''}" @click=${() => this._selectAsset(asset.key)}>
                <div class="asset-preview">
                  <img src="${asset.url}" alt="${asset.label}" loading="lazy" />
                </div>
                <div class="asset-info">
                  <span class="asset-name">${asset.label}</span>
                  <span class="asset-category">${asset.category}</span>
                </div>
                ${selected ? html`<ha-icon class="asset-check" icon="mdi:check-circle"></ha-icon>` : ''}
              </div>
            `;
          })}
        </div>

        <div class="editor-row">
          <ha-textfield
            label="Or custom image URL"
            .value=${isCustomUrl ? img : ''}
            @input=${(e: Event) => this._set('image', (e.target as HTMLInputElement).value)}
          ></ha-textfield>
          <span class="custom-url-note">Supports: /local/image.png or full URLs</span>
        </div>

        <!-- ─── Custom Button Labels ───────────────── -->
        <div class="editor-section">Button Labels</div>
        <div class="editor-sublabel">Custom names for the action buttons (leave empty for defaults)</div>
        <div class="label-row">
          <ha-textfield label="Lights" .value=${this._config.lights_label || ''}
            @input=${(e: Event) => this._set('lights_label', (e.target as HTMLInputElement).value)}></ha-textfield>
          <ha-textfield label="Climate" .value=${this._config.climate_label || ''}
            @input=${(e: Event) => this._set('climate_label', (e.target as HTMLInputElement).value)}></ha-textfield>
        </div>
        <div class="label-row">
          <ha-textfield label="Media" .value=${this._config.media_label || ''}
            @input=${(e: Event) => this._set('media_label', (e.target as HTMLInputElement).value)}></ha-textfield>
          <ha-textfield label="Clean" .value=${this._config.vacuum_label || ''}
            @input=${(e: Event) => this._set('vacuum_label', (e.target as HTMLInputElement).value)}></ha-textfield>
        </div>

        <!-- ─── Temperature ────────────────────────── -->
        <div class="editor-section">Temperature</div>
        <div class="editor-row">
          <ha-entity-picker .hass=${this.hass} label="Temperature Entity"
            .value=${this._config.temperature_entity || ''} .includeDomains=${['sensor']}
            @value-changed=${(e: CustomEvent) => this._set('temperature_entity', e.detail.value)}
            allow-custom-entity></ha-entity-picker>
        </div>

        <!-- ─── Lights ─────────────────────────────── -->
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
        <div class="add-btn" @click=${this._addLight}>+ Add Light Entity</div>

        <!-- ─── Climate ────────────────────────────── -->
        <div class="editor-section">Climate</div>
        <div class="toggle-row">
          <span class="editor-label">Show Climate</span>
          <ha-switch .checked=${this._config.show_climate !== false}
            @change=${(e: Event) => this._set('show_climate', (e.target as HTMLInputElement).checked)}>
          </ha-switch>
        </div>
        ${this._config.show_climate !== false ? html`
          <div class="editor-row">
            <ha-entity-picker .hass=${this.hass} label="Climate Entity"
              .value=${this._config.climate_entity || ''} .includeDomains=${['climate']}
              @value-changed=${(e: CustomEvent) => this._set('climate_entity', e.detail.value)}
              allow-custom-entity></ha-entity-picker>
          </div>
        ` : ''}

        <!-- ─── Media ──────────────────────────────── -->
        <div class="editor-section">Media</div>
        <div class="toggle-row">
          <span class="editor-label">Show Media</span>
          <ha-switch .checked=${this._config.show_media !== false}
            @change=${(e: Event) => this._set('show_media', (e.target as HTMLInputElement).checked)}>
          </ha-switch>
        </div>
        ${this._config.show_media !== false ? html`
          <div class="editor-row">
            <ha-entity-picker .hass=${this.hass} label="Media Player"
              .value=${this._config.media_entity || ''} .includeDomains=${['media_player']}
              @value-changed=${(e: CustomEvent) => this._set('media_entity', e.detail.value)}
              allow-custom-entity></ha-entity-picker>
          </div>
        ` : ''}

        <!-- ─── Cleaning ──────────────────────────── -->
        <div class="editor-section">Cleaning</div>
        <div class="toggle-row">
          <span class="editor-label">Show Vacuum</span>
          <ha-switch .checked=${this._config.show_vacuum !== false}
            @change=${(e: Event) => this._set('show_vacuum', (e.target as HTMLInputElement).checked)}>
          </ha-switch>
        </div>
        ${this._config.show_vacuum !== false ? html`
          <div class="editor-row">
            <ha-entity-picker .hass=${this.hass} label="Vacuum"
              .value=${this._config.vacuum_entity || ''} .includeDomains=${['vacuum']}
              @value-changed=${(e: CustomEvent) => this._set('vacuum_entity', e.detail.value)}
              allow-custom-entity></ha-entity-picker>
          </div>
        ` : ''}
      </div>
    `;
  }
}
