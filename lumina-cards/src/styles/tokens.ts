import { css } from 'lit';

export const luminaTokens = css`
  :host {
    /* ─── Surfaces ─────────────────────────────────── */
    --lumina-surface: #0e0e10;
    --lumina-surface-dim: #0e0e10;
    --lumina-surface-bright: #2c2c2f;
    --lumina-surface-container-lowest: #000000;
    --lumina-surface-container-low: #131315;
    --lumina-surface-container: #19191c;
    --lumina-surface-container-high: #1f1f22;
    --lumina-surface-container-highest: #252528;
    --lumina-surface-variant: #252528;
    --lumina-surface-tint: #85adff;

    /* ─── On Surface ───────────────────────────────── */
    --lumina-on-surface: #fefbfe;
    --lumina-on-surface-variant: #acaaad;
    --lumina-on-background: #fefbfe;
    --lumina-inverse-surface: #fcf8fb;
    --lumina-inverse-on-surface: #555557;

    /* ─── Primary (Cool / AC) ──────────────────────── */
    --lumina-primary: #85adff;
    --lumina-primary-dim: #0070eb;
    --lumina-primary-container: #6c9fff;
    --lumina-on-primary: #002c65;
    --lumina-on-primary-container: #00214f;
    --lumina-inverse-primary: #005bc2;

    /* ─── Secondary (Warm / Light) ─────────────────── */
    --lumina-secondary: #fecb00;
    --lumina-secondary-dim: #eebe00;
    --lumina-secondary-container: #745b00;
    --lumina-on-secondary: #584500;
    --lumina-on-secondary-container: #fff7ea;

    /* ─── Tertiary (Eco / Clean) ───────────────────── */
    --lumina-tertiary: #b8ffb9;
    --lumina-tertiary-dim: #60ec79;
    --lumina-tertiary-container: #6ffb85;
    --lumina-on-tertiary: #006725;
    --lumina-on-tertiary-container: #005d21;

    /* ─── Error ────────────────────────────────────── */
    --lumina-error: #ff716c;
    --lumina-error-dim: #d7383b;
    --lumina-error-container: #9f0519;
    --lumina-on-error: #490006;
    --lumina-on-error-container: #ffa8a3;

    /* ─── Outline ──────────────────────────────────── */
    --lumina-outline: #767577;
    --lumina-outline-variant: #48474a;

    /* ─── Effects ──────────────────────────────────── */
    --lumina-glass-bg: rgba(37, 37, 40, 0.4);
    --lumina-glass-blur: 24px;
    --lumina-ghost-border: rgba(72, 71, 74, 0.15);
    --lumina-ambient-shadow: 0 0 40px 0 rgba(254, 251, 254, 0.06);

    /* ─── Radii ────────────────────────────────────── */
    --lumina-radius-xs: 0.25rem;
    --lumina-radius-sm: 0.5rem;
    --lumina-radius-md: 0.75rem;
    --lumina-radius-lg: 1rem;
    --lumina-radius-xl: 1.5rem;
    --lumina-radius-full: 9999px;

    /* ─── Spacing ──────────────────────────────────── */
    --lumina-space-1: 0.25rem;
    --lumina-space-2: 0.5rem;
    --lumina-space-3: 0.75rem;
    --lumina-space-4: 1rem;
    --lumina-space-5: 1.25rem;
    --lumina-space-6: 1.5rem;
    --lumina-space-8: 2rem;
    --lumina-space-10: 2.5rem;
    --lumina-space-12: 3rem;

    /* ─── Typography ───────────────────────────────── */
    --lumina-font-headline: 'Manrope', sans-serif;
    --lumina-font-body: 'Inter', sans-serif;

    /* ─── Transitions ──────────────────────────────── */
    --lumina-transition-fast: 150ms ease;
    --lumina-transition-normal: 250ms ease;
    --lumina-transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
