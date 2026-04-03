import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LuminaClimateCardConfig, ClimateEntityConfig } from '../types';
import { HomeAssistant } from '../types/ha-types';
import { loadHaElements, fireConfigChanged } from '../utils/editor-helpers';

@customElement('ha-lumina-climate-card-editor')
export class HaLuminaClimateCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: LuminaClimateCardConfig;
  @state() private _haLoaded = false;

  static styles = css`
    :host { display: block; }
    .editor { display: flex; flex-direction: column; gap: 16px; padding: 16px 0; }
    .editor-section { font-size: 1rem; font-weight: 600; color: var(--primary-text-color); margin-top: 8px; padding-bottom: 4px; border-bottom: 1px solid var(--divider-color); }
    .editor-label { font-size: 0.875rem; font-weight: 500; color: var(--primary-text-color); }
    .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
    .entity-block {
      background: var(--card-background-color, #1a1a1d); border-radius: 10px;
      padding: 12px; display: flex; flex-direction: column; gap: 8px;
    }
    .entity-row { display: flex; gap: 8px; align-items: center; }
    .entity-row ha-entity-picker { flex: 1; }
    .remove-btn { cursor: pointer; color: var(--error-color, #db4437); --mdc-icon-size: 20px; }
    .add-btn {
      cursor: pointer; color: var(--primary-color); font-size: 0.875rem;
      font-weight: 500; padding: 8px; display: flex; align-items: center; gap: 4px;
    }
    .loading { padding: 24px; text-align: center; color: var(--secondary-text-color); }
  `;

  public setConfig(config: LuminaClimateCardConfig): void { this._config = { ...config }; }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await loadHaElements();
    this._haLoaded = true;
  }

  private _dispatch(): void { fireConfigChanged(this, this._config); }
  private _set(field: string, value: unknown): void {
    this._config = { ...this._config, [field]: value }; this._dispatch();
  }

  // ─── Entity Helpers ─────────────────────────────────

  private _getEntities(): ClimateEntityConfig[] {
    if (this._config.entities?.length) {
      return this._config.entities.map(e => typeof e === 'string' ? { entity: e } : { ...e });
    }
    if (this._config.entity) return [{ entity: this._config.entity }];
    return [];
  }

  private _setEntities(entities: ClimateEntityConfig[]): void {
    const c = { ...this._config, entities } as Record<string, unknown>;
    delete c.entity; // Always use entities[], clear legacy
    this._config = c as LuminaClimateCardConfig;
    this._dispatch();
  }

  private _entityChanged(i: number, v: string): void {
    const e = [...this._getEntities()];
    e[i] = { ...e[i], entity: v };
    this._setEntities(e);
  }

  private _entityNameChanged(i: number, v: string): void {
    const e = [...this._getEntities()];
    e[i] = { ...e[i], name: v || undefined };
    this._setEntities(e);
  }

  private _addEntity(): void {
    const e = [...this._getEntities()];
    e.push({ entity: '' });
    this._setEntities(e);
  }

  private _removeEntity(i: number): void {
    const e = [...this._getEntities()];
    e.splice(i, 1);
    this._setEntities(e);
  }

  protected render() {
    if (!this._config || !this.hass) return html``;
    if (!this._haLoaded) return html`<div class="loading">Loading editor...</div>`;

    return html`
      <div class="editor">
        <div class="editor-section">Climate Entities</div>

        ${this._getEntities().map((entry, i) => html`
          <div class="entity-block">
            <div class="entity-row">
              <ha-entity-picker .hass=${this.hass} label="Climate ${i + 1}"
                .value=${entry.entity} .includeDomains=${['climate']}
                @value-changed=${(e: CustomEvent) => this._entityChanged(i, e.detail.value)}
                allow-custom-entity></ha-entity-picker>
              <ha-icon class="remove-btn" icon="mdi:close" @click=${() => this._removeEntity(i)}></ha-icon>
            </div>
            <ha-textfield label="Custom Name" .value=${entry.name || ''}
              @input=${(e: Event) => this._entityNameChanged(i, (e.target as HTMLInputElement).value)}></ha-textfield>
          </div>
        `)}

        <div class="add-btn" @click=${this._addEntity}>+ Add Climate Entity</div>

        <div class="editor-section">Options</div>
        <div class="toggle-row">
          <span class="editor-label">Show Humidity</span>
          <ha-switch .checked=${this._config.show_humidity !== false}
            @change=${(e: Event) => this._set('show_humidity', (e.target as HTMLInputElement).checked)}></ha-switch>
        </div>
        <div class="toggle-row">
          <span class="editor-label">Show Fan Speed</span>
          <ha-switch .checked=${this._config.show_fan_speed !== false}
            @change=${(e: Event) => this._set('show_fan_speed', (e.target as HTMLInputElement).checked)}></ha-switch>
        </div>
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
