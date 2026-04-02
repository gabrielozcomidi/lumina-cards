import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LuminaBottomBarConfig, BottomBarItem, BottomBarAction, BottomBarActionType } from '../types';
import { HomeAssistant } from '../types/ha-types';
import { loadHaElements, fireConfigChanged } from '../utils/editor-helpers';

const MAX_ITEMS = 5;
const ACTION_TYPES: { value: BottomBarActionType; label: string }[] = [
  { value: 'navigate', label: 'Navigate' },
  { value: 'toggle', label: 'Toggle Entity' },
  { value: 'call-service', label: 'Call Service' },
  { value: 'more-info', label: 'More Info' },
  { value: 'url', label: 'Open URL' },
  { value: 'none', label: 'None' },
];

function defaultAction(): BottomBarAction {
  return { action: 'navigate', navigation_path: '/lovelace/0' };
}

@customElement('ha-lumina-bottom-bar-editor')
export class HaLuminaBottomBarEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: LuminaBottomBarConfig;
  @state() private _haLoaded = false;
  @state() private _openSections: Record<string, boolean> = {};

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

    /* ─── Collapsible Section ───────────────────── */
    .section-collapsible {
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      overflow: hidden;
    }
    .section-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 14px; cursor: pointer; user-select: none;
      background: var(--card-background-color, #1a1a1d);
      transition: background 0.2s;
    }
    .section-header:hover { background: var(--secondary-background-color, #222); }
    .section-header-left { display: flex; align-items: center; gap: 10px; }
    .section-header-left ha-icon { --mdc-icon-size: 20px; color: var(--primary-color); }
    .section-title { font-size: 0.9375rem; font-weight: 600; color: var(--primary-text-color); }
    .section-chevron {
      --mdc-icon-size: 20px; color: var(--secondary-text-color);
      transition: transform 0.25s ease;
    }
    .section-chevron.open { transform: rotate(180deg); }
    .section-body {
      max-height: 0; overflow: hidden;
      transition: max-height 0.3s ease, padding 0.3s ease;
      padding: 0 14px;
    }
    .section-body.open { max-height: 3000px; padding: 12px 14px 16px; }

    /* ─── Item Block ─────────────────────────────── */
    .item-block {
      background: var(--card-background-color, #1a1a1d);
      border-radius: 10px; padding: 12px;
      display: flex; flex-direction: column; gap: 8px;
    }
    .item-header { display: flex; align-items: center; justify-content: space-between; }
    .item-header-left { display: flex; align-items: center; gap: 8px; }
    .item-number {
      font-size: 0.75rem; font-weight: 700; color: var(--primary-color);
      background: rgba(133, 173, 255, 0.1); border-radius: 6px; padding: 2px 8px;
    }
    .hero-tag {
      font-size: 0.625rem; font-weight: 700; color: var(--accent-color, #fecb00);
      background: rgba(254, 203, 0, 0.12); border-radius: 6px; padding: 2px 6px;
      text-transform: uppercase; letter-spacing: 0.04em;
    }
    .item-label-preview { font-size: 0.8125rem; font-weight: 600; color: var(--primary-text-color); }
    .item-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .item-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }

    /* ─── Action Sub-section ──────────────────────── */
    .action-section {
      background: var(--secondary-background-color, rgba(255,255,255,0.04));
      border-radius: 8px; padding: 10px; margin-top: 4px;
      display: flex; flex-direction: column; gap: 8px;
    }
    .action-title {
      font-size: 0.75rem; font-weight: 600; color: var(--secondary-text-color);
      text-transform: uppercase; letter-spacing: 0.05em;
    }

    /* ─── Reorder & Remove ───────────────────────── */
    .item-actions { display: flex; gap: 4px; align-items: center; }
    .action-btn {
      cursor: pointer; --mdc-icon-size: 20px;
      color: var(--secondary-text-color); transition: color 0.15s;
    }
    .action-btn:hover { color: var(--primary-text-color); }
    .remove-btn { cursor: pointer; color: var(--error-color, #db4437); --mdc-icon-size: 20px; }

    .add-btn {
      cursor: pointer; color: var(--primary-color); font-size: 0.875rem;
      font-weight: 500; padding: 8px; display: flex; align-items: center; gap: 4px;
    }
    .add-btn.disabled { opacity: 0.4; pointer-events: none; }
    .max-note { font-size: 0.6875rem; color: var(--secondary-text-color); }
    .loading { padding: 24px; text-align: center; color: var(--secondary-text-color); }

    ha-select { width: 100%; }
  `;

  public setConfig(config: LuminaBottomBarConfig): void {
    this._config = { ...config };
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await loadHaElements();
    this._haLoaded = true;
  }

  private _dispatch(): void { fireConfigChanged(this, this._config); }

  private _set(field: string, value: unknown): void {
    this._config = { ...this._config, [field]: value };
    this._dispatch();
  }

  private _toggleSection(key: string): void {
    this._openSections = { ...this._openSections, [key]: !this._openSections[key] };
  }

  // ─── Item CRUD ──────────────────────────────────────────

  private _updateItem(index: number, field: string, value: unknown): void {
    const items = [...(this._config.items || [])];
    items[index] = { ...items[index], [field]: value === '' ? undefined : value };
    if (field === 'icon' || field === 'label') {
      items[index][field as 'icon' | 'label'] = (value as string) || '';
    }
    this._set('items', items);
  }

  private _updateAction(index: number, actionField: 'tap_action' | 'hold_action', field: string, value: unknown): void {
    const items = [...(this._config.items || [])];
    const currentAction = items[index][actionField] || defaultAction();
    const updated = { ...currentAction, [field]: value === '' ? undefined : value };

    // When action type changes, clear irrelevant fields
    if (field === 'action') {
      delete updated.navigation_path;
      delete updated.entity;
      delete updated.service;
      delete updated.service_data;
      delete updated.url;
    }

    items[index] = { ...items[index], [actionField]: updated };
    this._set('items', items);
  }

  private _addItem(): void {
    const items = [...(this._config.items || [])];
    if (items.length >= MAX_ITEMS) return;
    items.push({ icon: 'mdi:circle', label: 'New', tap_action: defaultAction() });
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

  // ─── Render Action Editor ────────────────────────────────

  private _renderActionEditor(
    itemIndex: number,
    actionField: 'tap_action' | 'hold_action',
    label: string,
    action: BottomBarAction | undefined,
  ) {
    const act = action || (actionField === 'tap_action' ? defaultAction() : { action: 'none' as BottomBarActionType });

    return html`
      <div class="action-section">
        <span class="action-title">${label}</span>
        <ha-select
          label="Action"
          .value=${act.action}
          @selected=${(e: CustomEvent) => {
            const val = (e.target as any).value;
            if (val) this._updateAction(itemIndex, actionField, 'action', val);
          }}
          fixedMenuPosition
          naturalMenuWidth
        >
          ${ACTION_TYPES.map((t) => html`
            <mwc-list-item .value=${t.value}>${t.label}</mwc-list-item>
          `)}
        </ha-select>

        ${act.action === 'navigate' ? html`
          <ha-textfield label="Path (e.g. /lovelace/rooms)"
            .value=${act.navigation_path || ''}
            @input=${(e: Event) => this._updateAction(itemIndex, actionField, 'navigation_path', (e.target as HTMLInputElement).value)}
          ></ha-textfield>
        ` : nothing}

        ${act.action === 'toggle' || act.action === 'more-info' ? html`
          <ha-entity-picker .hass=${this.hass} label="Entity"
            .value=${act.entity || ''}
            @value-changed=${(e: CustomEvent) => this._updateAction(itemIndex, actionField, 'entity', e.detail.value)}
            allow-custom-entity
          ></ha-entity-picker>
        ` : nothing}

        ${act.action === 'call-service' ? html`
          <ha-textfield label="Service (e.g. light.turn_off)"
            .value=${act.service || ''}
            @input=${(e: Event) => this._updateAction(itemIndex, actionField, 'service', (e.target as HTMLInputElement).value)}
          ></ha-textfield>
          <ha-entity-picker .hass=${this.hass} label="Target Entity (optional)"
            .value=${(act.service_data as any)?.entity_id || ''}
            @value-changed=${(e: CustomEvent) => this._updateAction(itemIndex, actionField, 'service_data', e.detail.value ? { entity_id: e.detail.value } : undefined)}
            allow-custom-entity
          ></ha-entity-picker>
        ` : nothing}

        ${act.action === 'url' ? html`
          <ha-textfield label="URL"
            .value=${act.url || ''}
            @input=${(e: Event) => this._updateAction(itemIndex, actionField, 'url', (e.target as HTMLInputElement).value)}
          ></ha-textfield>
        ` : nothing}

        ${act.action !== 'none' && act.action !== 'navigate' ? html`
          <div class="toggle-row">
            <span class="editor-label">Require Confirmation</span>
            <ha-switch .checked=${act.confirmation === true}
              @change=${(e: Event) => this._updateAction(itemIndex, actionField, 'confirmation', (e.target as HTMLInputElement).checked)}
            ></ha-switch>
          </div>
        ` : nothing}
      </div>
    `;
  }

  // ─── Render ─────────────────────────────────────────────

  protected render() {
    if (!this._config || !this.hass) return html``;
    if (!this._haLoaded) return html`<div class="loading">Loading editor...</div>`;

    const items = this._config.items || [];
    const atMax = items.length >= MAX_ITEMS;

    return html`
      <div class="editor">
        <!-- ─── Appearance ──────────────────────────── -->
        <div class="section-collapsible">
          <div class="section-header" @click=${() => this._toggleSection('appearance')}>
            <div class="section-header-left">
              <ha-icon icon="mdi:palette-outline"></ha-icon>
              <span class="section-title">Appearance</span>
            </div>
            <ha-icon class="section-chevron ${this._openSections['appearance'] ? 'open' : ''}" icon="mdi:chevron-down"></ha-icon>
          </div>
          <div class="section-body ${this._openSections['appearance'] ? 'open' : ''}">
            <div class="toggle-row">
              <span class="editor-label">Floating Style</span>
              <ha-switch .checked=${this._config.floating === true}
                @change=${(e: Event) => this._set('floating', (e.target as HTMLInputElement).checked)}
              ></ha-switch>
            </div>
            <div class="editor-row">
              <ha-textfield label="Active Color (e.g. #85adff)"
                .value=${this._config.active_color || ''}
                @input=${(e: Event) => this._set('active_color', (e.target as HTMLInputElement).value || undefined)}
              ></ha-textfield>
            </div>
          </div>
        </div>

        <!-- ─── Navigation Items ───────────────────── -->
        <div class="editor-section">Navigation Items</div>
        <div class="editor-sublabel">
          Add up to ${MAX_ITEMS} shortcuts. Each can navigate, toggle entities, call services, or open more-info.
        </div>

        ${items.map((item, i) => this._renderItemEditor(item, i))}

        <div class="add-btn ${atMax ? 'disabled' : ''}" @click=${this._addItem}>
          + Add Item ${atMax ? html`<span class="max-note">(max ${MAX_ITEMS})</span>` : nothing}
        </div>
      </div>
    `;
  }

  private _renderItemEditor(item: BottomBarItem, i: number) {
    return html`
      <div class="section-collapsible">
        <div class="section-header" @click=${() => this._toggleSection(`item_${i}`)}>
          <div class="section-header-left">
            <span class="item-number">${i + 1}</span>
            <ha-icon icon="${item.icon || 'mdi:circle'}" style="--mdc-icon-size: 18px;"></ha-icon>
            <span class="section-title">${item.label || 'Unnamed'}</span>
            ${item.hero ? html`<span class="hero-tag">Hero</span>` : nothing}
          </div>
          <div class="item-actions">
            <ha-icon class="action-btn" icon="mdi:arrow-up" @click=${(e: Event) => { e.stopPropagation(); this._moveItem(i, -1); }}></ha-icon>
            <ha-icon class="action-btn" icon="mdi:arrow-down" @click=${(e: Event) => { e.stopPropagation(); this._moveItem(i, 1); }}></ha-icon>
            <ha-icon class="remove-btn" icon="mdi:close" @click=${(e: Event) => { e.stopPropagation(); this._removeItem(i); }}></ha-icon>
            <ha-icon class="section-chevron ${this._openSections[`item_${i}`] ? 'open' : ''}" icon="mdi:chevron-down"></ha-icon>
          </div>
        </div>
        <div class="section-body ${this._openSections[`item_${i}`] ? 'open' : ''}">
          <!-- Basic -->
          <div class="item-grid">
            <ha-textfield label="Icon (mdi:...)" .value=${item.icon || ''}
              @input=${(e: Event) => this._updateItem(i, 'icon', (e.target as HTMLInputElement).value)}
            ></ha-textfield>
            <ha-textfield label="Label" .value=${item.label || ''}
              @input=${(e: Event) => this._updateItem(i, 'label', (e.target as HTMLInputElement).value)}
            ></ha-textfield>
          </div>

          <!-- Hero toggle -->
          <div class="toggle-row">
            <span class="editor-label">Hero Button (large, accent)</span>
            <ha-switch .checked=${item.hero === true}
              @change=${(e: Event) => this._updateItem(i, 'hero', (e.target as HTMLInputElement).checked || undefined)}
            ></ha-switch>
          </div>

          <!-- Tap Action -->
          ${this._renderActionEditor(i, 'tap_action', 'Tap Action', item.tap_action)}

          <!-- Hold Action -->
          ${this._renderActionEditor(i, 'hold_action', 'Hold Action (long press)', item.hold_action)}

          <!-- State Entity -->
          <div class="action-section">
            <span class="action-title">State-Aware Icon</span>
            <div class="editor-sublabel">Link to an entity to change icon color and icon based on state</div>
            <ha-entity-picker .hass=${this.hass} label="State Entity"
              .value=${item.state_entity || ''}
              @value-changed=${(e: CustomEvent) => this._updateItem(i, 'state_entity', e.detail.value)}
              allow-custom-entity
            ></ha-entity-picker>
            ${item.state_entity ? html`
              <div class="item-grid">
                <ha-textfield label="Icon when On" .value=${item.icon_on || ''}
                  @input=${(e: Event) => this._updateItem(i, 'icon_on', (e.target as HTMLInputElement).value)}
                ></ha-textfield>
                <ha-textfield label="Icon when Off" .value=${item.icon_off || ''}
                  @input=${(e: Event) => this._updateItem(i, 'icon_off', (e.target as HTMLInputElement).value)}
                ></ha-textfield>
              </div>
            ` : nothing}
          </div>

          <!-- Notification -->
          <div class="action-section">
            <span class="action-title">Notification Badge</span>
            <div class="item-grid">
              <ha-entity-picker .hass=${this.hass} label="Badge Entity"
                .value=${item.notification_entity || ''}
                @value-changed=${(e: CustomEvent) => this._updateItem(i, 'notification_entity', e.detail.value)}
                allow-custom-entity
              ></ha-entity-picker>
              <ha-textfield label="Glow Color" .value=${item.glow_color || ''}
                @input=${(e: Event) => this._updateItem(i, 'glow_color', (e.target as HTMLInputElement).value)}
              ></ha-textfield>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
