import { HomeAssistant } from 'custom-card-helpers';

export type { HomeAssistant };

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
  context: {
    id: string;
    parent_id: string | null;
    user_id: string | null;
  };
}

export interface LightEntity extends HassEntity {
  attributes: {
    brightness?: number;
    color_temp_kelvin?: number;
    min_color_temp_kelvin?: number;
    max_color_temp_kelvin?: number;
    color_mode?: string;
    supported_color_modes?: string[];
    rgb_color?: [number, number, number];
    hs_color?: [number, number];
    effect_list?: string[];
    effect?: string;
    entity_id?: string[];
    friendly_name?: string;
    icon?: string;
    [key: string]: unknown;
  };
}

export interface ClimateEntity extends HassEntity {
  attributes: {
    temperature?: number;
    current_temperature?: number;
    target_temp_high?: number;
    target_temp_low?: number;
    hvac_modes?: HvacMode[];
    hvac_action?: string;
    fan_mode?: string;
    fan_modes?: string[];
    current_humidity?: number;
    min_temp?: number;
    max_temp?: number;
    target_temp_step?: number;
    friendly_name?: string;
    icon?: string;
    [key: string]: unknown;
  };
}

export interface MediaPlayerEntity extends HassEntity {
  attributes: {
    media_title?: string;
    media_artist?: string;
    media_album_name?: string;
    media_duration?: number;
    media_position?: number;
    media_position_updated_at?: string;
    media_content_type?: string;
    media_content_id?: string;
    entity_picture?: string;
    volume_level?: number;
    is_volume_muted?: boolean;
    source?: string;
    source_list?: string[];
    group_members?: string[];
    shuffle?: boolean;
    repeat?: string;
    supported_features?: number;
    friendly_name?: string;
    icon?: string;
    [key: string]: unknown;
  };
}

export interface VacuumEntity extends HassEntity {
  attributes: {
    battery_level?: number;
    fan_speed?: string;
    fan_speed_list?: string[];
    status?: string;
    friendly_name?: string;
    icon?: string;
    [key: string]: unknown;
  };
}

export interface MediaPlayerItem {
  title: string;
  media_content_id: string;
  media_content_type: string;
  media_class: string;
  can_play: boolean;
  can_expand: boolean;
  thumbnail?: string | null;
  children_media_class?: string | null;
  children?: MediaPlayerItem[];
  not_shown?: number;
}

export type HvacMode = 'off' | 'heat' | 'cool' | 'heat_cool' | 'auto' | 'dry' | 'fan_only';

export type VacuumState = 'cleaning' | 'docked' | 'paused' | 'idle' | 'returning' | 'error';

// ─── Weather Types ──────────────────────────────────────────

export interface WeatherForecast {
  datetime: string;
  condition: string;
  temperature: number;
  templow?: number;
  precipitation?: number;
  precipitation_probability?: number;
  humidity?: number;
  wind_speed?: number;
  wind_bearing?: number;
}

export interface WeatherEntity extends HassEntity {
  attributes: {
    temperature?: number;
    temperature_unit?: string;
    humidity?: number;
    pressure?: number;
    pressure_unit?: string;
    wind_speed?: number;
    wind_speed_unit?: string;
    wind_bearing?: number;
    visibility?: number;
    visibility_unit?: string;
    uv_index?: number;
    friendly_name?: string;
    icon?: string;
    supported_features?: number;
    [key: string]: unknown;
  };
}
