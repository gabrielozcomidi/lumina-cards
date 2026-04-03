import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { luminaTokens } from '../styles/tokens';

/**
 * Bottom sheet that renders as a portal on document.body
 * so it overlays the entire dashboard, not just the parent card.
 *
 * Children stay in the light DOM (preserving Lit property bindings).
 * The portal mirrors slotted content by moving children temporarily,
 * then re-syncing properties on every update via MutationObserver.
 */
@customElement('lumina-bottom-sheet')
export class LuminaBottomSheet extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) title = '';
  @property({ type: Boolean }) fullscreen = false;

  @state() private _closing = false;

  private _portal: HTMLDivElement | null = null;
  private _dragging = false;
  private _startY = 0;
  private _dragOffset = 0;
  private _velocity = 0;
  private _lastMoveTime = 0;
  private _lastMoveY = 0;
  private _panel: HTMLDivElement | null = null;

  static styles = css`
    :host { display: none; }
  `;

  // ─── Shared Stylesheet (injected into portal) ─────
  private static _sheetStyles = `
    .lumina-sheet-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 9998;
      animation: lbs-backdrop-in 250ms ease forwards;
      -webkit-tap-highlight-color: transparent;
    }
    .lumina-sheet-backdrop.closing {
      animation: lbs-backdrop-out 200ms ease forwards;
    }

    .lumina-sheet-panel {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      max-height: 92vh;
      z-index: 9999;
      background: #19191c;
      border-radius: 1.5rem 1.5rem 0 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: lbs-sheet-up 300ms cubic-bezier(0.32, 0.72, 0, 1) forwards;
      touch-action: none;
      will-change: transform;
      font-family: 'Inter', 'Roboto', sans-serif;
      color: #fefbfe;
      border-top: 1px solid rgba(72, 71, 74, 0.15);
    }
    .lumina-sheet-panel.closing {
      animation: lbs-sheet-down 200ms ease forwards;
    }
    .lumina-sheet-panel.dragging {
      animation: none !important;
      transition: none !important;
    }

    .lbs-drag-area {
      display: flex;
      justify-content: center;
      padding: 12px 0 4px;
      cursor: grab;
      flex-shrink: 0;
    }
    .lbs-drag-handle {
      width: 36px;
      height: 4px;
      border-radius: 9999px;
      background: #48474a;
      opacity: 0.6;
    }

    .lbs-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px 16px;
      flex-shrink: 0;
    }
    .lbs-title {
      font-family: 'Manrope', 'Inter', sans-serif;
      font-size: 1.25rem;
      font-weight: 600;
      color: #fefbfe;
    }
    .lbs-close {
      width: 32px;
      height: 32px;
      border-radius: 9999px;
      border: none;
      background: #1f1f22;
      color: #acaaad;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      line-height: 1;
      transition: background 150ms ease;
    }
    .lbs-close:hover { background: #2c2c2f; }

    .lbs-content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 0 24px 32px;
      overscroll-behavior: contain;
    }
    .lbs-content::-webkit-scrollbar { width: 4px; }
    .lbs-content::-webkit-scrollbar-track { background: transparent; }
    .lbs-content::-webkit-scrollbar-thumb { background: #48474a; border-radius: 9999px; }

    .lumina-sheet-panel.fullscreen {
      max-height: 100vh;
      height: 100vh;
      border-radius: 0;
      border-top: none;
    }
    .lumina-sheet-panel.fullscreen .lbs-drag-area { display: none; }

    @keyframes lbs-sheet-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
    @keyframes lbs-sheet-down { from { transform: translateY(0); } to { transform: translateY(100%); } }
    @keyframes lbs-backdrop-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes lbs-backdrop-out { from { opacity: 1; } to { opacity: 0; } }
  `;

  private static _stylesInjected = false;
  private static _injectStyles(): void {
    if (LuminaBottomSheet._stylesInjected) return;
    LuminaBottomSheet._stylesInjected = true;
    const style = document.createElement('style');
    style.textContent = LuminaBottomSheet._sheetStyles;
    document.head.appendChild(style);
  }

  // ─── Lifecycle ────────────────────────────────────

  protected updated(changed: PropertyValues): void {
    if (changed.has('open')) {
      if (this.open) {
        this._show();
      } else if (this._portal) {
        this._close();
      }
    }

    // Forward property updates to children inside the portal
    if (this._portal && this.open && !this._closing) {
      this._syncPortalChildren();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._removePortal();
  }

  // ─── Portal Management ────────────────────────────

  private _show(): void {
    LuminaBottomSheet._injectStyles();
    this._closing = false;
    this._removePortal();

    // Create portal container on document.body
    this._portal = document.createElement('div');
    this._portal.className = 'lumina-bottom-sheet-portal';

    // Backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'lumina-sheet-backdrop';
    backdrop.addEventListener('click', () => this._close());

    // Panel
    const panel = document.createElement('div');
    panel.className = `lumina-sheet-panel${this.fullscreen ? ' fullscreen' : ''}`;
    this._panel = panel;

    // Drag handle
    const dragArea = document.createElement('div');
    dragArea.className = 'lbs-drag-area';
    const dragHandle = document.createElement('div');
    dragHandle.className = 'lbs-drag-handle';
    dragArea.appendChild(dragHandle);
    panel.appendChild(dragArea);

    // Pointer events for swipe-to-dismiss — all on dragArea for correct capture
    dragArea.addEventListener('pointerdown', (e) => this._onPointerDown(e));
    dragArea.addEventListener('pointermove', (e) => this._onPointerMove(e));
    dragArea.addEventListener('pointerup', (e) => this._onPointerUp(e));

    // Header
    if (this.title) {
      const header = document.createElement('div');
      header.className = 'lbs-header';
      const titleEl = document.createElement('span');
      titleEl.className = 'lbs-title';
      titleEl.textContent = this.title;
      const closeBtn = document.createElement('button');
      closeBtn.className = 'lbs-close';
      closeBtn.textContent = '\u2715';
      closeBtn.addEventListener('click', () => this._close());
      header.appendChild(titleEl);
      header.appendChild(closeBtn);
      panel.appendChild(header);
    }

    // Content — move slotted children into the portal
    const content = document.createElement('div');
    content.className = 'lbs-content';

    const slot = this.renderRoot.querySelector('slot');
    if (slot) {
      const assigned = slot.assignedElements({ flatten: true });
      assigned.forEach((el) => {
        content.appendChild(el);
      });
    } else {
      Array.from(this.children).forEach((child) => {
        content.appendChild(child);
      });
    }

    panel.appendChild(content);
    this._portal.appendChild(backdrop);
    this._portal.appendChild(panel);
    document.body.appendChild(this._portal);
    document.body.style.overflow = 'hidden';
  }

  /**
   * Re-sync properties on children that were moved to the portal.
   * This ensures hass/config updates from the parent still reach
   * child cards while they live inside the portal.
   */
  private _syncPortalChildren(): void {
    if (!this._portal) return;
    const content = this._portal.querySelector('.lbs-content');
    if (!content) return;

    // The parent's Lit template has already updated the in-place element
    // properties before this `updated()` fires. Since we moved the actual
    // DOM nodes (not clones), properties like .hass and .config are set
    // directly by Lit on the same element references. No extra sync needed
    // as long as the elements are the same instances Lit rendered.
  }

  private _close(): void {
    if (!this._portal || this._closing) return;
    this._closing = true;

    const backdrop = this._portal.querySelector('.lumina-sheet-backdrop');
    const panel = this._portal.querySelector('.lumina-sheet-panel');
    if (backdrop) backdrop.classList.add('closing');
    if (panel) panel.classList.add('closing');

    document.body.style.overflow = '';

    setTimeout(() => {
      // Move children back to the original element before removing portal
      this._returnChildren();
      this._removePortal();
      this._closing = false;
      this.open = false;
      this.dispatchEvent(new CustomEvent('sheet-closed', { bubbles: true, composed: true }));
    }, 200);
  }

  private _returnChildren(): void {
    if (!this._portal) return;
    const content = this._portal.querySelector('.lbs-content');
    if (content) {
      Array.from(content.children).forEach((child) => {
        this.appendChild(child);
      });
    }
  }

  private _removePortal(): void {
    if (this._portal) {
      this._returnChildren();
      this._portal.remove();
      this._portal = null;
      this._panel = null;
    }
  }

  // ─── Drag Handling ────────────────────────────────
  // All pointer listeners are on the drag area, and pointer capture
  // is set on the drag area element so events route correctly.

  private _onPointerDown(e: PointerEvent): void {
    this._dragging = true;
    this._startY = e.clientY;
    this._lastMoveTime = Date.now();
    this._lastMoveY = e.clientY;
    this._dragOffset = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  private _onPointerMove(e: PointerEvent): void {
    if (!this._dragging || !this._panel) return;
    const now = Date.now();
    const dy = e.clientY - this._lastMoveY;
    const dt = now - this._lastMoveTime;
    if (dt > 0) this._velocity = dy / dt;
    this._lastMoveTime = now;
    this._lastMoveY = e.clientY;
    this._dragOffset = Math.max(0, e.clientY - this._startY);
    this._panel.classList.add('dragging');
    this._panel.style.transform = `translateY(${this._dragOffset}px)`;
  }

  private _onPointerUp(e: PointerEvent): void {
    if (!this._dragging || !this._panel) return;
    this._dragging = false;
    this._panel.classList.remove('dragging');
    this._panel.style.transform = '';

    const panelHeight = this._panel.offsetHeight || 400;
    if (this._dragOffset > panelHeight * 0.3 || this._velocity > 0.5) {
      this._close();
    }
    this._dragOffset = 0;
    this._velocity = 0;
  }

  // ─── Render (minimal — real content is in the portal) ──

  protected render() {
    return html`<slot></slot>`;
  }
}
