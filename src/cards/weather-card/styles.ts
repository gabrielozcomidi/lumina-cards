import { css } from 'lit';

export const weatherCardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    background: none !important;
    border: none !important;
    box-shadow: none !important;
  }

  .weather-card {
    position: relative;
    background: var(--lumina-surface-container);
    border-radius: var(--lumina-radius-xl);
    padding: var(--lumina-space-6);
    border: 1px solid var(--lumina-ghost-border);
    overflow: hidden;
    font-family: var(--lumina-font-body);
    color: var(--lumina-on-surface);
  }

  .weather-tint {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at 70% 20%,
      var(--weather-accent, transparent) 0%,
      transparent 70%
    );
    opacity: 0.15;
    pointer-events: none;
    z-index: 0;
    border-radius: inherit;
  }

  .weather-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-4);
  }

  /* ── Header ── */

  .weather-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .location-name {
    font-family: var(--lumina-font-headline);
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .condition-badge {
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--lumina-on-surface-variant);
    padding: 4px 10px;
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-full);
  }

  /* ── Hero ── */

  .hero-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lumina-space-2);
    padding: var(--lumina-space-4) 0;
  }

  .hero-icon {
    --mdc-icon-size: 64px;
    color: var(--weather-icon-color, var(--lumina-on-surface-variant));
    filter: drop-shadow(0 0 20px var(--weather-accent, transparent));
  }

  .hero-temp {
    font-family: var(--lumina-font-headline);
    font-size: 4rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
    letter-spacing: -0.04em;
    line-height: 1;
    text-shadow: 0 0 40px var(--weather-accent, transparent);
  }

  .hero-highlow {
    display: flex;
    flex-direction: row;
    gap: var(--lumina-space-4);
    font-family: var(--lumina-font-body);
    font-size: 0.875rem;
    color: var(--lumina-on-surface-variant);
  }

  .hero-highlow .high {
    color: var(--lumina-on-surface);
  }

  /* ── Detail chips ── */

  .detail-chips {
    display: flex;
    flex-direction: row;
    gap: var(--lumina-space-2);
    flex-wrap: wrap;
    justify-content: center;
  }

  .detail-chip {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-lg);
    padding: 8px 12px;
    border: 1px solid var(--lumina-ghost-border);
  }

  .detail-chip ha-icon {
    --mdc-icon-size: 16px;
    color: var(--lumina-on-surface-variant);
  }

  .detail-chip .chip-label {
    font-family: var(--lumina-font-body);
    font-size: 0.75rem;
    color: var(--lumina-on-surface-variant);
  }

  .detail-chip .chip-value {
    font-family: var(--lumina-font-body);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  /* ── Section label ── */

  .section-label {
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--lumina-on-surface-variant);
    font-weight: 500;
    margin-top: var(--lumina-space-2);
  }

  /* ── Hourly forecast ── */

  .hourly-scroll {
    display: flex;
    flex-direction: row;
    gap: var(--lumina-space-3);
    overflow-x: auto;
    padding: 4px 0;
    scrollbar-width: none;
  }

  .hourly-scroll::-webkit-scrollbar {
    display: none;
  }

  .hourly-slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lumina-space-1);
    min-width: 52px;
    padding: 8px 6px;
    border-radius: var(--lumina-radius-lg);
    transition: background var(--lumina-transition-fast);
  }

  .hourly-slot.now {
    background: var(--lumina-surface-container-highest);
    box-shadow: 0 0 12px rgba(133, 173, 255, 0.08);
  }

  .hourly-slot.now .hourly-time,
  .hourly-slot.now .hourly-temp {
    color: var(--lumina-primary);
  }

  .hourly-time {
    font-family: var(--lumina-font-body);
    font-size: 0.625rem;
    font-weight: 600;
    color: var(--lumina-on-surface-variant);
  }

  .hourly-icon {
    --mdc-icon-size: 20px;
    color: var(--lumina-on-surface-variant);
  }

  .hourly-temp {
    font-family: var(--lumina-font-body);
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  /* ── Daily forecast ── */

  .daily-list {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-3);
  }

  .daily-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--lumina-space-3);
  }

  .daily-day {
    font-family: var(--lumina-font-body);
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--lumina-on-surface);
    width: 40px;
    flex-shrink: 0;
  }

  .daily-icon {
    --mdc-icon-size: 20px;
    color: var(--lumina-on-surface-variant);
    width: 24px;
    flex-shrink: 0;
  }

  .daily-temps {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--lumina-space-2);
    flex: 1;
  }

  .daily-low {
    font-family: var(--lumina-font-body);
    font-size: 0.75rem;
    color: var(--lumina-on-surface-variant);
    width: 32px;
    text-align: right;
  }

  .daily-bar {
    flex: 1;
    height: 4px;
    border-radius: var(--lumina-radius-full);
    background: var(--lumina-surface-container-highest);
    position: relative;
    overflow: hidden;
  }

  .daily-bar-fill {
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: var(--lumina-radius-full);
    background: linear-gradient(
      to right,
      var(--lumina-primary),
      var(--lumina-secondary)
    );
    transition: width 400ms ease, left 400ms ease;
  }

  .daily-high {
    font-family: var(--lumina-font-body);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
    width: 32px;
  }

  /* ═══════════════════════════════════════════════════
     COMPACT MODE — single-line weather strip
     ═══════════════════════════════════════════════════ */

  .weather-card.compact {
    padding: var(--lumina-space-3) var(--lumina-space-4);
  }

  .weather-card.compact .weather-tint {
    opacity: 0.1;
  }

  .compact-row {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
    min-height: 32px;
  }

  .compact-icon {
    --mdc-icon-size: 24px;
    color: var(--weather-icon-color, var(--lumina-on-surface-variant));
    filter: drop-shadow(0 0 8px var(--weather-accent, transparent));
    flex-shrink: 0;
  }

  .compact-temp {
    font-family: var(--lumina-font-headline);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
    letter-spacing: -0.02em;
    flex-shrink: 0;
    text-shadow: 0 0 16px var(--weather-accent, transparent);
  }

  .compact-condition {
    font-family: var(--lumina-font-body);
    font-size: 0.8125rem;
    color: var(--lumina-on-surface-variant);
    flex-shrink: 0;
  }

  .compact-highlow {
    display: flex;
    gap: var(--lumina-space-2);
    font-family: var(--lumina-font-body);
    font-size: 0.75rem;
    color: var(--lumina-on-surface-variant);
    flex-shrink: 0;
  }

  .compact-highlow .high {
    color: var(--lumina-on-surface);
  }

  .compact-spacer {
    flex: 1;
  }

  .compact-detail {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-family: var(--lumina-font-body);
    font-size: 0.6875rem;
    font-weight: 500;
    color: var(--lumina-on-surface-variant);
    flex-shrink: 0;
  }

  .compact-detail ha-icon {
    --mdc-icon-size: 14px;
    color: var(--lumina-outline);
  }
`;
