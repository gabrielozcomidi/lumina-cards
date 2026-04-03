import { css } from 'lit';

export const statusCardStyles = css`
  :host {
    --ha-card-background: none;
    --ha-card-border-color: transparent;
    --ha-card-border-width: 0;
    --ha-card-box-shadow: none;
  }
  ha-card {
    background: none !important;
    border: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
  }

  .status-card {
    position: relative;
    background: var(--lumina-surface-container);
    border-radius: var(--lumina-radius-xl);
    padding: var(--lumina-space-6);
    border: 1px solid var(--lumina-ghost-border);
    overflow: hidden;
    font-family: var(--lumina-font-body);
    color: var(--lumina-on-surface);
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-4);
  }
  .status-card.no-bg {
    background: transparent;
    border-color: transparent;
  }
  .status-card.no-bg .status-tint {
    display: none;
  }

  .status-tint {
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    pointer-events: none;
    background: radial-gradient(
      ellipse at 30% 20%,
      rgba(133, 173, 255, 0.05) 0%,
      transparent 70%
    );
  }

  .status-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-4);
  }

  /* ── Greeting ── */
  .greeting-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-1);
  }
  .greeting-text {
    font-family: var(--lumina-font-headline);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
    line-height: 1.2;
  }
  .greeting-sub {
    font-size: 0.8125rem;
    color: var(--lumina-on-surface-variant);
  }

  /* ── People ── */
  .people-section {
    display: flex;
    gap: var(--lumina-space-3);
    align-items: center;
    flex-wrap: wrap;
  }
  .person-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-full);
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--lumina-on-surface-variant);
  }
  .person-chip.home {
    color: var(--lumina-tertiary-container);
  }
  .person-chip.home .person-dot {
    background: var(--lumina-tertiary-container);
  }
  .person-chip .person-dot {
    width: 6px;
    height: 6px;
    border-radius: var(--lumina-radius-full);
    background: var(--lumina-outline);
    flex-shrink: 0;
  }

  /* ── Quick Chips Grid ── */
  .chips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: var(--lumina-space-2);
  }
  .status-chip {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-2);
    padding: 12px 14px;
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-lg);
    border: 1px solid var(--lumina-ghost-border);
    transition: background var(--lumina-transition-fast);
  }
  .status-chip ha-icon {
    --mdc-icon-size: 20px;
    color: var(--lumina-primary);
    flex-shrink: 0;
  }
  .status-chip-info {
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;
  }
  .status-chip-label {
    font-size: 0.625rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--lumina-on-surface-variant);
    font-weight: 500;
  }
  .status-chip-value {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Colored chip variants */
  .status-chip.security ha-icon {
    color: var(--lumina-tertiary-container);
  }
  .status-chip.security.armed {
    border-color: rgba(111, 251, 133, 0.2);
  }
  .status-chip.energy ha-icon {
    color: var(--lumina-secondary);
  }
  .status-chip.weather ha-icon {
    color: var(--lumina-primary);
  }
  .status-chip.lights ha-icon {
    color: var(--lumina-secondary);
  }

  /* ── Section Label ── */
  .section-label {
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--lumina-on-surface-variant);
    font-weight: 500;
    margin-top: var(--lumina-space-1);
  }

  /* ── RSS / Feed ── */
  .feed-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-2);
  }
  .feed-item {
    display: flex;
    gap: var(--lumina-space-3);
    align-items: flex-start;
    padding: 10px 12px;
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-lg);
  }
  .feed-item-dot {
    width: 4px;
    height: 4px;
    border-radius: var(--lumina-radius-full);
    background: var(--lumina-primary);
    margin-top: 6px;
    flex-shrink: 0;
  }
  .feed-item-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .feed-item-title {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--lumina-on-surface);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .feed-item-meta {
    font-size: 0.625rem;
    color: var(--lumina-outline);
  }

  /* ── Calendar ── */
  .calendar-item {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
    padding: 8px 12px;
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-lg);
  }
  .calendar-item ha-icon {
    --mdc-icon-size: 18px;
    color: var(--lumina-primary);
  }
  .calendar-item-info {
    display: flex;
    flex-direction: column;
    gap: 1px;
    flex: 1;
    min-width: 0;
  }
  .calendar-item-title {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--lumina-on-surface);
  }
  .calendar-item-time {
    font-size: 0.625rem;
    color: var(--lumina-on-surface-variant);
  }
`;
