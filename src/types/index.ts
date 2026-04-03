import { LovelaceCardConfig } from 'custom-card-helpers';

// ─── Shared Types ────────────────────────────────────────────

export interface RingConfig {
  value: number;
  min?: number;
  max?: number;
  color?: string;
  strokeWidth?: number;
  size?: number;
}

export interface SceneConfig {
  name: string;
  icon: string;
  entity_id: string;
}

// ─── Room Card Config ────────────────────────────────────────

export interface LuminaRoomCardConfig extends LovelaceCardConfig {
  type: string;
  name: string;
  image?: string;
  temperature_entity?: string;
  humidity_entity?: string;
  light_entities?: (string | LightEntityConfig)[];
  climate_entity?: string;
  media_entity?: string;
  media_entities?: (string | MediaEntityConfig)[];
  audio_format_entity?: string;
  mass_config_entry_id?: string;
  vacuum_entity?: string;
  show_climate?: boolean;
  show_media?: boolean;
  show_vacuum?: boolean;
  // Custom button labels (user-chosen names instead of entity names)
  lights_label?: string;
  climate_label?: string;
  media_label?: string;
  vacuum_label?: string;
  // Scenes shown in the light popup
  light_scenes?: SceneConfig[];
  // Compact half-width variant for horizontal stacks
  compact?: boolean;
  show_background?: boolean;
  popup_fullscreen?: boolean;
}

// ─── Room Popup Config ───────────────────────────────────────

export type RoomSection = 'lights' | 'climate' | 'media' | 'vacuum';

export interface LuminaRoomPopupConfig extends LovelaceCardConfig {
  type: string;
  name: string;
  image?: string;
  temperature_entity?: string;
  light_entities?: (string | LightEntityConfig)[];
  climate_entity?: string;
  media_entity?: string;
  vacuum_entity?: string;
  sections?: RoomSection[];
  fullscreen?: boolean;
}

// ─── Light Card Config ───────────────────────────────────────

export interface LightEntityConfig {
  entity: string;
  name?: string;
  icon?: string;
  group?: string;
}

export interface LuminaLightCardConfig extends LovelaceCardConfig {
  type: string;
  entities: (string | LightEntityConfig)[];
  image?: string;
  show_color_temp?: boolean;
  show_individual_controls?: boolean;
  scenes?: SceneConfig[];
  show_background?: boolean;
}

// ─── Climate Card Config ─────────────────────────────────────

export interface ClimateEntityConfig {
  entity: string;
  name?: string;
}

export interface LuminaClimateCardConfig extends LovelaceCardConfig {
  type: string;
  entity?: string;
  entities?: (string | ClimateEntityConfig)[];
  image?: string;
  show_humidity?: boolean;
  show_fan_speed?: boolean;
  show_background?: boolean;
}

// ─── Media Card Config ───────────────────────────────────────

export type MediaPlayerType = 'speaker' | 'tv';

export interface MediaEntityConfig {
  entity: string;
  name?: string;
  player_type?: MediaPlayerType;
}

export interface MediaShortcut {
  name: string;
  icon?: string;
  media_content_id: string;
  media_content_type: string;
}

export interface LuminaMediaCardConfig extends LovelaceCardConfig {
  type: string;
  entity?: string;
  entities?: (string | MediaEntityConfig)[];
  audio_format_entity?: string;
  mass_config_entry_id?: string;
  image?: string;
  show_source?: boolean;
  show_progress?: boolean;
  show_speaker_management?: boolean;
  shortcuts?: MediaShortcut[];
  show_background?: boolean;
}

// ─── Vacuum Card Config ──────────────────────────────────────

export interface LuminaVacuumCardConfig extends LovelaceCardConfig {
  type: string;
  entity: string;
  image?: string;
  show_fan_speed?: boolean;
  show_map?: boolean;
  show_background?: boolean;
}

// ─── Weather Card Config ────────────────────────────────────

export type WeatherCardLayout = 'full' | 'compact' | 'room';

