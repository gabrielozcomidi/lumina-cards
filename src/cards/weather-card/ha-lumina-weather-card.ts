import { LitElement, html, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { luminaTokens } from '../../styles/tokens';
import { sharedStyles } from '../../styles/shared';
import { weatherCardStyles } from './styles';
import { LuminaWeatherCardConfig } from '../../types';
import { HomeAssistant, WeatherEntity, WeatherForecast } from '../../types/ha-types';

const CONDITION_ICONS: Record<string, string> = {
  'sunny': 'mdi:weather-sunny',
  'clear-night': 'mdi:weather-night',
  'partlycloudy': 'mdi:weather-partly-cloudy',
  'cloudy': 'mdi:weather-cloudy',
  'rainy': 'mdi:weather-rainy',
  'pouring': 'mdi:weather-pouring',
  'snowy': 'mdi:weather-snowy',
  'snowy-rainy': 'mdi:weather-snowy-rainy',
  'fog': 'mdi:weather-fog',
  'hail': 'mdi:weather-hail',
  'lightning': 'mdi:weather-lightning',
  'lightning-rainy': 'mdi:weather-lightning-rainy',
  'windy': 'mdi:weather-windy',
  'windy-variant': 'mdi:weather-windy-variant',
  'exceptional': 'mdi:alert-circle-outline',
};

const CONDITION_ACCENTS: Record<string, string> = {
  'sunny': 'rgba(254, 203, 0, 0.12)',
  'clear-night': 'rgba(133, 173, 255, 0.08)',
  'partlycloudy': 'rgba(133, 173, 255, 0.06)',
  'cloudy': 'rgba(118, 117, 119, 0.08)',
  'rainy': 'rgba(81, 145, 255, 0.12)',
  'pouring': 'rgba(81, 145, 255, 0.15)',
  'snowy': 'rgba(184, 255, 185, 0.08)',
  'snowy-rainy': 'rgba(184, 255, 185, 0.06)',
  'fog': 'rgba(172, 170, 173, 0.1)',
  'hail': 'rgba(133, 173, 255, 0.1)',
  'lightning': 'rgba(255, 113, 108, 0.12)',
  'lightning-rainy': 'rgba(255, 113, 108, 0.10)',
  'windy': 'rgba(108, 159, 255, 0.08)',
  'windy-variant': 'rgba(108, 159, 255, 0.08)',
  'exceptional': 'rgba(255, 113, 108, 0.1)',
};

const CONDITION_ICON_COLORS: Record<string, string> = {
  'sunny': 'var(--lumina-secondary)',
  'clear-night': 'var(--lumina-primary)',
  'partlycloudy': 'var(--lumina-on-surface-variant)',
  'cloudy': 'var(--lumina-outline)',
  'rainy': 'var(--lumina-primary)',
  'pouring': 'var(--lumina-primary)',
  'snowy': 'var(--lumina-tertiary)',
  'snowy-rainy': 'var(--lumina-tertiary)',
  'fog': 'var(--lumina-outline)',
  'hail': 'var(--lumina-primary)',
  'lightning': 'var(--lumina-error)',
  'lightning-rainy': 'var(--lumina-error)',
  'windy': 'var(--lumina-primary)',
  'windy-variant': 'var(--lumina-primary)',
  'exceptional': 'var(--lumina-error)',
};

const CONDITION_LABELS: Record<string, string> = {
  'sunny': 'Sunny',
  'clear-night': 'Clear Night',
  'partlycloudy': 'Partly Cloudy',
  'cloudy': 'Cloudy',
  'rainy': 'Rainy',
  'pouring': 'Heavy Rain',
  'snowy': 'Snowy',
  'snowy-rainy': 'Sleet',
  'fog': 'Foggy',
  'hail': 'Hail',
  'lightning': 'Thunderstorm',
  'lightning-rainy': 'Thunderstorm',
  'windy': 'Windy',
  'windy-variant': 'Windy',
  'exceptional': 'Exceptional',
};

@customElement('ha-lumina-weather-card')
export class HaLuminaWeatherCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: LuminaWeatherCardConfig;
  @state() private _hourlyForecast: WeatherForecast[] = [];
  @state() private _dailyForecast: WeatherForecast[] = [];

  private _subscribedEntity: string | null = null;
  private _unsubHourly?: () => void;
  private _unsubDaily?: () => void;

  static styles = [luminaTokens, sharedStyles, weatherCardStyles];

  // --- HA Custom Card API ---

  static getConfigElement(): HTMLElement {
    return document.createElement('ha-lumina-weather-card-editor');
  }

  static getStubConfig(): Record<string, unknown> {
    return { type: 'custom:ha-lumina-weather-card', entity: '' };
  }

  public setConfig(config: LuminaWeatherCardConfig): void {
    if (!config.entity) throw new Error('Please select a weather entity');
    this._config = {
      show_forecast_hourly: true,
      show_forecast_daily: true,
      show_details: true,
      hourly_count: 8,
      daily_count: 5,
      ...config,
    };
  }

  public getCardSize(): number { return 6; }

  // --- Lifecycle ---

  connectedCallback(): void {
    super.connectedCallback();
    this._subscribeForecast();
  }

  disconnectedCallback(): void {
    this._unsubscribeForecast();
    super.disconnectedCallback();
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('hass') && this._config?.entity && this._config.entity !== this._subscribedEntity) {
      this._subscribeForecast();
    }
  }

  // --- Forecast Subscription ---

  private async _subscribeForecast(): Promise<void> {
    this._unsubscribeForecast();
    if (!this.hass || !this._config?.entity) return;

    this._subscribedEntity = this._config.entity;
    const conn = (this.hass as any).connection;
    if (!conn?.subscribeMessage) return;

    if (this._config.show_forecast_hourly !== false) {
      try {
        this._unsubHourly = await conn.subscribeMessage(
          (msg: any) => { this._hourlyForecast = msg.forecast || []; },
          { type: 'weather/subscribe_forecast', forecast_type: 'hourly', entity_id: this._config.entity },
        );
      } catch { /* entity may not support hourly */ }
    }

    if (this._config.show_forecast_daily !== false) {
      try {
        this._unsubDaily = await conn.subscribeMessage(
          (msg: any) => { this._dailyForecast = msg.forecast || []; },
          { type: 'weather/subscribe_forecast', forecast_type: 'daily', entity_id: this._config.entity },
        );
      } catch { /* entity may not support daily */ }
    }
  }

  private _unsubscribeForecast(): void {
    this._unsubHourly?.();
    this._unsubHourly = undefined;
    this._unsubDaily?.();
    this._unsubDaily = undefined;
    this._subscribedEntity = null;
  }

  // --- Entity Getters ---

  private get _entity(): WeatherEntity | undefined {
    if (!this.hass || !this._config?.entity) return undefined;
    return this.hass.states[this._config.entity] as unknown as WeatherEntity;
  }

  private get _condition(): string { return this._entity?.state || 'unknown'; }
  private get _temperature(): number | null {
    const t = this._entity?.attributes?.temperature;
    return t != null ? t : null;
  }
  private get _tempUnit(): string { return this._entity?.attributes?.temperature_unit || '°'; }
  private get _humidity(): number | null { return this._entity?.attributes?.humidity ?? null; }
  private get _windSpeed(): number | null { return this._entity?.attributes?.wind_speed ?? null; }
  private get _windUnit(): string { return this._entity?.attributes?.wind_speed_unit || 'km/h'; }
  private get _pressure(): number | null { return this._entity?.attributes?.pressure ?? null; }
  private get _pressureUnit(): string { return this._entity?.attributes?.pressure_unit || 'hPa'; }
  private get _uvIndex(): number | null { return (this._entity?.attributes?.uv_index as number) ?? null; }
  private get _locationName(): string { return this._config?.name || this._entity?.attributes?.friendly_name || 'Weather'; }

  private get _todayHigh(): number | null {
    if (this._dailyForecast.length > 0) return this._dailyForecast[0].temperature;
    return null;
  }
  private get _todayLow(): number | null {
    if (this._dailyForecast.length > 0) return this._dailyForecast[0].templow ?? null;
    return null;
  }

  // --- Render ---

  protected render() {
    if (!this._config || !this.hass || !this._entity) return nothing;

    const condition = this._condition;
    const accent = CONDITION_ACCENTS[condition] || 'transparent';
    const iconColor = CONDITION_ICON_COLORS[condition] || 'var(--lumina-on-surface-variant)';

    return html`
      <ha-card>
        <div class="weather-card" style="--weather-accent: ${accent}; --weather-icon-color: ${iconColor};">
          <div class="weather-tint"></div>
          <div class="weather-content">
            ${this._renderHeader()}
            ${this._renderHero()}
            ${this._config.show_details !== false ? this._renderDetails() : nothing}
            ${this._config.show_forecast_hourly !== false && this._hourlyForecast.length ? this._renderHourly() : nothing}
            ${this._config.show_forecast_daily !== false && this._dailyForecast.length ? this._renderDaily() : nothing}
          </div>
        </div>
      </ha-card>
    `;
  }

  private _renderHeader() {
    const label = CONDITION_LABELS[this._condition] || this._condition;
    return html`
      <div class="weather-header">
        <span class="location-name">${this._locationName}</span>
        <span class="condition-badge">${label}</span>
      </div>
    `;
  }

  private _renderHero() {
    const icon = CONDITION_ICONS[this._condition] || 'mdi:weather-cloudy';
    const temp = this._temperature;
    const unit = this._tempUnit;
    const high = this._todayHigh;
    const low = this._todayLow;

    return html`
      <div class="hero-section">
        <ha-icon class="hero-icon" .icon=${icon}></ha-icon>
        <span class="hero-temp">${temp != null ? `${Math.round(temp)}${unit}` : '--'}</span>
        ${high != null || low != null ? html`
          <div class="hero-highlow">
            ${high != null ? html`<span class="high">H: ${Math.round(high)}°</span>` : nothing}
            ${low != null ? html`<span>L: ${Math.round(low)}°</span>` : nothing}
          </div>
        ` : nothing}
      </div>
    `;
  }

  private _renderDetails() {
    return html`
      <div class="detail-chips">
        ${this._windSpeed != null ? html`
          <div class="detail-chip">
            <ha-icon icon="mdi:weather-windy"></ha-icon>
            <span class="chip-value">${this._windSpeed} ${this._windUnit}</span>
          </div>
        ` : nothing}
        ${this._humidity != null ? html`
          <div class="detail-chip">
            <ha-icon icon="mdi:water-percent"></ha-icon>
            <span class="chip-value">${this._humidity}%</span>
          </div>
        ` : nothing}
        ${this._uvIndex != null ? html`
          <div class="detail-chip">
            <ha-icon icon="mdi:white-balance-sunny"></ha-icon>
            <span class="chip-value">UV ${this._uvIndex}</span>
          </div>
        ` : nothing}
        ${this._pressure != null ? html`
          <div class="detail-chip">
            <ha-icon icon="mdi:gauge"></ha-icon>
            <span class="chip-value">${this._pressure} ${this._pressureUnit}</span>
          </div>
        ` : nothing}
      </div>
    `;
  }

  private _renderHourly() {
    const count = this._config.hourly_count || 8;
    const items = this._hourlyForecast.slice(0, count);
    const now = new Date();

    return html`
      <div>
        <div class="section-label">Hourly</div>
        <div class="hourly-scroll">
          ${items.map((f, i) => {
            const dt = new Date(f.datetime);
            const isNow = i === 0 && Math.abs(dt.getTime() - now.getTime()) < 3600000;
            const timeLabel = isNow ? 'Now' : dt.toLocaleTimeString([], { hour: 'numeric' });
            const icon = CONDITION_ICONS[f.condition] || 'mdi:weather-cloudy';
            return html`
              <div class="hourly-slot ${isNow ? 'now' : ''}">
                <span class="hourly-time">${timeLabel}</span>
                <ha-icon class="hourly-icon" .icon=${icon}></ha-icon>
                <span class="hourly-temp">${Math.round(f.temperature)}°</span>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  private _renderDaily() {
    const count = this._config.daily_count || 5;
    const items = this._dailyForecast.slice(0, count);
    if (!items.length) return nothing;

    // Compute global min/max for bar normalization
    let weekMin = Infinity, weekMax = -Infinity;
    for (const f of items) {
      if (f.templow != null && f.templow < weekMin) weekMin = f.templow;
      if (f.temperature > weekMax) weekMax = f.temperature;
      if (f.templow == null && f.temperature < weekMin) weekMin = f.temperature;
    }
    const range = weekMax - weekMin || 1;

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date().getDay();

    return html`
      <div>
        <div class="section-label">Forecast</div>
        <div class="daily-list">
          ${items.map((f, i) => {
            const dt = new Date(f.datetime);
            const dayLabel = i === 0 ? 'Today' : days[dt.getDay()];
            const icon = CONDITION_ICONS[f.condition] || 'mdi:weather-cloudy';
            const low = f.templow ?? f.temperature;
            const high = f.temperature;
            const left = ((low - weekMin) / range) * 100;
            const width = ((high - low) / range) * 100;

            return html`
              <div class="daily-row">
                <span class="daily-day">${dayLabel}</span>
                <ha-icon class="daily-icon" .icon=${icon}></ha-icon>
                <span class="daily-low">${Math.round(low)}°</span>
                <div class="daily-bar">
                  <div class="daily-bar-fill" style="left: ${left}%; width: ${Math.max(width, 4)}%;"></div>
                </div>
                <span class="daily-high">${Math.round(high)}°</span>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}
