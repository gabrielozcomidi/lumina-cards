import { css } from 'lit';

export const clockCardStyles = css`
  ha-card {
    background: none !important;
    border: none !important;
    box-shadow: none !important;
  }

  .clock-card {
    position: relative;
    background: var(--lumina-surface-container);
    border-radius: var(--lumina-radius-xl);
    padding: var(--lumina-space-6);
    border: 1px solid var(--lumina-ghost-border);
    overflow: hidden;
    font-family: var(--lumina-font-body);
    color: var(--lumina-on-surface);
  }

  .clock-tint {
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    pointer-events: none;
    background: radial-gradient(
      ellipse at 50% 30%,
      rgba(133, 173, 255, 0.06) 0%,
      transparent 70%
    );
  }

  .clock-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-4);
  }

  /* ── FULL LAYOUT ── */

  .clock-hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lumina-space-2);
    padding: var(--lumina-space-4) 0;
  }

  .clock-greeting {
    font-family: var(--lumina-font-body);
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--lumina-on-surface-variant);
    font-weight: 500;
  }

  .clock-location {
    font-family: var(--lumina-font-headline);
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .clock-time {
    font-family: var(--lumina-font-headline);
    font-size: 4rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
    letter-spacing: -0.04em;
    line-height: 1;
    text-shadow: 0 0 40px rgba(133, 173, 255, 0.08);
  }

  .clock-time .period {
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--lumina-on-surface-variant);
    margin-left: var(--lumina-space-1);
    vertical-align: super;
  }

  .clock-time .seconds {
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--lumina-outline);
  }

  .clock-date {
    font-family: var(--lumina-font-body);
    font-size: 0.875rem;
    color: var(--lumina-on-surface-variant);
  }

  /* ── World Clocks ── */

  .world-clocks-label {
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--lumina-on-surface-variant);
    font-weight: 500;
  }

  .world-clocks {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-3);
  }

  .world-clock-row {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
    padding: 8px 12px;
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-lg);
  }

  .world-clock-dot {
    width: 6px;
    height: 6px;
    border-radius: var(--lumina-radius-full);
    flex-shrink: 0;
  }

  .world-clock-dot.day {
    background: var(--lumina-secondary);
  }

  .world-clock-dot.night {
    background: var(--lumina-primary);
  }

  .world-clock-city {
    font-family: var(--lumina-font-body);
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
    flex: 1;
  }

  .world-clock-offset {
    font-family: var(--lumina-font-body);
    font-size: 0.625rem;
    color: var(--lumina-outline);
  }

  .world-clock-time {
    font-family: var(--lumina-font-headline);
    font-size: 1rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
    margin-left: auto;
  }

  .world-clock-day-label {
    font-size: 0.625rem;
    color: var(--lumina-on-surface-variant);
    margin-left: var(--lumina-space-2);
  }

  /* ── ROOM LAYOUT ── */

  .clock-card.room {
    min-height: 220px;
  }

  .clock-card.room .clock-content {
    justify-content: space-between;
    height: 100%;
    min-height: 192px;
  }

  .clock-card.room .clock-hero {
    padding: var(--lumina-space-2) 0;
    align-items: flex-start;
  }

  .clock-card.room .clock-time {
    font-size: 2.75rem;
  }

  .clock-card.room .clock-greeting {
    text-align: left;
  }

  .clock-card.room .clock-location {
    font-size: 1rem;
  }

  .clock-card.room .clock-date {
    font-size: 0.8125rem;
  }

  /* Room world clocks: horizontal row */

  .clock-card.room .world-clocks {
    flex-direction: row;
    gap: var(--lumina-space-2);
    overflow-x: auto;
    scrollbar-width: none;
  }

  .clock-card.room .world-clocks::-webkit-scrollbar {
    display: none;
  }

  .clock-card.room .world-clock-row {
    min-width: 120px;
    flex-shrink: 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    padding: 8px 10px;
  }

  .clock-card.room .world-clock-time {
    margin-left: 0;
    font-size: 0.875rem;
  }

  /* ── COMPACT LAYOUT ── */

  .clock-card.compact {
    padding: var(--lumina-space-3) var(--lumina-space-4);
  }

  .clock-card.compact .clock-tint {
    opacity: 0.08;
  }

  .compact-clock-row {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
    min-height: 32px;
  }

  .compact-clock-icon {
    --mdc-icon-size: 20px;
    color: var(--lumina-primary);
    flex-shrink: 0;
    filter: drop-shadow(0 0 6px rgba(133, 173, 255, 0.15));
  }

  .compact-clock-time {
    font-family: var(--lumina-font-headline);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
    letter-spacing: -0.02em;
    flex-shrink: 0;
  }

  .compact-clock-time .period {
    font-size: 0.6875rem;
    font-weight: 500;
    color: var(--lumina-on-surface-variant);
    margin-left: 2px;
  }

  .compact-clock-date {
    font-family: var(--lumina-font-body);
    font-size: 0.8125rem;
    color: var(--lumina-on-surface-variant);
  }

  .compact-clock-spacer {
    flex: 1;
  }

  .compact-world-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.6875rem;
    color: var(--lumina-on-surface-variant);
    flex-shrink: 0;
  }

  .compact-world-item .cw-city {
    font-weight: 600;
    color: var(--lumina-on-surface);
  }
`;
