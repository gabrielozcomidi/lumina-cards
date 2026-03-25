import { LitElement, html, svg, PropertyValues, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { luminaTokens } from '../../styles/tokens';
import { sharedStyles } from '../../styles/shared';
import { roomCardStyles } from './styles';
import { LuminaRoomCardConfig } from '../../types';
import { HomeAssistant } from '../../types/ha-types';
import {
  getEntity,
  isEntityAvailable,
  lightsOnCount,
  lightsOnPercentage,
  getVolumePercent,
} from '../../utils/ha-helpers';
import { computeArcDash } from '../../utils/svg-helpers';
import { resolveImageUrl } from '../../utils/assets-3d';

import '../../components/lumina-bottom-sheet';

// Ring geometry for the 52px action buttons
const RING_SIZE = 60;
const RING_RADIUS = 26;
const RING_STROKE = 2;
const RING_ARC_SPAN = 360;

@customElement('ha-lumina-room-card')
export class HaLuminaRoomCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: LuminaRoomCardConfig;
  @state() private _activeSheet: 'lights' | 'climate' | 'media' | 'vacuum' | 'room' | null = null;

  static styles = [luminaTokens, sharedStyles, roomCardStyles];

  public setConfig(config: LuminaRoomCardConfig): void {
    if (!config.name) {
      throw new Error('Please define a name for the room card');
    }
    this._config = {
      show_climate: true,
      show_media: true,
      show_vacuum: true,
      ...config,
    };
  }

  public getCardSize(): number {
    return 4;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('ha-lumina-room-card-editor');
  }

  static getStubConfig(): LuminaRoomCardConfig {
    return {
      type: 'custom:ha-lumina-room-card',
      name: 'Living Room',
      image: '',
      light_entities: [],
      show_climate: true,
      show_media: true,
      show_vacuum: true,
    };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config') || changed.has('_activeSheet')) return true;
    if (!changed.has('hass') || !this._config) return false;

    const oldHass = changed.get('hass') as HomeAssistant | undefined;
    if (!oldHass) return true;

    const trackedEntities = [
      this._config.temperature_entity,
      ...(this._config.light_entities || []),
      this._config.climate_entity,
      this._config.media_entity,
      this._config.vacuum_entity,
    ].filter(Boolean) as string[];

    return trackedEntities.some(
      (id) => oldHass.states[id] !== this.hass.states[id],
    );
  }

  // ─── Computed State ───────────────────────────────

  private get _lightsOn(): number {
    return lightsOnCount(this.hass, this._config.light_entities || []);
  }

  private get _lightsTotal(): number {
    return (this._config.light_entities || []).length;
  }

  private get _lightsPercent(): number {
    return lightsOnPercentage(this.hass, this._config.light_entities || []);
  }

  private get _climateEntity() {
    return getEntity(this.hass, this._config.climate_entity);
  }

  private get _climateActive(): boolean {
    const e = this._climateEntity;
    return !!e && e.state !== 'off' && isEntityAvailable(e);
  }

  private get _mediaEntity() {
    return getEntity(this.hass, this._config.media_entity);
  }

  private get _mediaActive(): boolean {
    const e = this._mediaEntity;
    return !!e && (e.state === 'playing' || e.state === 'paused');
  }

  private get _vacuumEntity() {
    return getEntity(this.hass, this._config.vacuum_entity);
  }

  private get _vacuumActive(): boolean {
    return this._vacuumEntity?.state === 'cleaning';
  }

  private get _batteryPercent(): number {
    const entity = this._vacuumEntity;
    if (!entity) return 0;
    return (entity.attributes.battery_level as number) || 0;
  }

  private get _activeDeviceCount(): number {
    let count = 0;
    count += this._lightsOn;
    if (this._climateActive) count++;
    if (this._mediaActive) count++;
    if (this._vacuumActive) count++;
    return count;
  }

  // ─── Ring SVG Helper ──────────────────────────────

  private _renderActionRing(value: number, color: string) {
    const { dashArray, dashOffset } = computeArcDash(
      RING_RADIUS, value, 0, 100, RING_ARC_SPAN,
    );
    const { dashArray: trackDash } = computeArcDash(
      RING_RADIUS, 100, 0, 100, RING_ARC_SPAN,
    );
    const center = RING_SIZE / 2;

    return svg`
      <svg class="action-ring-svg" width="${RING_SIZE}" height="${RING_SIZE}" viewBox="0 0 ${RING_SIZE} ${RING_SIZE}">
        <circle class="track" cx="${center}" cy="${center}" r="${RING_RADIUS}"
          stroke="${color}" stroke-width="${RING_STROKE}"
          stroke-dasharray="${trackDash}" stroke-dashoffset="0" />
        <circle class="value-arc" cx="${center}" cy="${center}" r="${RING_RADIUS}"
          stroke="${color}" stroke-width="${RING_STROKE}"
          stroke-dasharray="${dashArray}" stroke-dashoffset="${dashOffset}"
          stroke-linecap="round"
          transform="rotate(-90 ${center} ${center})" />
      </svg>
    `;
  }

  // ─── Sheet Controls ───────────────────────────────

  private _openSheet(type: 'lights' | 'climate' | 'media' | 'vacuum' | 'room'): void {
    this._activeSheet = type;
  }

  private _closeSheet(): void {
    this._activeSheet = null;
  }

  // ─── Render ───────────────────────────────────────

  protected render() {
    if (!this._config || !this.hass) return nothing;

    const lightsActive = this._lightsOn > 0;
    const climateActive = this._climateActive;
    const mediaActive = this._mediaActive;
    const vacuumActive = this._vacuumActive;

    return html`
      <ha-card>
        <div class="room-card">
          <!-- 3D Background Element -->
          ${resolveImageUrl(this._config.image)
            ? html`
                <div class="room-bg">
                  <img src="${resolveImageUrl(this._config.image)}" alt="" loading="lazy" />
                </div>
              `
            : nothing}

          <!-- Header: Room Name + Device Count -->
          <div class="room-header">
            <span class="room-name">${this._config.name}</span>
            <span class="device-count">${this._activeDeviceCount} device${this._activeDeviceCount !== 1 ? 's' : ''} active</span>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <!-- Lights -->
            <div
              class="action-btn ${lightsActive ? 'lights-active' : ''} ${!this._lightsTotal ? 'hidden' : ''}"
              @click=${() => this._openSheet('lights')}
            >
              <div class="action-ring-wrapper">
                <div class="action-icon-circle">
                  <ha-icon icon="mdi:lightbulb"></ha-icon>
                </div>
                ${lightsActive ? this._renderActionRing(this._lightsPercent, 'var(--lumina-secondary)') : nothing}
              </div>
              <span class="action-label">${this._config.lights_label || 'Lights'}</span>
            </div>

            <!-- Climate -->
            <div
              class="action-btn ${climateActive ? 'climate-active' : ''} ${!this._config.show_climate || !this._config.climate_entity ? 'hidden' : ''}"
              @click=${() => this._openSheet('climate')}
            >
              <div class="action-ring-wrapper">
                <div class="action-icon-circle">
                  <ha-icon icon="mdi:thermometer"></ha-icon>
                </div>
                ${climateActive ? this._renderActionRing(50, 'var(--lumina-primary)') : nothing}
              </div>
              <span class="action-label">${this._config.climate_label || 'Climate'}</span>
            </div>

            <!-- Media (no ring — just shows active glow when playing) -->
            <div
              class="action-btn ${mediaActive ? 'media-active' : ''} ${!this._config.show_media || !this._config.media_entity ? 'hidden' : ''}"
              @click=${() => this._openSheet('media')}
            >
              <div class="action-ring-wrapper">
                <div class="action-icon-circle">
                  <ha-icon icon="mdi:play-circle"></ha-icon>
                </div>
              </div>
              <span class="action-label">${this._config.media_label || 'Media'}</span>
            </div>

            <!-- Clean -->
            <div
              class="action-btn ${vacuumActive ? 'vacuum-active' : ''} ${!this._config.show_vacuum || !this._config.vacuum_entity ? 'hidden' : ''}"
              @click=${() => this._openSheet('vacuum')}
            >
              <div class="action-ring-wrapper">
                <div class="action-icon-circle">
                  <ha-icon icon="mdi:robot-vacuum"></ha-icon>
                </div>
                ${vacuumActive ? this._renderActionRing(this._batteryPercent, 'var(--lumina-tertiary)') : nothing}
              </div>
              <span class="action-label">${this._config.vacuum_label || 'Clean'}</span>
            </div>
          </div>
        </div>

        <!-- Bottom Sheets -->
        <lumina-bottom-sheet
          .open=${this._activeSheet === 'lights'}
          title="Lights"
          @sheet-closed=${this._closeSheet}
        >
          <ha-lumina-light-card
            .hass=${this.hass}
            .config=${{ type: 'custom:ha-lumina-light-card', entities: this._config.light_entities || [], image: this._config.image }}
          ></ha-lumina-light-card>
        </lumina-bottom-sheet>

        <lumina-bottom-sheet
          .open=${this._activeSheet === 'climate'}
          title="Climate"
          @sheet-closed=${this._closeSheet}
        >
          <ha-lumina-climate-card
            .hass=${this.hass}
            .config=${{ type: 'custom:ha-lumina-climate-card', entity: this._config.climate_entity || '', image: this._config.image }}
          ></ha-lumina-climate-card>
        </lumina-bottom-sheet>

        <lumina-bottom-sheet
          .open=${this._activeSheet === 'media'}
          title="Media"
          @sheet-closed=${this._closeSheet}
        >
          <ha-lumina-media-card
            .hass=${this.hass}
            .config=${{ type: 'custom:ha-lumina-media-card', entity: this._config.media_entity || '', image: this._config.image }}
          ></ha-lumina-media-card>
        </lumina-bottom-sheet>

        <lumina-bottom-sheet
          .open=${this._activeSheet === 'vacuum'}
          title="Cleaning"
          @sheet-closed=${this._closeSheet}
        >
          <ha-lumina-vacuum-card
            .hass=${this.hass}
            .config=${{ type: 'custom:ha-lumina-vacuum-card', entity: this._config.vacuum_entity || '', image: this._config.image }}
          ></ha-lumina-vacuum-card>
        </lumina-bottom-sheet>

        <lumina-bottom-sheet
          .open=${this._activeSheet === 'room'}
          title=${this._config.name}
          @sheet-closed=${this._closeSheet}
        >
          <ha-lumina-room-popup
            .hass=${this.hass}
            .config=${{
              type: 'custom:ha-lumina-room-popup',
              name: this._config.name,
              image: this._config.image,
              temperature_entity: this._config.temperature_entity,
              light_entities: this._config.light_entities,
              climate_entity: this._config.climate_entity,
              media_entity: this._config.media_entity,
              vacuum_entity: this._config.vacuum_entity,
            }}
          ></ha-lumina-room-popup>
        </lumina-bottom-sheet>
      </ha-card>
    `;
  }
}
