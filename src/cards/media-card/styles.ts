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
    gap: var(--lumina-space-8);
  }

  /* ─── Player Selector ──────────────────────────────── */
  .player-selector {
    display: flex;
    gap: var(--lumina-space-2);
    overflow-x: auto;
    padding-bottom: var(--lumina-space-4);
    scrollbar-width: none;
  }
  .player-selector::-webkit-scrollbar { display: none; }

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
    width: 6px; height: 6px;
    border-radius: var(--lumina-radius-full);
    background: var(--lumina-outline-variant);
    flex-shrink: 0;
  }
  .player-tab-dot.playing {
    background: var(--lumina-primary);
    box-shadow: 0 0 4px rgba(133, 173, 255, 0.5);
  }
  .player-tab-name { overflow: hidden; text-overflow: ellipsis; }
  .player-tab-icon { --mdc-icon-size: 14px; }

  /* ─── Now Playing Header ────────────────────────────── */
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
  .now-playing-right {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-2);
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
  .grouped-badge ha-icon { --mdc-icon-size: 14px; }

  /* ─── Power Button ─────────────────────────────────── */
  .power-btn {
    width: 28px; height: 28px;
    border-radius: var(--lumina-radius-full);
    border: 1px solid var(--lumina-ghost-border);
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    color: var(--lumina-outline);
    transition: all var(--lumina-transition-fast);
    -webkit-tap-highlight-color: transparent;
  }
  .power-btn ha-icon { --mdc-icon-size: 16px; }
  .power-btn.on {
    color: var(--lumina-primary);
    border-color: rgba(133, 173, 255, 0.3);
  }
  .idle-power-row {
    display: flex;
    justify-content: flex-end;
  }

  /* ─── Now Playing + Title group ──────────────────────── */
  .now-playing-group {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-2);
  }

  .room-title {
    font-family: var(--lumina-font-headline);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
    line-height: 1.3;
  }

  /* ─── Album Art (responsive) ────────────────────────── */
  .album-section {
    display: flex;
    justify-content: center;
    padding: var(--lumina-space-4) 0;
  }
  .album-art {
    max-width: 220px;
    width: 60%;
    aspect-ratio: 1 / 1;
    border-radius: var(--lumina-radius-lg);
    object-fit: cover;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  }
  .album-art-placeholder {
    max-width: 220px;
    width: 60%;
    aspect-ratio: 1 / 1;
    border-radius: var(--lumina-radius-lg);
    background: var(--lumina-surface-container-highest);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--lumina-outline);
  }
  .album-art-placeholder ha-icon { --mdc-icon-size: 64px; }

  /* ─── Track Info ────────────────────────────────────── */
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

  /* ─── Progress Bar (seekable) ──────────────────────── */
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
  .progress-time:last-child { text-align: right; }
  .progress-bar {
    flex: 1;
    height: 3px;
    border-radius: var(--lumina-radius-full);
    background: var(--lumina-surface-container-highest);
    overflow: hidden;
    position: relative;
  }
  .progress-bar.seekable {
    cursor: pointer;
    height: 6px;
    transition: height var(--lumina-transition-fast);
  }
  .progress-bar.seekable:hover {
    height: 10px;
  }
  .progress-fill {
    height: 100%;
    border-radius: var(--lumina-radius-full);
    background: var(--lumina-primary);
    transition: width 1s linear;
  }

  /* ─── Playback Controls ────────────────────────────── */
  .playback-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--lumina-space-4);
  }
  .control-active {
    --lumina-icon-button-color: var(--lumina-primary);
    color: var(--lumina-primary);
  }

  /* ─── Volume with Mute ─────────────────────────────── */
  .volume-section {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
    padding: 0 var(--lumina-space-2);
  }
  .volume-mute-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px; height: 28px;
    border: none;
    background: transparent;
    border-radius: var(--lumina-radius-full);
    cursor: pointer;
    padding: 0;
    color: var(--lumina-outline);
    transition: all var(--lumina-transition-fast);
    -webkit-tap-highlight-color: transparent;
    flex-shrink: 0;
  }
  .volume-mute-btn ha-icon { --mdc-icon-size: 18px; }
  .volume-mute-btn.muted { color: var(--lumina-error, #f44336); }
  .volume-mute-btn:hover { background: var(--lumina-surface-container-highest); }
  .volume-icon {
    display: flex;
    color: var(--lumina-outline);
  }
  .volume-icon ha-icon { --mdc-icon-size: 18px; }
  .volume-slider-wrapper { flex: 1; }

  /* ─── Source Compact Selector ───────────────────────── */
  .source-compact {
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
  .source-compact:hover { background: var(--lumina-surface-container-highest); }
  .source-compact ha-icon { --mdc-icon-size: 20px; color: var(--lumina-primary); }
  .source-compact-name { flex: 1; text-align: left; }
  .source-compact-chevron { --mdc-icon-size: 16px; color: var(--lumina-on-surface-variant); }

  /* ─── Sources Section (expanded) ────────────────────── */
  .sources-section {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-3);
  }
  .sources-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .sources-label {
    font-family: var(--lumina-font-headline);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }
  .sources-close {
    width: 28px; height: 28px;
    border: none;
    background: transparent;
    border-radius: var(--lumina-radius-full);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    color: var(--lumina-on-surface-variant);
    -webkit-tap-highlight-color: transparent;
  }
  .sources-close ha-icon { --mdc-icon-size: 18px; }
  .sources-close:hover { background: var(--lumina-surface-container-highest); }
  .sources-list {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-1);
    max-height: 240px;
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
  .source-item:hover { background: var(--lumina-surface-container-highest); }
  .source-item.active {
    background: rgba(133, 173, 255, 0.1);
    border: 1px solid rgba(133, 173, 255, 0.2);
  }
  .source-item ha-icon { --mdc-icon-size: 20px; color: var(--lumina-on-surface-variant); }
  .source-item.active ha-icon { color: var(--lumina-primary); }
  .source-name { font-size: 0.875rem; font-weight: 500; color: var(--lumina-on-surface); }
  .source-item.active .source-name { color: var(--lumina-primary); }

  /* ─── TV App Grid ──────────────────────────────────── */
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
  .app-item:hover { background: var(--lumina-surface-container-highest); }
  .app-item.active {
    background: rgba(133, 173, 255, 0.1);
    border-color: rgba(133, 173, 255, 0.25);
  }
  .app-item ha-icon { --mdc-icon-size: 24px; color: var(--lumina-on-surface-variant); }
  .app-item.active ha-icon { color: var(--lumina-primary); }
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
  .app-item.active .app-name { color: var(--lumina-primary); }

  /* ─── Browse Media ─────────────────────────────────── */
  .browse-media-section { display: flex; }
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
  .browse-media-btn:hover { background: var(--lumina-surface-container-highest); }
  .browse-media-btn ha-icon { --mdc-icon-size: 20px; color: var(--lumina-primary); }

  /* ─── Inline Media Browser ─────────────────────────── */
  .browse-panel {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-5);
    background: rgba(31, 31, 34, 0.4);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-radius: var(--lumina-radius-xl, 1.5rem);
    padding: var(--lumina-space-5);
  }
  .browse-header {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
  }
  .browse-back-btn {
    width: 32px; height: 32px;
    border: none;
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-full);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    color: var(--lumina-on-surface-variant);
    transition: background var(--lumina-transition-fast);
    -webkit-tap-highlight-color: transparent;
    flex-shrink: 0;
  }
  .browse-back-btn:hover { background: var(--lumina-surface-container-highest); }
  .browse-back-btn ha-icon { --mdc-icon-size: 18px; }
  .browse-title {
    font-family: var(--lumina-font-headline);
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--lumina-on-surface);
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Browse: loading */
  .browse-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--lumina-space-10, 2.5rem) 0;
  }
  .browse-spinner {
    width: 28px; height: 28px;
    border: 2.5px solid var(--lumina-surface-container-highest);
    border-top-color: var(--lumina-primary);
    border-radius: 50%;
    animation: browse-spin 0.6s linear infinite;
  }
  @keyframes browse-spin { to { transform: rotate(360deg); } }

  /* Browse: empty */
  .browse-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lumina-space-3);
    padding: var(--lumina-space-8) 0;
    color: var(--lumina-on-surface-variant);
  }
  .browse-empty ha-icon { --mdc-icon-size: 36px; }
  .browse-empty span { font-size: 0.875rem; }

  /* Browse: root category grid (2x3 like Stitch design) */
  .browse-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--lumina-space-3);
  }
  .browse-category {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lumina-space-2);
    padding: var(--lumina-space-5) var(--lumina-space-3);
    background: var(--lumina-surface-container-high);
    border: none;
    border-radius: var(--lumina-radius-lg);
    cursor: pointer;
    transition: all var(--lumina-transition-fast);
    -webkit-tap-highlight-color: transparent;
    font-family: var(--lumina-font-body);
  }
  .browse-category:hover {
    background: var(--lumina-surface-container-highest);
    transform: translateY(-1px);
  }
  .browse-category:active { transform: scale(0.97); }
  .browse-category ha-icon {
    --mdc-icon-size: 28px;
    color: var(--lumina-primary);
  }
  .browse-category-title {
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--lumina-on-surface-variant);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  /* Browse: item list */
  .browse-list {
    display: flex;
    flex-direction: column;
    gap: var(--lumina-space-2);
    max-height: 360px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--lumina-outline-variant) transparent;
  }
  .browse-list::-webkit-scrollbar { width: 3px; }
  .browse-list::-webkit-scrollbar-track { background: transparent; }
  .browse-list::-webkit-scrollbar-thumb { background: var(--lumina-outline-variant); border-radius: 9999px; }

  .browse-list-item {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-3);
    padding: var(--lumina-space-2) var(--lumina-space-3);
    border-radius: var(--lumina-radius-lg);
    cursor: pointer;
    transition: background var(--lumina-transition-fast);
  }
  .browse-list-item:hover { background: var(--lumina-surface-container-high); }

  .browse-thumb {
    width: 44px; height: 44px;
    border-radius: var(--lumina-radius-md, 8px);
    object-fit: cover;
    flex-shrink: 0;
  }
  .browse-thumb-placeholder {
    width: 44px; height: 44px;
    border-radius: var(--lumina-radius-md, 8px);
    background: var(--lumina-surface-container-highest);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .browse-thumb-placeholder ha-icon {
    --mdc-icon-size: 22px;
    color: var(--lumina-outline);
  }

  .browse-item-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .browse-item-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--lumina-on-surface);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  .browse-item-subtitle {
    font-size: 0.6875rem;
    color: var(--lumina-on-surface-variant);
  }

  .browse-item-actions {
    display: flex;
    align-items: center;
    gap: var(--lumina-space-1);
    flex-shrink: 0;
  }
  .browse-play-btn {
    width: 32px; height: 32px;
    border: none;
    background: transparent;
    border-radius: var(--lumina-radius-full);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    color: var(--lumina-primary);
    transition: all var(--lumina-transition-fast);
    -webkit-tap-highlight-color: transparent;
  }
  .browse-play-btn:hover { background: rgba(133, 173, 255, 0.12); }
  .browse-play-btn ha-icon { --mdc-icon-size: 20px; }
  .browse-chevron {
    --mdc-icon-size: 18px;
    color: var(--lumina-on-surface-variant);
    opacity: 0.6;
  }

  /* ─── Shortcuts ────────────────────────────────────── */
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

  /* ─── Speaker Management ───────────────────────────── */
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
  .group-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: var(--lumina-space-1) var(--lumina-space-3);
    border: 1px solid var(--lumina-ghost-border);
    border-radius: var(--lumina-radius-full);
    background: var(--lumina-surface-container-high);
    cursor: pointer;
    font-family: var(--lumina-font-body);
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--lumina-on-surface-variant);
    transition: all var(--lumina-transition-fast);
    -webkit-tap-highlight-color: transparent;
  }
  .group-btn ha-icon { --mdc-icon-size: 14px; }
  .group-btn:hover { background: var(--lumina-surface-container-highest); }
  .group-btn.grouped {
    background: rgba(133, 173, 255, 0.1);
    border-color: rgba(133, 173, 255, 0.25);
    color: var(--lumina-primary);
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
    width: 8px; height: 8px;
    border-radius: var(--lumina-radius-full);
    flex-shrink: 0;
  }
  .room-item-dot.playing {
    background: var(--lumina-primary);
    box-shadow: 0 0 6px rgba(133, 173, 255, 0.5);
  }
  .room-item-dot.idle { background: var(--lumina-outline-variant); }
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
    width: 28px; height: 28px;
    border: none;
    background: transparent;
    border-radius: var(--lumina-radius-full);
    cursor: pointer;
    flex-shrink: 0;
    padding: 0;
    transition: background var(--lumina-transition-fast);
    -webkit-tap-highlight-color: transparent;
  }
  .room-item-action ha-icon { --mdc-icon-size: 18px; }
  .room-item-action.unjoin { color: var(--lumina-outline); }
  .room-item-action.unjoin:hover {
    color: var(--lumina-error, #f44336);
    background: rgba(244, 67, 54, 0.1);
  }

  /* ─── Idle State ───────────────────────────────────── */
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
  .idle-last-played {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    opacity: 0.5;
  }
  .idle-last-title {
    font-family: var(--lumina-font-headline);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--lumina-on-surface);
  }
  .idle-last-artist {
    font-size: 0.75rem;
    color: var(--lumina-on-surface-variant);
  }
`;
