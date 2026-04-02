import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { luminaTokens } from '../../styles/tokens';
import { bottomBarStyles } from './styles';
import { LuminaBottomBarConfig, BottomBarItem, BottomBarAction } from '../../types';
import { HomeAssistant } from '../../types/ha-types';

const MAX_ITEMS = 5;

@customElement('ha-lumina-bottom-bar')
export class HaLuminaBottomBar extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: LuminaBottomBarConfig;
  @state() private _currentPath = '';
  @state() private _confirmIndex: number | null = null;
  @state() private _editMode = false;

  private _confirmTimer: ReturnType<typeof setTimeout> | null = null;
  private _holdTimer: ReturnType<typeof setTimeout> | null = null;
  private _held = false;
  private _editObserver: MutationObserver | null = null;

  static styles = [luminaTokens, bottomBarStyles];

  // ─── HA Custom Card API ──────────────────────────────────

  static getConfigElement(): HTMLElement {
    return document.createElement('ha-lumina-bottom-bar-editor');
  }

  static getStubConfig(): Record<string, unknown> {
    return {
      items: [
        { icon: 'mdi:home', label: 'Home', tap_action: { action: 'navigate', navigation_path: '/lovelace/0' } },
        { icon: 'mdi:view-grid', label: 'Rooms', tap_action: { action: 'navigate', navigation_path: '/lovelace/1' } },
        { icon: 'mdi:lightning-bolt', label: 'Auto', tap_action: { action: 'navigate', navigation_path: '/lovelace/2' } },
        { icon: 'mdi:cog', label: 'Settings', tap_action: { action: 'navigate', navigation_path: '/lovelace/3' } },
      ],
    };
  }

  public setConfig(config: LuminaBottomBarConfig): void {
    if (!config.items || !Array.isArray(config.items)) {
      throw new Error('Please define at least one navigation item');
    }
    if (config.items.length > MAX_ITEMS) {
      throw new Error(`Maximum ${MAX_ITEMS} items allowed`);
    }
    this._config = { ...config };
  }

  public getCardSize(): number {
    return 0;
  }

  // ─── Lifecycle ───────────────────────────────────────────

  connectedCallback(): void {
    super.connectedCallback();
    this._currentPath = window.location.pathname;
    window.addEventListener('popstate', this._onLocationChange);
    window.addEventListener('location-changed', this._onLocationChange);
    this._detectEditMode();
    this._observeEditMode();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('popstate', this._onLocationChange);
    window.removeEventListener('location-changed', this._onLocationChange);
    if (this._confirmTimer) clearTimeout(this._confirmTimer);
    if (this._holdTimer) clearTimeout(this._holdTimer);
    if (this._editObserver) { this._editObserver.disconnect(); this._editObserver = null; }
  }

  private _detectEditMode(): void {
    // HA adds a query param or the card is inside a hui-card-edit-mode / dialog
    const inDialog = !!this.closest('ha-dialog, hui-dialog-edit-card, ha-more-info-dialog');
    const editToolbar = !!document.querySelector('hui-editor, hui-card-editor, .edit-mode');
    const urlEdit = window.location.search.includes('edit=1');
    this._editMode = inDialog || editToolbar || urlEdit;
  }

  private _observeEditMode(): void {
    // Watch for HA adding/removing edit dialogs
    this._editObserver = new MutationObserver(() => this._detectEditMode());
    this._editObserver.observe(document.body, { childList: true, subtree: true });
  }

  private _onLocationChange = (): void => {
    const newPath = window.location.pathname;
    if (newPath !== this._currentPath) {
      this._currentPath = newPath;
    }
  };

  // ─── Action Execution ────────────────────────────────────

  private _executeAction(action: BottomBarAction | undefined, itemIndex: number): void {
    if (!action || action.action === 'none' || !this.hass) return;

    // Confirmation gate: first tap sets confirm state, second tap executes
    if (action.confirmation && this._confirmIndex !== itemIndex) {
      this._confirmIndex = itemIndex;
      if (this._confirmTimer) clearTimeout(this._confirmTimer);
      this._confirmTimer = setTimeout(() => { this._confirmIndex = null; }, 2000);
      return;
    }
    // Clear confirmation
    this._confirmIndex = null;
    if (this._confirmTimer) { clearTimeout(this._confirmTimer); this._confirmTimer = null; }

    // Haptic feedback
    if (action.haptic !== false) {
      this._haptic();
    }

    switch (action.action) {
      case 'navigate':
        if (action.navigation_path) {
          history.pushState(null, '', action.navigation_path);
          window.dispatchEvent(new CustomEvent('location-changed'));
          this._currentPath = action.navigation_path;
        }
        break;

      case 'toggle':
        if (action.entity) {
          this.hass.callService('homeassistant', 'toggle', { entity_id: action.entity });
        }
        break;

      case 'call-service':
        if (action.service) {
          const [domain, service] = action.service.split('.', 2);
          if (domain && service) {
            this.hass.callService(domain, service, action.service_data || {});
          }
        }
        break;

      case 'more-info':
        if (action.entity) {
          const event = new CustomEvent('hass-more-info', {
            bubbles: true, composed: true,
            detail: { entityId: action.entity },
          });
          this.dispatchEvent(event);
        }
        break;

      case 'url':
        if (action.url) {
          window.open(action.url, '_blank');
        }
        break;
    }
  }

  private _haptic(): void {
    try {
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
      // HA native haptic event
      const event = new Event('haptic');
      window.dispatchEvent(event);
    } catch { /* ignore */ }
  }

  // ─── Tap & Hold Handlers ─────────────────────────────────

  private _onPointerDown(index: number, e: PointerEvent): void {
    this._held = false;
    const item = this._config.items[index];
    this._ripple(e);

    if (item.hold_action && item.hold_action.action !== 'none') {
      this._holdTimer = setTimeout(() => {
        this._held = true;
        this._executeAction(item.hold_action, index);
      }, 500);
    }
  }

  private _onPointerUp(index: number, e: Event): void {
    if (this._holdTimer) { clearTimeout(this._holdTimer); this._holdTimer = null; }
    if (this._held) { this._held = false; return; }

    e.preventDefault();
    const item = this._config.items[index];
    this._executeAction(item.tap_action, index);
  }

  private _onPointerCancel = (): void => {
    if (this._holdTimer) { clearTimeout(this._holdTimer); this._holdTimer = null; }
    this._held = false;
  };

  // ─── State Helpers ───────────────────────────────────────

  private _entityIsOn(entityId: string | undefined): boolean {
    if (!entityId || !this.hass) return false;
    const stateObj = this.hass.states[entityId];
    if (!stateObj) return false;
    const s = stateObj.state;
    return s === 'on' || s === 'home' || s === 'open' || s === 'playing' ||
           s === 'armed_home' || s === 'armed_away' || s === 'armed_night';
  }

  private _resolveIcon(item: BottomBarItem): string {
    if (!item.state_entity) return item.icon;
    const isOn = this._entityIsOn(item.state_entity);
    if (isOn && item.icon_on) return item.icon_on;
    if (!isOn && item.icon_off) return item.icon_off;
    return item.icon;
  }

  // ─── Notification / Badge ────────────────────────────────

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
    if (s === 'on' || s === 'true') return '';
    return null;
  }

  private _hasAnyNotification(): boolean {
    if (!this._config?.items) return false;
    return this._config.items.some((item) => this._isNotifying(item));
  }

  // ─── Active Detection ────────────────────────────────────

  private _isActive(item: BottomBarItem): boolean {
    const action = item.tap_action;
    if (action?.action !== 'navigate' || !action.navigation_path) return false;
    const path = this._currentPath;
    const navPath = action.navigation_path;
    if (path === navPath) return true;
    if (navPath.length > 1 && path.startsWith(navPath + '/')) return true;
    return false;
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
    if (this._editMode) return html`<div style="padding:16px; text-align:center; color:var(--lumina-on-surface-variant); font-family:var(--lumina-font-body); font-size:0.8125rem; opacity:0.6;">Bottom bar hidden in edit mode</div>`;

    const floating = this._config.floating === true;
    const activeColor = this._config.active_color;
    const hasNotif = this._hasAnyNotification();

    const barGlowItem = this._config.items.find((i) => this._isNotifying(i));
    const barGlowColor = barGlowItem?.glow_color || (hasNotif ? 'rgba(255, 113, 108, 0.35)' : undefined);

    return html`
      <div class="bar-spacer"></div>
      <nav
        class="bottom-bar ${floating ? 'floating' : ''} ${hasNotif ? 'has-notification' : ''}"
        style="${activeColor ? `--bar-active-color: ${activeColor};` : ''}${barGlowColor ? `--bar-glow-color: ${barGlowColor};` : ''}"
      >
        ${this._config.items.map((item, i) => this._renderItem(item, i))}
      </nav>
    `;
  }

  private _renderItem(item: BottomBarItem, index: number) {
    const active = this._isActive(item);
    const notifying = this._isNotifying(item);
    const badge = this._badgeValue(item);
    const glowColor = item.glow_color;
    const isHero = item.hero === true;
    const entityOn = this._entityIsOn(item.state_entity);
    const confirming = this._confirmIndex === index;
    const icon = this._resolveIcon(item);

    const classes = [
      'nav-item',
      active ? 'active' : '',
      notifying ? 'notifying' : '',
      isHero ? 'hero' : '',
      entityOn && item.state_entity ? 'entity-on' : '',
      confirming ? 'confirming' : '',
    ].filter(Boolean).join(' ');

    return html`
      <a
        class="${classes}"
        style="${glowColor && notifying ? `--item-glow-color: ${glowColor}; --badge-color: ${glowColor};` : ''}"
        @pointerdown=${(e: PointerEvent) => this._onPointerDown(index, e)}
        @pointerup=${(e: Event) => this._onPointerUp(index, e)}
        @pointercancel=${this._onPointerCancel}
        @contextmenu=${(e: Event) => e.preventDefault()}
      >
        ${isHero ? html`<span class="hero-bg"></span>` : nothing}
        <ha-icon .icon=${icon}></ha-icon>
        <span>${confirming ? 'Confirm?' : item.label}</span>
        ${badge !== null
          ? html`<span class="badge ${badge === '' ? 'dot' : ''}">${badge || nothing}</span>`
          : nothing}
      </a>
    `;
  }
}
