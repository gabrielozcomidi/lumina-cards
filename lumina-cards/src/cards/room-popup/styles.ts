import { css } from 'lit';

export const roomPopupStyles = css`
  :host {
    display: block;
    color: var(--lumina-on-surface);
    font-family: var(--lumina-font-body);
  }

  .room-popup {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-6);
  }

  /* ─── Section ───────────────────────────────────── */
  .section {
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-lg);
    padding: var(--lumina-space-4);
    position: relative;
  }

  .section::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--lumina-radius-lg);
    border: 1px solid var(--lumina-ghost-border);
    pointer-events: none;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--lumina-space-4);
  }

  .section-title-row {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
  }

  .section-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--lumina-on-surface-variant);
  }

  .section-icon ha-icon {
    --mdc-icon-size: 20px;
  }

  .section-title {
    font-family: var(--lumina-font-headline);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .section-action {
    font-size: 0.75rem;
    color: var(--lumina-primary);
    cursor: pointer;
    font-weight: 500;
    padding: var(--lumina-space-1) var(--lumina-space-2);
    border-radius: var(--lumina-radius-sm);
    transition: background var(--lumina-transition-fast);
  }

  .section-action:hover {
    background: rgba(133, 173, 255, 0.1);
  }

  /* ─── Lights Section ────────────────────────────── */
  .lights-summary {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-4);
    margin-bottom: var(--lumina-space-4);
  }

  .lights-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .lights-count {
    font-family: var(--lumina-font-headline);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
  }

  .lights-subtitle {
    font-size: 0.75rem;
    color: var(--lumina-on-surface-variant);
  }

  .light-list {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-2);
  }

  .light-item {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
    padding: var(--lumina-space-2) 0;
  }

  .light-name {
    flex: 1;
    font-size: 0.8125rem;
    color: var(--lumina-on-surface);
  }

  .light-state {
    font-size: 0.75rem;
    color: var(--lumina-on-surface-variant);
  }

  .light-state.on {
    color: var(--lumina-secondary);
  }

  /* ─── Climate Section ───────────────────────────── */
  .climate-row {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-4);
  }

  .climate-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-2);
  }

  .climate-temp {
    font-family: var(--lumina-font-headline);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
  }

  .climate-mode {
    font-size: 0.8125rem;
    color: var(--lumina-on-surface-variant);
  }

  .climate-chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--lumina-space-2);
    margin-top: var(--lumina-space-3);
  }

  .climate-fan {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-2);
    margin-top: var(--lumina-space-3);
    padding-top: var(--lumina-space-3);
    border-top: 1px solid var(--lumina-ghost-border);
  }

  .climate-fan-label {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-2);
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--lumina-on-surface-variant);
  }

  .climate-fan-label ha-icon {
    --mdc-icon-size: 16px;
  }

  .climate-fan .climate-chips {
    margin-top: 0;
  }

  /* ─── Media Section ─────────────────────────────── */
  .media-row {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-4);
  }

  .media-art {
    width: 48px;
    height: 48px;
    border-radius: var(--lumina-radius-sm);
    object-fit: cover;
    background: var(--lumina-surface-container-highest);
    flex-shrink: 0;
  }

  .media-art-placeholder {
    width: 48px;
    height: 48px;
    border-radius: var(--lumina-radius-sm);
    background: var(--lumina-surface-container-highest);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--lumina-outline);
    flex-shrink: 0;
  }

  .media-art-placeholder ha-icon {
    --mdc-icon-size: 24px;
  }

  .media-info {
    flex: 1;
    min-width: 0;
  }

  .media-title {
    font-family: var(--lumina-font-headline);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .media-artist {
    font-size: 0.75rem;
    color: var(--lumina-on-surface-variant);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .media-controls {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-2);
    flex-shrink: 0;
  }

  .media-idle {
    font-size: 0.8125rem;
    color: var(--lumina-on-surface-variant);
    padding: var(--lumina-space-2) 0;
  }

  /* ─── Vacuum Section ────────────────────────────── */
  .vacuum-row {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-4);
  }

  .vacuum-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .vacuum-state {
    font-family: var(--lumina-font-headline);
    font-size: 1rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .vacuum-battery {
    font-size: 0.75rem;
    color: var(--lumina-on-surface-variant);
  }

  .vacuum-actions {
    display: flex;
    gap: var(--lumina-space-2);
    margin-top: var(--lumina-space-3);
  }
`;
