import { css } from 'lit';

export const climateCardStyles = css`
  :host {
    display: block;
    color: var(--lumina-on-surface);
    font-family: var(--lumina-font-body);
  }

  .climate-card {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-6);
  }

  /* ─── Hero Ring Section ─────────────────────────── */
  .hero-section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--lumina-space-6);
    padding: var(--lumina-space-4) 0;
  }

  .hero-ring-wrapper {
    position: relative;
  }

  .hero-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .hero-temp {
    font-family: var(--lumina-font-headline);
    font-size: 2.5rem;
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
  }

  /* ─── Target Temperature ────────────────────────── */
  .target-section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--lumina-space-4);
  }

  .target-value {
    font-family: var(--lumina-font-headline);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
    min-width: 80px;
    text-align: center;
  }

  .target-label {
    font-size: 0.75rem;
    color: var(--lumina-on-surface-variant);
    text-align: center;
    margin-top: var(--lumina-space-1);
  }

  /* ─── HVAC Mode Selector ────────────────────────── */
  .mode-section {
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

  .mode-chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--lumina-space-2);
  }

  /* ─── Fan Speed ─────────────────────────────────── */
  .fan-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-3);
  }

  .fan-chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--lumina-space-2);
  }

  /* ─── Humidity ──────────────────────────────────── */
  .humidity-section {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-4);
    padding: var(--lumina-space-4);
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-lg);
    position: relative;
  }

  .humidity-section::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--lumina-radius-lg);
    border: 1px solid var(--lumina-ghost-border);
    pointer-events: none;
  }

  .humidity-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .humidity-value {
    font-family: var(--lumina-font-headline);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
  }

  .humidity-label {
    font-size: 0.75rem;
    color: var(--lumina-on-surface-variant);
  }

  /* ─── Mode Icon Colors ──────────────────────────── */
  .mode-icon {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-2);
  }

  .mode-icon ha-icon {
    --mdc-icon-size: 18px;
  }

  .mode-cool { color: var(--lumina-primary); }
  .mode-heat { color: var(--lumina-secondary); }
  .mode-auto { color: var(--lumina-tertiary); }
  .mode-off { color: var(--lumina-outline); }
  .mode-dry { color: var(--lumina-on-surface-variant); }
  .mode-fan { color: var(--lumina-primary); }
`;
