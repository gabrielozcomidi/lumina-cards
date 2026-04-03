import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LuminaStatusCardConfig, StatusChipConfig } from '../types';
import { HomeAssistant } from '../types/ha-types';
import { loadHaElements, fireConfigChanged } from '../utils/editor-helpers';

@customElement('ha-lumina-status-card-editor')
export class HaLuminaStatusCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: LuminaStatusCardConfig;
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

  // ─── Person helpers ─────────────────────────────────

  private _addPerson(): void {
    const p = [...(this._config.person_entities || []), ''];
    this._set('person_entities', p);
  }
  private _removePerson(i: number): void {
    const p = [...(this._config.person_entities || [])]; p.splice(i, 1);
    this._set('person_entities', p);
  }
  private _personChanged(i: number, v: string): void {
    const p = [...(this._config.person_entities || [])]; p[i] = v;
    this._set('person_entities', p);
  }

  // ─── Custom chip helpers ────────────────────────────

  private _addChip(): void {
    const c = [...(this._config.chips || []), { entity: '' }];
    this._set('chips', c);
  }
  private _removeChip(i: number): void {
    const c = [...(this._config.chips || [])]; c.splice(i, 1);
    this._set('chips', c);
  }
  private _chipChanged(i: number, field: keyof StatusChipConfig, v: string): void {
    const c = [...(this._config.chips || [])];
    c[i] = { ...c[i], [field]: v || undefined };
    if (field === 'entity') c[i].entity = v;
    this._set('chips', c);
  }

  protected render() {
    if (!this._config || !this.hass) return html``;
    if (!this._haLoaded) return html`<div class="loading">Loading editor...</div>`;

    return html`
      <div class="editor">
        <!-- Greeting -->
        <div class="editor-section">Greeting</div>
        <div class="toggle-row">
          <span class="editor-label">Show Greeting</span>
          <ha-switch .checked=${this._config.show_greeting !== false}
            @change=${(e: Event) => this._set('show_greeting', (e.target as HTMLInputElement).checked)}
          ></ha-switch>
        </div>
        <div class="editor-row">
          <ha-textfield label="Display Name (optional)"
            .value=${this._config.name || ''}
            @input=${(e: Event) => this._set('name', (e.target as HTMLInputElement).value || undefined)}
          ></ha-textfield>
          <span class="editor-hint">Leave empty to auto-detect from HA user</span>
        </div>

        <!-- People -->
        <div class="editor-section">People Tracking</div>
        ${(this._config.person_entities || []).map((id, i) => html`
          <div class="entity-row">
            <ha-entity-picker .hass=${this.hass} label="Person ${i + 1}"
              .value=${id} .includeDomains=${['person']}
              @value-changed=${(e: CustomEvent) => this._personChanged(i, e.detail.value)}
              allow-custom-entity></ha-entity-picker>
            <ha-icon class="remove-btn" icon="mdi:close" @click=${() => this._removePerson(i)}></ha-icon>
          </div>
        `)}
        <div class="add-btn" @click=${this._addPerson}>+ Add Person</div>

        <!-- Built-in Data Sources -->
        <div class="editor-section">Data Sources</div>

        <div class="editor-row">
          <ha-entity-picker .hass=${this.hass} label="Weather Entity"
            .value=${this._config.weather_entity || ''} .includeDomains=${['weather']}
            @value-changed=${(e: CustomEvent) => this._set('weather_entity', e.detail.value)}
            allow-custom-entity></ha-entity-picker>
        </div>

        <div class="editor-row">
          <ha-entity-picker .hass=${this.hass} label="Alarm Entity"
            .value=${this._config.alarm_entity || ''}
            .includeDomains=${['alarm_control_panel']}
            @value-changed=${(e: CustomEvent) => this._set('alarm_entity', e.detail.value)}
            allow-custom-entity></ha-entity-picker>
        </div>

        <div class="editor-row">
          <ha-entity-picker .hass=${this.hass} label="Energy Sensor"
            .value=${this._config.energy_entity || ''} .includeDomains=${['sensor']}
            @value-changed=${(e: CustomEvent) => this._set('energy_entity', e.detail.value)}
            allow-custom-entity></ha-entity-picker>
        </div>

        <div class="toggle-row">
          <span class="editor-label">Show Lights Summary</span>
          <ha-switch .checked=${this._config.show_lights_summary !== false}
            @change=${(e: Event) => this._set('show_lights_summary', (e.target as HTMLInputElement).checked)}
          ></ha-switch>
        </div>

        <!-- RSS Feed -->
        <div class="editor-section">News Feed (RSS)</div>
        <div class="editor-row">
          <ha-entity-picker .hass=${this.hass} label="Feedparser Sensor"
            .value=${this._config.rss_entity || ''} .includeDomains=${['sensor']}
            @value-changed=${(e: CustomEvent) => this._set('rss_entity', e.detail.value)}
            allow-custom-entity></ha-entity-picker>
          <span class="editor-hint">Install Feedparser integration from HACS for RSS feeds</span>
        </div>

        <!-- Calendar -->
        <div class="editor-section">Calendar</div>
        <div class="editor-row">
          <ha-entity-picker .hass=${this.hass} label="Calendar Entity"
            .value=${this._config.calendar_entity || ''} .includeDomains=${['calendar']}
            @value-changed=${(e: CustomEvent) => this._set('calendar_entity', e.detail.value)}
            allow-custom-entity></ha-entity-picker>
        </div>

        <!-- Custom Chips -->
        <div class="editor-section">Custom Status Chips</div>
        <span class="editor-hint">Add any sensor as a quick-glance chip</span>

        ${(this._config.chips || []).map((chip, i) => html`
          <div class="entity-block">
            <div class="entity-row">
              <ha-entity-picker .hass=${this.hass} label="Entity"
                .value=${chip.entity}
                @value-changed=${(e: CustomEvent) => this._chipChanged(i, 'entity', e.detail.value)}
                allow-custom-entity></ha-entity-picker>
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

        <!-- Display -->
        <div class="editor-section">Display</div>
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
