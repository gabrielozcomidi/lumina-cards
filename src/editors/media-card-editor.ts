import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LuminaMediaCardConfig, MediaEntityConfig, MediaShortcut, MediaPlayerType } from '../types';
import { HomeAssistant } from '../types/ha-types';
import { loadHaElements, fireConfigChanged } from '../utils/editor-helpers';

@customElement('ha-lumina-media-card-editor')
export class HaLuminaMediaCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: LuminaMediaCardConfig;
  @state() private _haLoaded = false;

  static styles = css`
    :host { display: block; }
    .editor { display: flex; flex-direction: column; gap: 16px; padding: 16px 0; }
    .editor-section { font-size: 1rem; font-weight: 600; color: var(--primary-text-color); margin-top: 8px; padding-bottom: 4px; border-bottom: 1px solid var(--divider-color); }
    .entity-block { background: var(--card-background-color, #1a1a1d); border-radius: 10px; padding: 12px; display: flex; flex-direction: column; gap: 8px; }
    .entity-row { display: flex; gap: 8px; align-items: center; }
    .entity-row ha-entity-picker { flex: 1; }
    .remove-btn { cursor: pointer; color: var(--error-color, #db4437); --mdc-icon-size: 20px; }
    .add-btn { cursor: pointer; color: var(--primary-color); font-size: 0.875rem; font-weight: 500; padding: 8px; }
    .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
    .toggle-label { font-size: 0.875rem; font-weight: 500; }
    .editor-label { font-size: 0.875rem; font-weight: 500; color: var(--primary-text-color); }
    .entity-extras { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; align-items: end; }
    .type-select { width: 100%; padding: 10px 12px; background: var(--card-background-color, #1a1a1d); border: 1px solid var(--divider-color); border-radius: 8px; color: var(--primary-text-color); font-size: 0.875rem; font-family: inherit; appearance: none; -webkit-appearance: none; cursor: pointer; }
    .type-select-wrapper { position: relative; }
    .type-select-wrapper::after { content: '▾'; position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--secondary-text-color); pointer-events: none; font-size: 0.75rem; }
    .type-select-label { font-size: 0.75rem; color: var(--secondary-text-color); margin-bottom: 4px; }
    .shortcut-block { background: var(--card-background-color, #1a1a1d); border-radius: 10px; padding: 12px; display: flex; flex-direction: column; gap: 8px; }
    .shortcut-row { display: flex; gap: 8px; align-items: center; }
    .shortcut-row ha-textfield { flex: 1; }
    .loading { padding: 24px; text-align: center; color: var(--secondary-text-color); }
    .migrate-btn { cursor: pointer; color: var(--primary-color); font-size: 0.8125rem; font-weight: 500; padding: 8px; background: var(--card-background-color, #1a1a1d); border-radius: 8px; text-align: center; }
  `;

  public setConfig(config: LuminaMediaCardConfig): void {
    // Always normalize to entities array
    const c = { ...config } as Record<string, unknown>;
    if (!Array.isArray(c.entities) || !(c.entities as unknown[]).length) {
      if (c.entity) {
        c.entities = [{ entity: c.entity as string }];
        delete c.entity;
      } else {
        c.entities = [];
      }
    }
    this._config = c as LuminaMediaCardConfig;
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    try {
      await loadHaElements();
    } catch {
      // Continue even if HA elements fail to load
    }
    this._haLoaded = true;
  }

  private _dispatch(): void { fireConfigChanged(this, this._config); }
  private _set(field: string, value: unknown): void {
    this._config = { ...this._config, [field]: value }; this._dispatch();
  }

  // ─── Entity helpers ──────────────────────────────

  private _toObj(entry: string | MediaEntityConfig): MediaEntityConfig {
    return typeof entry === 'string' ? { entity: entry } : { ...entry };
  }

  private _getEntityId(entry: string | MediaEntityConfig): string {
    return typeof entry === 'string' ? entry : entry.entity;
  }

  private _getEntityName(entry: string | MediaEntityConfig): string {
    return typeof entry === 'string' ? '' : entry.name || '';
  }

  private _getPlayerType(entry: string | MediaEntityConfig): MediaPlayerType {
    return typeof entry === 'string' ? 'speaker' : entry.player_type || 'speaker';
  }

  private _playerTypeChanged(i: number, v: string): void {
    const e = [...this._getEntities()];
    const obj = this._toObj(e[i]);
    obj.player_type = v as MediaPlayerType;
    e[i] = obj;
    this._set('entities', e);
  }

  private _getEntities(): (string | MediaEntityConfig)[] {
    return this._config.entities || [];
  }

  private _entityChanged(i: number, v: string): void {
    const e = [...this._getEntities()];
    const obj = this._toObj(e[i]);
    obj.entity = v;
    e[i] = obj;
    this._set('entities', e);
  }

  private _entityNameChanged(i: number, v: string): void {
    const e = [...this._getEntities()];
    const obj = this._toObj(e[i]);
    obj.name = v || undefined;
    e[i] = obj;
    this._set('entities', e);
  }

  private _addEntity(): void {
    this._set('entities', [...this._getEntities(), { entity: '' }]);
  }

  private _removeEntity(i: number): void {
    const e = [...this._getEntities()]; e.splice(i, 1); this._set('entities', e);
  }

  // ─── Shortcut helpers ──────────────────────────────

  private _addShortcut(): void {
    this._set('shortcuts', [...(this._config.shortcuts || []), { name: '', media_content_id: '', media_content_type: 'music', icon: 'mdi:play-circle' }]);
  }

  private _removeShortcut(i: number): void {
    const s = [...(this._config.shortcuts || [])]; s.splice(i, 1); this._set('shortcuts', s);
  }

  private _shortcutChanged(i: number, field: keyof MediaShortcut, v: string): void {
    const s = [...(this._config.shortcuts || [])]; s[i] = { ...s[i], [field]: v }; this._set('shortcuts', s);
  }

  // ─── Render ──────────────────────────────────────

  protected render() {
    if (!this._config || !this.hass) return html``;
    if (!this._haLoaded) return html`<div class="loading">Loading editor...</div>`;

    const entities = this._getEntities();

    return html`
      <div class="editor">
        <div class="editor-section">Media Players</div>
        ${entities.map((entry, i) => html`
          <div class="entity-block">
            <div class="entity-row">
              <ha-entity-picker .hass=${this.hass} label="Player ${i + 1}" .value=${this._getEntityId(entry)}
                .includeDomains=${['media_player']}
                @value-changed=${(e: CustomEvent) => this._entityChanged(i, e.detail.value)}
                allow-custom-entity></ha-entity-picker>
              <ha-icon class="remove-btn" icon="mdi:close" @click=${() => this._removeEntity(i)}></ha-icon>
            </div>
            <div class="entity-extras">
              <ha-textfield label="Custom Name" .value=${this._getEntityName(entry)}
                @input=${(e: Event) => this._entityNameChanged(i, (e.target as HTMLInputElement).value)}></ha-textfield>
              <div>
                <div class="type-select-label">Type</div>
                <div class="type-select-wrapper">
                  <select class="type-select"
                    @change=${(e: Event) => this._playerTypeChanged(i, (e.target as HTMLSelectElement).value)}>
                    <option value="speaker" ?selected=${this._getPlayerType(entry) === 'speaker'}>Speaker</option>
                    <option value="tv" ?selected=${this._getPlayerType(entry) === 'tv'}>TV / Streamer</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        `)}
        <div class="add-btn" @click=${this._addEntity}>+ Add Media Player</div>

        <div class="editor-section">Audio Format</div>
        <ha-entity-picker .hass=${this.hass} label="Audio Format Sensor (e.g. Sonos audio format)"
          .value=${this._config.audio_format_entity || ''} .includeDomains=${['sensor']}
          @value-changed=${(e: CustomEvent) => this._set('audio_format_entity', e.detail.value)}
          allow-custom-entity></ha-entity-picker>

        <div class="editor-section">Music Assistant</div>
        <ha-textfield label="Config Entry ID (for search)" .value=${this._config.mass_config_entry_id || ''}
          @input=${(e: Event) => this._set('mass_config_entry_id', (e.target as HTMLInputElement).value || undefined)}></ha-textfield>

        <div class="editor-section">Options</div>
        <div class="toggle-row">
          <span class="toggle-label">Show Source Selector</span>
          <ha-switch .checked=${this._config.show_source !== false}
            @change=${(e: Event) => this._set('show_source', (e.target as HTMLInputElement).checked)}></ha-switch>
        </div>
        <div class="toggle-row">
          <span class="toggle-label">Show Progress Bar</span>
          <ha-switch .checked=${this._config.show_progress !== false}
            @change=${(e: Event) => this._set('show_progress', (e.target as HTMLInputElement).checked)}></ha-switch>
        </div>
        <div class="toggle-row">
          <span class="toggle-label">Show Speaker Management</span>
          <ha-switch .checked=${this._config.show_speaker_management !== false}
            @change=${(e: Event) => this._set('show_speaker_management', (e.target as HTMLInputElement).checked)}></ha-switch>
        </div>

        <div class="editor-section">Media Shortcuts</div>
        ${(this._config.shortcuts || []).map((shortcut, i) => html`
          <div class="shortcut-block">
            <div class="shortcut-row">
              <ha-textfield label="Name" .value=${shortcut.name}
                @input=${(e: Event) => this._shortcutChanged(i, 'name', (e.target as HTMLInputElement).value)}></ha-textfield>
              <ha-icon class="remove-btn" icon="mdi:close" @click=${() => this._removeShortcut(i)}></ha-icon>
            </div>
            <ha-textfield label="Content ID (URI or playlist ID)" .value=${shortcut.media_content_id}
              @input=${(e: Event) => this._shortcutChanged(i, 'media_content_id', (e.target as HTMLInputElement).value)}></ha-textfield>
            <div class="shortcut-row">
              <ha-textfield label="Content Type" .value=${shortcut.media_content_type}
                @input=${(e: Event) => this._shortcutChanged(i, 'media_content_type', (e.target as HTMLInputElement).value)}></ha-textfield>
              <ha-icon-picker .hass=${this.hass} label="Icon" .value=${shortcut.icon || ''}
                @value-changed=${(e: CustomEvent) => this._shortcutChanged(i, 'icon', e.detail.value || '')}></ha-icon-picker>
            </div>
          </div>
        `)}
        <div class="add-btn" @click=${this._addShortcut}>+ Add Shortcut</div>

        <div class="toggle-row">
          <span class="editor-label">Show Card Background</span>
          <ha-switch .checked=${this._config.show_background !== false}
            @change=${(e: Event) => this._set('show_background', (e.target as HTMLInputElement).checked)}
          ></ha-switch>
        </div>
      </div>
    `;
  }
}
