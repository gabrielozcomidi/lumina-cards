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

  /* ─── Player Selector (multi-entity) ──────────────── */
  .player-selector {
    display: flex;
    gap: var(--lumina-space-2);
    overflow-x: auto;
    padding-bottom: var(--lumina-space-1);
    scrollbar-width: none;
  }

  .player-selector::-webkit-scrollbar {
    display: none;
  }

  .player-tab {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: var(--lumina-space-2) var(--lumina-space-4);
    border-radius: var(--lumina-radius-full);
    border: 1px solid var(--lumina-ghost-border);
    background: var(--lumina-surface-container-high);
    cursor: pointer;
    white-space: nowrap;
    transition: all var(--lumina-transition-fast);
    -webkit-tap-highlight-color: transparent;
    font-family: var(--lumina-font-body);
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--lumina-on-surface-variant);
  }

  .player-tab.active {
    background: rgba(133, 173, 255, 0.1);
    border-color: rgba(133, 173, 255, 0.3);
    color: var(--lumina-primary);
  }

  .player-tab-dot {
    width: 6px;
    height: 6px;
    border-radius: var(--lumina-radius-full);
    background: var(--lumina-outline-variant);
    flex-shrink: 0;
  }

  .player-tab-dot.playing {
    background: var(--lumina-primary);
    box-shadow: 0 0 4px rgba(133, 173, 255, 0.5);
  }

  .player-tab-name {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ─── Now Playing Header ────────────────────────── */
  .now-playing-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .now-playing-left {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
  }

  .now-playing-label {
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--lumina-primary);
  }

  .audio-format-badge {
    font-size: 0.5625rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 2px 8px;
    border-radius: var(--lumina-radius-sm);
    background: var(--lumina-surface-container-highest);
    border: 1px solid var(--lumina-ghost-border);
    color: var(--lumina-on-surface-variant);
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

  /* ─── TV App Grid ────────────────────────────────── */
  .app-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--lumina-space-2);
  }

  .app-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: var(--lumina-space-3) var(--lumina-space-2);
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-lg);
    border: 1px solid transparent;
    cursor: pointer;
    transition: all var(--lumina-transition-fast);
    -webkit-tap-highlight-color: transparent;
    font-family: var(--lumina-font-body);
  }

  .app-item:hover {
    background: var(--lumina-surface-container-highest);
  }

  .app-item.active {
    background: rgba(133, 173, 255, 0.1);
    border-color: rgba(133, 173, 255, 0.25);
  }

  .app-item ha-icon {
    --mdc-icon-size: 24px;
    color: var(--lumina-on-surface-variant);
  }

  .app-item.active ha-icon {
    color: var(--lumina-primary);
  }

  .app-name {
    font-size: 0.625rem;
    font-weight: 500;
    color: var(--lumina-on-surface-variant);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  .app-item.active .app-name {
    color: var(--lumina-primary);
  }

  /* ─── Browse Media Button ────────────────────────── */
  .browse-media-section {
    display: flex;
  }

  .browse-media-btn {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
    width: 100%;
    padding: var(--lumina-space-3) var(--lumina-space-4);
    background: var(--lumina-surface-container-high);
    border: 1px solid var(--lumina-ghost-border);
    border-radius: var(--lumina-radius-lg);
    cursor: pointer;
    transition: background var(--lumina-transition-fast);
    -webkit-tap-highlight-color: transparent;
    font-family: var(--lumina-font-body);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--lumina-on-surface);
  }

  .browse-media-btn:hover {
    background: var(--lumina-surface-container-highest);
  }

  .browse-media-btn ha-icon {
    --mdc-icon-size: 20px;
    color: var(--lumina-primary);
  }

  /* ─── Player Tab Icon ────────────────────────────── */
  .player-tab-icon {
    --mdc-icon-size: 14px;
  }

  /* ─── Shortcuts Section ──────────────────────────── */
  .shortcuts-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-3);
  }

  .shortcuts-label {
    font-family: var(--lumina-font-headline);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }

  .shortcuts-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--lumina-space-2);
  }

  /* ─── Speaker Management ──────────────────────────── */
  .rooms-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-2);
  }

  .rooms-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--lumina-space-1);
  }

  .rooms-title {
    font-family: var(--lumina-font-headline);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
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
    min-width: 0;
  }

  .room-item-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--lumina-on-surface);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .room-item-state {
    font-size: 0.6875rem;
    color: var(--lumina-outline);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .room-item-action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: none;
    background: transparent;
    border-radius: var(--lumina-radius-full);
    cursor: pointer;
    flex-shrink: 0;
    padding: 0;
    transition: background var(--lumina-transition-fast);
    -webkit-tap-highlight-color: transparent;
  }

  .room-item-action ha-icon {
    --mdc-icon-size: 18px;
  }

  .room-item-action.unjoin {
    color: var(--lumina-outline);
  }

  .room-item-action.unjoin:hover {
    color: var(--lumina-error, #f44336);
    background: rgba(244, 67, 54, 0.1);
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
