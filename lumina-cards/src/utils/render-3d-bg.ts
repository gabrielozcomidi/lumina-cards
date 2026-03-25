import { html, nothing } from 'lit';
import { resolveImageUrl } from './assets-3d';

/**
 * Renders the 3D background element for any card.
 * Use class="popup" variant for popup cards (lighter opacity).
 */
export function render3dBackground(image: string | undefined, isPopup = false) {
  const url = resolveImageUrl(image);
  if (!url) return nothing;

  return html`
    <div class="lumina-3d-bg ${isPopup ? 'popup' : ''}">
      <img src="${url}" alt="" loading="lazy" />
    </div>
  `;
}
