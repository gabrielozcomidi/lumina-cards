# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lumina Cards is a premium Home Assistant (HA) custom Lovelace card collection built with Lit 3 and TypeScript. It provides glassmorphism-styled dashboard cards for controlling rooms, lights, climate, media players, and vacuum robots. The output is a single ES module (`dist/lumina-cards.js`) loaded as a HA frontend resource.

## Build Commands

```bash
cd lumina-cards
npm run build          # Production build (minified, no sourcemaps)
npm run watch          # Dev build with file watching and sourcemaps
npm run start          # Dev build + local server on port 5000 (for HA resource URL pointing at dev machine)
```

Rollup is the bundler. Config is in `lumina-cards/rollup.config.js`. The single entry point is `src/lumina-cards.ts` which outputs to `dist/lumina-cards.js`.

## Architecture

All source code lives under `lumina-cards/src/`.

**Entry point**: `lumina-cards.ts` — imports all components/cards, injects fonts, registers cards with HA's card picker via `window.customCards`.

**Cards** (`cards/<card-name>/`): Each card has its own directory with the LitElement class (`ha-lumina-*.ts`) and a co-located `styles.ts`. Cards are registered as custom elements with the `ha-lumina-` prefix:
- `ha-lumina-room-card` — Dashboard entry card with temperature + 4 control indicators
- `ha-lumina-room-popup` — Full room control popup with collapsible sections
- `ha-lumina-light-card` — Individual light brightness, color temp, scenes
- `ha-lumina-climate-card` — HVAC modes, fan speed, humidity, temperature ring
- `ha-lumina-media-card` — Playback controls, album art, volume ring, source selector
- `ha-lumina-vacuum-card` — Battery ring, status, suction power, actions

**Editors** (`editors/`): Each card has a corresponding `*-editor.ts` providing the HA visual config UI.

**Shared components** (`components/`): Reusable Lit elements — `lumina-ring` (SVG arc indicator), `lumina-bottom-sheet`, `lumina-chip`, `lumina-slider`, `lumina-icon-button`.

**Styles** (`styles/`): `tokens.ts` defines the full design token system (CSS custom properties with `--lumina-` prefix), `shared.ts` has common styles, `animations.ts` has keyframe animations.

**Types** (`types/`): `index.ts` has card config interfaces (extending `LovelaceCardConfig`), `ha-types.ts` re-exports `HomeAssistant` from `custom-card-helpers` and defines typed entity interfaces (`LightEntity`, `ClimateEntity`, `MediaPlayerEntity`, `VacuumEntity`).

**Utils** (`utils/`): `ha-helpers.ts` (entity state access, service calls, font injection), `svg-helpers.ts` (arc ring math), `editor-helpers.ts`, `assets-3d.ts` + `render-3d-bg.ts` (inline SVG room illustrations), `debounce.ts`.

## Key Conventions

- Cards interact with HA via the `hass` object (`HomeAssistant` type from `custom-card-helpers`). Entity state is read from `hass.states[entity_id]`, services called via `hass.callService()`.
- Each card must implement `setConfig()` and `set hass()` per HA custom card API. Cards also expose a static `getConfigElement()` returning the editor tag name.
- The design system ("Ethereal Conductor") uses a dark base (`#0e0e10`), glassmorphism effects, and the `--lumina-*` CSS custom property namespace defined in `styles/tokens.ts`.
- TypeScript strict mode is enabled. Target is ES2021 with experimental decorators (for Lit's `@customElement`, `@property`, `@state`).
- A companion HA theme file lives at `lumina-cards/themes/lumina.yaml`.
