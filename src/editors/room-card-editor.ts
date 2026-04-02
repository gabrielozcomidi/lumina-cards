import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LuminaRoomCardConfig, LightEntityConfig, SceneConfig, MediaEntityConfig, MediaPlayerType } from '../types';
import { HomeAssistant } from '../types/ha-types';
import { ASSETS_3D, resolveImageUrl } from '../utils/assets-3d';
import { loadHaElements, fireConfigChanged } from '../utils/editor-helpers';

@customElement('ha-lumina-room-card-editor')
export class HaLuminaRoomCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: LuminaRoomCardConfig;
  @state() private _haLoaded = false;
  @state() private _openSections: Record<string, boolean> = {};

  static styles = css`
    :host { display: block; }
    .editor { display: flex; flex-direction: column; gap: 16px; padding: 16px 0; }
    .editor-row { display: flex; flex-direction: column; gap: 4px; }
    .editor-label { font-size: 0.875rem; font-weight: 500; color: var(--primary-text-color); }
    .editor-sublabel { font-size: 0.75rem; color: var(--secondary-text-color); margin-bottom: 4px; }
    .editor-section {
      font-size: 1rem; font-weight: 600; color: var(--primary-text-color);
      margin-top: 8px; padding-bottom: 4px; border-bottom: 1px solid var(--divider-color);
    }

    /* ─── Collapsible Sections ──────────────────────── */
    .section-collapsible {
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      overflow: hidden;
      margin-top: 8px;
    }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px;
      cursor: pointer;
      user-select: none;
      background: var(--card-background-color, #1a1a1d);
      transition: background 0.2s;
    }
    .section-header:hover {
      background: var(--secondary-background-color, #222);
    }
    .section-header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .section-header-left ha-icon {
      --mdc-icon-size: 20px;
      color: var(--primary-color);
    }
    .section-title {
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .section-chevron {
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
      transition: transform 0.25s ease;
    }
    .section-chevron.open {
      transform: rotate(180deg);
    }
    .section-body {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease, padding 0.3s ease;
      padding: 0 14px;
    }
    .section-body.open {
      max-height: 2000px;
      padding: 12px 14px 16px;
    }

    .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
    .entity-row { display: flex; gap: 8px; align-items: center; }
    .entity-row ha-entity-picker { flex: 1; }
    .entity-block { background: var(--card-background-color, #1a1a1d); border-radius: 10px; padding: 12px; display: flex; flex-direction: column; gap: 8px; }
    .entity-extras { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
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
    .scene-row { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
    .scene-row ha-textfield, .scene-row ha-entity-picker { flex: 1; }

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

  private _toggleSection(key: string): void {
    this._openSections = { ...this._openSections, [key]: !this._openSections[key] };
  }

  private _set(field: string, value: unknown): void {
    this._config = { ...this._config, [field]: value };
    this._dispatch();
  }

  private _selectAsset(key: string): void {
    this._set('image', this._config.image === key ? '' : key);
  }

  private _toLightObj(entry: string | LightEntityConfig): LightEntityConfig {
    return typeof entry === 'string' ? { entity: entry } : { ...entry };
  }

  private _getLightId(entry: string | LightEntityConfig): string {
    return typeof entry === 'string' ? entry : entry.entity;
  }

  private _getLightName(entry: string | LightEntityConfig): string {
    return typeof entry === 'string' ? '' : entry.name || '';
  }

  private _getLightIcon(entry: string | LightEntityConfig): string {
    return typeof entry === 'string' ? '' : entry.icon || '';
  }

  private _lightChanged(i: number, v: string): void {
    const e = [...(this._config.light_entities || [])];
    const obj = this._toLightObj(e[i]);
    obj.entity = v;
    e[i] = obj;
    this._set('light_entities', e);
  }

  private _lightNameChanged(i: number, v: string): void {
    const e = [...(this._config.light_entities || [])];
    const obj = this._toLightObj(e[i]);
    obj.name = v || undefined;
    e[i] = obj;
    this._set('light_entities', e);
  }

  private _lightIconChanged(i: number, v: string): void {
    const e = [...(this._config.light_entities || [])];
    const obj = this._toLightObj(e[i]);
    obj.icon = v || undefined;
    e[i] = obj;
    this._set('light_entities', e);
  }

  private _addLight(): void {
    this._set('light_entities', [...(this._config.light_entities || []), { entity: '' }]);
  }

  private _removeLight(i: number): void {
    const e = [...(this._config.light_entities || [])]; e.splice(i, 1);
    this._set('light_entities', e);
  }

  private _addScene(): void {
    this._set('light_scenes', [...(this._config.light_scenes || []), { name: '', icon: 'mdi:palette', entity_id: '' }]);
  }
  private _removeScene(i: number): void {
    const s = [...(this._config.light_scenes || [])]; s.splice(i, 1); this._set('light_scenes', s);
  }
  private _sceneChanged(i: number, field: keyof SceneConfig, v: string): void {
    const s = [...(this._config.light_scenes || [])]; s[i] = { ...s[i], [field]: v }; this._set('light_scenes', s);
  }

  // ─── Media Entity Helpers ─────────────────────────

  private _toMediaObj(entry: string | MediaEntityConfig): MediaEntityConfig {
    return typeof entry === 'string' ? { entity: entry } : { ...entry };
  }

  private _getMediaEntities(): (string | MediaEntityConfig)[] {
    if (this._config.media_entities?.length) return this._config.media_entities;
    if (this._config.media_entity) return [{ entity: this._config.media_entity }];
    return [];
  }

  private _getMediaId(entry: string | MediaEntityConfig): string {
    return typeof entry === 'string' ? entry : entry.entity;
  }

  private _getMediaName(entry: string | MediaEntityConfig): string {
    return typeof entry === 'string' ? '' : entry.name || '';
  }

  private _getMediaType(entry: string | MediaEntityConfig): string {
    return typeof entry === 'string' ? 'speaker' : entry.player_type || 'speaker';
  }

  private _mediaEntityChanged(i: number, v: string): void {
    const e = [...this._getMediaEntities()].map((x) => this._toMediaObj(x));
    e[i] = { ...e[i], entity: v };
    this._setMediaEntities(e);
  }

  private _mediaNameChanged(i: number, v: string): void {
    const e = [...this._getMediaEntities()].map((x) => this._toMediaObj(x));
    e[i] = { ...e[i], name: v || undefined };
    this._setMediaEntities(e);
  }

  private _mediaTypeChanged(i: number, v: string): void {
    const e = [...this._getMediaEntities()].map((x) => this._toMediaObj(x));
    e[i] = { ...e[i], player_type: (v === 'tv' ? 'tv' : 'speaker') as MediaPlayerType };
    this._setMediaEntities(e);
  }

  private _addMediaEntity(): void {
    const e = [...this._getMediaEntities()].map((x) => this._toMediaObj(x));
    e.push({ entity: '' });
    this._setMediaEntities(e);
  }

  private _removeMediaEntity(i: number): void {
    const e = [...this._getMediaEntities()].map((x) => this._toMediaObj(x));
    e.splice(i, 1);
    this._setMediaEntities(e);
  }

  private _setMediaEntities(entities: MediaEntityConfig[]): void {
    // Always use media_entities, clear legacy media_entity
    const c = { ...this._config, media_entities: entities } as Record<string, unknown>;
    delete c.media_entity;
    this._config = c as LuminaRoomCardConfig;
    this._dispatch();
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

        <div class="toggle-row">
          <span class="editor-label">Compact Mode (half-width for stacks)</span>
          <ha-switch .checked=${this._config.compact === true}
            @change=${(e: Event) => this._set('compact', (e.target as HTMLInputElement).checked || undefined)}>
          </ha-switch>
        </div>

        <!-- ─── 3D Room Element (Collapsible) ──────────── -->
        <div class="section-collapsible">
          <div class="section-header" @click=${() => this._toggleSection('3d_asset')}>
            <div class="section-header-left">
              <ha-icon icon="mdi:cube-outline"></ha-icon>
              <span class="section-title">3D Room Element</span>
            </div>
            <ha-icon class="section-chevron ${this._openSections['3d_asset'] ? 'open' : ''}" icon="mdi:chevron-down"></ha-icon>
          </div>
          <div class="section-body ${this._openSections['3d_asset'] ? 'open' : ''}">
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
          </div>
        </div>

        <!-- ─── Button Labels (Collapsible) ──────────────── -->
        <div class="section-collapsible">
          <div class="section-header" @click=${() => this._toggleSection('labels')}>
            <div class="section-header-left">
              <ha-icon icon="mdi:label-outline"></ha-icon>
              <span class="section-title">Button Labels</span>
            </div>
            <ha-icon class="section-chevron ${this._openSections['labels'] ? 'open' : ''}" icon="mdi:chevron-down"></ha-icon>
          </div>
          <div class="section-body ${this._openSections['labels'] ? 'open' : ''}">
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
          </div>
        </div>

        <!-- ─── Sensors (Collapsible) ────────────────────── -->
        <div class="section-collapsible">
          <div class="section-header" @click=${() => this._toggleSection('sensors')}>
            <div class="section-header-left">
              <ha-icon icon="mdi:thermometer"></ha-icon>
              <span class="section-title">Sensors</span>
            </div>
            <ha-icon class="section-chevron ${this._openSections['sensors'] ? 'open' : ''}" icon="mdi:chevron-down"></ha-icon>
          </div>
          <div class="section-body ${this._openSections['sensors'] ? 'open' : ''}">
            <div class="editor-row">
              <ha-entity-picker .hass=${this.hass} label="Temperature Entity"
                .value=${this._config.temperature_entity || ''} .includeDomains=${['sensor']}
                @value-changed=${(e: CustomEvent) => this._set('temperature_entity', e.detail.value)}
                allow-custom-entity></ha-entity-picker>
            </div>
            <div class="editor-row">
              <ha-entity-picker .hass=${this.hass} label="Humidity Entity"
                .value=${this._config.humidity_entity || ''} .includeDomains=${['sensor']}
                @value-changed=${(e: CustomEvent) => this._set('humidity_entity', e.detail.value)}
                allow-custom-entity></ha-entity-picker>
            </div>
          </div>
        </div>

        <!-- ─── Lights (Collapsible) ─────────────────── -->
        <div class="section-collapsible">
          <div class="section-header" @click=${() => this._toggleSection('lights')}>
            <div class="section-header-left">
              <ha-icon icon="mdi:lightbulb-group"></ha-icon>
              <span class="section-title">Lights</span>
            </div>
            <ha-icon class="section-chevron ${this._openSections['lights'] ? 'open' : ''}" icon="mdi:chevron-down"></ha-icon>
          </div>
          <div class="section-body ${this._openSections['lights'] ? 'open' : ''}">
            ${(this._config.light_entities || []).map((entry, i) => html`
              <div class="entity-block">
                <div class="entity-row">
                  <ha-entity-picker .hass=${this.hass} label="Light ${i + 1}" .value=${this._getLightId(entry)}
                    .includeDomains=${['light']}
                    @value-changed=${(e: CustomEvent) => this._lightChanged(i, e.detail.value)}
                    allow-custom-entity></ha-entity-picker>
                  <ha-icon class="remove-btn" icon="mdi:close" @click=${() => this._removeLight(i)}></ha-icon>
                </div>
                <div class="entity-extras">
                  <ha-textfield label="Custom Name" .value=${this._getLightName(entry)}
                    @input=${(e: Event) => this._lightNameChanged(i, (e.target as HTMLInputElement).value)}></ha-textfield>
                  <ha-textfield label="Icon (e.g. mdi:desk-lamp)" .value=${this._getLightIcon(entry)}
                    @input=${(e: Event) => this._lightIconChanged(i, (e.target as HTMLInputElement).value)}></ha-textfield>
                </div>
              </div>
            `)}
            <div class="add-btn" @click=${this._addLight}>+ Add Light Entity</div>

            <!-- Light Scenes -->
            <div class="editor-section" style="margin-top: 12px;">Light Scenes</div>
            ${(this._config.light_scenes || []).map((scene, i) => html`
              <div class="scene-row">
                <ha-textfield label="Name" .value=${scene.name}
                  @input=${(e: Event) => this._sceneChanged(i, 'name', (e.target as HTMLInputElement).value)}></ha-textfield>
                <ha-entity-picker .hass=${this.hass} label="Scene" .value=${scene.entity_id}
                  .includeDomains=${['scene']}
                  @value-changed=${(e: CustomEvent) => this._sceneChanged(i, 'entity_id', e.detail.value)}
                  allow-custom-entity></ha-entity-picker>
                <ha-icon class="remove-btn" icon="mdi:close" @click=${() => this._removeScene(i)}></ha-icon>
              </div>
            `)}
            <div class="add-btn" @click=${this._addScene}>+ Add Scene</div>
          </div>
        </div>

        <!-- ─── Climate (Collapsible) ────────────────── -->
        <div class="section-collapsible">
          <div class="section-header" @click=${() => this._toggleSection('climate')}>
            <div class="section-header-left">
              <ha-icon icon="mdi:thermometer"></ha-icon>
              <span class="section-title">Climate</span>
            </div>
            <ha-icon class="section-chevron ${this._openSections['climate'] ? 'open' : ''}" icon="mdi:chevron-down"></ha-icon>
          </div>
          <div class="section-body ${this._openSections['climate'] ? 'open' : ''}">
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
          </div>
        </div>

        <!-- ─── Media (Collapsible) ──────────────────── -->
        <div class="section-collapsible">
          <div class="section-header" @click=${() => this._toggleSection('media')}>
            <div class="section-header-left">
              <ha-icon icon="mdi:play-circle"></ha-icon>
              <span class="section-title">Media</span>
            </div>
            <ha-icon class="section-chevron ${this._openSections['media'] ? 'open' : ''}" icon="mdi:chevron-down"></ha-icon>
          </div>
          <div class="section-body ${this._openSections['media'] ? 'open' : ''}">
            <div class="toggle-row">
              <span class="editor-label">Show Media</span>
              <ha-switch .checked=${this._config.show_media !== false}
                @change=${(e: Event) => this._set('show_media', (e.target as HTMLInputElement).checked)}>
              </ha-switch>
            </div>
            ${this._config.show_media !== false ? html`
              ${this._getMediaEntities().map((entry, i) => html`
                <div class="entity-block">
                  <div class="entity-row">
                    <ha-entity-picker .hass=${this.hass} label="Player ${i + 1}"
                      .value=${this._getMediaId(entry)} .includeDomains=${['media_player']}
                      @value-changed=${(e: CustomEvent) => this._mediaEntityChanged(i, e.detail.value)}
                      allow-custom-entity></ha-entity-picker>
                    <ha-icon class="remove-btn" icon="mdi:close" @click=${() => this._removeMediaEntity(i)}></ha-icon>
                  </div>
                  <div class="entity-extras">
                    <ha-textfield label="Custom Name" .value=${this._getMediaName(entry)}
                      @input=${(e: Event) => this._mediaNameChanged(i, (e.target as HTMLInputElement).value)}></ha-textfield>
                    <ha-textfield label="Type (speaker / tv)" .value=${this._getMediaType(entry)}
                      @input=${(e: Event) => this._mediaTypeChanged(i, (e.target as HTMLInputElement).value)}></ha-textfield>
                  </div>
                </div>
              `)}
              <div class="add-btn" @click=${this._addMediaEntity}>+ Add Media Player</div>
              <ha-entity-picker .hass=${this.hass} label="Audio Format Sensor"
                .value=${this._config.audio_format_entity || ''} .includeDomains=${['sensor']}
                @value-changed=${(e: CustomEvent) => this._set('audio_format_entity', e.detail.value)}
                allow-custom-entity></ha-entity-picker>
              <ha-textfield label="Music Assistant Config Entry ID (for search)" .value=${this._config.mass_config_entry_id || ''}
                @input=${(e: Event) => this._set('mass_config_entry_id', (e.target as HTMLInputElement).value || undefined)}></ha-textfield>
            ` : ''}
          </div>
        </div>

        <!-- ─── Cleaning (Collapsible) ───────────────── -->
        <div class="section-collapsible">
          <div class="section-header" @click=${() => this._toggleSection('cleaning')}>
            <div class="section-header-left">
              <ha-icon icon="mdi:robot-vacuum"></ha-icon>
              <span class="section-title">Cleaning</span>
            </div>
            <ha-icon class="section-chevron ${this._openSections['cleaning'] ? 'open' : ''}" icon="mdi:chevron-down"></ha-icon>
          </div>
          <div class="section-body ${this._openSections['cleaning'] ? 'open' : ''}">
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
        </div>
      </div>
    `;
  }
}
