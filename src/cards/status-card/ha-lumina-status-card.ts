import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { luminaTokens } from '../../styles/tokens';
import { sharedStyles } from '../../styles/shared';
import { statusCardStyles } from './styles';
import { LuminaStatusCardConfig, StatusChipConfig } from '../../types';
import { HomeAssistant } from '../../types/ha-types';

function getGreeting(hour: number): string {
  if (hour < 5) return 'Good Night';
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  if (hour < 21) return 'Good Evening';
  return 'Good Night';
}

const WEATHER_ICONS: Record<string, string> = {
  'sunny': 'mdi:weather-sunny',
  'clear-night': 'mdi:weather-night',
  'partlycloudy': 'mdi:weather-partly-cloudy',
  'cloudy': 'mdi:weather-cloudy',
  'rainy': 'mdi:weather-rainy',
  'pouring': 'mdi:weather-pouring',
  'snowy': 'mdi:weather-snowy',
  'fog': 'mdi:weather-fog',
  'lightning': 'mdi:weather-lightning',
  'windy': 'mdi:weather-windy',
};

@customElement('ha-lumina-status-card')
export class HaLuminaStatusCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: LuminaStatusCardConfig;

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

  public setConfig(config: LuminaStatusCardConfig): void {
    this._config = {
      show_greeting: true,
      show_lights_summary: true,
      ...config,
    };
  }

  public getCardSize(): number { return 4; }

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
    return Object.values(this.hass.states).filter(
      (e) => e.entity_id.startsWith('light.') && e.state === 'on',
    ).length;
  }

  private _getPeopleStatus(): { name: string; home: boolean }[] {
    if (!this.hass || !this._config.person_entities?.length) return [];
    return this._config.person_entities.map((id) => {
      const entity = this.hass.states[id];
      return {
        name: (entity?.attributes?.friendly_name as string) || id.split('.').pop() || id,
        home: entity?.state === 'home',
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
            ${this._renderFeed()}
            ${this._renderCalendar()}
          </div>
        </div>
      </ha-card>
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
        ${totalPeople > 0 ? html`
          <span class="greeting-sub">${peopleHome} of ${totalPeople} ${totalPeople === 1 ? 'person' : 'people'} home</span>
        ` : nothing}
      </div>
    `;
  }

  private _renderPeople() {
    const people = this._getPeopleStatus();
    if (!people.length) return nothing;

    return html`
      <div class="people-section">
        ${people.map(p => html`
          <span class="person-chip ${p.home ? 'home' : ''}">
            <span class="person-dot"></span>
            ${p.name}
          </span>
        `)}
      </div>
    `;
  }

  private _renderChips() {
    const chips: { icon: string; label: string; value: string; cls: string }[] = [];

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
          icon: WEATHER_ICONS[condition] || 'mdi:weather-cloudy',
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

    // Lights
    if (this._config.show_lights_summary) {
      const count = this._getActiveLightCount();
      chips.push({
        icon: 'mdi:lightbulb-group',
        label: 'Lighting',
        value: `${count} Active`,
        cls: 'lights',
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

    if (!chips.length) return nothing;

    return html`
      <div class="chips-grid">
        ${chips.map(c => html`
          <div class="status-chip ${c.cls}">
            <ha-icon icon="${c.icon}"></ha-icon>
            <div class="status-chip-info">
              <span class="status-chip-label">${c.label}</span>
              <span class="status-chip-value">${c.value}</span>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  private _renderFeed() {
    if (!this._config.rss_entity) return nothing;
    const entity = this.hass.states[this._config.rss_entity];
    if (!entity) return nothing;

    // Feedparser integration stores entries in attributes.entries
    const entries = (entity.attributes.entries as any[]) || [];
    if (!entries.length) return nothing;

    return html`
      <div>
        <span class="section-label">News</span>
        <div class="feed-section" style="margin-top: var(--lumina-space-2);">
          ${entries.slice(0, 5).map(entry => html`
            <div class="feed-item">
              <span class="feed-item-dot"></span>
              <div class="feed-item-content">
                <span class="feed-item-title">${entry.title || ''}</span>
                ${entry.published ? html`<span class="feed-item-meta">${this._formatFeedTime(entry.published)}</span>` : nothing}
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
