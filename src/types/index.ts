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

export interface MediaEntityConfig {
  entity: string;
  name?: string;
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
  }
}
