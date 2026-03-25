# Lumina Cards

A premium Home Assistant card collection featuring atmospheric dark design, glassmorphism effects, and SVG arc indication rings.

## Cards

| Card | Description |
|------|-------------|
| **Room Card** | Dashboard entry card with temperature display and 4 control indicators (Lights, Climate, Media, Clean) |
| **Room Popup** | Full room control in one popup — all elements combined with collapsible sections |
| **Light Card** | Complete lighting control — individual light brightness, color temperature, scenes |
| **Climate Card** | Climate control with environmental ring, HVAC modes, fan speed, humidity |
| **Media Card** | Media player with album art, playback controls, volume ring, source selector |
| **Vacuum Card** | Vacuum robot control with battery ring, status, actions, suction power |

## Installation

### HACS (Recommended)
1. Open HACS in your Home Assistant
2. Go to Frontend > Custom repositories
3. Add this repository URL
4. Search for "Lumina Cards" and install
5. Reload your browser

### Manual
1. Download `lumina-cards.js` from the latest release
2. Copy to `config/www/lumina-cards.js`
3. Add resource in Settings > Dashboards > Resources:
   - URL: `/local/lumina-cards.js`
   - Type: JavaScript Module

### Theme Installation
1. Copy `themes/lumina.yaml` to your HA `config/themes/` folder
2. Add to `configuration.yaml` if not already present:
   ```yaml
   frontend:
     themes: !include_dir_merge_named themes
   ```
3. Restart HA, then select **Lumina** theme in your profile or per-dashboard
4. (Optional) Install **card-mod** via HACS for extra glass/glow card styling presets

## Configuration

### Room Card
```yaml
type: custom:ha-lumina-room-card
name: Living Room
image: sofa  # Built-in 3D assets: sofa, bed, kitchen, bathtub, office, vacuum, purifier
temperature_entity: sensor.living_room_temperature
light_entities:
  - light.living_room_main
  - light.living_room_lamp
  - light.living_room_accent
climate_entity: climate.living_room
media_entity: media_player.living_room_sonos
vacuum_entity: vacuum.roborock
show_climate: true
show_media: true
show_vacuum: true
```

### Light Card (standalone)
```yaml
type: custom:ha-lumina-light-card
entities:
  - light.living_room_main
  - light.living_room_lamp
  - light.living_room_accent
  - light.living_room_strip
show_color_temp: true
show_individual_controls: true
scenes:
  - name: Movie Night
    icon: mdi:movie
    entity_id: scene.movie_night
  - name: Bright
    icon: mdi:brightness-7
    entity_id: scene.bright
```

### Climate Card (standalone)
```yaml
type: custom:ha-lumina-climate-card
entity: climate.living_room
show_humidity: true
show_fan_speed: true
```

### Media Card (standalone)
```yaml
type: custom:ha-lumina-media-card
entity: media_player.living_room_sonos
show_source: true
show_progress: true
```

### Vacuum Card (standalone)
```yaml
type: custom:ha-lumina-vacuum-card
entity: vacuum.roborock
show_fan_speed: true
```

## Design System

Lumina Cards uses the "Ethereal Conductor" design language:
- **Dark atmospheric theme** — `#0e0e10` base
- **Glassmorphism** — frosted glass cards with backdrop blur
- **SVG Arc Rings** — visual indicators for brightness, temperature, volume, battery
- **Typography** — Manrope headlines, Inter body text
- **Color coding** — Blue (cool/AC), Yellow (warm/lights), Green (eco/clean), Red (error)
