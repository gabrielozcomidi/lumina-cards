import { css } from 'lit';

export const animationStyles = css`
  /* ─── Ring Value Transition ──────────────────────── */
  @keyframes ring-fill {
    from { stroke-dashoffset: var(--ring-circumference); }
    to { stroke-dashoffset: var(--ring-offset); }
  }

  /* ─── Glow Pulse ─────────────────────────────────── */
  @keyframes glow-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  .glow-animate {
    animation: glow-pulse 2s ease-in-out infinite;
  }

  /* ─── Bottom Sheet Slide ─────────────────────────── */
  @keyframes sheet-slide-up {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }

  @keyframes sheet-slide-down {
    from { transform: translateY(0); }
    to { transform: translateY(100%); }
  }

  @keyframes backdrop-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes backdrop-fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  /* ─── Skeleton Loading ───────────────────────────── */
  @keyframes skeleton-pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.15; }
  }

  .skeleton {
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-sm);
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }

  /* ─── Fade In ────────────────────────────────────── */
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-in {
    animation: fade-in 300ms ease-out;
  }

  /* ─── Scale Tap ──────────────────────────────────── */
  .tap-scale {
    transition: transform var(--lumina-transition-fast);
  }

  .tap-scale:active {
    transform: scale(0.96);
  }

  /* ─── Status Indicator Pulse ─────────────────────── */
  @keyframes status-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .status-pulse {
    animation: status-pulse 2s ease-in-out infinite;
  }
`;
