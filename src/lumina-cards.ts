import { injectFonts } from './utils/ha-helpers';

// ─── Shared Components ───────────────────────────────────────
import './components/lumina-ring';
import './components/lumina-bottom-sheet';
import './components/lumina-chip';
import './components/lumina-slider';
import './components/lumina-icon-button';

// ─── Cards ───────────────────────────────────────────────────
// Phase 2
import './cards/room-card/ha-lumina-room-card';
import './cards/room-popup/ha-lumina-room-popup';
import './editors/room-card-editor';
import './editors/room-popup-editor';

// Phase 3
import './cards/light-card/ha-lumina-light-card';
import './cards/climate-card/ha-lumina-climate-card';
import './editors/light-card-editor';
import './editors/climate-card-editor';

// Phase 4
import './cards/media-card/ha-lumina-media-card';
import './cards/vacuum-card/ha-lumina-vacuum-card';
import './editors/media-card-editor';
import './editors/vacuum-card-editor';

// Phase 5
import './cards/bottom-bar/ha-lumina-bottom-bar';
import './editors/bottom-bar-editor';

// Phase 6
import './cards/weather-card/ha-lumina-weather-card';
import './editors/weather-card-editor';
import './cards/info-card/ha-lumina-info-card';
import './editors/info-card-editor';
import './cards/clock-card/ha-lumina-clock-card';
import './editors/clock-card-editor';
import './cards/status-card/ha-lumina-status-card';
import './editors/status-card-editor';

// ─── Version ─────────────────────────────────────────────────
const CARD_VERSION = '2.6.2';

// ─── Inject Fonts ────────────────────────────────────────────
injectFonts();

// ─── Card Registration ───────────────────────────────────────
interface CustomCardEntry {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
}

const CARDS: CustomCardEntry[] = [
  {
    type: 'ha-lumina-room-card',
    name: 'Lumina Room Card',
    description: 'Premium room card with temperature display and control indicators',
    preview: true,
  },
  {
    type: 'ha-lumina-room-popup',
    name: 'Lumina Room Popup',
    description: 'Full room control popup with all elements in one view',
    preview: true,
  },
  {
    type: 'ha-lumina-light-card',
    name: 'Lumina Light Card',
    description: 'Full lighting control with individual light management and scenes',
    preview: true,
  },
  {
    type: 'ha-lumina-climate-card',
    name: 'Lumina Climate Card',
    description: 'Climate control with environmental ring and HVAC mode selection',
    preview: true,
  },
  {
    type: 'ha-lumina-media-card',
    name: 'Lumina Media Card',
    description: 'Media player control with album art, playback, and volume ring',
    preview: true,
  },
  {
    type: 'ha-lumina-vacuum-card',
    name: 'Lumina Vacuum Card',
    description: 'Vacuum/cleaning robot control with battery ring and actions',
    preview: true,
  },
  {
    type: 'ha-lumina-status-card',
    name: 'Lumina Home Status',
    description: 'Morning briefing with greeting, people, security, weather, energy, news, and calendar',
    preview: true,
  },
  {
    type: 'ha-lumina-clock-card',
    name: 'Lumina Clock Card',
    description: 'Premium clock with greeting, date, and world clocks',
    preview: true,
  },
  {
    type: 'ha-lumina-info-card',
    name: 'Lumina Info Card',
    description: 'Air quality, moon phase, precipitation, sun cycle, and weather alerts',
    preview: true,
  },
  {
    type: 'ha-lumina-weather-card',
    name: 'Lumina Weather Card',
    description: 'Premium weather card with condition-tinted glassmorphism and forecasts',
    preview: true,
  },
  {
    type: 'ha-lumina-bottom-bar',
    name: 'Lumina Bottom Bar',
    description: 'Glassmorphism navigation bar with shortcuts and notification glow',
    preview: false,
  },
];

// Register cards in window.customCards for HA card picker
const windowWithCards = window as unknown as {
  customCards?: CustomCardEntry[];
};

windowWithCards.customCards = windowWithCards.customCards || [];
CARDS.forEach((card) => {
  const exists = windowWithCards.customCards!.some((c) => c.type === card.type);
  if (!exists) {
    windowWithCards.customCards!.push(card);
  }
});

// eslint-disable-next-line no-console
console.info(
  `%c LUMINA CARDS %c v${CARD_VERSION} `,
  'color: #fefbfe; background: #0070eb; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;',
  'color: #85adff; background: #19191c; font-weight: 400; padding: 2px 6px; border-radius: 0 4px 4px 0;',
);
