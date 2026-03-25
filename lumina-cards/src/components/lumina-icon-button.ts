import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { luminaTokens } from '../styles/tokens';

@customElement('lumina-icon-button')
export class LuminaIconButton extends LitElement {
  @property({ type: String }) icon = '';
  @property({ type: Boolean, reflect: true }) active = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: String }) variant: 'default' | 'primary' | 'filled' = 'default';

  static styles = [
    luminaTokens,
    css`
      :host {
        display: inline-flex;
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--lumina-ghost-border);
        border-radius: var(--lumina-radius-full);
        background: var(--lumina-surface-container-high);
        color: var(--lumina-on-surface);
        cursor: pointer;
        transition: all var(--lumina-transition-fast);
        -webkit-tap-highlight-color: transparent;
        user-select: none;
        padding: 0;
      }

      /* ─── Sizes ─────────────────────────────────── */
      :host([size='sm']) button {
        width: 32px;
        height: 32px;
      }

      button,
      :host([size='md']) button {
        width: 40px;
        height: 40px;
      }

      :host([size='lg']) button {
        width: 56px;
        height: 56px;
      }

      /* ─── Variants ──────────────────────────────── */
      :host([variant='filled']) button {
        background: var(--lumina-primary);
        color: var(--lumina-on-primary);
        border-color: transparent;
      }

      :host([variant='filled']) button:hover {
        box-shadow: 0 0 20px rgba(133, 173, 255, 0.5);
      }

      /* ─── States ────────────────────────────────── */
      button:hover {
        background: var(--lumina-surface-bright);
        border-color: var(--lumina-outline-variant);
      }

      button:active {
        transform: scale(0.92);
      }

      :host([active]) button {
        background: rgba(133, 173, 255, 0.15);
        border-color: rgba(133, 173, 255, 0.3);
        color: var(--lumina-primary);
      }

      :host([disabled]) button {
        opacity: 0.4;
        pointer-events: none;
      }

      /* ─── Icon ──────────────────────────────────── */
      ha-icon {
        --mdc-icon-size: 22px;
        display: flex;
      }

      :host([size='sm']) ha-icon {
        --mdc-icon-size: 18px;
      }

      :host([size='lg']) ha-icon {
        --mdc-icon-size: 28px;
      }
    `,
  ];

  protected render() {
    return html`
      <button ?disabled=${this.disabled} part="button">
        <ha-icon .icon=${this.icon}></ha-icon>
      </button>
    `;
  }
}
