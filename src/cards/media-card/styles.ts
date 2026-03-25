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

  /* ─── Progress Bar ─────────────────────────────── */
  .progress-section {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
    padding: 0 var(--lumina-space-2);
  }

  .progress-time {
    font-size: 0.6875rem;
    font-weight: 500;
    color: var(--lumina-outline);
    min-width: 32px;
    font-variant-numeric: tabular-nums;
  }

  .progress-time:last-child {
    text-align: right;
  }

  .progress-bar {
    flex: 1;
    height: 3px;
    border-radius: var(--lumina-radius-full);
    background: var(--lumina-surface-container-highest);
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: var(--lumina-radius-full);
    background: var(--lumina-primary);
    transition: width 1s linear;
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

  /* ─── Sources Section ──────────────────────────── */
  .sources-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-3);
  }

  .sources-label {
    font-family: var(--lumina-font-headline);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .sources-list {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-1);
    max-height: 200px;
    overflow-y: auto;
  }

  .source-item {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
    padding: var(--lumina-space-3) var(--lumina-space-4);
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-lg);
    cursor: pointer;
    transition: background var(--lumina-transition-fast);
  }

  .source-item:hover {
    background: var(--lumina-surface-container-highest);
  }

  .source-item.active {
    background: rgba(133, 173, 255, 0.1);
    border: 1px solid rgba(133, 173, 255, 0.2);
  }

  .source-item ha-icon {
    --mdc-icon-size: 20px;
    color: var(--lumina-on-surface-variant);
  }

  .source-item.active ha-icon {
    color: var(--lumina-primary);
  }

  .source-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--lumina-on-surface);
  }

  .source-item.active .source-name {
    color: var(--lumina-primary);
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
