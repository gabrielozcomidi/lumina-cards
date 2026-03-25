/**
 * Helper to load HA frontend elements that are lazy-loaded.
 * Must be called before using ha-entity-picker, ha-switch, etc. in editors.
 */

let _loaded = false;
let _loadPromise: Promise<void> | null = null;

export async function loadHaElements(): Promise<void> {
  if (_loaded) return;

  if (_loadPromise) return _loadPromise;

  _loadPromise = (async () => {
    // Wait for custom elements registry to have the entities card
    // which triggers loading of ha-entity-picker and other form elements
    const helpers = await (window as any).loadCardHelpers?.();
    if (helpers) {
      // Creating a built-in card forces HA to load its form components
      const entitiesCard = await helpers.createCardElement({ type: 'entities', entities: [] });
      if (entitiesCard) {
        await entitiesCard.constructor?.getConfigElement?.();
      }
    }
    _loaded = true;
  })();

  return _loadPromise;
}

/**
 * Fire a config-changed event the way HA expects it.
 */
export function fireConfigChanged(el: HTMLElement, config: Record<string, unknown>): void {
  const event = new Event('config-changed', {
    bubbles: true,
    composed: true,
  });
  (event as any).detail = { config };
  el.dispatchEvent(event);
}
