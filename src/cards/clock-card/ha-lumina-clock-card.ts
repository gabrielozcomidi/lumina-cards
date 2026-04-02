import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { luminaTokens } from '../../styles/tokens';
import { sharedStyles } from '../../styles/shared';
import { clockCardStyles } from './styles';
import { LuminaClockCardConfig, WorldClockEntry } from '../../types';
import { HomeAssistant } from '../../types/ha-types';

function getGreeting(hour: number): string {
  if (hour < 5) return 'Night';
  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  if (hour < 21) return 'Evening';
  return 'Night';
}

function formatDate(date: Date): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const d = date.getDate();
  const suffix = d === 1 || d === 21 || d === 31 ? 'st' : d === 2 || d === 22 ? 'nd' : d === 3 || d === 23 ? 'rd' : 'th';
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${d}${suffix}, ${date.getFullYear()}`;
}

function getWorldClockTime(tz: string, is24h: boolean): { time: string; hour: number; dayLabel: string } {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    hour12: !is24h,
  };
  let time: string;
  try {
    time = now.toLocaleTimeString([], options);
  } catch {
    time = '--:--';
  }

  let hour = 12;
  try {
    hour = parseInt(new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', hour12: false }).format(now));
  } catch { /* ignore */ }

  // Day label
  let dayLabel = '';
  try {
    const localDay = now.getDate();
    const tzDay = parseInt(new Intl.DateTimeFormat('en-US', { timeZone: tz, day: 'numeric' }).format(now));
    if (tzDay > localDay) dayLabel = 'Tomorrow';
    else if (tzDay < localDay) dayLabel = 'Yesterday';
    else dayLabel = 'Today';
  } catch { /* ignore */ }

  return { time, hour, dayLabel };
}

@customElement('ha-lumina-clock-card')
export class HaLuminaClockCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: LuminaClockCardConfig;
  @state() private _time = new Date();

  private _timer?: ReturnType<typeof setInterval>;

  static styles = [luminaTokens, sharedStyles, clockCardStyles];

  static getConfigElement(): HTMLElement {
    return document.createElement('ha-lumina-clock-card-editor');
  }

  static getStubConfig(): Record<string, unknown> {
    return {
      type: 'custom:ha-lumina-clock-card',
      time_format: '24h',
      show_date: true,
      show_greeting: true,
    };
  }

  public setConfig(config: LuminaClockCardConfig): void {
    this._config = {
      time_format: '24h',
      show_date: true,
      show_greeting: true,
      show_seconds: false,
      ...config,
    };
  }

  public getCardSize(): number {
    const l = this._config?.layout || 'full';
    if (l === 'compact') return 1;
    if (l === 'room') return 4;
    return 6;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._tick();
    this._timer = setInterval(() => this._tick(), 1000);
  }

  disconnectedCallback(): void {
    if (this._timer) clearInterval(this._timer);
    super.disconnectedCallback();
  }

  private _tick(): void {
    this._time = new Date();
  }

  private get _is24h(): boolean { return this._config?.time_format !== '12h'; }
  private get _layout(): string { return this._config?.layout || 'full'; }
  private get _noBg(): boolean { return this._config?.show_background === false; }

  private _formatTime(date: Date): { main: string; period: string; seconds: string } {
    let h = date.getHours();
    const m = date.getMinutes().toString().padStart(2, '0');
    const s = date.getSeconds().toString().padStart(2, '0');
    let period = '';

    if (!this._is24h) {
      period = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
    }

    const hStr = this._is24h ? h.toString().padStart(2, '0') : h.toString();
    return { main: `${hStr}:${m}`, period, seconds: this._config?.show_seconds ? `:${s}` : '' };
  }

  protected render() {
    if (!this._config) return nothing;

    const layout = this._layout;
    if (layout === 'compact') return this._renderCompact();
    if (layout === 'room') return this._renderRoom();
    return this._renderFull();
  }

  private _renderFull() {
    const { main, period, seconds } = this._formatTime(this._time);
    const hour = this._time.getHours();
    const greeting = getGreeting(hour);
    const location = this._config.name || '';
    const worldClocks = this._config.world_clocks || [];

    return html`
      <ha-card>
        <div class="clock-card ${this._noBg ? 'no-bg' : ''}"
          <div class="clock-tint"></div>
          <div class="clock-content">
            <div class="clock-hero">
              ${this._config.show_greeting !== false ? html`
                <span class="clock-greeting">Good ${greeting}</span>
              ` : nothing}
              ${location ? html`<span class="clock-location">${location}</span>` : nothing}
              <span class="clock-time">${main}${seconds ? html`<span class="seconds">${seconds}</span>` : nothing}${period ? html`<span class="period">${period}</span>` : nothing}</span>
              ${this._config.show_date !== false ? html`
                <span class="clock-date">${formatDate(this._time)}</span>
              ` : nothing}
            </div>
            ${worldClocks.length ? this._renderWorldClocks(worldClocks) : nothing}
          </div>
        </div>
      </ha-card>
    `;
  }

  private _renderRoom() {
    const { main, period, seconds } = this._formatTime(this._time);
    const hour = this._time.getHours();
    const greeting = getGreeting(hour);
    const location = this._config.name || '';
    const worldClocks = this._config.world_clocks || [];

    return html`
      <ha-card>
        <div class="clock-card room ${this._noBg ? 'no-bg' : ''}"
          <div class="clock-tint"></div>
          <div class="clock-content">
            <div class="clock-hero">
              ${this._config.show_greeting !== false ? html`
                <span class="clock-greeting">Good ${greeting}${location ? ` in ${location}` : ''}</span>
              ` : nothing}
              <span class="clock-time">${main}${seconds ? html`<span class="seconds">${seconds}</span>` : nothing}${period ? html`<span class="period">${period}</span>` : nothing}</span>
              ${this._config.show_date !== false ? html`
                <span class="clock-date">${formatDate(this._time)}</span>
              ` : nothing}
            </div>
            ${worldClocks.length ? this._renderWorldClocks(worldClocks) : nothing}
          </div>
        </div>
      </ha-card>
    `;
  }

  private _renderCompact() {
    const { main, period } = this._formatTime(this._time);
    const worldClocks = this._config.world_clocks || [];

    return html`
      <ha-card>
        <div class="clock-card compact ${this._noBg ? 'no-bg' : ''}"
          <div class="clock-tint"></div>
          <div class="compact-clock-row">
            <ha-icon class="compact-clock-icon" icon="mdi:clock-outline"></ha-icon>
            <span class="compact-clock-time">${main}${period ? html`<span class="period">${period}</span>` : nothing}</span>
            ${this._config.show_date !== false ? html`
              <span class="compact-clock-date">${formatDate(this._time)}</span>
            ` : nothing}
            <span class="compact-clock-spacer"></span>
            ${worldClocks.slice(0, 3).map(wc => {
              const { time } = getWorldClockTime(wc.timezone, this._is24h);
              return html`<span class="compact-world-item"><span class="cw-city">${wc.city}</span> ${time}</span>`;
            })}
          </div>
        </div>
      </ha-card>
    `;
  }

  private _renderWorldClocks(clocks: WorldClockEntry[]) {
    return html`
      <div>
        <span class="world-clocks-label">World Clock</span>
        <div class="world-clocks" style="margin-top: var(--lumina-space-2);">
          ${clocks.map(wc => {
            const { time, hour, dayLabel } = getWorldClockTime(wc.timezone, this._is24h);
            const isDay = hour >= 6 && hour < 20;
            return html`
              <div class="world-clock-row">
                <span class="world-clock-dot ${isDay ? 'day' : 'night'}"></span>
                <span class="world-clock-city">${wc.city}</span>
                <span class="world-clock-time">${time}</span>
                ${dayLabel && dayLabel !== 'Today' ? html`<span class="world-clock-day-label">${dayLabel}</span>` : nothing}
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}
