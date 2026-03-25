import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LuminaLightCardConfig, SceneConfig } from '../types';
import { HomeAssistant } from '../types/ha-types';
import { loadHaElements, fireConfigChanged } from '../utils/editor-helpers';

@customElement('ha-lumina-light-card-editor')
export class HaLuminaLightCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: LuminaLightCardConfig;
  @state() private _haLoaded = false;

  static styles = css`
    :host { display: block; }
    .editor { display: flex; flex-direction: column; gap: 16px; padding: 16px 0; }
    .editor-section { font-size: 1rem; font-weight: 600; color: var(--primary-text-color); margin-top: 8px; padding-bottom: 4px; border-bottom: 1px solid var(--divider-color); }
    .entity-row { display: flex; gap: 8px; align-items: center; }
    .entity-row ha-entity-picker { flex: 1; }
    .remove-btn { cursor: pointer; color: var(--error-color, #db4437); --mdc-icon-size: 20px; }
    .add-btn { cursor: pointer; color: var(--primary-color); font-size: 0.875rem; font-weight: 500; padding: 8px; }
    .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
    .toggle-label { font-size: 0.875rem; font-weight: 500; }
    .scene-row { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
    .scene-row ha-textfield, .scene-row ha-entity-picker { flex: 1; }
    .loading { padding: 24px; text-align: center; color: var(--secondary-text-color); }
  `;

  public setConfig(config: LuminaLightCardConfig): void { this._config = { ...config }; }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await loadHaElements();
    this._haLoaded = true;
  }

  private _dispatch(): void { fireConfigChanged(this, this._config); }

  private _set(field: string, value: unknown): void {
    this._config = { ...this._config, [field]: value }; this._dispatch();
  }

  private _entityChanged(i: number, v: string): void {
    const e = [...(this._config.entities || [])]; e[i] = v; this._set('entities', e);
  }
  private _addEntity(): void { this._set('entities', [...(this._config.entities || []), '']); }
  private _removeEntity(i: number): void {
    const e = [...(this._config.entities || [])]; e.splice(i, 1); this._set('entities', e);
  }

  private _addScene(): void {
    this._set('scenes', [...(this._config.scenes || []), { name: '', icon: 'mdi:palette', entity_id: '' }]);
  }
  private _removeScene(i: number): void {
    const s = [...(this._config.scenes || [])]; s.splice(i, 1); this._set('scenes', s);
  }
  private _sceneChanged(i: number, field: keyof SceneConfig, v: string): void {
    const s = [...(this._config.scenes || [])]; s[i] = { ...s[i], [field]: v }; this._set('scenes', s);
  }

  protected render() {
    if (!this._config || !this.hass) return html``;
    if (!this._haLoaded) return html`<div class="loading">Loading editor...</div>`;

    return html`
      <div class="editor">
        <div class="editor-section">Light Entities</div>
        ${(this._config.entities || []).map((id, i) => html`
          <div class="entity-row">
            <ha-entity-picker .hass=${this.hass} label="Light ${i + 1}" .value=${id}
              .includeDomains=${['light']}
              @value-changed=${(e: CustomEvent) => this._entityChanged(i, e.detail.value)}
              allow-custom-entity></ha-entity-picker>
            <ha-icon class="remove-btn" icon="mdi:close" @click=${() => this._removeEntity(i)}></ha-icon>
          </div>
        `)}
        <div class="add-btn" @click=${this._addEntity}>+ Add Light</div>

        <div class="editor-section">Options</div>
        <div class="toggle-row">
          <span class="toggle-label">Show Color Temperature</span>
          <ha-switch .checked=${this._config.show_color_temp !== false}
            @change=${(e: Event) => this._set('show_color_temp', (e.target as HTMLInputElement).checked)}></ha-switch>
        </div>
        <div class="toggle-row">
          <span class="toggle-label">Show Individual Controls</span>
          <ha-switch .checked=${this._config.show_individual_controls !== false}
            @change=${(e: Event) => this._set('show_individual_controls', (e.target as HTMLInputElement).checked)}></ha-switch>
        </div>

        <div class="editor-section">Scenes</div>
        ${(this._config.scenes || []).map((scene, i) => html`
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
    `;
  }
}
