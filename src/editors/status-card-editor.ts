import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LuminaStatusCardConfig, StatusChipConfig, SummaryItemConfig } from '../types';
import { HomeAssistant } from '../types/ha-types';
import { loadHaElements, fireConfigChanged } from '../utils/editor-helpers';

@customElement('ha-lumina-status-card-editor')
export class HaLuminaStatusCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: LuminaStatusCardConfig;
  @state() private _haLoaded = false;
  @state() private _openSections: Record<string, boolean> = { greeting: true };

  static styles = css`
    :host { display: block; }
    .editor { display: flex; flex-direction: column; gap: 12px; padding: 16px 0; }
    .editor-row { display: flex; flex-direction: column; gap: 4px; }
    .editor-label { font-size: 0.875rem; font-weight: 500; color: var(--primary-text-color); }
    .editor-hint { font-size: 0.75rem; color: var(--secondary-text-color); }
    .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
    .entity-row { display: flex; gap: 8px; align-items: center; }
    .entity-row ha-entity-picker { flex: 1; }
    .entity-block {
      background: var(--card-background-color, #1a1a1d); border-radius: 10px;
      padding: 12px; display: flex; flex-direction: column; gap: 8px;
    }
    .entity-extras { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .remove-btn { cursor: pointer; color: var(--error-color, #db4437); --mdc-icon-size: 20px; }
    .add-btn {
      cursor: pointer; color: var(--primary-color); font-size: 0.875rem;
      font-weight: 500; padding: 8px; display: flex; align-items: center; gap: 4px;
    }
    .loading { padding: 24px; text-align: center; color: var(--secondary-text-color); }

    /* ─── Collapsible Sections ──────────────────────── */
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
  `;

  public setConfig(config: LuminaStatusCardConfig): void {
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

  // ─── CRUD helpers ─────────────────────────────────

  private _addPerson(): void { this._set('person_entities', [...(this._config.person_entities || []), '']); }
  private _removePerson(i: number): void { const p = [...(this._config.person_entities || [])]; p.splice(i, 1); this._set('person_entities', p); }
  private _personChanged(i: number, v: string): void { const p = [...(this._config.person_entities || [])]; p[i] = v; this._set('person_entities', p); }

  private _addLight(): void { this._set('light_entities', [...(this._config.light_entities || []), '']); }
  private _removeLight(i: number): void { const l = [...(this._config.light_entities || [])]; l.splice(i, 1); this._set('light_entities', l); }
  private _lightChanged(i: number, v: string): void { const l = [...(this._config.light_entities || [])]; l[i] = v; this._set('light_entities', l); }

  private _addStock(): void { this._set('stock_entities', [...(this._config.stock_entities || []), '']); }
  private _removeStock(i: number): void { const s = [...(this._config.stock_entities || [])]; s.splice(i, 1); this._set('stock_entities', s); }
  private _stockChanged(i: number, v: string): void { const s = [...(this._config.stock_entities || [])]; s[i] = v; this._set('stock_entities', s); }

  private _addRssFeed(): void { this._set('rss_feeds', [...(this._config.rss_feeds || []), { entity: '' }]); }
  private _removeRssFeed(i: number): void { const f = [...(this._config.rss_feeds || [])]; f.splice(i, 1); this._set('rss_feeds', f); }
  private _rssFeedChanged(i: number, field: string, v: string): void {
    const f = [...(this._config.rss_feeds || [])]; f[i] = { ...f[i], [field]: v || undefined }; if (field === 'entity') f[i].entity = v; this._set('rss_feeds', f);
  }

  private _addChip(): void { this._set('chips', [...(this._config.chips || []), { entity: '' }]); }
  private _removeChip(i: number): void { const c = [...(this._config.chips || [])]; c.splice(i, 1); this._set('chips', c); }
  private _chipChanged(i: number, field: keyof StatusChipConfig, v: string): void {
    const c = [...(this._config.chips || [])]; c[i] = { ...c[i], [field]: v || undefined }; if (field === 'entity') c[i].entity = v; this._set('chips', c);
  }

  // ─── Summary item helpers ─────────────────────────
  private _addSummaryItem(): void { this._set('summary_items', [...(this._config.summary_items || []), { entity: '', show_state: true }]); }
  private _removeSummaryItem(i: number): void { const s = [...(this._config.summary_items || [])]; s.splice(i, 1); this._set('summary_items', s); }
  private _summaryItemChanged(i: number, field: string, v: unknown): void {
    const s = [...(this._config.summary_items || [])];
    s[i] = { ...s[i], [field]: v === '' ? undefined : v };
    if (field === 'entity') s[i].entity = v as string;
    this._set('summary_items', s);
  }

  // ─── Render ───────────────────────────────────────

  protected render() {
    if (!this._config || !this.hass) return html``;
    if (!this._haLoaded) return html`<div class="loading">Loading editor...</div>`;

    return html`
      <div class="editor">

        <!-- ═══ Greeting ═══ -->
        ${this._renderSection('greeting', 'mdi:hand-wave', 'Greeting', html`
          <div class="toggle-row">
            <span class="editor-label">Show Greeting</span>
            <ha-switch .checked=${this._config.show_greeting !== false}
              @change=${(e: Event) => this._set('show_greeting', (e.target as HTMLInputElement).checked)}></ha-switch>
          </div>
          <div class="toggle-row">
            <span class="editor-label">Show Clock</span>
            <ha-switch .checked=${this._config.show_clock === true}
              @change=${(e: Event) => this._set('show_clock', (e.target as HTMLInputElement).checked || undefined)}></ha-switch>
          </div>
          <div class="editor-row">
            <ha-textfield label="Display Name (optional)" .value=${this._config.name || ''}
              @input=${(e: Event) => this._set('name', (e.target as HTMLInputElement).value || undefined)}></ha-textfield>
            <span class="editor-hint">Leave empty to auto-detect from HA user</span>
          </div>
        `)}

        <!-- ═══ People ═══ -->
        ${this._renderSection('people', 'mdi:account-group', 'People Tracking', html`
          ${(this._config.person_entities || []).map((id, i) => html`
            <div class="entity-row">
              <ha-entity-picker .hass=${this.hass} label="Person ${i + 1}" .value=${id} .includeDomains=${['person']}
                @value-changed=${(e: CustomEvent) => this._personChanged(i, e.detail.value)} allow-custom-entity></ha-entity-picker>
              <ha-icon class="remove-btn" icon="mdi:close" @click=${() => this._removePerson(i)}></ha-icon>
            </div>
          `)}
          <div class="add-btn" @click=${this._addPerson}>+ Add Person</div>
        `)}

        <!-- ═══ Data Sources ═══ -->
        ${this._renderSection('data', 'mdi:database', 'Data Sources', html`
          <div class="editor-row">
            <ha-entity-picker .hass=${this.hass} label="Weather Entity" .value=${this._config.weather_entity || ''}
              .includeDomains=${['weather']} @value-changed=${(e: CustomEvent) => this._set('weather_entity', e.detail.value)} allow-custom-entity></ha-entity-picker>
          </div>
          <div class="editor-row">
            <ha-entity-picker .hass=${this.hass} label="Alarm Entity" .value=${this._config.alarm_entity || ''}
              .includeDomains=${['alarm_control_panel']} @value-changed=${(e: CustomEvent) => this._set('alarm_entity', e.detail.value)} allow-custom-entity></ha-entity-picker>
          </div>
          <div class="editor-row">
            <ha-entity-picker .hass=${this.hass} label="Energy Sensor" .value=${this._config.energy_entity || ''}
              .includeDomains=${['sensor']} @value-changed=${(e: CustomEvent) => this._set('energy_entity', e.detail.value)} allow-custom-entity></ha-entity-picker>
          </div>
          <div class="toggle-row">
            <span class="editor-label">Show Lights Summary</span>
            <ha-switch .checked=${this._config.show_lights_summary !== false}
              @change=${(e: Event) => this._set('show_lights_summary', (e.target as HTMLInputElement).checked)}></ha-switch>
          </div>
          ${this._config.show_lights_summary !== false ? html`
            <span class="editor-hint">Choose which lights to count (leave empty to count all)</span>
            ${(this._config.light_entities || []).map((id: string, i: number) => html`
              <div class="entity-row">
                <ha-entity-picker .hass=${this.hass} label="Light ${i + 1}" .value=${id} .includeDomains=${['light']}
                  @value-changed=${(e: CustomEvent) => this._lightChanged(i, e.detail.value)} allow-custom-entity></ha-entity-picker>
                <ha-icon class="remove-btn" icon="mdi:close" @click=${() => this._removeLight(i)}></ha-icon>
              </div>
            `)}
            <div class="add-btn" @click=${this._addLight}>+ Add Light</div>
          ` : nothing}
          <div class="toggle-row">
            <span class="editor-label">Fade Between Status Chips</span>
            <ha-switch .checked=${this._config.chips_fade === true}
              @change=${(e: Event) => this._set('chips_fade', (e.target as HTMLInputElement).checked || undefined)}></ha-switch>
          </div>
          ${this._config.chips_fade ? html`
            <div class="editor-row">
              <ha-textfield label="Chip Fade Speed (seconds)" type="number" min="2" max="30"
                .value=${String(this._config.chips_speed || 4)}
                @input=${(e: Event) => { const v = parseInt((e.target as HTMLInputElement).value); if (v > 0) this._set('chips_speed', v); }}></ha-textfield>
              <span class="editor-hint">Seconds per chip. Default: 4</span>
            </div>
          ` : nothing}
        `)}

        <!-- ═══ Summary Rotator ═══ -->
        ${this._renderSection('summary', 'mdi:rotate-3d-variant', 'Summary Rotator', html`
          <span class="editor-hint">Add entities to cycle through with fade animation. Choose what info each one shows.</span>
          ${(this._config.summary_items || []).map((item: SummaryItemConfig, i: number) => html`
            <div class="entity-block">
              <div class="entity-row">
                <ha-entity-picker .hass=${this.hass} label="Entity ${i + 1}" .value=${item.entity || ''}
                  @value-changed=${(e: CustomEvent) => this._summaryItemChanged(i, 'entity', e.detail.value)} allow-custom-entity></ha-entity-picker>
                <ha-icon class="remove-btn" icon="mdi:close" @click=${() => this._removeSummaryItem(i)}></ha-icon>
              </div>
              <div class="entity-extras">
                <ha-textfield label="Name" .value=${item.name || ''}
                  @input=${(e: Event) => this._summaryItemChanged(i, 'name', (e.target as HTMLInputElement).value)}></ha-textfield>
                <ha-icon-picker .hass=${this.hass} label="Icon" .value=${item.icon || ''}
                  @value-changed=${(e: CustomEvent) => this._summaryItemChanged(i, 'icon', e.detail.value)}></ha-icon-picker>
              </div>
              <div class="toggle-row">
                <span class="editor-label">Show State</span>
                <ha-switch .checked=${item.show_state !== false}
                  @change=${(e: Event) => this._summaryItemChanged(i, 'show_state', (e.target as HTMLInputElement).checked)}></ha-switch>
              </div>
              <div class="toggle-row">
                <span class="editor-label">Show Brightness</span>
                <ha-switch .checked=${item.show_brightness === true}
                  @change=${(e: Event) => this._summaryItemChanged(i, 'show_brightness', (e.target as HTMLInputElement).checked || undefined)}></ha-switch>
              </div>
            </div>
          `)}
          <div class="add-btn" @click=${this._addSummaryItem}>+ Add Summary Item</div>
          ${(this._config.summary_items?.length || 0) > 1 ? html`
            <div class="editor-row">
              <ha-textfield label="Fade Speed (seconds)" type="number" min="2" max="30"
                .value=${String(this._config.summary_speed || 4)}
                @input=${(e: Event) => { const v = parseInt((e.target as HTMLInputElement).value); if (v > 0) this._set('summary_speed', v); }}></ha-textfield>
              <span class="editor-hint">Seconds per item. Default: 4</span>
            </div>
          ` : nothing}
        `)}

        <!-- ═══ News Feeds ═══ -->
        ${this._renderSection('news', 'mdi:newspaper', 'News Feeds', html`
          <span class="editor-hint">Add Lumina Feeds sensors or any Feedparser sensor</span>
          ${(this._config.rss_feeds || []).map((feed: any, i: number) => html`
            <div class="entity-block">
              <div class="entity-row">
                <ha-entity-picker .hass=${this.hass} label="Feed ${i + 1}" .value=${feed.entity || ''} .includeDomains=${['sensor']}
                  @value-changed=${(e: CustomEvent) => this._rssFeedChanged(i, 'entity', e.detail.value)} allow-custom-entity></ha-entity-picker>
                <ha-icon class="remove-btn" icon="mdi:close" @click=${() => this._removeRssFeed(i)}></ha-icon>
              </div>
              <ha-textfield label="Category Name (optional)" .value=${feed.name || ''}
                @input=${(e: Event) => this._rssFeedChanged(i, 'name', (e.target as HTMLInputElement).value)}></ha-textfield>
            </div>
          `)}
          <div class="add-btn" @click=${this._addRssFeed}>+ Add News Feed</div>

          <div class="toggle-row">
            <span class="editor-label">Scrolling Ticker</span>
            <ha-switch .checked=${this._config.rss_scroll === true}
              @change=${(e: Event) => { this._set('rss_scroll', (e.target as HTMLInputElement).checked || undefined); if ((e.target as HTMLInputElement).checked) this._set('rss_fade', undefined); }}></ha-switch>
          </div>
          <div class="toggle-row">
            <span class="editor-label">Fading Headlines</span>
            <ha-switch .checked=${this._config.rss_fade === true}
              @change=${(e: Event) => { this._set('rss_fade', (e.target as HTMLInputElement).checked || undefined); if ((e.target as HTMLInputElement).checked) this._set('rss_scroll', undefined); }}></ha-switch>
          </div>
          ${this._config.rss_scroll || this._config.rss_fade ? html`
            <div class="editor-row">
              <ha-textfield label="Speed (seconds)" type="number" min="3" max="300"
                .value=${String(this._config.rss_speed || (this._config.rss_scroll ? 60 : 6))}
                @input=${(e: Event) => { const v = parseInt((e.target as HTMLInputElement).value); if (v > 0) this._set('rss_speed', v); }}></ha-textfield>
              <span class="editor-hint">${this._config.rss_scroll ? 'Scroll duration (higher = slower). Default: 60' : 'Seconds per headline. Default: 6'}</span>
            </div>
          ` : nothing}
        `)}

        <!-- ═══ Calendar ═══ -->
        ${this._renderSection('calendar', 'mdi:calendar', 'Calendar', html`
          <div class="editor-row">
            <ha-entity-picker .hass=${this.hass} label="Calendar Entity" .value=${this._config.calendar_entity || ''}
              .includeDomains=${['calendar']} @value-changed=${(e: CustomEvent) => this._set('calendar_entity', e.detail.value)} allow-custom-entity></ha-entity-picker>
          </div>
        `)}

        <!-- ═══ Stocks ═══ -->
        ${this._renderSection('stocks', 'mdi:chart-line', 'Stocks', html`
          <div class="editor-row">
            <ha-entity-picker .hass=${this.hass} label="Stocks Summary (all-in-one)" .value=${this._config.stocks_summary_entity || ''}
              .includeDomains=${['sensor']} @value-changed=${(e: CustomEvent) => this._set('stocks_summary_entity', e.detail.value)} allow-custom-entity></ha-entity-picker>
            <span class="editor-hint">sensor.lumina_stocks_summary — or add individual stocks below</span>
          </div>
          ${(this._config.stock_entities || []).map((id: string, i: number) => html`
            <div class="entity-row">
              <ha-entity-picker .hass=${this.hass} label="Stock ${i + 1}" .value=${id} .includeDomains=${['sensor']}
                @value-changed=${(e: CustomEvent) => this._stockChanged(i, e.detail.value)} allow-custom-entity></ha-entity-picker>
              <ha-icon class="remove-btn" icon="mdi:close" @click=${() => this._removeStock(i)}></ha-icon>
            </div>
          `)}
          <div class="add-btn" @click=${this._addStock}>+ Add Stock</div>
          <div class="toggle-row">
            <span class="editor-label">Scrolling Stock Ticker</span>
            <ha-switch .checked=${this._config.stock_scroll === true}
              @change=${(e: Event) => this._set('stock_scroll', (e.target as HTMLInputElement).checked || undefined)}></ha-switch>
          </div>
          ${this._config.stock_scroll ? html`
            <div class="editor-row">
              <ha-textfield label="Scroll Speed (seconds)" type="number" min="10" max="300"
                .value=${String(this._config.stock_speed || 45)}
                @input=${(e: Event) => { const v = parseInt((e.target as HTMLInputElement).value); if (v > 0) this._set('stock_speed', v); }}></ha-textfield>
            </div>
          ` : nothing}
        `)}

        <!-- ═══ Custom Chips ═══ -->
        ${this._renderSection('chips', 'mdi:chip', 'Custom Status Chips', html`
          <span class="editor-hint">Add any sensor as a quick-glance chip</span>
          ${(this._config.chips || []).map((chip, i) => html`
            <div class="entity-block">
              <div class="entity-row">
                <ha-entity-picker .hass=${this.hass} label="Entity" .value=${chip.entity}
                  @value-changed=${(e: CustomEvent) => this._chipChanged(i, 'entity', e.detail.value)} allow-custom-entity></ha-entity-picker>
                <ha-icon class="remove-btn" icon="mdi:close" @click=${() => this._removeChip(i)}></ha-icon>
              </div>
              <div class="entity-extras">
                <ha-textfield label="Custom Name" .value=${chip.name || ''}
                  @input=${(e: Event) => this._chipChanged(i, 'name', (e.target as HTMLInputElement).value)}></ha-textfield>
                <ha-icon-picker .hass=${this.hass} label="Icon" .value=${chip.icon || ''}
                  @value-changed=${(e: CustomEvent) => this._chipChanged(i, 'icon', e.detail.value)}></ha-icon-picker>
              </div>
            </div>
          `)}
          <div class="add-btn" @click=${this._addChip}>+ Add Custom Chip</div>
        `)}

        <!-- ═══ Display ═══ -->
        ${this._renderSection('display', 'mdi:palette-outline', 'Display', html`
          <div class="toggle-row">
            <span class="editor-label">Show Card Background</span>
            <ha-switch .checked=${this._config.show_background !== false}
              @change=${(e: Event) => this._set('show_background', (e.target as HTMLInputElement).checked)}></ha-switch>
          </div>
        `)}

      </div>
    `;
  }

  private _renderSection(key: string, icon: string, title: string, content: unknown) {
    const isOpen = this._openSections[key] || false;
    return html`
      <div class="section-collapsible">
        <div class="section-header" @click=${() => this._toggleSection(key)}>
          <div class="section-header-left">
            <ha-icon icon="${icon}"></ha-icon>
            <span class="section-title">${title}</span>
          </div>
          <ha-icon class="section-chevron ${isOpen ? 'open' : ''}" icon="mdi:chevron-down"></ha-icon>
        </div>
        <div class="section-body ${isOpen ? 'open' : ''}">
          ${content}
        </div>
      </div>
    `;
  }
}
