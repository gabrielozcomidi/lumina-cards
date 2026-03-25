import { css } from 'lit';

export const vacuumCardStyles = css`
  :host {
    display: block;
    color: var(--lumina-on-surface);
    font-family: var(--lumina-font-body);
  }

  .vacuum-card {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-6);
  }

  /* ─── Hero Battery Ring ─────────────────────────── */
  .hero-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lumina-space-4);
    padding: var(--lumina-space-4) 0;
  }

  .hero-icon ha-icon {
    --mdc-icon-size: 36px;
    color: var(--lumina-tertiary);
  }

  .hero-battery {
    font-family: var(--lumina-font-headline);
    font-size: 1.75rem;
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

  /* ─── Status ────────────────────────────────────── */
  .status-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lumina-space-1);
    text-align: center;
  }

  .status-text {
    font-family: var(--lumina-font-headline);
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .status-detail {
    font-size: 0.8125rem;
    color: var(--lumina-on-surface-variant);
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--lumina-space-2);
    padding: var(--lumina-space-1) var(--lumina-space-3);
    border-radius: var(--lumina-radius-full);
    font-size: 0.75rem;
    font-weight: 500;
    margin-top: var(--lumina-space-2);
  }

  .status-badge.cleaning {
    background: rgba(111, 251, 133, 0.12);
    color: var(--lumina-tertiary);
  }

  .status-badge.docked {
    background: rgba(133, 173, 255, 0.12);
    color: var(--lumina-primary);
  }

  .status-badge.returning {
    background: rgba(254, 203, 0, 0.12);
    color: var(--lumina-secondary);
  }

  .status-badge.error {
    background: rgba(255, 113, 108, 0.12);
    color: var(--lumina-error);
  }

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: var(--lumina-radius-full);
    background: currentColor;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* ─── Action Buttons ────────────────────────────── */
  .actions-section {
    display: flex;
    gap: var(--lumina-space-3);
    justify-content: center;
  }

  .actions-section lumina-chip {
    flex: 1;
  }

  /* ─── Fan Speed ─────────────────────────────────── */
  .fan-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-3);
  }

  .section-label {
    font-family: var(--lumina-font-headline);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .fan-chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--lumina-space-2);
  }
`;
