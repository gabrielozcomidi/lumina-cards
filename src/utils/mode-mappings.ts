/**
 * Shared mode/state → icon/color/label tables.
 *
 * Before this module these tables were duplicated across cards — climate
 * colors in both room-card and climate-card, weather icons in both
 * status-card and weather-card. The duplicates drifted: status-card's
 * weather table was missing several conditions weather-card supported.
 *
 * One source of truth here means:
 *   • a new HVAC mode added in HA core only needs to be added once
 *   • the room-card's tiny ring color and the climate-card's mode pill
 *     can't disagree
 *   • when the design system tweaks a color, every card picks it up
 *
 * Each helper returns the fallback value if the key isn't known, so
 * adding a new HA state never crashes a card — it just renders with the
 * default icon/color.
 */

// ──────────────────────────────────────────────────────────────────────
// Climate (HVAC modes)
// ──────────────────────────────────────────────────────────────────────

export const CLIMATE_MODE_ICONS: Record<string, string> = {
  off: 'mdi:power',
  heat: 'mdi:fire',
  cool: 'mdi:snowflake',
  heat_cool: 'mdi:autorenew',
  auto: 'mdi:thermostat-auto',
  dry: 'mdi:water-percent',
  fan_only: 'mdi:fan',
};

export const CLIMATE_MODE_COLORS: Record<string, string> = {
  off: 'var(--lumina-outline)',
  cool: 'var(--lumina-primary)',         // blue
  heat: 'var(--lumina-secondary)',       // yellow
  heat_cool: 'var(--lumina-tertiary)',   // green
  auto: 'var(--lumina-tertiary)',        // green
  dry: 'var(--lumina-on-surface-variant)',
  fan_only: 'var(--lumina-primary)',     // blue
};

export const CLIMATE_MODE_LABELS: Record<string, string> = {
  off: 'Off',
  heat: 'Heating',
  cool: 'Cooling',
  heat_cool: 'Heat/Cool',
  auto: 'Auto',
  dry: 'Drying',
  fan_only: 'Fan',
};

export function climateModeIcon(mode: string | undefined): string {
  return (mode && CLIMATE_MODE_ICONS[mode]) || 'mdi:thermostat';
}

export function climateModeColor(mode: string | undefined): string {
  return (mode && CLIMATE_MODE_COLORS[mode]) || 'var(--lumina-outline)';
}

export function climateModeLabel(mode: string | undefined): string {
  if (!mode) return 'Off';
  return (
    CLIMATE_MODE_LABELS[mode] ||
    mode.charAt(0).toUpperCase() + mode.slice(1).replaceAll('_', ' ')
  );
}

// ──────────────────────────────────────────────────────────────────────
// Weather conditions
// ──────────────────────────────────────────────────────────────────────

export const WEATHER_CONDITION_ICONS: Record<string, string> = {
  sunny: 'mdi:weather-sunny',
  'clear-night': 'mdi:weather-night',
  partlycloudy: 'mdi:weather-partly-cloudy',
  cloudy: 'mdi:weather-cloudy',
  rainy: 'mdi:weather-rainy',
  pouring: 'mdi:weather-pouring',
  snowy: 'mdi:weather-snowy',
  'snowy-rainy': 'mdi:weather-snowy-rainy',
  fog: 'mdi:weather-fog',
  hail: 'mdi:weather-hail',
  lightning: 'mdi:weather-lightning',
  'lightning-rainy': 'mdi:weather-lightning-rainy',
  windy: 'mdi:weather-windy',
  'windy-variant': 'mdi:weather-windy-variant',
  exceptional: 'mdi:alert-circle-outline',
};

export const WEATHER_CONDITION_TINTS: Record<string, string> = {
  sunny: 'rgba(254, 203, 0, 0.12)',
  'clear-night': 'rgba(133, 173, 255, 0.08)',
  partlycloudy: 'rgba(133, 173, 255, 0.06)',
  cloudy: 'rgba(118, 117, 119, 0.08)',
  rainy: 'rgba(81, 145, 255, 0.12)',
  pouring: 'rgba(81, 145, 255, 0.15)',
  snowy: 'rgba(184, 255, 185, 0.08)',
  'snowy-rainy': 'rgba(184, 255, 185, 0.06)',
  fog: 'rgba(172, 170, 173, 0.1)',
  hail: 'rgba(133, 173, 255, 0.1)',
  lightning: 'rgba(255, 113, 108, 0.12)',
  'lightning-rainy': 'rgba(255, 113, 108, 0.10)',
  windy: 'rgba(108, 159, 255, 0.08)',
  'windy-variant': 'rgba(108, 159, 255, 0.08)',
  exceptional: 'rgba(255, 113, 108, 0.1)',
};

export const WEATHER_CONDITION_LABELS: Record<string, string> = {
  sunny: 'Sunny',
  'clear-night': 'Clear Night',
  partlycloudy: 'Partly Cloudy',
  cloudy: 'Cloudy',
  rainy: 'Rainy',
  pouring: 'Heavy Rain',
  snowy: 'Snowy',
  'snowy-rainy': 'Sleet',
  fog: 'Foggy',
  hail: 'Hail',
  lightning: 'Thunderstorm',
  'lightning-rainy': 'Thunderstorm',
  windy: 'Windy',
  'windy-variant': 'Windy',
  exceptional: 'Exceptional',
};

export function weatherConditionLabel(condition: string | undefined): string {
  if (!condition) return 'Unknown';
  return (
    WEATHER_CONDITION_LABELS[condition] ||
    condition.charAt(0).toUpperCase() + condition.slice(1).replaceAll('-', ' ')
  );
}

export const WEATHER_CONDITION_ICON_COLORS: Record<string, string> = {
  sunny: 'var(--lumina-secondary)',
  'clear-night': 'var(--lumina-primary)',
  partlycloudy: 'var(--lumina-on-surface-variant)',
  cloudy: 'var(--lumina-outline)',
  rainy: 'var(--lumina-primary)',
  pouring: 'var(--lumina-primary)',
  snowy: 'var(--lumina-tertiary)',
  'snowy-rainy': 'var(--lumina-tertiary)',
  fog: 'var(--lumina-outline)',
  hail: 'var(--lumina-primary)',
  lightning: 'var(--lumina-error)',
  'lightning-rainy': 'var(--lumina-error)',
  windy: 'var(--lumina-primary)',
  'windy-variant': 'var(--lumina-primary)',
  exceptional: 'var(--lumina-error)',
};

export function weatherConditionIcon(condition: string | undefined): string {
  return (condition && WEATHER_CONDITION_ICONS[condition]) || 'mdi:weather-cloudy';
}

export function weatherConditionTint(condition: string | undefined): string {
  return (condition && WEATHER_CONDITION_TINTS[condition]) || 'rgba(118, 117, 119, 0.08)';
}

export function weatherConditionIconColor(condition: string | undefined): string {
  return (condition && WEATHER_CONDITION_ICON_COLORS[condition]) || 'var(--lumina-on-surface-variant)';
}

// ──────────────────────────────────────────────────────────────────────
// Vacuum states
// ──────────────────────────────────────────────────────────────────────

export const VACUUM_STATE_ICONS: Record<string, string> = {
  cleaning: 'mdi:robot-vacuum',
  docked: 'mdi:battery-charging',
  paused: 'mdi:pause-circle',
  idle: 'mdi:robot-vacuum-off',
  returning: 'mdi:home',
  error: 'mdi:alert-circle',
};

export function vacuumStateIcon(state: string | undefined): string {
  return (state && VACUUM_STATE_ICONS[state]) || 'mdi:robot-vacuum';
}
