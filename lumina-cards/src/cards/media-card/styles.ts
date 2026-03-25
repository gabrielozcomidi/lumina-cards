import { css } from 'lit';

export const mediaCardStyles = css`
  :host {
    display: block;
    color: var(--lumina-on-surface);
    font-family: var(--lumina-font-body);
  }

  .media-card {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-6);
  }

  /* ─── Now Playing Header ────────────────────────── */
  .now-playing-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .now-playing-label {
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--lumina-primary);
  }

  .grouped-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--lumina-space-1);
    padding: var(--lumina-space-1) var(--lumina-space-3);
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-full);
    font-size: 0.6875rem;
    font-weight: 500;
    color: var(--lumina-on-surface-variant);
  }

  .grouped-badge ha-icon {
    --mdc-icon-size: 14px;
  }

  /* ─── Room Title ────────────────────────────────── */
  .room-title {
    font-family: var(--lumina-font-headline);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
    line-height: 1.3;
  }

  /* ─── Album Art ─────────────────────────────────── */
  .album-section {
    display: flex;
    justify-content: center;
    padding: var(--lumina-space-4) 0;
  }

  .album-art {
    width: 180px;
    height: 180px;
    border-radius: var(--lumina-radius-lg);
    object-fit: cover;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  }

  .album-art-placeholder {
    width: 180px;
    height: 180px;
    border-radius: var(--lumina-radius-lg);
    background: var(--lumina-surface-container-highest);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--lumina-outline);
  }

  .album-art-placeholder ha-icon {
    --mdc-icon-size: 64px;
  }

  /* ─── Track Info ────────────────────────────────── */
  .track-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lumina-space-1);
    text-align: center;
  }

  .track-title {
    font-family: var(--lumina-font-headline);
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
  }

  .track-artist {
    font-size: 0.8125rem;
    color: var(--lumina-on-surface-variant);
  }

  /* ─── Playback Controls ─────────────────────────── */
  .playback-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--lumina-space-6);
  }

  /* ─── Volume ────────────────────────────────────── */
  .volume-section {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
    padding: 0 var(--lumina-space-2);
  }

  .volume-icon {
    display: flex;
    color: var(--lumina-outline);
  }

  .volume-icon ha-icon {
    --mdc-icon-size: 18px;
  }

  .volume-slider-wrapper {
    flex: 1;
  }

  /* ─── Browse / Queue Buttons ────────────────────── */
  .action-buttons-row {
    display: flex;
    gap: var(--lumina-space-3);
  }

  .action-card {
    flex: 1;
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
    padding: var(--lumina-space-4);
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-lg);
    cursor: pointer;
    transition: background var(--lumina-transition-fast);
    position: relative;
  }

  .action-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--lumina-radius-lg);
    border: 1px solid var(--lumina-ghost-border);
    pointer-events: none;
  }

  .action-card:hover {
    background: var(--lumina-surface-container-highest);
  }

  .action-card-icon {
    width: 36px;
    height: 36px;
    border-radius: var(--lumina-radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .action-card-icon.browse {
    background: rgba(254, 203, 0, 0.15);
    color: var(--lumina-secondary);
  }

  .action-card-icon.queue {
    background: rgba(111, 251, 133, 0.15);
    color: var(--lumina-tertiary);
  }

  .action-card-icon ha-icon {
    --mdc-icon-size: 20px;
  }

  .action-card-text {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .action-card-title {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .action-card-sub {
    font-size: 0.625rem;
    color: var(--lumina-outline);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* ─── Manage Rooms ──────────────────────────────── */
  .rooms-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-3);
  }

  .rooms-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .rooms-title {
    font-family: var(--lumina-font-headline);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .rooms-grid-icon {
    color: var(--lumina-outline);
  }

  .rooms-grid-icon ha-icon {
    --mdc-icon-size: 20px;
  }

  .room-item {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
    padding: var(--lumina-space-3) var(--lumina-space-4);
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-lg);
  }

  .room-item-dot {
    width: 8px;
    height: 8px;
    border-radius: var(--lumina-radius-full);
    flex-shrink: 0;
  }

  .room-item-dot.playing {
    background: var(--lumina-primary);
    box-shadow: 0 0 6px rgba(133, 173, 255, 0.5);
  }

  .room-item-dot.idle {
    background: var(--lumina-outline-variant);
  }

  .room-item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .room-item-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--lumina-on-surface);
  }

  .room-item-state {
    font-size: 0.6875rem;
    color: var(--lumina-outline);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .room-item-volume {
    color: var(--lumina-outline);
    display: flex;
  }

  .room-item-volume ha-icon {
    --mdc-icon-size: 18px;
  }

  /* ─── Source Selector ───────────────────────────── */
  .source-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-3);
  }

  .source-label {
    font-family: var(--lumina-font-headline);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .source-chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--lumina-space-2);
    max-height: 120px;
    overflow-y: auto;
  }

  /* ─── Idle State ────────────────────────────────── */
  .idle-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lumina-space-4);
    padding: var(--lumina-space-8) 0;
  }

  .idle-state ha-icon {
    --mdc-icon-size: 48px;
    color: var(--lumina-outline);
  }

  .idle-text {
    font-size: 0.875rem;
    color: var(--lumina-on-surface-variant);
  }
`;
