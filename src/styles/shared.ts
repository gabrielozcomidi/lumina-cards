import { css } from 'lit';

export const sharedStyles = css`
  /* ─── 3D Background (reusable across all cards) ──── */
  .lumina-3d-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
    border-radius: inherit;
  }

  .lumina-3d-bg img {
    position: absolute;
    right: -5%;
    top: 50%;
    transform: translateY(-50%);
    width: 60%;
    height: 95%;
    object-fit: contain;
    object-position: center right;
    filter: drop-shadow(0 0 40px rgba(0, 0, 0, 0.6)) blur(1.5px);
    opacity: 0.55;
    mask-image: radial-gradient(
      ellipse 85% 80% at 70% 50%,
      black 30%,
      rgba(0, 0, 0, 0.5) 60%,
      transparent 100%
    );
    -webkit-mask-image: radial-gradient(
      ellipse 85% 80% at 70% 50%,
      black 30%,
      rgba(0, 0, 0, 0.5) 60%,
      transparent 100%
    );
  }

  .lumina-3d-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      /* Left fade — protects text area */
      linear-gradient(
        to right,
        var(--lumina-3d-bg-color, var(--lumina-surface-container)) 0%,
        var(--lumina-3d-bg-color, var(--lumina-surface-container)) 15%,
        rgba(25, 25, 28, 0.95) 30%,
        rgba(25, 25, 28, 0.7) 45%,
        rgba(25, 25, 28, 0.25) 65%,
        transparent 85%
      ),
      /* Bottom fade */
      linear-gradient(
        to top,
        var(--lumina-3d-bg-color, var(--lumina-surface-container)) 0%,
        rgba(25, 25, 28, 0.9) 10%,
        rgba(25, 25, 28, 0.5) 25%,
        transparent 45%
      ),
      /* Top fade */
      linear-gradient(
        to bottom,
        rgba(25, 25, 28, 0.5) 0%,
        transparent 20%
      );
    pointer-events: none;
  }

  /* Popup variant — deeper blend, image emerges from dark surface */
  .lumina-3d-bg.popup {
    --lumina-3d-bg-color: #19191c;
  }

  .lumina-3d-bg.popup img {
    opacity: 0.35;
    width: 50%;
    filter: drop-shadow(0 0 50px rgba(0, 0, 0, 0.7)) blur(2.5px);
    mask-image: radial-gradient(
      ellipse 80% 75% at 72% 50%,
      black 20%,
      rgba(0, 0, 0, 0.4) 50%,
      transparent 90%
    );
    -webkit-mask-image: radial-gradient(
      ellipse 80% 75% at 72% 50%,
      black 20%,
      rgba(0, 0, 0, 0.4) 50%,
      transparent 90%
    );
  }

  /* Card content sits above the 3D bg */
  .lumina-3d-content {
    position: relative;
    z-index: 1;
  }

  /* ─── Glass Card ─────────────────────────────────── */
  .lumina-glass {
    background: var(--lumina-glass-bg);
    backdrop-filter: blur(var(--lumina-glass-blur));
    -webkit-backdrop-filter: blur(var(--lumina-glass-blur));
    border: 1px solid var(--lumina-ghost-border);
    border-radius: var(--lumina-radius-xl);
  }

  .lumina-glass-sm {
    background: var(--lumina-glass-bg);
    backdrop-filter: blur(var(--lumina-glass-blur));
    -webkit-backdrop-filter: blur(var(--lumina-glass-blur));
    border: 1px solid var(--lumina-ghost-border);
    border-radius: var(--lumina-radius-md);
  }

  /* ─── Surfaces ───────────────────────────────────── */
  .lumina-card {
    background: var(--lumina-surface-container);
    border-radius: var(--lumina-radius-xl);
    padding: var(--lumina-space-6);
    color: var(--lumina-on-surface);
    font-family: var(--lumina-font-body);
  }

  .lumina-card-elevated {
    background: var(--lumina-surface-container-high);
    border-radius: var(--lumina-radius-lg);
    padding: var(--lumina-space-4);
    color: var(--lumina-on-surface);
  }

  /* ─── Glow Effects ──────────────────────────────── */
  .glow-primary {
    box-shadow: 0 0 15px -3px rgba(133, 173, 255, 0.3);
  }

  .glow-secondary {
    box-shadow: 0 0 15px -3px rgba(254, 203, 0, 0.3);
  }

  .glow-tertiary {
    box-shadow: 0 0 15px -3px rgba(111, 251, 133, 0.3);
  }

  .glow-error {
    box-shadow: 0 0 15px -3px rgba(255, 113, 108, 0.3);
  }

  /* ─── Typography ─────────────────────────────────── */
  .display-lg {
    font-family: var(--lumina-font-headline);
    font-size: 3rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.02em;
    color: var(--lumina-on-surface);
  }

  .display-md {
    font-family: var(--lumina-font-headline);
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--lumina-on-surface);
  }

  .display-sm {
    font-family: var(--lumina-font-headline);
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 1.15;
    color: var(--lumina-on-surface);
  }

  .headline-lg {
    font-family: var(--lumina-font-headline);
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.2;
    color: var(--lumina-on-surface);
  }

  .headline-sm {
    font-family: var(--lumina-font-headline);
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.3;
    color: var(--lumina-on-surface);
  }

  .title-md {
    font-family: var(--lumina-font-body);
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.4;
    color: var(--lumina-on-surface);
  }

  .body-md {
    font-family: var(--lumina-font-body);
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--lumina-on-surface);
  }

  .body-sm {
    font-family: var(--lumina-font-body);
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--lumina-on-surface-variant);
  }

  .label-lg {
    font-family: var(--lumina-font-body);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.4;
    color: var(--lumina-on-surface-variant);
  }

  .label-sm {
    font-family: var(--lumina-font-body);
    font-size: 0.6875rem;
    font-weight: 500;
    line-height: 1.4;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--lumina-on-surface-variant);
  }

  /* ─── Utility ────────────────────────────────────── */
  .text-primary { color: var(--lumina-primary); }
  .text-secondary { color: var(--lumina-secondary); }
  .text-tertiary { color: var(--lumina-tertiary); }
  .text-error { color: var(--lumina-error); }
  .text-muted { color: var(--lumina-on-surface-variant); }

  .flex { display: flex; }
  .flex-col { display: flex; flex-direction: column; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .justify-between { justify-content: space-between; }
  .gap-1 { gap: var(--lumina-space-1); }
  .gap-2 { gap: var(--lumina-space-2); }
  .gap-3 { gap: var(--lumina-space-3); }
  .gap-4 { gap: var(--lumina-space-4); }
  .gap-6 { gap: var(--lumina-space-6); }

  /* ─── Scrollbar ──────────────────────────────────── */
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--lumina-outline-variant);
    border-radius: var(--lumina-radius-full);
  }
`;
