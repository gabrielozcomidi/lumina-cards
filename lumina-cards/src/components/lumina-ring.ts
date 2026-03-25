import { LitElement, html, css, PropertyValues, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { luminaTokens } from '../styles/tokens';
import { computeArcDash } from '../utils/svg-helpers';

@customElement('lumina-ring')
export class LuminaRing extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: String }) color = 'var(--lumina-primary)';
  @property({ type: String, attribute: 'track-color' }) trackColor = 'var(--lumina-outline-variant)';
  @property({ type: Number }) size = 120;
  @property({ type: Number, attribute: 'stroke-width' }) strokeWidth = 3;
  @property({ type: Number, attribute: 'arc-span' }) arcSpan = 270;
  @property({ type: Boolean, attribute: 'show-glow' }) showGlow = true;
  @property({ type: Boolean }) inactive = false;

  static styles = [
    luminaTokens,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .ring-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      svg {
        overflow: visible;
        transform: rotate(var(--ring-rotation));
      }

      .track {
        fill: none;
        stroke-linecap: round;
        opacity: 0.4;
      }

      .value-arc {
        fill: none;
        stroke-linecap: round;
        transition: stroke-dashoffset 400ms cubic-bezier(0.4, 0, 0.2, 1),
                    stroke 250ms ease;
      }

      .value-arc.with-glow {
        filter: url(#lumina-ring-glow);
      }

      .center-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        text-align: center;
      }

      :host([inactive]) .value-arc {
        opacity: 0.2;
      }

      :host([inactive]) .track {
        opacity: 0.2;
      }
    `,
  ];

  private get radius(): number {
    return (this.size - this.strokeWidth * 2) / 2;
  }

  private get center(): number {
    return this.size / 2;
  }

  private get rotationDeg(): number {
    // Rotate SVG so the arc gap is at the bottom
    return (360 - this.arcSpan) / 2 + 90;
  }

  protected render() {
    const { radius, center } = this;
    const { dashArray, dashOffset } = computeArcDash(
      radius,
      this.value,
      this.min,
      this.max,
      this.arcSpan,
    );

    // Track dash (full arc length)
    const { dashArray: trackDashArray } = computeArcDash(
      radius,
      this.max,
      this.min,
      this.max,
      this.arcSpan,
    );

    return html`
      <div class="ring-container" style="width:${this.size}px;height:${this.size}px;">
        <svg
          width="${this.size}"
          height="${this.size}"
          viewBox="0 0 ${this.size} ${this.size}"
          style="--ring-rotation: ${this.rotationDeg}deg"
        >
          <defs>
            <filter id="lumina-ring-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <!-- Track Arc -->
          <circle
            class="track"
            cx="${center}"
            cy="${center}"
            r="${radius}"
            stroke="${this.trackColor}"
            stroke-width="${this.strokeWidth}"
            stroke-dasharray="${trackDashArray}"
            stroke-dashoffset="0"
          />

          <!-- Value Arc -->
          <circle
            class="value-arc ${this.showGlow && this.value > this.min ? 'with-glow' : ''}"
            cx="${center}"
            cy="${center}"
            r="${radius}"
            stroke="${this.inactive ? 'var(--lumina-outline)' : this.color}"
            stroke-width="${this.strokeWidth}"
            stroke-dasharray="${dashArray}"
            stroke-dashoffset="${dashOffset}"
          />
        </svg>

        <!-- Center Slot -->
        <div class="center-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
