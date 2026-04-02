import { LitElement, html, svg, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { luminaTokens } from '../../styles/tokens';
import { sharedStyles } from '../../styles/shared';
import { infoCardStyles } from './styles';
import { LuminaInfoCardConfig, InfoCardMode } from '../../types';
import { HomeAssistant } from '../../types/ha-types';

const MODE_CONFIG: Record<InfoCardMode, { icon: string; title: string; accent: string; iconColor: string }> = {
  air_quality: { icon: 'mdi:leaf', title: 'Air Quality', accent: 'rgba(111, 251, 133, 0.12)', iconColor: 'var(--lumina-tertiary-container)' },
  moon_phase: { icon: 'mdi:moon-waning-crescent', title: 'Moon Phase', accent: 'rgba(133, 173, 255, 0.10)', iconColor: 'var(--lumina-primary)' },
  precipitation: { icon: 'mdi:weather-rainy', title: 'Precipitation', accent: 'rgba(133, 173, 255, 0.12)', iconColor: 'var(--lumina-primary)' },
  sun_cycle: { icon: 'mdi:white-balance-sunny', title: 'Sun Cycle', accent: 'rgba(254, 203, 0, 0.10)', iconColor: 'var(--lumina-secondary)' },
  sun_moon: { icon: 'mdi:sun-moon-stars', title: 'Sun & Moon', accent: 'rgba(254, 203, 0, 0.08)', iconColor: 'var(--lumina-secondary)' },
  weather_alert: { icon: 'mdi:alert', title: 'Weather Alerts', accent: 'rgba(254, 203, 0, 0.10)', iconColor: 'var(--lumina-secondary)' },
};

const AQI_LEVELS: { max: number; label: string; color: string }[] = [
  { max: 50, label: 'Good', color: 'var(--lumina-tertiary-container)' },
  { max: 100, label: 'Moderate', color: 'var(--lumina-secondary)' },
  { max: 150, label: 'Unhealthy (Sensitive)', color: '#ff9800' },
  { max: 200, label: 'Unhealthy', color: 'var(--lumina-error)' },
  { max: 300, label: 'Very Unhealthy', color: '#9c27b0' },
  { max: Infinity, label: 'Hazardous', color: '#7e0023' },
];

const MOON_PHASES: Record<string, { label: string; illumination: number }> = {
  new_moon: { label: 'New Moon', illumination: 0 },
  waxing_crescent: { label: 'Waxing Crescent', illumination: 25 },
  first_quarter: { label: 'First Quarter', illumination: 50 },
  waxing_gibbous: { label: 'Waxing Gibbous', illumination: 75 },
  full_moon: { label: 'Full Moon', illumination: 100 },
  waning_gibbous: { label: 'Waning Gibbous', illumination: 75 },
  last_quarter: { label: 'Last Quarter', illumination: 50 },
  waning_crescent: { label: 'Waning Crescent', illumination: 25 },
};

@customElement('ha-lumina-info-card')
export class HaLuminaInfoCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: LuminaInfoCardConfig;

  static styles = [luminaTokens, sharedStyles, infoCardStyles];

  static getConfigElement(): HTMLElement {
    return document.createElement('ha-lumina-info-card-editor');
  }

  static getStubConfig(): Record<string, unknown> {
    return { type: 'custom:ha-lumina-info-card', mode: 'sun_cycle', entity: 'sun.sun' };
  }

  public setConfig(config: LuminaInfoCardConfig): void {
    if (!config.mode) throw new Error('Please select a mode');
    if (!config.entity) throw new Error('Please select an entity');
    this._config = { ...config };
  }

  public getCardSize(): number { return 4; }

  private get _entity() {
    if (!this.hass || !this._config?.entity) return undefined;
    return this.hass.states[this._config.entity];
  }

  private get _mode(): InfoCardMode { return this._config?.mode || 'sun_cycle'; }

  private get _moonEntity() {
    if (!this.hass || !this._config?.moon_entity) return undefined;
    return this.hass.states[this._config.moon_entity];
  }

  // ── Render ──

  protected render() {
    if (!this._config || !this.hass || !this._entity) return nothing;

    const mode = this._mode;
    const mc = MODE_CONFIG[mode];
    let accent = mc.accent;
    let iconColor = mc.iconColor;
    let badgeText = '';

    // Dynamic accent for AQI
    if (mode === 'air_quality') {
      const val = parseFloat(this._entity.state) || 0;
      const level = AQI_LEVELS.find(l => val <= l.max) || AQI_LEVELS[AQI_LEVELS.length - 1];
      iconColor = level.color;
      badgeText = level.label;
      if (val > 100) accent = 'rgba(255, 113, 108, 0.12)';
      else if (val > 50) accent = 'rgba(254, 203, 0, 0.10)';
    }

    // Dynamic accent for alerts
    if (mode === 'weather_alert') {
      const s = this._entity.state;
      if (s === 'off' || s === 'none' || s === '0' || s === 'unavailable') {
        accent = 'rgba(111, 251, 133, 0.08)';
        iconColor = 'var(--lumina-tertiary-container)';
      }
    }

    const title = this._config.name || mc.title;

    return html`
      <ha-card>
        <div class="info-card" style="--info-accent: ${accent}; --info-icon-color: ${iconColor};">
          ${mode === 'weather_alert' ? html`<div class="alert-strip" style="--alert-color: ${iconColor};"></div>` : nothing}
          <div class="info-tint"></div>
          <div class="info-content">
            <div class="info-header">
              <ha-icon .icon=${mc.icon}></ha-icon>
              <span class="info-title">${title}</span>
              ${badgeText ? html`<span class="info-badge" style="--info-badge-color: ${iconColor};">${badgeText}</span>` : nothing}
            </div>
            ${mode === 'air_quality' ? this._renderAirQuality() : nothing}
            ${mode === 'moon_phase' ? this._renderMoonPhase() : nothing}
            ${mode === 'precipitation' ? this._renderPrecipitation() : nothing}
            ${mode === 'sun_cycle' ? this._renderSunCycle() : nothing}
            ${mode === 'sun_moon' ? this._renderSunMoon() : nothing}
            ${mode === 'weather_alert' ? this._renderWeatherAlert() : nothing}
          </div>
        </div>
      </ha-card>
    `;
  }

  // ── Air Quality ──

  private _renderAirQuality() {
    const val = parseFloat(this._entity!.state) || 0;
    const level = AQI_LEVELS.find(l => val <= l.max) || AQI_LEVELS[AQI_LEVELS.length - 1];
    const pct = Math.min(val / 300, 1);
    const attrs = this._entity!.attributes;

    const radius = 40;
    const stroke = 5;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - pct);

    return html`
      <div class="aqi-body">
        <div class="aqi-ring-wrap">
          ${svg`
            <svg class="aqi-ring-svg" width="100" height="100" viewBox="0 0 100 100">
              <circle class="track" cx="50" cy="50" r="${radius}" stroke-width="${stroke}" />
              <circle class="value-arc" cx="50" cy="50" r="${radius}" stroke-width="${stroke}"
                stroke="${level.color}" stroke-dasharray="${circumference}" stroke-dashoffset="${dashOffset}"
                transform="rotate(-90 50 50)" stroke-linecap="round" />
            </svg>
          `}
          <span class="aqi-ring-label">${Math.round(val)}</span>
          <span class="aqi-ring-sublabel">AQI</span>
        </div>
        <div class="aqi-info">
          <span class="aqi-level" style="color: ${level.color};">${level.label}</span>
          ${attrs.pm25 != null || attrs.pm2_5 != null ? html`<span class="aqi-pollutant">PM2.5: ${attrs.pm25 ?? attrs.pm2_5}</span>` : nothing}
          ${attrs.pm10 != null ? html`<span class="aqi-pollutant">PM10: ${attrs.pm10}</span>` : nothing}
        </div>
      </div>
    `;
  }

  // ── Moon Phase ──

  private _renderMoonPhase() {
    const state = this._entity!.state;
    const phase = MOON_PHASES[state] || { label: state.replace(/_/g, ' '), illumination: 50 };
    const illum = (this._entity!.attributes.illumination as number) ?? phase.illumination;

    // SVG moon: circle with a clipping path for illumination
    const moonR = 36;
    const cx = 44;
    const cy = 44;
    // Simple crescent: offset a clipping circle
    const offset = moonR * 2 * (1 - illum / 100) - moonR;

    return html`
      <div class="moon-body">
        ${svg`
          <svg class="moon-svg" width="88" height="88" viewBox="0 0 88 88">
            <defs>
              <mask id="moonmask">
                <rect width="88" height="88" fill="white" />
                <circle cx="${cx + offset}" cy="${cy}" r="${moonR}" fill="black" />
              </mask>
            </defs>
            <circle cx="${cx}" cy="${cy}" r="${moonR}" fill="#252528" />
            <circle cx="${cx}" cy="${cy}" r="${moonR}" fill="#85adff" mask="url(#moonmask)" opacity="0.9" />
            <circle cx="${cx}" cy="${cy}" r="${moonR}" fill="none" stroke="rgba(133,173,255,0.2)" stroke-width="1" />
          </svg>
        `}
        <span class="moon-name">${phase.label}</span>
        <span class="moon-illumination">${Math.round(illum)}% Illuminated</span>
      </div>
    `;
  }

  // ── Precipitation ──

  private _renderPrecipitation() {
    const attrs = this._entity!.attributes;
    const val = parseFloat(this._entity!.state) || 0;
    const unit = (attrs.unit_of_measurement as string) || 'mm';
    const prob = (attrs.precipitation_probability as number) ?? (attrs.probability as number) ?? null;

    return html`
      <div class="precip-body">
        <div class="precip-main">
          <span class="precip-amount">${val}<span class="precip-amount-unit"> ${unit}</span></span>
          <span class="precip-label">Expected today</span>
        </div>
        ${prob != null ? html`
          <div class="precip-prob-wrap">
            <span class="precip-prob">${Math.round(prob)}%</span>
            <span class="precip-prob-label">Chance</span>
          </div>
        ` : nothing}
        ${prob != null ? html`
          <div class="precip-bar-wrap">
            <div class="precip-bar-fill" style="height: ${prob}%;"></div>
          </div>
        ` : nothing}
      </div>
    `;
  }

  // ── Sun Cycle ──

  private _renderSunCycle() {
    const attrs = this._entity!.attributes;
    const rising = attrs.next_rising as string;
    const setting = attrs.next_setting as string;
    const elevation = attrs.elevation as number;

    const sunriseTime = rising ? new Date(rising).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--';
    const sunsetTime = setting ? new Date(setting).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--';

    // Calculate sun position on arc (0 = sunrise, 1 = sunset)
    let sunPos = 0.5;
    const isUp = elevation != null && elevation > 0;
    if (rising && setting) {
      const now = Date.now();
      let riseMs = new Date(rising).getTime();
      let setMs = new Date(setting).getTime();

      if (isUp) {
        // When sun is up, next_rising is TOMORROW. Estimate today's sunrise ~24h earlier.
        if (riseMs > now) riseMs -= 86400000;
        // next_setting should be today's sunset (still upcoming)
        const dayLen = setMs - riseMs;
        if (dayLen > 0) {
          sunPos = Math.max(0, Math.min(1, (now - riseMs) / dayLen));
        }
      } else {
        // Sun is down. next_setting might be tomorrow's.
        sunPos = -1; // below horizon, won't render dot
      }
    }

    // SVG arc
    const arcCx = 100;
    const arcCy = 90;
    const arcR = 80;
    const startAngle = Math.PI;
    const endAngle = 0;
    const arcStart = { x: arcCx + arcR * Math.cos(startAngle), y: arcCy + arcR * Math.sin(startAngle) };
    const arcEnd = { x: arcCx + arcR * Math.cos(endAngle), y: arcCy + arcR * Math.sin(endAngle) };
    const trackD = `M ${arcStart.x} ${arcStart.y} A ${arcR} ${arcR} 0 0 1 ${arcEnd.x} ${arcEnd.y}`;

    // Sun dot position
    const sunAngle = Math.PI - (sunPos * Math.PI);
    const dotX = arcCx + arcR * Math.cos(sunAngle);
    const dotY = arcCy + arcR * Math.sin(sunAngle);

    // Daylight calculation — use corrected rise/set times
    let daylightStr = '';
    if (rising && setting) {
      let dlRise = new Date(rising).getTime();
      const dlSet = new Date(setting).getTime();
      if (dlRise > Date.now()) dlRise -= 86400000; // today's sunrise
      const diff = Math.abs(dlSet - dlRise);
      const hours = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      daylightStr = `${hours}h ${mins}m daylight`;
    }

    return html`
      <div class="sun-body">
        <div class="sun-arc-wrap">
          ${svg`
            <svg class="sun-arc-svg" viewBox="0 0 200 100">
              <path class="arc-track" d="${trackD}" stroke-width="3" />
              ${isUp ? svg`<path class="arc-fill" d="${trackD}" stroke-width="3"
                stroke-dasharray="${Math.PI * arcR}" stroke-dashoffset="${Math.PI * arcR * (1 - sunPos)}" />` : nothing}
              ${sunPos >= 0 && sunPos <= 1 && isUp ? svg`<circle class="sun-dot" cx="${dotX}" cy="${dotY}" r="6" />` : nothing}
            </svg>
          `}
        </div>
        <div class="sun-times">
          <div class="sun-time-item">
            <ha-icon icon="mdi:weather-sunset-up"></ha-icon>
            <span>${sunriseTime}</span>
            <span class="sun-label">Sunrise</span>
          </div>
          <div class="sun-time-item">
            <ha-icon icon="mdi:weather-sunset-down"></ha-icon>
            <span>${sunsetTime}</span>
            <span class="sun-label">Sunset</span>
          </div>
        </div>
        ${daylightStr ? html`<span class="sun-daylight">${daylightStr}</span>` : nothing}
      </div>
    `;
  }

  // ── Sun & Moon Combined ──

  private _renderSunMoon() {
    const attrs = this._entity!.attributes;
    const rising = attrs.next_rising as string;
    const setting = attrs.next_setting as string;
    const elevation = attrs.elevation as number;

    const sunriseTime = rising ? new Date(rising).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--';
    const sunsetTime = setting ? new Date(setting).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--';

    // Sun position
    let sunPos = 0.5;
    const isUp = elevation != null && elevation > 0;
    if (rising && setting) {
      const now = Date.now();
      let riseMs = new Date(rising).getTime();
      const setMs = new Date(setting).getTime();
      if (isUp) {
        if (riseMs > now) riseMs -= 86400000;
        const dayLen = setMs - riseMs;
        if (dayLen > 0) sunPos = Math.max(0, Math.min(1, (now - riseMs) / dayLen));
      } else {
        sunPos = -1;
      }
    }

    // Arc geometry (compact — smaller to leave room for moon)
    const arcCx = 100;
    const arcCy = 72;
    const arcR = 64;
    const arcStart = { x: arcCx - arcR, y: arcCy };
    const arcEnd = { x: arcCx + arcR, y: arcCy };
    const trackD = `M ${arcStart.x} ${arcStart.y} A ${arcR} ${arcR} 0 0 1 ${arcEnd.x} ${arcEnd.y}`;
    const sunAngle = Math.PI - (sunPos * Math.PI);
    const dotX = arcCx + arcR * Math.cos(sunAngle);
    const dotY = arcCy + arcR * Math.sin(sunAngle);

    // Moon data
    const moonEnt = this._moonEntity;
    let moonPhaseLabel = '';
    let moonIllum = 0;
    let moonOffset = 0;
    const moonR = 14;
    if (moonEnt) {
      const phase = MOON_PHASES[moonEnt.state] || { label: moonEnt.state.replace(/_/g, ' '), illumination: 50 };
      moonPhaseLabel = phase.label;
      moonIllum = (moonEnt.attributes.illumination as number) ?? phase.illumination;
      moonOffset = moonR * 2 * (1 - moonIllum / 100) - moonR;
    }

    return html`
      <div class="sun-moon-body">
        <div class="sun-moon-arc-wrap">
          ${svg`
            <svg class="sun-arc-svg" viewBox="0 0 200 80">
              <path class="arc-track" d="${trackD}" stroke-width="2.5" />
              ${isUp ? svg`<path class="arc-fill" d="${trackD}" stroke-width="2.5"
                stroke-dasharray="${Math.PI * arcR}" stroke-dashoffset="${Math.PI * arcR * (1 - sunPos)}" />` : nothing}
              ${sunPos >= 0 && sunPos <= 1 && isUp ? svg`<circle class="sun-dot" cx="${dotX}" cy="${dotY}" r="5" />` : nothing}
            </svg>
          `}
        </div>
        <div class="sun-moon-row">
          <div class="sun-time-item">
            <ha-icon icon="mdi:weather-sunset-up"></ha-icon>
            <span>${sunriseTime}</span>
            <span class="sun-label">Sunrise</span>
          </div>
          ${moonEnt ? html`
            <div class="sun-moon-center">
              ${svg`
                <svg class="mini-moon-svg" width="32" height="32" viewBox="0 0 32 32">
                  <defs>
                    <mask id="minimoonmask">
                      <rect width="32" height="32" fill="white" />
                      <circle cx="${16 + moonOffset}" cy="16" r="${moonR}" fill="black" />
                    </mask>
                  </defs>
                  <circle cx="16" cy="16" r="${moonR}" fill="#252528" />
                  <circle cx="16" cy="16" r="${moonR}" fill="#85adff" mask="url(#minimoonmask)" opacity="0.85" />
                </svg>
              `}
              <span class="mini-moon-label">${moonPhaseLabel}</span>
              <span class="mini-moon-illum">${Math.round(moonIllum)}%</span>
            </div>
          ` : nothing}
          <div class="sun-time-item">
            <ha-icon icon="mdi:weather-sunset-down"></ha-icon>
            <span>${sunsetTime}</span>
            <span class="sun-label">Sunset</span>
          </div>
        </div>
      </div>
    `;
  }

  // ── Weather Alert ──

  private _renderWeatherAlert() {
    const state = this._entity!.state;
    const attrs = this._entity!.attributes;
    const isActive = state !== 'off' && state !== 'none' && state !== '0' && state !== 'unavailable' && state !== 'unknown';

    if (!isActive) {
      return html`
        <div class="alert-clear">
          <ha-icon icon="mdi:check-circle"></ha-icon>
          <span>No Active Alerts</span>
        </div>
      `;
    }

    const title = (attrs.headline as string) || (attrs.title as string) || (attrs.friendly_name as string) || 'Weather Alert';
    const desc = (attrs.description as string) || (attrs.status as string) || state;
    const severity = (attrs.severity as string) || '';
    const source = (attrs.source as string) || '';
    const expires = attrs.expires as string;
    const expiresStr = expires ? new Date(expires).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : '';

    let alertColor = 'var(--lumina-secondary)'; // yellow default
    if (severity.toLowerCase().includes('warning') || severity.toLowerCase().includes('severe')) {
      alertColor = 'var(--lumina-error)';
    } else if (severity.toLowerCase().includes('watch')) {
      alertColor = '#ff9800';
    }

    return html`
      <div class="alert-body" style="--alert-color: ${alertColor};">
        <div class="alert-icon-wrap">
          <ha-icon icon="mdi:alert"></ha-icon>
          <div>
            <div class="alert-title">${title}</div>
            <div class="alert-meta">${[source, expiresStr ? `Expires ${expiresStr}` : ''].filter(Boolean).join(' • ')}</div>
          </div>
        </div>
        <div class="alert-desc">${desc}</div>
      </div>
    `;
  }
}
