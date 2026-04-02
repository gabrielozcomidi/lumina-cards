import { css } from 'lit';

export const roomCardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    background: none !important;
    border: none !important;
    box-shadow: none !important;
  }

  .room-card {
    position: relative;
    background: var(--lumina-surface-container);
    border-radius: var(--lumina-radius-xl);
    padding: var(--lumina-space-6);
    font-family: var(--lumina-font-body);
    color: var(--lumina-on-surface);
    overflow: hidden;
    min-height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .room-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--lumina-radius-xl);
    border: 1px solid var(--lumina-ghost-border);
    pointer-events: none;
    z-index: 2;
  }

  /* ─── 3D Background Image — Full Height ──────────── */
  .room-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
    border-radius: var(--lumina-radius-xl);
  }

  .room-bg img {
    position: absolute;
    right: -5%;
    top: 50%;
    transform: translateY(-50%);
    width: 65%;
    height: 90%;
    object-fit: contain;
    object-position: center right;
    filter: drop-shadow(0 0 50px rgba(0, 0, 0, 0.7));
    opacity: 0.75;
    mask-image: radial-gradient(
      ellipse 80% 80% at 60% 50%,
      black 30%,
      rgba(0, 0, 0, 0.4) 60%,
      transparent 100%
    );
    -webkit-mask-image: radial-gradient(
      ellipse 80% 80% at 60% 50%,
      black 30%,
      rgba(0, 0, 0, 0.4) 60%,
      transparent 100%
    );
  }

  /* Multi-directional gradient dissolve */
  .room-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      /* Left fade — protects the text area */
      linear-gradient(
        to right,
        var(--lumina-surface-container) 0%,
        var(--lumina-surface-container) 20%,
        rgba(25, 25, 28, 0.97) 36%,
        rgba(25, 25, 28, 0.75) 50%,
        rgba(25, 25, 28, 0.3) 68%,
        transparent 85%
      ),
      /* Bottom fade — protects action buttons */
      linear-gradient(
        to top,
        var(--lumina-surface-container) 0%,
        rgba(25, 25, 28, 0.95) 15%,
        rgba(25, 25, 28, 0.6) 30%,
        transparent 50%
      ),
      /* Top fade */
      linear-gradient(
        to bottom,
        rgba(25, 25, 28, 0.55) 0%,
        transparent 25%
      );
    pointer-events: none;
  }

  /* ─── Header ────────────────────────────────────── */
  .room-header {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-1);
  }

  .room-name {
    font-family: var(--lumina-font-headline);
    font-size: 1.375rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
    line-height: 1.2;
  }

  .room-sensors {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-4);
    margin-top: var(--lumina-space-1);
  }

  .sensor-item {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--lumina-on-surface-variant);
  }

  .sensor-item ha-icon {
    --mdc-icon-size: 15px;
    color: var(--lumina-outline);
  }

  .device-count {
    font-size: 0.8125rem;
    color: var(--lumina-on-surface-variant);
  }

  /* ─── Action Buttons Row ────────────────────────── */
  .action-buttons {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: flex-end;
    gap: var(--lumina-space-4);
    padding-top: var(--lumina-space-6);
  }

  .action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lumina-space-2);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    transition: transform var(--lumina-transition-fast);
  }

  .action-btn:active {
    transform: scale(0.92);
  }

  /* ─── Circular Icon with Ring ───────────────────── */
  .action-ring-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .action-icon-circle {
    width: 52px;
    height: 52px;
    border-radius: var(--lumina-radius-full);
    background: var(--lumina-surface-container-high);
    border: 1.5px solid var(--lumina-outline-variant);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--lumina-transition-normal);
    position: relative;
    z-index: 1;
  }

  .action-icon-circle ha-icon {
    --mdc-icon-size: 22px;
    color: var(--lumina-on-surface-variant);
    transition: color var(--lumina-transition-normal);
  }

  /* Active state: glowing ring */
  .action-btn.active .action-icon-circle {
    border-color: var(--lumina-primary);
    background: rgba(133, 173, 255, 0.08);
    box-shadow: 0 0 16px rgba(133, 173, 255, 0.25),
                0 0 4px rgba(133, 173, 255, 0.4);
  }

  .action-btn.active .action-icon-circle ha-icon {
    color: var(--lumina-primary);
  }

  /* Per-domain active colors */
  .action-btn.lights-active .action-icon-circle {
    border-color: var(--lumina-secondary);
    background: rgba(254, 203, 0, 0.08);
    box-shadow: 0 0 16px rgba(254, 203, 0, 0.2),
                0 0 4px rgba(254, 203, 0, 0.35);
  }

  .action-btn.lights-active .action-icon-circle ha-icon {
    color: var(--lumina-secondary);
  }

  /* Climate — default (cool / fan_only) */
  .action-btn.climate-active .action-icon-circle {
    border-color: var(--lumina-primary);
    background: rgba(133, 173, 255, 0.08);
    box-shadow: 0 0 16px rgba(133, 173, 255, 0.25),
                0 0 4px rgba(133, 173, 255, 0.4);
  }

  .action-btn.climate-active .action-icon-circle ha-icon {
    color: var(--lumina-primary);
  }

  /* Climate — heat mode (yellow) */
  .action-btn.climate-heat .action-icon-circle {
    border-color: var(--lumina-secondary);
    background: rgba(254, 203, 0, 0.08);
    box-shadow: 0 0 16px rgba(254, 203, 0, 0.2),
                0 0 4px rgba(254, 203, 0, 0.35);
  }

  .action-btn.climate-heat .action-icon-circle ha-icon {
    color: var(--lumina-secondary);
  }

  /* Climate — heat_cool / auto mode (green) */
  .action-btn.climate-heat_cool .action-icon-circle,
  .action-btn.climate-auto .action-icon-circle {
    border-color: var(--lumina-tertiary);
    background: rgba(111, 251, 133, 0.08);
    box-shadow: 0 0 16px rgba(111, 251, 133, 0.2),
                0 0 4px rgba(111, 251, 133, 0.35);
  }

  .action-btn.climate-heat_cool .action-icon-circle ha-icon,
  .action-btn.climate-auto .action-icon-circle ha-icon {
    color: var(--lumina-tertiary);
  }

  .action-btn.media-active .action-icon-circle {
    border-color: var(--lumina-primary);
    background: rgba(133, 173, 255, 0.08);
    box-shadow: 0 0 16px rgba(133, 173, 255, 0.25),
                0 0 4px rgba(133, 173, 255, 0.4);
  }

  .action-btn.media-active .action-icon-circle ha-icon {
    color: var(--lumina-primary);
  }

  .action-btn.vacuum-active .action-icon-circle {
    border-color: var(--lumina-tertiary);
    background: rgba(111, 251, 133, 0.08);
    box-shadow: 0 0 16px rgba(111, 251, 133, 0.2),
                0 0 4px rgba(111, 251, 133, 0.35);
  }

  .action-btn.vacuum-active .action-icon-circle ha-icon {
    color: var(--lumina-tertiary);
  }

  /* ─── SVG Ring Overlay ──────────────────────────── */
  .action-ring-svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    pointer-events: none;
  }

  .action-ring-svg .track {
    fill: none;
    stroke-linecap: round;
    opacity: 0;
  }

  .action-btn.active .action-ring-svg .track,
  .action-btn.lights-active .action-ring-svg .track,
  .action-btn.climate-active .action-ring-svg .track,
  .action-btn.media-active .action-ring-svg .track,
  .action-btn.vacuum-active .action-ring-svg .track {
    opacity: 0.15;
  }

  .action-ring-svg .value-arc {
    fill: none;
    stroke-linecap: round;
    transition: stroke-dashoffset 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* ─── Action Label ──────────────────────────────── */
  .action-label {
    font-size: 0.625rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--lumina-outline);
    transition: color var(--lumina-transition-normal);
  }

  /* All active states → white label */
  .action-btn.active .action-label,
  .action-btn.lights-active .action-label,
  .action-btn.climate-active .action-label,
  .action-btn.media-active .action-label,
  .action-btn.vacuum-active .action-label {
    color: var(--lumina-on-surface);
  }

  /* ─── Hidden ────────────────────────────────────── */
  .action-btn.hidden {
    display: none;
  }

  /* ═══════════════════════════════════════════════════
     COMPACT MODE — half-width for horizontal stacks
     ═══════════════════════════════════════════════════ */

  .room-card.compact {
    min-height: 140px;
    padding: var(--lumina-space-4);
    gap: var(--lumina-space-2);
  }

  /* ─── Compact Header ───────────────────────────── */
  .room-card.compact .room-name {
    font-size: 1rem;
    line-height: 1.15;
  }

  .room-card.compact .room-sensors {
    gap: var(--lumina-space-2);
    margin-top: 0;
  }

  .room-card.compact .sensor-item {
    font-size: 0.6875rem;
  }

  .room-card.compact .sensor-item ha-icon {
    --mdc-icon-size: 12px;
  }

  /* ─── Compact Action Buttons ───────────────────── */
  .room-card.compact .action-buttons {
    gap: var(--lumina-space-2);
    padding-top: var(--lumina-space-2);
  }

  .room-card.compact .action-icon-circle {
    width: 36px;
    height: 36px;
  }

  .room-card.compact .action-icon-circle ha-icon {
    --mdc-icon-size: 16px;
  }

  .room-card.compact .action-label {
    font-size: 0.5rem;
    letter-spacing: 0.06em;
  }

  /* Compact ring geometry — smaller SVG */
  .room-card.compact .action-ring-svg {
    width: 44px;
    height: 44px;
  }

  /* ─── Compact 3D Background ────────────────────── */
  .room-card.compact .room-bg img {
    width: 55%;
    opacity: 0.5;
  }
`;
