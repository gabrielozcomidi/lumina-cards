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
}

// ─── Climate Card Config ─────────────────────────────────────

export interface LuminaClimateCardConfig extends LovelaceCardConfig {
  type: string;
  entity: string;
  image?: string;
  show_humidity?: boolean;
  show_fan_speed?: boolean;
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
}

// ─── Vacuum Card Config ──────────────────────────────────────

export interface LuminaVacuumCardConfig extends LovelaceCardConfig {
  type: string;
  entity: string;
  image?: string;
  show_fan_speed?: boolean;
  show_map?: boolean;
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
    'ha-lumina-info-card': HTMLElement;
    'ha-lumina-bottom-bar': HTMLElement;
  }
}
