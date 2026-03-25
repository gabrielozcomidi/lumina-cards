import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { luminaTokens } from '../styles/tokens';

@customElement('lumina-slider')
export class LuminaSlider extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property({ type: String }) color = 'var(--lumina-primary)';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) variant: 'default' | 'gradient' = 'default';
  @property({ type: Boolean, attribute: 'show-value' }) showValue = false;

  static styles = [
    luminaTokens,
    css`
      :host {
        display: flex;
        align-items: center;
        gap: var(--lumina-space-3);
        width: 100%;
      }

      .slider-track {
        flex: 1;
        position: relative;
        height: 36px;
        display: flex;
        align-items: center;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }

      .track-bg {
        width: 100%;
        height: var(--lumina-slider-height, 6px);
        border-radius: var(--lumina-radius-full);
        background: var(--lumina-surface-container-highest);
        position: relative;
        overflow: hidden;
      }

      .track-fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        border-radius: var(--lumina-radius-full);
        transition: width 50ms linear;
      }

      .track-fill.default-fill {
        background: var(--slider-color);
      }

      .track-fill.gradient-fill {
        background: linear-gradient(
          90deg,
          #ffb347 0%,
          #fff4e0 30%,
          #e0ecff 70%,
          #85adff 100%
        );
      }

      input[type='range'] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        margin: 0;
        -webkit-appearance: none;
      }

      .thumb {
        position: absolute;
        top: 50%;
        width: var(--lumina-slider-thumb, 18px);
        height: var(--lumina-slider-thumb, 18px);
        border-radius: var(--lumina-radius-full);
        background: var(--slider-color);
        transform: translate(-50%, -50%);
        pointer-events: none;
        transition: left 50ms linear, box-shadow var(--lumina-transition-fast);
        box-shadow: 0 0 8px rgba(133, 173, 255, 0.3);
      }

      .thumb.gradient-thumb {
        background: var(--lumina-on-surface);
        box-shadow: 0 0 8px rgba(254, 251, 254, 0.3);
      }

      .slider-track:hover .thumb {
        box-shadow: 0 0 14px rgba(133, 173, 255, 0.5);
      }

      .slider-track:active .thumb {
        transform: translate(-50%, -50%) scale(1.15);
      }

      .value-label {
        font-family: var(--lumina-font-body);
        font-size: 0.8125rem;
        font-weight: 500;
        color: var(--lumina-on-surface);
        min-width: 36px;
        text-align: right;
      }

      :host([disabled]) {
        opacity: 0.4;
        pointer-events: none;
      }
    `,
  ];

  private _getPercent(): number {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  private _onInput(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.value = Number(input.value);
    this.dispatchEvent(
      new CustomEvent('value-changed', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected render() {
    const percent = this._getPercent();
    const isGradient = this.variant === 'gradient';

    return html`
      <div class="slider-track" style="--slider-color: ${this.color}">
        <div class="track-bg">
          <div
            class="track-fill ${isGradient ? 'gradient-fill' : 'default-fill'}"
            style="width: ${isGradient ? '100%' : `${percent}%`}"
          ></div>
        </div>
        <div
          class="thumb ${isGradient ? 'gradient-thumb' : ''}"
          style="left: ${percent}%"
        ></div>
        <input
          type="range"
          .value=${String(this.value)}
          min=${this.min}
          max=${this.max}
          step=${this.step}
          ?disabled=${this.disabled}
          @input=${this._onInput}
        />
      </div>
      ${this.showValue
        ? html`<span class="value-label">${Math.round(this.value)}</span>`
        : ''}
    `;
  }
}
