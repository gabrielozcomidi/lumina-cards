import { css } from 'lit';

export const bottomBarStyles = css`
  :host {
    display: block;
  }

  /* ─── Spacer: reserves space so dashboard content isn't hidden ── */
  .bar-spacer {
    height: 72px;
  }
  :host([floating]) .bar-spacer {
    height: 80px;
  }

  /* ─── Fixed Bar Container ──────────────────────────────── */
  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    background: var(--lumina-glass-bg);
    backdrop-filter: blur(var(--lumina-glass-blur));
    -webkit-backdrop-filter: blur(var(--lumina-glass-blur));
    border-top: 1px solid var(--lumina-ghost-border);
    padding: 8px 0;
    padding-bottom: calc(8px + env(safe-area-inset-bottom, 0px));
    transition: box-shadow var(--lumina-transition-normal);
  }

  /* ─── Floating Variant ─────────────────────────────────── */
  .bottom-bar.floating {
    bottom: 12px;
    left: 12px;
    right: 12px;
    border-radius: var(--lumina-radius-xl);
    border: 1px solid var(--lumina-ghost-border);
    box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.4);
    padding-bottom: 8px;
  }

  /* ─── Notification Glow on the whole bar ────────────────── */
  .bottom-bar.has-notification {
    box-shadow: 0 0 20px -2px var(--bar-glow-color, rgba(133, 173, 255, 0.35));
  }
  .bottom-bar.floating.has-notification {
    box-shadow:
      0 0 40px 0 rgba(0, 0, 0, 0.4),
      0 0 20px -2px var(--bar-glow-color, rgba(133, 173, 255, 0.35));
  }

  /* ─── Nav Item ─────────────────────────────────────────── */
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    color: var(--lumina-on-surface-variant);
    text-decoration: none;
    font-family: var(--lumina-font-body);
    font-size: 0.625rem;
    font-weight: 500;
    letter-spacing: 0.03em;
    cursor: pointer;
    position: relative;
    padding: 4px 12px;
    border-radius: var(--lumina-radius-md);
    transition: color var(--lumina-transition-fast);
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }

  .nav-item ha-icon {
    --mdc-icon-size: 22px;
    transition: color var(--lumina-transition-fast),
                filter var(--lumina-transition-fast);
  }

  /* ─── Active State (navigation match) ──────────────────── */
  .nav-item.active {
    color: var(--bar-active-color, var(--lumina-primary));
  }
  .nav-item.active ha-icon {
    filter: drop-shadow(0 0 6px var(--bar-active-color, rgba(133, 173, 255, 0.5)));
  }

  /* ─── Entity On State ──────────────────────────────────── */
  .nav-item.entity-on {
    color: var(--bar-active-color, var(--lumina-primary));
  }
  .nav-item.entity-on ha-icon {
    filter: drop-shadow(0 0 6px var(--bar-active-color, rgba(133, 173, 255, 0.5)));
  }

  /* ─── Confirmation Pulse ───────────────────────────────── */
  .nav-item.confirming {
    animation: confirm-pulse 500ms ease infinite alternate;
  }
  .nav-item.confirming ha-icon {
    color: var(--lumina-secondary);
    filter: drop-shadow(0 0 10px rgba(254, 203, 0, 0.6));
  }
  .nav-item.confirming span {
    color: var(--lumina-secondary);
    font-weight: 700;
  }

  @keyframes confirm-pulse {
    from { opacity: 1; }
    to   { opacity: 0.6; }
  }

  /* ─── Hover / Press ────────────────────────────────────── */
  .nav-item:hover {
    color: var(--bar-active-color, var(--lumina-primary));
  }
  .nav-item:active {
    transform: scale(0.92);
    transition: transform 80ms ease;
  }

  /* ─── Hero Button ──────────────────────────────────────── */
  .nav-item.hero {
    position: relative;
    margin-top: -18px;
  }

  .nav-item.hero .hero-bg {
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 48px;
    height: 48px;
    border-radius: var(--lumina-radius-full);
    background: linear-gradient(
      135deg,
      var(--lumina-primary-dim) 0%,
      var(--lumina-primary-container) 100%
    );
    z-index: -1;
    box-shadow: 0 0 20px -4px rgba(133, 173, 255, 0.4);
    transition: box-shadow var(--lumina-transition-fast),
                transform var(--lumina-transition-fast);
  }

  .nav-item.hero:hover .hero-bg {
    box-shadow: 0 0 28px -2px rgba(133, 173, 255, 0.55);
    transform: translateX(-50%) scale(1.05);
  }

  .nav-item.hero:active .hero-bg {
    transform: translateX(-50%) scale(0.95);
  }

  .nav-item.hero ha-icon {
    --mdc-icon-size: 26px;
    color: var(--lumina-on-primary);
    filter: none;
    position: relative;
    z-index: 1;
    margin-top: 7px;
  }

  .nav-item.hero span {
    position: relative;
    z-index: 1;
    margin-top: 2px;
  }

  .nav-item.hero.entity-on .hero-bg {
    background: linear-gradient(
      135deg,
      var(--lumina-secondary-dim) 0%,
      var(--lumina-secondary) 100%
    );
    box-shadow: 0 0 20px -4px rgba(254, 203, 0, 0.4);
  }

  .nav-item.hero.entity-on ha-icon {
    color: var(--lumina-on-secondary);
  }

  /* ─── Notification Badge ───────────────────────────────── */
  .badge {
    position: absolute;
    top: 0;
    right: 4px;
    min-width: 16px;
    height: 16px;
    border-radius: var(--lumina-radius-full);
    background: var(--badge-color, var(--lumina-error));
    color: var(--lumina-on-error);
    font-family: var(--lumina-font-body);
    font-size: 0.5625rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    box-sizing: border-box;
    line-height: 1;
    pointer-events: none;
    animation: badge-in 250ms cubic-bezier(0.4, 0, 0.2, 1) both;
  }

  .badge.dot {
    min-width: 8px;
    height: 8px;
    padding: 0;
    top: 2px;
    right: 8px;
  }

  /* Hero badge offset */
  .nav-item.hero .badge {
    top: -4px;
    right: 0;
  }

  /* ─── Per-item glow (notification active) ──────────────── */
  .nav-item.notifying ha-icon {
    filter: drop-shadow(0 0 8px var(--item-glow-color, rgba(255, 113, 108, 0.6)));
    animation: glow-pulse 2s ease-in-out infinite;
  }

  /* ─── Animations ───────────────────────────────────────── */
  @keyframes badge-in {
    from { transform: scale(0); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }

  @keyframes glow-pulse {
    0%, 100% { filter: drop-shadow(0 0 8px var(--item-glow-color, rgba(255, 113, 108, 0.6))); }
    50%      { filter: drop-shadow(0 0 14px var(--item-glow-color, rgba(255, 113, 108, 0.8))); }
  }

  /* ─── Ripple ───────────────────────────────────────────── */
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: var(--bar-active-color, rgba(133, 173, 255, 0.15));
    transform: scale(0);
    animation: ripple-expand 400ms ease-out forwards;
    pointer-events: none;
  }

  @keyframes ripple-expand {
    to {
      transform: scale(2.5);
      opacity: 0;
    }
  }
`;
