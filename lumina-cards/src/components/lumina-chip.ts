import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { luminaTokens } from '../styles/tokens';

@customElement('lumina-chip')
export class LuminaChip extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) icon = '';
  @property({ type: Boolean, reflect: true }) active = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) variant: 'default' | 'primary' | 'secondary' | 'tertiary' | 'error' = 'default';
  @property({ type: String }) size: 'sm' | 'md' = 'md';

  static styles = [
    luminaTokens,
    css`
      :host {
        display: inline-flex;
      }

      button {
        display: inline-flex;
        align-items: center;
        gap: var(--lumina-space-2);
        border: 1px solid var(--lumina-ghost-border);
        border-radius: var(--lumina-radius-full);
        font-family: var(--lumina-font-body);
        font-weight: 500;
        cursor: pointer;
        transition: all var(--lumina-transition-fast);
        background: var(--lumina-surface-container-high);
        color: var(--lumina-on-surface);
        white-space: nowrap;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
      }

      :host([size='md']) button {
        padding: var(--lumina-space-2) var(--lumina-space-4);
        font-size: 0.8125rem;
        height: 36px;
      }

      :host([size='sm']) button {
        padding: var(--lumina-space-1) var(--lumina-space-3);
        font-size: 0.75rem;
        height: 28px;
      }

      button:hover {
        background: var(--lumina-surface-bright);
        border-color: var(--lumina-outline-variant);
      }

      button:active {
        transform: scale(0.96);
      }

      /* ─── Active States ─────────────────────────── */
      :host([active]) button {
        background: rgba(133, 173, 255, 0.15);
        border-color: rgba(133, 173, 255, 0.3);
        color: var(--lumina-primary);
      }

      :host([active][variant='secondary']) button {
        background: rgba(254, 203, 0, 0.12);
        border-color: rgba(254, 203, 0, 0.25);
        color: var(--lumina-secondary);
      }

      :host([active][variant='tertiary']) button {
        background: rgba(111, 251, 133, 0.12);
        border-color: rgba(111, 251, 133, 0.25);
        color: var(--lumina-tertiary);
      }

      :host([active][variant='error']) button {
        background: rgba(255, 113, 108, 0.12);
        border-color: rgba(255, 113, 108, 0.25);
        color: var(--lumina-error);
      }

      /* ─── Disabled ──────────────────────────────── */
      :host([disabled]) button {
        opacity: 0.4;
        pointer-events: none;
        cursor: default;
      }

      /* ─── Icon ──────────────────────────────────── */
      .chip-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        line-height: 1;
      }

      :host([size='sm']) .chip-icon {
        font-size: 16px;
      }

      ha-icon {
        --mdc-icon-size: 18px;
      }

      :host([size='sm']) ha-icon {
        --mdc-icon-size: 16px;
      }
    `,
  ];

  protected render() {
    return html`
      <button ?disabled=${this.disabled} part="button">
        ${this.icon
          ? html`<span class="chip-icon"><ha-icon .icon=${this.icon}></ha-icon></span>`
          : ''}
        ${this.label ? html`<span class="chip-label">${this.label}</span>` : ''}
      </button>
    `;
  }
}