export interface LuminaWeatherCardConfig extends LovelaceCardConfig {
  type: string;
  entity: string;
  name?: string;
  layout?: WeatherCardLayout;
  compact?: boolean; // legacy alias for layout: 'compact'
  show_forecast_hourly?: boolean;
  show_forecast_daily?: boolean;
  show_details?: boolean;
  hourly_count?: number;
  daily_count?: number;
  show_background?: boolean;
}

// ─── Home Status Card Config ────────────────────────────────

export interface StatusChipConfig {
  entity: string;
  name?: string;
  icon?: string;
}

export interface LuminaStatusCardConfig extends LovelaceCardConfig {
  type: string;
  name?: string;
  // Greeting
  show_greeting?: boolean;
  show_clock?: boolean;
  time_format?: '12h' | '24h';
  greeting_entity?: string;
  // Home status
  person_entities?: string[];
  // Quick status chips
  chips?: StatusChipConfig[];
  // Weather
  weather_entity?: string;
  // Security
  alarm_entity?: string;
  // Energy
  energy_entity?: string;
  // Lighting summary
  show_lights_summary?: boolean;
  // RSS Feed
  rss_entity?: string;
  rss_scroll?: boolean;
  // Stocks (Yahoo Finance integration)
  stock_entities?: string[];
  stock_scroll?: boolean;
  // Calendar
  calendar_entity?: string;
  // Layout
  show_background?: boolean;
}

// ─── Clock Card Config ──────────────────────────────────────

export interface WorldClockEntry {
  city: string;
  timezone: string;
}

export interface LuminaClockCardConfig extends LovelaceCardConfig {
  type: string;
  layout?: 'full' | 'room' | 'compact';
  name?: string;
  time_format?: '12h' | '24h';
  show_seconds?: boolean;
  show_date?: boolean;
  show_greeting?: boolean;
  show_background?: boolean;
  world_clocks?: WorldClockEntry[];
}

// ─── Info Card Config ────────────────────────────────────────

export type InfoCardMode = 'air_quality' | 'moon_phase' | 'precipitation' | 'sun_cycle' | 'sun_moon' | 'weather_alert';

export interface LuminaInfoCardConfig extends LovelaceCardConfig {
  type: string;
  mode: InfoCardMode;
  entity: string;
  moon_entity?: string;
  name?: string;
  compact?: boolean;
  show_background?: boolean;
}

// ─── Bottom Bar Config ──────────────────────────────────────

export type BottomBarActionType = 'navigate' | 'toggle' | 'call-service' | 'more-info' | 'url' | 'none';

export interface BottomBarAction {
  action: BottomBarActionType;
  navigation_path?: string;
  entity?: string;
  service?: string;
  service_data?: Record<string, unknown>;
  url?: string;
  confirmation?: boolean;
  haptic?: boolean;
}

export interface BottomBarItem {
  icon: string;
  label: string;
  tap_action: BottomBarAction;
  hold_action?: BottomBarAction;
  // State-aware: entity whose state controls icon color & dynamic icon
  state_entity?: string;
  icon_on?: string;
  icon_off?: string;
  // Notification badge
  notification_entity?: string;
  glow_color?: string;
  // Hero button
  hero?: boolean;
}

export interface LuminaBottomBarConfig extends LovelaceCardConfig {
  type: string;
  items: BottomBarItem[];
  floating?: boolean;
  active_color?: string;
}

// ─── HTMLElement Tag Declarations ─────────────────────────────

declare global {
  interface HTMLElementTagNameMap {
    'ha-lumina-room-card': HTMLElement;
    'ha-lumina-room-popup': HTMLElement;
    'ha-lumina-light-card': HTMLElement;
    'ha-lumina-climate-card': HTMLElement;
    'ha-lumina-media-card': HTMLElement;
    'ha-lumina-vacuum-card': HTMLElement;
    'lumina-ring': HTMLElement;
    'lumina-bottom-sheet': HTMLElement;
    'lumina-chip': HTMLElement;
    'lumina-slider': HTMLElement;
    'lumina-icon-button': HTMLElement;
    'ha-lumina-weather-card': HTMLElement;
    'ha-lumina-status-card': HTMLElement;
    'ha-lumina-clock-card': HTMLElement;
    'ha-lumina-info-card': HTMLElement;
    'ha-lumina-bottom-bar': HTMLElement;
  }
}
