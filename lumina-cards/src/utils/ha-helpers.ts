import { HomeAssistant, HassEntity } from '../types/ha-types';

/**
 * Safely get an entity from hass.states.
 */
export function getEntity(
  hass: HomeAssistant,
  entityId: string | undefined,
): HassEntity | undefined {
  if (!entityId || !hass?.states) return undefined;
  return hass.states[entityId] as HassEntity | undefined;
}

/**
 * Check if entity is available (not unavailable/unknown).
 */
export function isEntityAvailable(entity: HassEntity | undefined): boolean {
  if (!entity) return false;
  return entity.state !== 'unavailable' && entity.state !== 'unknown';
}

/**
 * Get friendly name from entity.
 */
export function entityName(entity: HassEntity | undefined): string {
  if (!entity) return '';
  return (entity.attributes.friendly_name as string) || entity.entity_id;
}

/**
 * Call a Home Assistant service.
 */
export function callService(
  hass: HomeAssistant,
  domain: string,
  service: string,
  data?: Record<string, unknown>,
): void {
  hass.callService(domain, service, data);
}

/**
 * Count how many lights are "on" from a list of entity IDs.
 */
export function lightsOnCount(
  hass: HomeAssistant,
  entityIds: string[],
): number {
  return entityIds.filter((id) => {
    const entity = getEntity(hass, id);
    return entity && entity.state === 'on';
  }).length;
}

/**
 * Get lights-on percentage (0–100).
 */
export function lightsOnPercentage(
  hass: HomeAssistant,
  entityIds: string[],
): number {
  if (!entityIds.length) return 0;
  return Math.round((lightsOnCount(hass, entityIds) / entityIds.length) * 100);
}

/**
 * Get average brightness of lights that are on (0–100).
 */
export function averageBrightness(
  hass: HomeAssistant,
  entityIds: string[],
): number {
  const onLights = entityIds
    .map((id) => getEntity(hass, id))
    .filter((e) => e && e.state === 'on');

  if (!onLights.length) return 0;

  const totalBrightness = onLights.reduce((sum, e) => {
    const brightness = (e!.attributes.brightness as number) || 0;
    return sum + Math.round((brightness / 255) * 100);
  }, 0);

  return Math.round(totalBrightness / onLights.length);
}

/**
 * Format a temperature value with unit.
 */
export function formatTemperature(
  value: number | undefined,
  unit: string = '°',
): string {
  if (value === undefined || value === null) return '--';
  return `${Math.round(value)}${unit}`;
}

/**
 * Get volume percentage from a media_player entity (0–100).
 */
export function getVolumePercent(entity: HassEntity | undefined): number {
  if (!entity) return 0;
  const level = entity.attributes.volume_level as number | undefined;
  return level !== undefined ? Math.round(level * 100) : 0;
}

/**
 * Format seconds to mm:ss.
 */
export function formatDuration(seconds: number | undefined): string {
  if (!seconds || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Fire haptic feedback event (for HA Companion app).
 */
export function fireHaptic(el: HTMLElement, type: 'success' | 'warning' | 'failure' | 'light' | 'medium' | 'heavy' | 'selection' = 'light'): void {
  const event = new Event('haptic', { bubbles: true, composed: true });
  (event as any).detail = type;
  el.dispatchEvent(event);
}

/**
 * Inject Google Fonts into document head (call once).
 */
let fontsInjected = false;
export function injectFonts(): void {
  if (fontsInjected) return;
  fontsInjected = true;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&family=Inter:wght@400;500;600&display=swap';
  document.head.appendChild(link);

  const iconLink = document.createElement('link');
  iconLink.rel = 'stylesheet';
  iconLink.href =
    'https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined';
  document.head.appendChild(iconLink);
}
