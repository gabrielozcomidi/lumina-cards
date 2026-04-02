import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { luminaTokens } from '../../styles/tokens';
import { bottomBarStyles } from './styles';
import { LuminaBottomBarConfig, BottomBarItem } from '../../types';
import { HomeAssistant } from '../../types/ha-types';

@customElement('ha-lumina-bottom-bar')
export class HaLuminaBottomBar extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: LuminaBottomBarConfig;
  @state() private _currentPath = '';

  static styles = [luminaTokens, bottomBarStyles];

  // ─── HA Custom Card API ──────────────────────────────────

  static getConfigElement(): string {
    return 'ha-lumina-bottom-bar-editor';
  }

  static getStubConfig(): Record<string, unknown> {
    return {
      items: [
        { icon: 'mdi:home', label: 'Home', path: '/lovelace/0' },
        { icon: 'mdi:view-grid', label: 'Rooms', path: '/lovelace/1' },
        { icon: 'mdi:lightning-bolt', label: 'Auto', path: '/lovelace/2' },
        { icon: 'mdi:cog', label: 'Settings', path: '/lovelace/3' },
      ],
    };
  }

  public setConfig(config: LuminaBottomBarConfig): void {
    if (!config.items || !Array.isArray(config.items)) {
      throw new Error('Please define at least one navigation item');
    }
    this._config = { ...config };
  }

  public getCardSize(): number {
    return 0; // bar is fixed-positioned, takes no layout space
  }

  // ─── Lifecycle ───────────────────────────────────────────

  connectedCallback(): void {
    super.connectedCallback();
    this._currentPath = window.location.pathname;
    window.addEventListener('popstate', this._onLocationChange);
    window.addEventListener('location-changed', this._onLocationChange);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('popstate', this._onLocationChange);
    window.removeEventListener('location-changed', this._onLocationChange);
  }

  private _onLocationChange = (): void => {
    const newPath = window.location.pathname;
    if (newPath !== this._currentPath) {
      this._currentPath = newPath;
    }
  };

  // ─── Notification Helpers ────────────────────────────────

  private _isNotifying(item: BottomBarItem): boolean {
    if (!item.notification_entity || !this.hass) return false;
    const stateObj = this.hass.states[item.notification_entity];
    if (!stateObj) return false;
    const s = stateObj.state;
    return s === 'on' || s === 'true' || (Number(s) > 0 && !isNaN(Number(s)));
  }

  private _badgeValue(item: BottomBarItem): string | null {
    if (!item.notification_entity || !this.hass) return null;
    const stateObj = this.hass.states[item.notification_entity];
    if (!stateObj) return null;
    const s = stateObj.state;
    const num = Number(s);
    if (!isNaN(num) && num > 0) return num > 99 ? '99+' : String(num);
    if (s === 'on' || s === 'true') return ''; // dot badge
    return null;
  }

  private _hasAnyNotification(): boolean {
    if (!this._config?.items) return false;
    return this._config.items.some((item) => this._isNotifying(item));
  }

  // ─── Active Path Matching ────────────────────────────────

  private _isActive(item: BottomBarItem): boolean {
    const path = this._currentPath;
    // Exact match
    if (path === item.path) return true;
    // Starts with (for nested views)
    if (item.path.length > 1 && path.startsWith(item.path + '/')) return true;
    return false;
  }

  // ─── Navigation ──────────────────────────────────────────

  private _navigate(item: BottomBarItem, e: Event): void {
    e.preventDefault();
    if (item.path === this._currentPath) return;

    // HA-style navigation
    history.pushState(null, '', item.path);
    window.dispatchEvent(new CustomEvent('location-changed'));
    this._currentPath = item.path;
  }

  // ─── Ripple ──────────────────────────────────────────────

  private _ripple(e: PointerEvent): void {
    const target = (e.currentTarget as HTMLElement);
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    target.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }

  // ─── Render ──────────────────────────────────────────────

  protected render() {
    if (!this._config?.items) return nothing;

    const floating = this._config.floating === true;
    const activeColor = this._config.active_color;
    const hasNotif = this._hasAnyNotification();

    // Find the first active notification glow color for bar-level glow
    const barGlowItem = this._config.items.find((i) => this._isNotifying(i));
    const barGlowColor = barGlowItem?.glow_color || (hasNotif ? 'rgba(255, 113, 108, 0.35)' : undefined);

    return html`
      <div class="bar-spacer"></div>
      <nav
        class="bottom-bar ${floating ? 'floating' : ''} ${hasNotif ? 'has-notification' : ''}"
        style="${activeColor ? `--bar-active-color: ${activeColor};` : ''}${barGlowColor ? `--bar-glow-color: ${barGlowColor};` : ''}"
      >
        ${this._config.items.map((item) => this._renderItem(item))}
      </nav>
    `;
  }

  private _renderItem(item: BottomBarItem) {
    const active = this._isActive(item);
    const notifying = this._isNotifying(item);
    const badge = this._badgeValue(item);
    const glowColor = item.glow_color;

    return html`
      <a
        class="nav-item ${active ? 'active' : ''} ${notifying ? 'notifying' : ''}"
        style="${glowColor && notifying ? `--item-glow-color: ${glowColor};` : ''}${glowColor && notifying ? `--badge-color: ${glowColor};` : ''}"
        @click=${(e: Event) => this._navigate(item, e)}
        @pointerdown=${this._ripple}
      >
        <ha-icon .icon=${item.icon}></ha-icon>
        <span>${item.label}</span>
        ${badge !== null
          ? html`<span class="badge ${badge === '' ? 'dot' : ''}">${badge || nothing}</span>`
          : nothing}
      </a>
    `;
  }
}
