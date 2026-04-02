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

  /* ── No Background ── */
  .climate-card.no-bg {
    background: transparent;
    border-color: transparent;
  }
  .climate-card.no-bg::before { display: none; }

  /* ─── Header with Status Badge ───────────────────── */
  .climate-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .header-left {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-3);
  }

  .header-title {
    font-family: var(--lumina-font-headline);
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
  }

  .header-humidity {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--lumina-on-surface-variant);
  }

  .header-humidity ha-icon {
    --mdc-icon-size: 16px;
    color: var(--lumina-primary);
  }

  .header-humidity-value {
    font-family: var(--lumina-font-headline);
    font-size: 0.9375rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
  }

  .header-humidity-label {
    font-size: 0.6875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--lumina-on-surface-variant);
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 100px;
    background: var(--lumina-surface-container-high);
    border: 1px solid var(--lumina-ghost-border);
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--badge-color, var(--lumina-outline));
    box-shadow: 0 0 6px var(--badge-color, transparent);
  }

  .status-text {
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: var(--lumina-on-surface-variant);
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }

  .target-value {
    font-family: var(--lumina-font-headline);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
  }

  .target-label {
    font-size: 0.6875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--lumina-on-surface-variant);
  }

  /* ─── HVAC Mode Buttons (Circular Icons) ─────────── */
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

  .mode-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--lumina-space-4);
    justify-content: center;
  }

  .mode-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .mode-btn-circle {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: 2px solid var(--lumina-outline-variant);
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s ease;
  }

  .mode-btn-circle ha-icon {
    --mdc-icon-size: 22px;
    color: var(--lumina-on-surface-variant);
    transition: color 0.25s ease;
  }

  .mode-btn-label {
    font-size: 0.625rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--lumina-outline);
    transition: color 0.25s ease;
  }

  /* Active mode button */
  .mode-btn.active .mode-btn-circle {
    border-color: var(--mode-color);
    background: color-mix(in srgb, var(--mode-color) 12%, transparent);
    box-shadow: 0 0 12px color-mix(in srgb, var(--mode-color) 25%, transparent);
  }

  .mode-btn.active .mode-btn-circle ha-icon {
    color: var(--mode-color);
  }

  .mode-btn.active .mode-btn-label {
    color: var(--mode-color);
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

`;
