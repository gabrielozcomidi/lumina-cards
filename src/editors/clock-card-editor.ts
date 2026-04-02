import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LuminaClockCardConfig, WorldClockEntry } from '../types';
import { HomeAssistant } from '../types/ha-types';
import { loadHaElements, fireConfigChanged } from '../utils/editor-helpers';

@customElement('ha-lumina-clock-card-editor')
export class HaLuminaClockCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: LuminaClockCardConfig;
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
    .editor-sublabel { font-size: 0.75rem; color: var(--secondary-text-color); }
    .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
    .loading { padding: 24px; text-align: center; color: var(--secondary-text-color); }

    .layout-grid {
      display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;
    }
    .layout-option {
      display: flex; flex-direction: column; align-items: center; gap: 6px;
      padding: 12px 8px; border-radius: 10px; cursor: pointer;
      background: var(--card-background-color, #1a1a1d);
      border: 2px solid transparent; transition: border-color 0.2s, background 0.2s; text-align: center;
    }
    .layout-option:hover { border-color: rgba(133, 173, 255, 0.2); background: var(--secondary-background-color, #222); }
    .layout-option.selected { border-color: #85adff; background: rgba(133, 173, 255, 0.08); }
    .layout-option ha-icon { --mdc-icon-size: 22px; color: var(--secondary-text-color); }
    .layout-option.selected ha-icon { color: #85adff; }
    .layout-option-label { font-size: 0.6875rem; font-weight: 600; color: var(--primary-text-color); }
    .layout-option.selected .layout-option-label { color: #85adff; }

    .format-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

    .wc-block {
      background: var(--card-background-color, #1a1a1d); border-radius: 10px;
      padding: 12px; display: flex; gap: 8px; align-items: center;
    }
    .wc-block ha-textfield { flex: 1; }
    .remove-btn { cursor: pointer; color: var(--error-color, #db4437); --mdc-icon-size: 20px; }
    .add-btn {
      cursor: pointer; color: var(--primary-color); font-size: 0.875rem;
      font-weight: 500; padding: 8px; display: flex; align-items: center; gap: 4px;
    }
  `;

  public setConfig(config: LuminaClockCardConfig): void {
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

  private _updateWorldClock(index: number, field: keyof WorldClockEntry, value: string): void {
    const clocks = [...(this._config.world_clocks || [])];
    clocks[index] = { ...clocks[index], [field]: value };
    this._set('world_clocks', clocks);
  }

  private _addWorldClock(): void {
    const clocks = [...(this._config.world_clocks || [])];
    clocks.push({ city: 'London', timezone: 'Europe/London' });
    this._set('world_clocks', clocks);
  }

  private _removeWorldClock(index: number): void {
    const clocks = [...(this._config.world_clocks || [])];
    clocks.splice(index, 1);
    this._set('world_clocks', clocks);
  }

  protected render() {
    if (!this._config || !this.hass) return html``;
    if (!this._haLoaded) return html`<div class="loading">Loading editor...</div>`;

    const layout = this._config.layout || 'full';

    return html`
      <div class="editor">
        <div class="editor-section">Layout</div>
        <div class="layout-grid">
          ${(['full', 'room', 'compact'] as const).map(l => {
            const icons: Record<string, string> = { full: 'mdi:view-dashboard', room: 'mdi:card-outline', compact: 'mdi:text-short' };
            const labels: Record<string, string> = { full: 'Full', room: 'Room Size', compact: 'Compact' };
            return html`
              <div class="layout-option ${layout === l ? 'selected' : ''}"
                @click=${() => this._set('layout', l)}>
                <ha-icon icon="${icons[l]}"></ha-icon>
                <span class="layout-option-label">${labels[l]}</span>
              </div>
            `;
          })}
        </div>

        <div class="editor-section">Settings</div>

        <div class="editor-row">
          <ha-textfield label="Location Name (optional)"
            .value=${this._config.name || ''}
            @input=${(e: Event) => this._set('name', (e.target as HTMLInputElement).value || undefined)}
          ></ha-textfield>
        </div>

        <div class="editor-row">
          <span class="editor-label">Time Format</span>
          <div class="format-grid">
            ${(['24h', '12h'] as const).map(f => html`
              <div class="layout-option ${this._config.time_format === f ? 'selected' : ''}"
                @click=${() => this._set('time_format', f)}>
                <span class="layout-option-label">${f === '24h' ? '24 Hour' : '12 Hour'}</span>
              </div>
            `)}
          </div>
        </div>

        <div class="toggle-row">
          <span class="editor-label">Show Seconds</span>
          <ha-switch .checked=${this._config.show_seconds === true}
            @change=${(e: Event) => this._set('show_seconds', (e.target as HTMLInputElement).checked || undefined)}
          ></ha-switch>
        </div>

        <div class="toggle-row">
          <span class="editor-label">Show Date</span>
          <ha-switch .checked=${this._config.show_date !== false}
            @change=${(e: Event) => this._set('show_date', (e.target as HTMLInputElement).checked)}
          ></ha-switch>
        </div>

        <div class="toggle-row">
          <span class="editor-label">Show Greeting</span>
          <ha-switch .checked=${this._config.show_greeting !== false}
            @change=${(e: Event) => this._set('show_greeting', (e.target as HTMLInputElement).checked)}
          ></ha-switch>
        </div>

        <div class="editor-section">World Clocks</div>
        <div class="editor-sublabel">Add cities with IANA timezone names (e.g. America/New_York, Asia/Tokyo)</div>

        ${(this._config.world_clocks || []).map((wc, i) => html`
          <div class="wc-block">
            <ha-textfield label="City" .value=${wc.city}
              @input=${(e: Event) => this._updateWorldClock(i, 'city', (e.target as HTMLInputElement).value)}
            ></ha-textfield>
            <ha-textfield label="Timezone" .value=${wc.timezone}
              @input=${(e: Event) => this._updateWorldClock(i, 'timezone', (e.target as HTMLInputElement).value)}
            ></ha-textfield>
            <ha-icon class="remove-btn" icon="mdi:close" @click=${() => this._removeWorldClock(i)}></ha-icon>
          </div>
        `)}

        <div class="add-btn" @click=${this._addWorldClock}>+ Add World Clock</div>
      </div>
    `;
  }
}
