import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LuminaBottomBarConfig, BottomBarItem } from '../types';
import { HomeAssistant } from '../types/ha-types';
import { loadHaElements, fireConfigChanged } from '../utils/editor-helpers';

@customElement('ha-lumina-bottom-bar-editor')
export class HaLuminaBottomBarEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: LuminaBottomBarConfig;
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
    .editor-sublabel { font-size: 0.75rem; color: var(--secondary-text-color); margin-bottom: 4px; }

    .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }

    /* ─── Item Block ─────────────────────────────── */
    .item-block {
      background: var(--card-background-color, #1a1a1d);
      border-radius: 10px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .item-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .item-header-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .item-number {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--primary-color);
      background: rgba(133, 173, 255, 0.1);
      border-radius: 6px;
      padding: 2px 8px;
    }
    .item-label-preview {
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .item-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

    /* ─── Reorder & Remove ───────────────────────── */
    .item-actions { display: flex; gap: 4px; align-items: center; }
    .action-btn {
      cursor: pointer;
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
      transition: color 0.15s;
    }
    .action-btn:hover { color: var(--primary-text-color); }
    .remove-btn { cursor: pointer; color: var(--error-color, #db4437); --mdc-icon-size: 20px; }

    .add-btn {
      cursor: pointer; color: var(--primary-color); font-size: 0.875rem;
      font-weight: 500; padding: 8px; display: flex; align-items: center; gap: 4px;
    }
    .loading { padding: 24px; text-align: center; color: var(--secondary-text-color); }
  `;

  public setConfig(config: LuminaBottomBarConfig): void {
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

  // ─── Item CRUD ──────────────────────────────────────────

  private _updateItem(index: number, field: keyof BottomBarItem, value: string): void {
    const items = [...(this._config.items || [])];
    items[index] = { ...items[index], [field]: value || undefined };
    // icon, label, path are required — keep them as empty string rather than undefined
    if (field === 'icon' || field === 'label' || field === 'path') {
      items[index][field] = value;
    }
    this._set('items', items);
  }

  private _addItem(): void {
    const items = [...(this._config.items || [])];
    items.push({ icon: 'mdi:circle', label: 'New', path: '/lovelace/0' });
    this._set('items', items);
  }

  private _removeItem(index: number): void {
    const items = [...(this._config.items || [])];
    items.splice(index, 1);
    this._set('items', items);
  }

  private _moveItem(index: number, direction: -1 | 1): void {
    const items = [...(this._config.items || [])];
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    [items[index], items[target]] = [items[target], items[index]];
    this._set('items', items);
  }

  // ─── Render ─────────────────────────────────────────────

  protected render() {
    if (!this._config || !this.hass) return html``;
    if (!this._haLoaded) return html`<div class="loading">Loading editor...</div>`;

    return html`
      <div class="editor">
        <!-- ─── Global Options ─────────────────────── -->
        <div class="editor-section">Appearance</div>

        <div class="toggle-row">
          <span class="editor-label">Floating Style</span>
          <ha-switch
            .checked=${this._config.floating === true}
            @change=${(e: Event) => this._set('floating', (e.target as HTMLInputElement).checked)}
          ></ha-switch>
        </div>

        <div class="editor-row">
          <ha-textfield
            label="Active Color (e.g. #85adff)"
            .value=${this._config.active_color || ''}
            @input=${(e: Event) => this._set('active_color', (e.target as HTMLInputElement).value || undefined)}
          ></ha-textfield>
        </div>

        <!-- ─── Navigation Items ───────────────────── -->
        <div class="editor-section">Navigation Items</div>
        <div class="editor-sublabel">Add shortcuts to your dashboard views. Each item needs an icon, label, and path.</div>

        ${(this._config.items || []).map((item, i) => html`
          <div class="item-block">
            <div class="item-header">
              <div class="item-header-left">
                <span class="item-number">${i + 1}</span>
                <span class="item-label-preview">${item.label || 'Unnamed'}</span>
              </div>
              <div class="item-actions">
                <ha-icon class="action-btn" icon="mdi:arrow-up" @click=${() => this._moveItem(i, -1)}></ha-icon>
                <ha-icon class="action-btn" icon="mdi:arrow-down" @click=${() => this._moveItem(i, 1)}></ha-icon>
                <ha-icon class="remove-btn" icon="mdi:close" @click=${() => this._removeItem(i)}></ha-icon>
              </div>
            </div>
            <div class="item-grid">
              <ha-textfield
                label="Icon (mdi:...)"
                .value=${item.icon || ''}
                @input=${(e: Event) => this._updateItem(i, 'icon', (e.target as HTMLInputElement).value)}
              ></ha-textfield>
              <ha-textfield
                label="Label"
                .value=${item.label || ''}
                @input=${(e: Event) => this._updateItem(i, 'label', (e.target as HTMLInputElement).value)}
              ></ha-textfield>
            </div>
            <ha-textfield
              label="Path (e.g. /lovelace/rooms)"
              .value=${item.path || ''}
              @input=${(e: Event) => this._updateItem(i, 'path', (e.target as HTMLInputElement).value)}
            ></ha-textfield>
            <div class="item-grid">
              <ha-entity-picker
                .hass=${this.hass}
                label="Notification Entity"
                .value=${item.notification_entity || ''}
                @value-changed=${(e: CustomEvent) => this._updateItem(i, 'notification_entity', e.detail.value)}
                allow-custom-entity
              ></ha-entity-picker>
              <ha-textfield
                label="Glow Color"
                .value=${item.glow_color || ''}
                @input=${(e: Event) => this._updateItem(i, 'glow_color', (e.target as HTMLInputElement).value)}
              ></ha-textfield>
            </div>
          </div>
        `)}

        <div class="add-btn" @click=${this._addItem}>+ Add Navigation Item</div>
      </div>
    `;
  }
}
