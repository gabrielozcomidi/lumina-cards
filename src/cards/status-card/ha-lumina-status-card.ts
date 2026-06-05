import { html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { luminaTokens } from '../../styles/tokens';
import { sharedStyles } from '../../styles/shared';
import { statusCardStyles } from './styles';
import { LuminaStatusCardConfig, StatusChipConfig } from '../../types';
import { LuminaCardBase } from '../base';
import { callService } from '../../utils/ha-helpers';
import '../../components/lumina-bottom-sheet';

function getGreeting(hour: number): string {
  if (hour < 5) return 'Good Night';
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  if (hour < 21) return 'Good Evening';
  return 'Good Night';
}

import { weatherConditionIcon } from '../../utils/mode-mappings';

@customElement('ha-lumina-status-card')
export class HaLuminaStatusCard extends LuminaCardBase<LuminaStatusCardConfig> {
  @state() private _time = new Date();
  @state() private _activeFeedIndex = 0;
  @state() private _fadeItemIndex = 0;
  @state() private _fadeStockIndex = 0;
  @state() private _fadeChipIndex = 0;
  @state() private _fadeSummaryIndex = 0;
  @state() private _showLightsPopup = false;
  private _timer?: ReturnType<typeof setInterval>;
  private _fadeTimer?: ReturnType<typeof setInterval>;
  private _fadeStockTimer?: ReturnType<typeof setInterval>;
  private _fadeChipTimer?: ReturnType<typeof setInterval>;
  private _fadeSummaryTimer?: ReturnType<typeof setInterval>;

  static styles = [luminaTokens, sharedStyles, statusCardStyles];

  static getConfigElement(): HTMLElement {
    return document.createElement('ha-lumina-status-card-editor');
  }

  static getStubConfig(): Record<string, unknown> {
    return {
      type: 'custom:ha-lumina-status-card',
      show_greeting: true,
      show_lights_summary: true,
    };
  }

  protected override defaults(): Partial<LuminaStatusCardConfig> {
    return {
      show_greeting: true,
      show_lights_summary: true,
    };
  }

  protected override trackedEntities(): string[] {
    const c = this._config;
    if (!c) return [];
    // When light_entities isn't configured, the card falls back to counting
    // every light.* entity (and the popup shows every light too). In that
    // case we want every light.* in the tracked set so the count / popup
    // stay reactive. Other entity refs are explicit config so they're cheap.
    const allLights = (c.light_entities?.length || !this.hass)
      ? []
      : Object.keys(this.hass.states).filter((id) => id.startsWith('light.'));
    const ids: string[] = [
      c.weather_entity,
      c.alarm_entity,
      c.energy_entity,
      c.calendar_entity,
      c.greeting_entity,
      c.rss_entity,
      c.stocks_summary_entity,
      ...(c.person_entities || []),
      ...(c.light_entities || []),
      ...(c.stock_entities || []),
      ...(c.chips || []).map((x) => x.entity),
      ...(c.summary_items || []).map((x) => x.entity),
      ...(c.rss_feeds || []).map((x) => x.entity),
      ...allLights,
    ].filter((x): x is string => !!x);
    return ids;
  }

  public override getCardSize(): number { return 4; }

  connectedCallback(): void {
    super.connectedCallback();
    this._timer = setInterval(() => { this._time = new Date(); }, 1000);
    this._startFadeTimers();
  }

  disconnectedCallback(): void {
    if (this._timer) clearInterval(this._timer);
    if (this._fadeTimer) clearInterval(this._fadeTimer);
    if (this._fadeStockTimer) clearInterval(this._fadeStockTimer);
    if (this._fadeChipTimer) clearInterval(this._fadeChipTimer);
    if (this._fadeSummaryTimer) clearInterval(this._fadeSummaryTimer);
    super.disconnectedCallback();
  }

  private _startFadeTimers(): void {
    const feedSpeed = (this._config?.rss_speed || 6) * 1000;
    const stockSpeed = (this._config?.stock_speed || 5) * 1000;
    const chipSpeed = (this._config?.chips_speed || 4) * 1000;
    this._fadeTimer = setInterval(() => { this._fadeItemIndex++; }, feedSpeed);
    this._fadeStockTimer = setInterval(() => { this._fadeStockIndex++; }, stockSpeed);
    this._fadeChipTimer = setInterval(() => { this._fadeChipIndex++; }, chipSpeed);
    const summarySpeed = (this._config?.summary_speed || 4) * 1000;
    this._fadeSummaryTimer = setInterval(() => { this._fadeSummaryIndex++; }, summarySpeed);
  }

  // ─── Helpers ──────────────────────────────────────

  private _getUserName(): string {
    if (this._config.name) return this._config.name;
    if (this._config.greeting_entity && this.hass) {
      const entity = this.hass.states[this._config.greeting_entity];
      if (entity) {
        return (entity.attributes.friendly_name as string)?.split(' ')[0] || '';
      }
    }
    // Try HA user
    if ((this.hass as any)?.user?.name) {
      return (this.hass as any).user.name.split(' ')[0];
    }
    return '';
  }

  private _getActiveLightCount(): number {
    if (!this.hass) return 0;
    // If specific lights configured, only count those
    if (this._config.light_entities?.length) {
      return this._config.light_entities.filter(id => {
        const e = this.hass.states[id];
        return e && e.state === 'on';
      }).length;
    }
    // Fallback: count all light entities
    return Object.values(this.hass.states).filter(
      (e) => e.entity_id.startsWith('light.') && e.state === 'on',
    ).length;
  }

  private _getPeopleStatus(): { name: string; home: boolean; location: string }[] {
    if (!this.hass || !this._config.person_entities?.length) return [];
    return this._config.person_entities.map((id) => {
      const entity = this.hass.states[id];
      const state = entity?.state || 'unknown';
      return {
        name: (entity?.attributes?.friendly_name as string) || id.split('.').pop() || id,
        home: state === 'home',
        location: state === 'home' ? 'Home' : state === 'not_home' ? 'Away' : state.charAt(0).toUpperCase() + state.slice(1),
      };
    });
  }

  private _getPeopleHomeCount(): number {
    return this._getPeopleStatus().filter(p => p.home).length;
  }

  // ─── Render ───────────────────────────────────────

  protected render() {
    if (!this._config || !this.hass) return nothing;

    return html`
      <ha-card>
        <div class="status-card ${this._config.show_background === false ? 'no-bg' : ''}">
          <div class="status-tint"></div>
          <div class="status-content">
            ${this._renderGreeting()}
            ${this._renderPeople()}
            ${this._renderChips()}
            ${this._renderStocks()}
            ${this._renderFeed()}
            ${this._renderCalendar()}
          </div>
        </div>
      </ha-card>

      <lumina-bottom-sheet
        .open=${this._showLightsPopup}
        title="Lights On"
        @sheet-closed=${() => { this._showLightsPopup = false; }}
      >
        ${this._renderLightsList()}
      </lumina-bottom-sheet>
    `;
  }

  /** Build the list of lights for the popup. If the user configured
   *  light_entities, scope to those; otherwise scope to every light.* in HA.
   *  Sort: on (with brightness desc) first, then off alphabetically. */
  private _getLightsList(): Array<{ id: string; name: string; on: boolean; brightness: number }> {
    if (!this.hass) return [];
    const configured = this._config?.light_entities?.length ? this._config.light_entities : null;
    const ids: string[] = configured
      ? configured
      : Object.keys(this.hass.states).filter((id) => id.startsWith('light.'));

    const rows = ids.map((id) => {
      const e = this.hass.states[id];
      if (!e) return null;
      const on = e.state === 'on';
      const brightness = on ? Math.round((((e.attributes.brightness as number) || 0) / 255) * 100) : 0;
      const name = (e.attributes.friendly_name as string) || id.split('.').pop() || id;
      return { id, name, on, brightness };
    }).filter(Boolean) as Array<{ id: string; name: string; on: boolean; brightness: number }>;

    rows.sort((a, b) => {
      if (a.on !== b.on) return a.on ? -1 : 1;
      if (a.on) return b.brightness - a.brightness;
      return a.name.localeCompare(b.name);
    });
    return rows;
  }

  private _renderLightsList() {
    if (!this.hass) return nothing;
    const lights = this._getLightsList();
    const onCount = lights.filter((l) => l.on).length;

    if (!lights.length) {
      return html`<div class="lights-popup-empty">No light entities configured.</div>`;
    }

    return html`
      <div class="lights-popup">
        <div class="lights-popup-header">
          <span class="lights-popup-count">${onCount} of ${lights.length} on</span>
          ${onCount > 0 ? html`
            <button class="lights-popup-action"
              @click=${() => callService(this.hass, 'light', 'turn_off', { entity_id: lights.filter(l => l.on).map(l => l.id) })}>
              Turn all off
            </button>
          ` : nothing}
        </div>
        <div class="lights-popup-list">
          ${lights.map((l) => html`
            <div class="lights-popup-row ${l.on ? 'on' : 'off'}">
              <div class="lights-popup-icon">
                <ha-icon icon=${l.on ? 'mdi:lightbulb' : 'mdi:lightbulb-outline'}></ha-icon>
              </div>
              <div class="lights-popup-info">
                <span class="lights-popup-name">${l.name}</span>
                <span class="lights-popup-detail">${l.on ? `${l.brightness}% brightness` : 'Off'}</span>
              </div>
              <ha-switch
                .checked=${l.on}
                @change=${(e: Event) => {
                  const checked = (e.target as HTMLInputElement).checked;
                  callService(this.hass, 'light', checked ? 'turn_on' : 'turn_off', { entity_id: l.id });
                }}
              ></ha-switch>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  private _renderGreeting() {
    if (this._config.show_greeting === false) return nothing;
    const hour = new Date().getHours();
    const greeting = getGreeting(hour);
    const name = this._getUserName();
    const peopleHome = this._getPeopleHomeCount();
    const totalPeople = this._config.person_entities?.length || 0;

    return html`
      <div class="greeting-section">
        <span class="greeting-text">${greeting}${name ? `, ${name}` : ''}</span>
        ${this._config.show_clock ? html`
          <span class="greeting-clock">${this._formatTime()}${nothing}</span>
        ` : nothing}
        ${totalPeople > 0 ? html`
          <span class="greeting-sub">${peopleHome} of ${totalPeople} ${totalPeople === 1 ? 'person' : 'people'} home</span>
        ` : nothing}
      </div>
    `;
  }

  private _formatTime(): ReturnType<typeof html> {
    const d = this._time;
    const is24 = this._config.time_format !== '12h';
    let h = d.getHours();
    const m = d.getMinutes().toString().padStart(2, '0');
    let period = '';
    if (!is24) { period = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; }
    const hStr = is24 ? h.toString().padStart(2, '0') : h.toString();
    return html`${hStr}:${m}${period ? html`<span class="clock-period">${period}</span>` : nothing}`;
  }

  private _renderPeople() {
    const people = this._getPeopleStatus();
    if (!people.length) return nothing;

    return html`
      <div class="people-section">
        ${people.map(p => html`
          <span class="person-chip ${p.home ? 'home' : ''}">
            <span class="person-dot"></span>
            ${p.name}<span class="person-location"> · ${p.location}</span>
          </span>
        `)}
      </div>
    `;
  }

  private _renderChips() {
    const chips: { icon: string; label: string; value: string; cls: string; kind?: string }[] = [];

    // Security
    if (this._config.alarm_entity) {
      const alarm = this.hass.states[this._config.alarm_entity];
      if (alarm) {
        const state = alarm.state;
        const armed = state.startsWith('armed');
        chips.push({
          icon: armed ? 'mdi:shield-check' : 'mdi:shield-off',
          label: 'Security',
          value: state.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          cls: `security ${armed ? 'armed' : ''}`,
        });
      }
    }

    // Weather
    if (this._config.weather_entity) {
      const weather = this.hass.states[this._config.weather_entity];
      if (weather) {
        const temp = weather.attributes.temperature;
        const unit = weather.attributes.temperature_unit || '°';
        const condition = weather.state;
        chips.push({
          icon: weatherConditionIcon(condition),
          label: 'Weather',
          value: temp != null ? `${Math.round(temp as number)}${unit}` : condition,
          cls: 'weather',
        });
      }
    }

    // Energy
    if (this._config.energy_entity) {
      const energy = this.hass.states[this._config.energy_entity];
      if (energy) {
        const val = parseFloat(energy.state);
        const unit = (energy.attributes.unit_of_measurement as string) || 'kWh';
        chips.push({
          icon: 'mdi:lightning-bolt',
          label: 'Energy',
          value: !isNaN(val) ? `${val.toFixed(1)} ${unit}` : energy.state,
          cls: 'energy',
        });
      }
    }

    // Lights (only if no summary_items configured)
    // Marked with kind='lights' so the renderer can wire a click handler
    // that opens the lights popup (so users can SEE which N are on).
    if (this._config.show_lights_summary && !this._config.summary_items?.length) {
      const count = this._getActiveLightCount();
      chips.push({
        icon: 'mdi:lightbulb-group',
        label: 'Lighting',
        value: `${count} Active`,
        cls: 'lights',
        kind: 'lights',
      });
    }

    // Custom chips
    if (this._config.chips?.length) {
      for (const chip of this._config.chips) {
        const entity = this.hass.states[chip.entity];
        if (entity) {
          const unit = (entity.attributes.unit_of_measurement as string) || '';
          chips.push({
            icon: chip.icon || (entity.attributes.icon as string) || 'mdi:information',
            label: chip.name || (entity.attributes.friendly_name as string) || chip.entity,
            value: `${entity.state}${unit ? ` ${unit}` : ''}`,
            cls: '',
          });
        }
      }
    }

    // Build the rotating chip content (if summary_items configured)
    const rotatingChip = this._buildRotatingChip();

    if (!chips.length && !rotatingChip) return nothing;

    return html`
      <div class="chips-grid">
        ${chips.map(c => {
          const isClickable = (c as { kind?: string }).kind === 'lights';
          return html`
            <div class="status-chip ${c.cls} ${isClickable ? 'clickable' : ''}"
                 @click=${isClickable ? () => { this._showLightsPopup = true; } : undefined}
                 role=${isClickable ? 'button' : nothing}
                 tabindex=${isClickable ? '0' : nothing}>
              <ha-icon icon="${c.icon}"></ha-icon>
              <div class="status-chip-info">
                <span class="status-chip-label">${c.label}</span>
                <span class="status-chip-value">${c.value}</span>
              </div>
              ${isClickable ? html`<ha-icon class="status-chip-chevron" icon="mdi:chevron-right"></ha-icon>` : nothing}
            </div>
          `;
        })}
        ${rotatingChip}
      </div>
    `;
  }

  private _buildRotatingChip() {
    const items = this._config.summary_items;
    if (!items?.length) return nothing;

    const rendered = items.map(item => {
      const entity = this.hass.states[item.entity];
      if (!entity) return null;

      const name = item.name || (entity.attributes.friendly_name as string) || item.entity;
      const icon = item.icon || (entity.attributes.icon as string) || 'mdi:information';
      const state = entity.state;
      const attrs = entity.attributes;

      const parts: string[] = [];
      if (item.show_state !== false) {
        const stateLabel = state === 'on' ? 'On' : state === 'off' ? 'Off' : state.charAt(0).toUpperCase() + state.slice(1);
        parts.push(stateLabel);
      }
      if (item.show_brightness && attrs.brightness != null) {
        parts.push(`${Math.round(((attrs.brightness as number) / 255) * 100)}%`);
      }
      if (item.show_unit) {
        const val = parseFloat(state);
        const unit = (attrs.unit_of_measurement as string) || '';
        parts.push(!isNaN(val) ? `${val}${unit ? ` ${unit}` : ''}` : state);
      }
      const detail = parts.join(' · ');
      const isOn = state === 'on' || state === 'playing' || state === 'home';

      return { name, icon, detail, isOn };
    }).filter(Boolean) as { name: string; icon: string; detail: string; isOn: boolean }[];

    if (!rendered.length) return nothing;

    const fadeSpeed = this._config.summary_speed || 4;

    // Single item: static chip
    if (rendered.length === 1) {
      const s = rendered[0];
      return html`
        <div class="status-chip ${s.isOn ? 'lights' : ''}">
          <ha-icon icon="${s.icon}"></ha-icon>
          <div class="status-chip-info">
            <span class="status-chip-label">${s.name}</span>
            <span class="status-chip-value">${s.detail}</span>
          </div>
        </div>
      `;
    }

    // Multiple: fade inside the chip space
    const idx = this._fadeSummaryIndex % rendered.length;
    const s = rendered[idx];
    return html`
      <div class="status-chip rotating-chip ${s.isOn ? 'lights' : ''}" style="--fade-speed: ${fadeSpeed}s;">
        <div class="rotating-chip-inner" .key=${idx}>
          <ha-icon icon="${s.icon}"></ha-icon>
          <div class="status-chip-info">
            <span class="status-chip-label">${s.name}</span>
            <span class="status-chip-value">${s.detail}</span>
          </div>
        </div>
      </div>
    `;
  }

  private _renderSummaryRotator() {
    const items = this._config.summary_items;
    if (!items?.length) return nothing;

    const rendered = items.map(item => {
      const entity = this.hass.states[item.entity];
      if (!entity) return null;

      const name = item.name || (entity.attributes.friendly_name as string) || item.entity;
      const icon = item.icon || (entity.attributes.icon as string) || 'mdi:information';
      const state = entity.state;
      const attrs = entity.attributes;

      // Build detail parts
      const parts: string[] = [];
      if (item.show_state !== false) {
        const stateLabel = state === 'on' ? 'On' : state === 'off' ? 'Off' : state.charAt(0).toUpperCase() + state.slice(1);
        parts.push(stateLabel);
      }
      if (item.show_brightness && attrs.brightness != null) {
        parts.push(`${Math.round(((attrs.brightness as number) / 255) * 100)}%`);
      }
      if (item.show_unit) {
        const unit = (attrs.unit_of_measurement as string) || '';
        if (unit) parts.push(unit);
      }
      const detail = parts.join(' · ');
      const isOn = state === 'on' || state === 'playing' || state === 'home';

      return { name, icon, detail, isOn };
    }).filter(Boolean) as { name: string; icon: string; detail: string; isOn: boolean }[];

    if (!rendered.length) return nothing;

    // Single item: static
    if (rendered.length === 1) {
      const s = rendered[0];
      return html`
        <div class="summary-chip ${s.isOn ? 'on' : ''}">
          <ha-icon icon="${s.icon}"></ha-icon>
          <div class="summary-chip-info">
            <span class="summary-chip-name">${s.name}</span>
            ${s.detail ? html`<span class="summary-chip-detail">${s.detail}</span>` : nothing}
          </div>
        </div>
      `;
    }

    // Multiple: fade between them
    const idx = this._fadeSummaryIndex % rendered.length;
    const s = rendered[idx];
    const fadeSpeed = this._config.summary_speed || 4;

    return html`
      <div class="fade-rotator" style="--fade-speed: ${fadeSpeed}s;">
        <div class="fade-chip-item" .key=${idx}>
          <div class="summary-chip ${s.isOn ? 'on' : ''}">
            <ha-icon icon="${s.icon}"></ha-icon>
            <div class="summary-chip-info">
              <span class="summary-chip-name">${s.name}</span>
              ${s.detail ? html`<span class="summary-chip-detail">${s.detail}</span>` : nothing}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderStocks() {
    let stocks: any[] = [];

    // Option 1: Lumina Feeds summary sensor (all stocks in one entity)
    if (this._config.stocks_summary_entity) {
      const entity = this.hass.states[this._config.stocks_summary_entity];
      if (entity) {
        const items = (entity.attributes.stocks as any[]) || [];
        stocks = items.map(s => ({
          symbol: s.symbol || '',
          name: s.short_name || '',
          price: s.price || 0,
          change: s.change || 0,
          changePct: s.change_percent || 0,
          up: (s.trending === 'up') || (s.change || 0) >= 0,
          currency: s.currency_symbol || s.currency || '$',
        }));
      }
    }
    // Option 2: Individual stock entity sensors
    else if (this._config.stock_entities?.length) {
      stocks = this._config.stock_entities.map(id => {
        const entity = this.hass.states[id];
        if (!entity) return null;
        const price = parseFloat(entity.state) || 0;
        const attrs = entity.attributes;
        const change = (attrs.regular_market_change as number) ?? 0;
        const changePct = (attrs.regular_market_change_percent as number) ?? 0;
        const symbol = (attrs.symbol as string) || id.split('.').pop()?.replace('yahoofinance_', '').replace('lumina_stock_', '').toUpperCase() || '';
        const name = (attrs.short_name as string) || '';
        const up = change >= 0;
        const currency = (attrs.currency_symbol as string) || (attrs.currency as string) || '$';
        return { symbol, name, price, change, changePct, up, currency };
      }).filter(Boolean) as any[];
    }

    if (!stocks.length) return nothing;

    if (this._config.stock_scroll) {
      return this._renderStockTicker(stocks);
    }

    return html`
      <div>
        <span class="section-label">Markets</span>
        <div class="stocks-section" style="margin-top: var(--lumina-space-2);">
          ${stocks.map(s => html`
            <div class="stock-item">
              <span class="stock-symbol">${s.symbol}</span>
              <span class="stock-name">${s.name}</span>
              <span class="stock-price">${s.currency}${s.price.toFixed(2)}</span>
              <span class="stock-change ${s.up ? 'up' : 'down'}">${s.up ? '+' : ''}${s.changePct.toFixed(2)}%</span>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  private _renderStockTicker(stocks: any[]) {
    const speed = this._config.stock_speed || 45;
    const items = stocks.map(s => html`
      <span class="ticker-item">
        <span class="ticker-label">${s.symbol}</span>
        ${s.currency}${s.price.toFixed(2)}
        <span class="${s.up ? 'ticker-up' : 'ticker-down'}">${s.up ? '▲' : '▼'}${Math.abs(s.changePct).toFixed(2)}%</span>
      </span>
    `);
    return html`
      <div>
        <span class="section-label">Markets</span>
        <div class="scroll-ticker" style="margin-top: var(--lumina-space-2); --ticker-speed: ${speed}s;">
          <div class="scroll-ticker-inner">
            ${items}${items}
          </div>
        </div>
      </div>
    `;
  }

  private _renderFeed() {
    // Collect all feed entries with their source labels
    const allFeeds: { name: string; entries: any[] }[] = [];

    // Multiple feeds (rss_feeds[])
    if (this._config.rss_feeds?.length) {
      for (const feed of this._config.rss_feeds) {
        const entity = this.hass.states[feed.entity];
        if (!entity) continue;
        const entries = (entity.attributes.entries as any[]) || [];
        const name = feed.name || (entity.attributes.feed_name as string) || (entity.attributes.friendly_name as string) || 'News';
        if (entries.length) allFeeds.push({ name, entries });
      }
    }
    // Legacy single feed
    else if (this._config.rss_entity) {
      const entity = this.hass.states[this._config.rss_entity];
      if (entity) {
        const entries = (entity.attributes.entries as any[]) || [];
        const name = (entity.attributes.feed_name as string) || 'News';
        if (entries.length) allFeeds.push({ name, entries });
      }
    }

    if (!allFeeds.length) return nothing;

    const maxItems = this._config.rss_max_items || 5;
    const hasMultiple = allFeeds.length > 1;
    const activeIdx = Math.min(this._activeFeedIndex, allFeeds.length - 1);
    const activeFeed = allFeeds[activeIdx];

    const speed = this._config.rss_speed || 60;

    if (this._config.rss_scroll) {
      const allEntries = allFeeds.flatMap(f => f.entries.slice(0, 5).map(e => ({ ...e, _source: f.name })));
      const tickerItems = allEntries.map(entry => html`
        <span class="ticker-item">
          <span class="ticker-source">${entry._source}</span>
          <span class="ticker-label">${entry.title || ''}</span>
          ${entry.published ? html`<span>${this._formatFeedTime(entry.published)}</span>` : nothing}
        </span>
      `);
      return html`
        <div>
          <span class="section-label">News</span>
          <div class="scroll-ticker" style="margin-top: var(--lumina-space-2); --ticker-speed: ${speed}s;">
            <div class="scroll-ticker-inner">
              ${tickerItems}${tickerItems}
            </div>
          </div>
        </div>
      `;
    }

    if (this._config.rss_fade) {
      const allEntries = allFeeds.flatMap(f => f.entries.slice(0, maxItems).map(e => ({ ...e, _source: f.name })));
      if (!allEntries.length) return nothing;
      const idx = this._fadeItemIndex % allEntries.length;
      const entry = allEntries[idx];
      const fadeSpeed = this._config.rss_speed || 6;
      return html`
        <div>
          <span class="section-label">News</span>
          <div class="fade-rotator" style="margin-top: var(--lumina-space-2); --fade-speed: ${fadeSpeed}s;">
            <div class="fade-item" .key=${idx}>
              <span class="fade-dot"></span>
              <div class="fade-item-content">
                <span class="fade-item-title">${entry.title || ''}</span>
                <span class="fade-item-meta">
                  ${entry._source ? html`${entry._source} · ` : nothing}${entry.published ? this._formatFeedTime(entry.published) : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return html`
      <div>
        <div class="feed-header">
          <span class="section-label">News</span>
          ${hasMultiple ? html`
            <div class="feed-tabs">
              ${allFeeds.map((f, i) => html`
                <span class="feed-tab ${i === activeIdx ? 'active' : ''}"
                  @click=${() => { this._activeFeedIndex = i; }}>${f.name}</span>
              `)}
            </div>
          ` : nothing}
        </div>
        <div class="feed-section" style="margin-top: var(--lumina-space-2);">
          ${activeFeed.entries.slice(0, maxItems).map(entry => html`
            <div class="feed-item">
              <span class="feed-item-dot"></span>
              <div class="feed-item-content">
                <span class="feed-item-title">${entry.title || ''}</span>
                ${entry.summary ? html`<span class="feed-item-summary">${entry.summary}</span>` : nothing}
                <span class="feed-item-meta">
                  ${entry.source ? html`${entry.source} · ` : nothing}${entry.published ? this._formatFeedTime(entry.published) : ''}
                </span>
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  private _formatFeedTime(dateStr: string): string {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const hours = Math.floor(diff / 3600000);
      if (hours < 1) return 'Just now';
      if (hours < 24) return `${hours}h ago`;
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch { return ''; }
  }

  private _renderCalendar() {
    if (!this._config.calendar_entity) return nothing;
    const entity = this.hass.states[this._config.calendar_entity];
    if (!entity) return nothing;

    const title = (entity.attributes.message as string) || entity.state;
    const start = entity.attributes.start_time as string;
    const timeStr = start ? new Date(start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

    if (!title || title === 'off') return nothing;

    return html`
      <div>
        <span class="section-label">Next Event</span>
        <div class="calendar-item" style="margin-top: var(--lumina-space-2);">
          <ha-icon icon="mdi:calendar"></ha-icon>
          <div class="calendar-item-info">
            <span class="calendar-item-title">${title}</span>
            ${timeStr ? html`<span class="calendar-item-time">${timeStr}</span>` : nothing}
          </div>
        </div>
      </div>
    `;
  }
}
