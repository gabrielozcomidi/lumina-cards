import { css } from 'lit';

export const infoCardStyles = css`
  ha-card {
    background: none !important;
    border: none !important;
    box-shadow: none !important;
  }

  .info-card {
    position: relative;
    background: var(--lumina-surface-container);
    border-radius: var(--lumina-radius-xl);
    padding: var(--lumina-space-6);
    border: 1px solid var(--lumina-ghost-border);
    overflow: hidden;
    font-family: var(--lumina-font-body);
    color: var(--lumina-on-surface);
    min-height: 200px;
    display: flex;
    flex-direction: column;
  }

  /* Radial tint overlay */
  .info-tint {
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    pointer-events: none;
    background: radial-gradient(
      ellipse at 30% 40%,
      var(--info-accent, transparent) 0%,
      transparent 70%
    );
    opacity: 0.15;
  }

  .info-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-3);
    flex: 1;
  }

  /* Header row: mode icon + title + badge */
  .info-header {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
  }

  .info-header ha-icon {
    --mdc-icon-size: 20px;
    color: var(--info-icon-color, var(--lumina-on-surface-variant));
  }

  .info-title {
    font-family: var(--lumina-font-headline);
    font-size: 1rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
    flex: 1;
  }

  .info-badge {
    font-size: 0.625rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: var(--lumina-radius-full);
    background: var(--info-badge-bg, var(--lumina-surface-container-high));
    color: var(--info-badge-color, var(--lumina-on-surface-variant));
  }

  /* ── AIR QUALITY ── */
  .aqi-body {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-6);
    flex: 1;
  }

  .aqi-ring-wrap {
    position: relative;
    flex-shrink: 0;
  }

  .aqi-ring-svg {
    display: block;
  }

  .aqi-ring-svg .track {
    fill: none;
    stroke: var(--lumina-outline-variant);
    opacity: 0.3;
  }

  .aqi-ring-svg .value-arc {
    fill: none;
    stroke-linecap: round;
    transition: stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .aqi-ring-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: var(--lumina-font-headline);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
    line-height: 1;
  }

  .aqi-ring-sublabel {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, calc(-50% + 20px));
    font-size: 0.5625rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--lumina-on-surface-variant);
    font-weight: 600;
  }

  .aqi-info {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-2);
  }

  .aqi-level {
    font-family: var(--lumina-font-headline);
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--info-icon-color, var(--lumina-on-surface));
  }

  .aqi-pollutant {
    font-size: 0.75rem;
    color: var(--lumina-on-surface-variant);
  }

  .aqi-chips {
    display: flex;
    gap: var(--lumina-space-2);
    flex-wrap: wrap;
    margin-top: auto;
  }

  .aqi-chip {
    font-size: 0.6875rem;
    font-weight: 600;
    padding: 4px 10px;
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-lg);
    color: var(--lumina-on-surface-variant);
  }

  .aqi-chip span {
    color: var(--lumina-on-surface);
  }

  /* ── MOON PHASE ── */
  .moon-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lumina-space-2);
    flex: 1;
    justify-content: center;
  }

  .moon-svg {
    filter: drop-shadow(0 0 16px var(--info-accent, rgba(133, 173, 255, 0.3)));
  }

  .moon-name {
    font-family: var(--lumina-font-headline);
    font-size: 1rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .moon-illumination {
    font-size: 0.75rem;
    color: var(--lumina-on-surface-variant);
  }

  .moon-chips {
    display: flex;
    gap: var(--lumina-space-3);
    margin-top: var(--lumina-space-2);
  }

  .moon-chip {
    font-size: 0.6875rem;
    padding: 4px 10px;
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-lg);
    color: var(--lumina-on-surface-variant);
  }

  /* ── PRECIPITATION ── */
  .precip-body {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-6);
    flex: 1;
  }

  .precip-main {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-1);
  }

  .precip-amount {
    font-family: var(--lumina-font-headline);
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
    color: var(--lumina-on-surface);
    text-shadow: 0 0 24px var(--info-accent, transparent);
  }

  .precip-amount-unit {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--lumina-on-surface-variant);
  }

  .precip-label {
    font-size: 0.75rem;
    color: var(--lumina-on-surface-variant);
  }

  .precip-prob-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lumina-space-1);
  }

  .precip-prob {
    font-family: var(--lumina-font-headline);
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 1;
    color: var(--lumina-primary);
    text-shadow: 0 0 20px rgba(133, 173, 255, 0.3);
  }

  .precip-prob-label {
    font-size: 0.625rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--lumina-on-surface-variant);
    font-weight: 600;
  }

  .precip-bar-wrap {
    width: 4px;
    height: 60px;
    border-radius: var(--lumina-radius-full);
    background: var(--lumina-surface-container-highest);
    position: relative;
    overflow: hidden;
    margin-left: auto;
  }

  .precip-bar-fill {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: var(--lumina-radius-full);
    background: var(--lumina-primary);
    transition: height 400ms ease;
  }

  /* ── SUN CYCLE ── */
  .sun-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lumina-space-2);
    flex: 1;
    justify-content: center;
  }

  .sun-arc-wrap {
    position: relative;
    width: 200px;
    height: 100px;
  }

  .sun-arc-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .sun-arc-svg .arc-track {
    fill: none;
    stroke: var(--lumina-outline-variant);
    opacity: 0.25;
  }

  .sun-arc-svg .arc-fill {
    fill: none;
    stroke: var(--lumina-secondary);
    stroke-linecap: round;
    transition: stroke-dashoffset 600ms ease;
  }

  .sun-arc-svg .sun-dot {
    fill: var(--lumina-secondary);
    filter: drop-shadow(0 0 6px rgba(254, 203, 0, 0.6));
  }

  .sun-times {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 var(--lumina-space-2);
  }

  .sun-time-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .sun-time-item ha-icon {
    --mdc-icon-size: 18px;
    color: var(--lumina-secondary);
  }

  .sun-time-item span {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .sun-time-item .sun-label {
    font-size: 0.625rem;
    color: var(--lumina-on-surface-variant);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .sun-daylight {
    font-size: 0.75rem;
    color: var(--lumina-on-surface-variant);
    margin-top: var(--lumina-space-1);
  }

  /* ── COMPACT (one-line) ── */
  .info-card.compact {
    min-height: auto;
    padding: var(--lumina-space-3) var(--lumina-space-4);
  }

  .info-card.compact .info-tint {
    opacity: 0.1;
  }

  .info-card.compact .compact-row {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
    min-height: 32px;
  }

  .compact-icon {
    --mdc-icon-size: 20px;
    color: var(--info-icon-color, var(--lumina-on-surface-variant));
    filter: drop-shadow(0 0 6px var(--info-accent, transparent));
    flex-shrink: 0;
  }

  .compact-title {
    font-family: var(--lumina-font-headline);
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
    flex-shrink: 0;
  }

  .compact-value {
    font-family: var(--lumina-font-body);
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
    margin-left: auto;
    flex-shrink: 0;
  }

  .compact-detail {
    font-family: var(--lumina-font-body);
    font-size: 0.6875rem;
    color: var(--lumina-on-surface-variant);
    flex-shrink: 0;
  }

  .compact-badge {
    font-size: 0.5625rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    flex-shrink: 0;
  }

  /* ── SUN & MOON COMBINED ── */
  .sun-moon-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lumina-space-1);
    flex: 1;
    justify-content: center;
  }

  .sun-moon-arc-wrap {
    position: relative;
    width: 200px;
    height: 80px;
  }

  .sun-moon-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    padding: 0 var(--lumina-space-2);
  }

  .sun-moon-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .mini-moon-svg {
    filter: drop-shadow(0 0 8px rgba(133, 173, 255, 0.25));
  }

  .mini-moon-label {
    font-family: var(--lumina-font-body);
    font-size: 0.625rem;
    font-weight: 600;
    color: var(--lumina-primary);
    text-align: center;
  }

  .mini-moon-illum {
    font-family: var(--lumina-font-body);
    font-size: 0.5625rem;
    color: var(--lumina-on-surface-variant);
  }

  /* ── WEATHER ALERT ── */
  .alert-strip {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    z-index: 2;
    border-radius: var(--lumina-radius-xl) var(--lumina-radius-xl) 0 0;
    background: var(--alert-color, var(--lumina-secondary));
  }

  .alert-body {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-2);
    flex: 1;
  }

  .alert-icon-wrap {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
  }

  .alert-icon-wrap ha-icon {
    --mdc-icon-size: 28px;
    color: var(--alert-color, var(--lumina-secondary));
    filter: drop-shadow(0 0 10px var(--info-accent, transparent));
    animation: alert-glow 2s ease-in-out infinite;
  }

  @keyframes alert-glow {
    0%,
    100% {
      filter: drop-shadow(0 0 10px var(--info-accent, transparent));
    }
    50% {
      filter: drop-shadow(0 0 18px var(--info-accent, transparent));
    }
  }

  .alert-title {
    font-family: var(--lumina-font-headline);
    font-size: 1rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .alert-meta {
    font-size: 0.6875rem;
    color: var(--lumina-on-surface-variant);
  }

  .alert-desc {
    font-size: 0.8125rem;
    color: var(--lumina-on-surface-variant);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* No alerts state */
  .alert-clear {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--lumina-space-2);
    flex: 1;
  }

  .alert-clear ha-icon {
    --mdc-icon-size: 32px;
    color: var(--lumina-tertiary-container);
  }

  .alert-clear span {
    font-size: 0.875rem;
    color: var(--lumina-on-surface-variant);
  }
`;
