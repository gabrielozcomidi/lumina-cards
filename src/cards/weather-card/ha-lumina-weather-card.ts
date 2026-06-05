import { html, nothing, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { luminaTokens } from '../../styles/tokens';
import { sharedStyles } from '../../styles/shared';
import { weatherCardStyles } from './styles';
import { LuminaWeatherCardConfig } from '../../types';
import { WeatherEntity, WeatherForecast } from '../../types/ha-types';
import { LuminaCardBase } from '../base';

import {
  weatherConditionIcon,
  weatherConditionTint,
  weatherConditionIconColor,
  weatherConditionLabel,
} from '../../utils/mode-mappings';

@customElement('ha-lumina-weather-card')
export class HaLuminaWeatherCard extends LuminaCardBase<LuminaWeatherCardConfig> {
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

  protected override validateConfig(config: LuminaWeatherCardConfig): void {
    if (!config.entity) throw new Error('Please select a weather entity');
  }

  protected override defaults(): Partial<LuminaWeatherCardConfig> {
    return {
      show_forecast_hourly: true,
      show_forecast_daily: true,
      show_details: true,
      hourly_count: 8,
      daily_count: 5,
    };
  }

  protected override trackedEntities(): string[] {
    return this._config?.entity ? [this._config.entity] : [];
  }

  private get _layout(): string {
    if (this._config?.layout) return this._config.layout;
    if (this._config?.compact) return 'compact';
    return 'full';
  }

  public override getCardSize(): number {
    const l = this._layout;
    if (l === 'compact') return 1;
    if (l === 'room') return 4;
    return 6;
  }

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
    const accent = weatherConditionTint(condition);
    const iconColor = weatherConditionIconColor(condition);

    const layout = this._layout;
    if (layout === 'compact') return this._renderCompact(accent, iconColor);
    if (layout === 'room') return this._renderRoom(accent, iconColor);

    return html`
      <ha-card>
        <div class="weather-card ${this._config.show_background === false ? 'no-bg' : ''}" style="--weather-accent: ${accent}; --weather-icon-color: ${iconColor};">
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

  private _renderCompact(accent: string, iconColor: string) {
    const icon = weatherConditionIcon(this._condition);
    const label = weatherConditionLabel(this._condition);
    const temp = this._temperature;
    const unit = this._tempUnit;
    const high = this._todayHigh;
    const low = this._todayLow;

    return html`
      <ha-card>
        <div class="weather-card compact ${this._config.show_background === false ? 'no-bg' : ''}" style="--weather-accent: ${accent}; --weather-icon-color: ${iconColor};">
          <div class="weather-tint"></div>
          <div class="compact-row">
            <ha-icon class="compact-icon" .icon=${icon}></ha-icon>
            <span class="compact-temp">${temp != null ? `${Math.round(temp)}${unit}` : '--'}</span>
            <span class="compact-condition">${label}</span>
            ${high != null || low != null ? html`
              <span class="compact-highlow">
                ${high != null ? html`<span class="high">H:${Math.round(high)}°</span>` : nothing}
                ${low != null ? html`<span>L:${Math.round(low)}°</span>` : nothing}
              </span>
            ` : nothing}
            <span class="compact-spacer"></span>
            ${this._humidity != null ? html`
              <span class="compact-detail">
                <ha-icon icon="mdi:water-percent"></ha-icon>${this._humidity}%
              </span>
            ` : nothing}
            ${this._windSpeed != null ? html`
              <span class="compact-detail">
                <ha-icon icon="mdi:weather-windy"></ha-icon>${this._windSpeed}
              </span>
            ` : nothing}
          </div>
        </div>
      </ha-card>
    `;
  }

  private _renderRoom(accent: string, iconColor: string) {
    const icon = weatherConditionIcon(this._condition);
    const label = weatherConditionLabel(this._condition);
    const temp = this._temperature;
    const unit = this._tempUnit;
    const high = this._todayHigh;
    const low = this._todayLow;
    const count = this._config.hourly_count || 6;
    const hourlyItems = this._hourlyForecast.slice(0, count);
    const now = new Date();

    return html`
      <ha-card>
        <div class="weather-card room ${this._config.show_background === false ? 'no-bg' : ''}" style="--weather-accent: ${accent}; --weather-icon-color: ${iconColor};">
          <div class="weather-tint"></div>
          <div class="room-layout">
            <!-- Top: header row -->
            <div class="weather-header">
              <span class="location-name">${this._locationName}</span>
              <span class="condition-badge">${label}</span>
            </div>

            <!-- Middle: icon + temp side by side -->
            <div class="room-hero">
              <div class="room-hero-left">
                <ha-icon class="room-hero-icon" .icon=${icon}></ha-icon>
              </div>
              <div class="room-hero-right">
                <span class="room-hero-temp">${temp != null ? `${Math.round(temp)}${unit}` : '--'}</span>
                ${high != null || low != null ? html`
                  <div class="room-hero-highlow">
                    ${high != null ? html`<span class="high">H: ${Math.round(high)}°</span>` : nothing}
                    ${low != null ? html`<span>L: ${Math.round(low)}°</span>` : nothing}
                  </div>
                ` : nothing}
              </div>
            </div>

            <!-- Bottom: mini detail chips -->
            <div class="room-details">
              ${this._windSpeed != null ? html`
                <span class="room-detail-item">
                  <ha-icon icon="mdi:weather-windy"></ha-icon>${this._windSpeed} ${this._windUnit}
                </span>
              ` : nothing}
              ${this._humidity != null ? html`
                <span class="room-detail-item">
                  <ha-icon icon="mdi:water-percent"></ha-icon>${this._humidity}%
                </span>
              ` : nothing}
              ${this._uvIndex != null ? html`
                <span class="room-detail-item">
                  <ha-icon icon="mdi:white-balance-sunny"></ha-icon>UV ${this._uvIndex}
                </span>
              ` : nothing}
            </div>

            <!-- Hourly mini-scroll -->
            ${hourlyItems.length ? html`
              <div class="hourly-scroll">
                ${hourlyItems.map((f, i) => {
                  const dt = new Date(f.datetime);
                  const isNow = i === 0 && Math.abs(dt.getTime() - now.getTime()) < 3600000;
                  const timeLabel = isNow ? 'Now' : dt.toLocaleTimeString([], { hour: 'numeric' });
                  const fIcon = weatherConditionIcon(f.condition);
                  return html`
                    <div class="hourly-slot ${isNow ? 'now' : ''}">
                      <span class="hourly-time">${timeLabel}</span>
                      <ha-icon class="hourly-icon" .icon=${fIcon}></ha-icon>
                      <span class="hourly-temp">${Math.round(f.temperature)}°</span>
                    </div>
                  `;
                })}
              </div>
            ` : nothing}
          </div>
        </div>
      </ha-card>
    `;
  }

  private _renderHeader() {
    const label = weatherConditionLabel(this._condition);
    return html`
      <div class="weather-header">
        <span class="location-name">${this._locationName}</span>
        <span class="condition-badge">${label}</span>
      </div>
    `;
  }

  private _renderHero() {
    const icon = weatherConditionIcon(this._condition);
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
            const icon = weatherConditionIcon(f.condition);
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
            const icon = weatherConditionIcon(f.condition);
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
