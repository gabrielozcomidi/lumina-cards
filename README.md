<p align="center">
  <img src="Lumina Logo.png" alt="Lumina Cards" width="400">
</p>

<p align="center">
  Premium glassmorphism Lovelace card collection for <a href="https://www.home-assistant.io/">Home Assistant</a>.<br>
  Built with <a href="https://lit.dev/">Lit 3</a> and TypeScript.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Home%20Assistant-2024.1%2B-41BDF5?logo=homeassistant&logoColor=white" alt="Home Assistant">
  <img src="https://img.shields.io/github/license/gabrielozcomidi/lumina-cards" alt="License">
</p>

## Cards

| Card | Description |
|------|-------------|
| **Room Card** | Dashboard entry card with temperature display and 4 control indicators |
| **Room Popup** | Full room control popup with collapsible sections |
| **Light Card** | Brightness, color temperature, and scene controls |
| **Climate Card** | HVAC modes, fan speed, humidity, and temperature ring |
| **Media Card** | Playback controls, album art, volume ring, and source selector |
| **Vacuum Card** | Battery ring, status, suction power, and actions |
| **Bottom Bar** | Glassmorphism navigation bar with actions, hero button, and notification glow |

## Design

Lumina uses the **Ethereal Conductor** design system — a dark base (`#0e0e10`), glassmorphism effects with backdrop blur, SVG arc indicator rings, and domain-specific color coding:

- **Lights** — Yellow (`#fecb00`)
- **Climate** — Blue (`#85adff`) / Yellow (heat)
- **Media** — Blue (`#85adff`)
- **Vacuum** — Green (`#6ffb85`)

Typography: [Manrope](https://fonts.google.com/specimen/Manrope) for headlines, [Inter](https://fonts.google.com/specimen/Inter) for body text.

## Installation

### HACS (Recommended)

1. Add this repository as a custom repository in HACS
2. Search for **Lumina Cards** and install
3. Add the resource in your HA dashboard configuration

### Manual

1. Download `lumina-cards.js` from the [latest release](https://github.com/gabrielozcomidi/lumina-cards/releases/latest)
2. Copy it to `config/www/lumina-cards.js`
3. Add the resource to your dashboard:
   ```yaml
   resources:
     - url: /local/lumina-cards.js
       type: module
   ```

## Configuration

Each card is available in the HA card picker with a visual editor. You can also configure cards manually in YAML:

```yaml
type: custom:ha-lumina-room-card
name: Living Room
temperature_entity: sensor.living_room_temperature
light_entity: light.living_room
climate_entity: climate.living_room
media_entity: media_player.living_room
vacuum_entity: vacuum.living_room
```

### Theme

A companion theme is included at `themes/lumina.yaml`. Copy it to your HA `themes/` directory and select **Lumina** in your profile settings for the full experience.

## Development

**Requirements:** Node.js 20+

```bash
npm install
```

| Command | Description |
|---------|-------------|
| `npm run build` | Production build (minified, no sourcemaps) |
| `npm run watch` | Dev build with file watching and sourcemaps |
| `npm run start` | Dev build + local server on port 5000 |

Output is a single ES module at `dist/lumina-cards.js`.

## Project Structure

```
src/
├── lumina-cards.ts          # Entry point — registers all cards
├── cards/                   # Card components (ha-lumina-*)
│   ├── room-card/
│   ├── room-popup/
│   ├── light-card/
│   ├── climate-card/
│   ├── media-card/
│   ├── vacuum-card/
│   └── bottom-bar/
├── components/              # Shared UI components
│   ├── lumina-ring.ts       # SVG arc indicator
│   ├── lumina-slider.ts
│   ├── lumina-chip.ts
│   ├── lumina-icon-button.ts
│   └── lumina-bottom-sheet.ts
├── editors/                 # Visual config editors
├── styles/                  # Design tokens, shared styles, animations
├── types/                   # TypeScript interfaces
└── utils/                   # Helpers (HA services, SVG math, etc.)
```

## License

MIT
