import { css } from 'lit';

export const lightCardStyles = css`
  :host {
    display: block;
    color: var(--lumina-on-surface);
    font-family: var(--lumina-font-body);
  }

  .light-card {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-6);
  }

  /* ─── Hero Ring + All On/Off ────────────────────── */
  .hero-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lumina-space-4);
    padding: var(--lumina-space-4) 0;
  }

  .hero-value {
    font-family: var(--lumina-font-headline);
    font-size: 2rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
    line-height: 1;
  }

  .hero-label {
    font-size: 0.6875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--lumina-on-surface-variant);
    margin-top: 2px;
  }

  /* All On / All Off — directly under hero ring */
  .hero-actions {
    display: flex;
    gap: var(--lumina-space-3);
    margin-top: var(--lumina-space-1);
  }

  /* ─── Master Controls ───────────────────────────── */
  .master-controls {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-4);
  }

  .slider-row {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-2);
  }

  .slider-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .slider-label-text {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--lumina-on-surface-variant);
    display: flex;
    align-items: center;
    gap: var(--lumina-space-2);
  }

  .slider-label-text ha-icon {
    --mdc-icon-size: 18px;
  }

  .slider-value {
    font-family: var(--lumina-font-headline);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  /* ─── Individual Lights ─────────────────────────── */
  .lights-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-2);
  }

  .lights-section-header {
    font-family: var(--lumina-font-headline);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
    margin-bottom: var(--lumina-space-1);
  }

  /* ─── Light Item ────────────────────────────────── */
  .light-item {
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-lg);
    transition: background var(--lumina-transition-fast);
    overflow: hidden;
  }

  .light-item.on {
    background: rgba(254, 203, 0, 0.06);
  }

  .light-item-row {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
    padding: var(--lumina-space-2) var(--lumina-space-3);
  }

  /* ─── Circle Toggle ─────────────────────────────── */
  .light-circle {
    width: 32px;
    height: 32px;
    border-radius: var(--lumina-radius-full);
    border: 2px solid var(--lumina-outline-variant);
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: all var(--lumina-transition-normal);
    -webkit-tap-highlight-color: transparent;
    touch-action: none;
    position: relative;
    padding: 0;
  }

  .light-circle ha-icon {
    --mdc-icon-size: 14px;
    color: var(--lumina-outline);
    transition: color var(--lumina-transition-normal);
  }

  .light-circle.on {
    border-color: var(--lumina-secondary);
    background: rgba(254, 203, 0, 0.15);
    box-shadow: 0 0 10px rgba(254, 203, 0, 0.25);
  }

  .light-circle.on ha-icon {
    color: var(--lumina-secondary);
  }

  .light-circle:active {
    transform: scale(0.9);
  }

  .light-circle::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: var(--lumina-radius-full);
    border: 1px solid transparent;
    transition: border-color 0.3s ease;
  }

  .light-circle.pressing::after {
    border-color: rgba(133, 173, 255, 0.4);
    animation: lp-pulse 0.6s ease-in-out;
  }

  @keyframes lp-pulse {
    0% { transform: scale(1); opacity: 0; }
    50% { transform: scale(1.15); opacity: 1; }
    100% { transform: scale(1.2); opacity: 0; }
  }

  /* ─── Light Info + Small Slider ─────────────────── */
  .light-item-info {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
  }

  .light-item-name {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--lumina-on-surface);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 60px;
    flex-shrink: 0;
  }

  .light-item-slider {
    flex: 1;
    min-width: 0;
  }

  /* Make the per-light slider smaller/thinner */
  .light-item-slider lumina-slider {
    --lumina-slider-height: 4px;
    --lumina-slider-thumb: 12px;
  }

  .light-item-pct {
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--lumina-on-surface-variant);
    min-width: 28px;
    text-align: right;
    flex-shrink: 0;
  }

  .light-item-pct.on {
    color: var(--lumina-secondary);
  }

  .light-item-toggle {
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--lumina-on-surface-variant);
    min-width: 28px;
    text-align: right;
    flex-shrink: 0;
    cursor: pointer;
    padding: var(--lumina-space-1) var(--lumina-space-2);
    border-radius: var(--lumina-radius-sm);
    transition: all var(--lumina-transition-fast);
    -webkit-tap-highlight-color: transparent;
  }

  .light-item-toggle.on {
    color: var(--lumina-secondary);
    background: rgba(254, 203, 0, 0.1);
  }

  /* ─── Inline Expand Panel ───────────────────────── */
  .light-expand {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height 300ms cubic-bezier(0.4, 0, 0.2, 1),
                opacity 200ms ease,
                padding 200ms ease;
    padding: 0 var(--lumina-space-3);
  }

  .light-expand.open {
    max-height: 500px;
    opacity: 1;
    padding: 0 var(--lumina-space-3) var(--lumina-space-3);
  }

  .expand-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-3);
    padding-top: var(--lumina-space-3);
    border-top: 1px solid var(--lumina-ghost-border);
  }

  .expand-label {
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--lumina-on-surface-variant);
  }

  /* Color presets */
  .color-presets {
    display: flex;
    flex-wrap: wrap;
    gap: var(--lumina-space-2);
  }

  .color-dot {
    width: 26px;
    height: 26px;
    border-radius: var(--lumina-radius-full);
    border: 2px solid transparent;
    cursor: pointer;
    transition: transform var(--lumina-transition-fast),
                border-color var(--lumina-transition-fast);
    -webkit-tap-highlight-color: transparent;
  }

  .color-dot:hover { transform: scale(1.15); }

  .color-dot.selected {
    border-color: var(--lumina-on-surface);
    box-shadow: 0 0 8px rgba(254, 251, 254, 0.2);
  }

  /* Effects dropdown */
  .effect-select-wrapper {
    position: relative;
  }

  .effect-select {
    width: 100%;
    padding: var(--lumina-space-2) var(--lumina-space-3);
    padding-right: var(--lumina-space-8);
    background: var(--lumina-surface-container-highest);
    border: 1px solid var(--lumina-ghost-border);
    border-radius: var(--lumina-radius-sm);
    color: var(--lumina-on-surface);
    font-family: var(--lumina-font-body);
    font-size: 0.8125rem;
    appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
    outline: none;
    transition: border-color var(--lumina-transition-fast);
  }

  .effect-select:focus {
    border-color: var(--lumina-primary);
  }

  .effect-select option {
    background: var(--lumina-surface-container-highest);
    color: var(--lumina-on-surface);
  }

  .effect-select-arrow {
    position: absolute;
    right: var(--lumina-space-3);
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--lumina-on-surface-variant);
  }

  .effect-select-arrow ha-icon {
    --mdc-icon-size: 18px;
  }

  /* Group members */
  .group-members {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-1);
  }

  .group-member {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-2);
    padding: var(--lumina-space-1) 0;
  }

  .group-member-dot {
    width: 6px;
    height: 6px;
    border-radius: var(--lumina-radius-full);
    flex-shrink: 0;
  }

  .group-member-dot.on {
    background: var(--lumina-secondary);
    box-shadow: 0 0 4px rgba(254, 203, 0, 0.4);
  }

  .group-member-dot.off {
    background: var(--lumina-outline-variant);
  }

  .group-member-name {
    font-size: 0.75rem;
    color: var(--lumina-on-surface);
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .group-member-slider {
    width: 70px;
    flex-shrink: 0;
  }

  /* ─── Scenes ────────────────────────────────────── */
  .scenes-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-3);
  }

  .scenes-header {
    font-family: var(--lumina-font-headline);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .scenes-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--lumina-space-2);
  }
`;
