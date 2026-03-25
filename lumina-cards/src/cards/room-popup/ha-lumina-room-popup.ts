import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { luminaTokens } from '../../styles/tokens';
import { sharedStyles } from '../../styles/shared';
import { roomPopupStyles } from './styles';
import { LuminaRoomPopupConfig } from '../../types';
import { HomeAssistant } from '../../types/ha-types';
import { render3dBackground } from '../../utils/render-3d-bg';
import {
  getEntity,
  isEntityAvailable,
  entityName,
  lightsOnCount,
  averageBrightness,
  formatTemperature,
  getVolumePercent,
  callService,
} from '../../utils/ha-helpers';

import '../../components/lumina-ring';
import '../../components/lumina-chip';
import '../../components/lumina-slider';
import '../../components/lumina-icon-button';

@customElement('ha-lumina-room-popup')
export class HaLuminaRoomPopup extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: LuminaRoomPopupConfig;

  static styles = [luminaTokens, sharedStyles, roomPopupStyles];

  public setConfig(config: LuminaRoomPopupConfig): void {
    this.config = {
      sections: ['lights', 'climate', 'media', 'vacuum'],
      ...config,
    };
  }

  public getCardSize(): number {
    return 6;
  }

  // ─── Lights ───────────────────────────────────────

  private _renderLightsSection() {
    const entities = this.config.light_entities || [];
    if (!entities.length) return nothing;

    const onCount = lightsOnCount(this.hass, entities);
    const avgBright = averageBrightness(this.hass, entities);

    return html`
      <div class="section">
        <div class="section-header">
          <div class="section-title-row">
            <span class="section-icon"><ha-icon icon="mdi:lightbulb-outline"></ha-icon></span>
            <span class="section-title">Lighting</span>
          </div>
          <span class="section-action">Details →</span>
        </div>

        <div class="lights-summary">
          <lumina-ring
            .value=${entities.length ? Math.round((onCount / entities.length) * 100) : 0}
            .size=${56}
            .strokeWidth=${3}
            color="var(--lumina-secondary)"
            ?inactive=${onCount === 0}
          >
          </lumina-ring>
          <div class="lights-text">
            <span class="lights-count">${onCount}/${entities.length}</span>
            <span class="lights-subtitle">${onCount > 0 ? `Avg ${avgBright}% brightness` : 'All lights off'}</span>
          </div>
        </div>

        <div class="light-list">
          ${entities.map((id) => {
            const entity = getEntity(this.hass, id);
            if (!entity) return nothing;
            const isOn = entity.state === 'on';
            const brightness = isOn ? Math.round(((entity.attributes.brightness as number) || 0) / 255 * 100) : 0;

            return html`
              <div class="light-item">
                <lumina-ring
                  .value=${brightness}
                  .size=${24}
                  .strokeWidth=${2}
                  color="var(--lumina-secondary)"
                  ?inactive=${!isOn}
                ></lumina-ring>
                <span class="light-name">${entityName(entity)}</span>
                <span class="light-state ${isOn ? 'on' : ''}">${isOn ? `${brightness}%` : 'Off'}</span>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  // ─── Climate ──────────────────────────────────────

  private _renderClimateSection() {
    if (!this.config.climate_entity) return nothing;
    const entity = getEntity(this.hass, this.config.climate_entity);
    if (!entity || !isEntityAvailable(entity)) return nothing;

    const currentTemp = entity.attributes.current_temperature as number | undefined;
    const targetTemp = entity.attributes.temperature as number | undefined;
    const mode = entity.state;
    const min = (entity.attributes.min_temp as number) || 16;
    const max = (entity.attributes.max_temp as number) || 32;
    const tempPercent = currentTemp ? Math.round(((currentTemp - min) / (max - min)) * 100) : 0;
    const isActive = mode !== 'off';

    const hvacModes = (entity.attributes.hvac_modes as string[]) || [];
    const modeLabel = mode.charAt(0).toUpperCase() + mode.slice(1).replace('_', ' ');

    return html`
      <div class="section">
        <div class="section-header">
          <div class="section-title-row">
            <span class="section-icon"><ha-icon icon="mdi:thermostat"></ha-icon></span>
            <span class="section-title">Climate</span>
          </div>
          <span class="section-action">Details →</span>
        </div>

        <div class="climate-row">
          <lumina-ring
            .value=${tempPercent}
            .size=${72}
            .strokeWidth=${3}
            color="var(--lumina-primary)"
            ?inactive=${!isActive}
          >
          </lumina-ring>

          <div class="climate-info">
            <span class="climate-temp">
              ${currentTemp ? formatTemperature(currentTemp) : '--°'}
            </span>
            <span class="climate-mode">
              ${isActive ? `${modeLabel}${targetTemp ? ` · Target ${Math.round(targetTemp)}°` : ''}` : 'Off'}
            </span>
          </div>
        </div>

        <div class="climate-chips">
          ${hvacModes.map((m) => html`
            <lumina-chip
              .label=${m.charAt(0).toUpperCase() + m.slice(1).replace('_', ' ')}
              ?active=${mode === m}
              size="sm"
              @click=${() => callService(this.hass, 'climate', 'set_hvac_mode', {
                entity_id: this.config.climate_entity,
                hvac_mode: m,
              })}
            ></lumina-chip>
          `)}
        </div>
      </div>
    `;
  }

  // ─── Media ────────────────────────────────────────

  private _renderMediaSection() {
    if (!this.config.media_entity) return nothing;
    const entity = getEntity(this.hass, this.config.media_entity);
    if (!entity || !isEntityAvailable(entity)) return nothing;

    const isPlaying = entity.state === 'playing';
    const isPaused = entity.state === 'paused';
    const isActive = isPlaying || isPaused;
    const title = entity.attributes.media_title as string | undefined;
    const artist = entity.attributes.media_artist as string | undefined;
    const entityPicture = entity.attributes.entity_picture as string | undefined;
    const volumePercent = getVolumePercent(entity);

    const artUrl = entityPicture
      ? entityPicture.startsWith('/')
        ? `${location.origin}${entityPicture}`
        : entityPicture
      : null;

    return html`
      <div class="section">
        <div class="section-header">
          <div class="section-title-row">
            <span class="section-icon"><ha-icon icon="mdi:speaker"></ha-icon></span>
            <span class="section-title">Media</span>
          </div>
          <span class="section-action">Details →</span>
        </div>

        ${isActive
          ? html`
              <div class="media-row">
                ${artUrl
                  ? html`<img class="media-art" src=${artUrl} alt="Album art" />`
                  : html`<div class="media-art-placeholder"><ha-icon icon="mdi:music"></ha-icon></div>`}
                <div class="media-info">
                  <div class="media-title">${title || 'Unknown'}</div>
                  <div class="media-artist">${artist || ''}</div>
                </div>
                <div class="media-controls">
                  <lumina-icon-button
                    icon="mdi:skip-previous"
                    size="sm"
                    @click=${() => callService(this.hass, 'media_player', 'media_previous_track', { entity_id: this.config.media_entity })}
                  ></lumina-icon-button>
                  <lumina-icon-button
                    icon=${isPlaying ? 'mdi:pause' : 'mdi:play'}
                    size="sm"
                    variant="filled"
                    @click=${() => callService(this.hass, 'media_player', 'media_play_pause', { entity_id: this.config.media_entity })}
                  ></lumina-icon-button>
                  <lumina-icon-button
                    icon="mdi:skip-next"
                    size="sm"
                    @click=${() => callService(this.hass, 'media_player', 'media_next_track', { entity_id: this.config.media_entity })}
                  ></lumina-icon-button>
                </div>
              </div>
            `
          : html`<div class="media-idle">No media playing</div>`}
      </div>
    `;
  }

  // ─── Vacuum ───────────────────────────────────────

  private _renderVacuumSection() {
    if (!this.config.vacuum_entity) return nothing;
    const entity = getEntity(this.hass, this.config.vacuum_entity);
    if (!entity || !isEntityAvailable(entity)) return nothing;

    const state = entity.state;
    const battery = (entity.attributes.battery_level as number) || 0;
    const stateLabel = state.charAt(0).toUpperCase() + state.slice(1).replace('_', ' ');
    const isCleaning = state === 'cleaning';

    return html`
      <div class="section">
        <div class="section-header">
          <div class="section-title-row">
            <span class="section-icon"><ha-icon icon="mdi:robot-vacuum"></ha-icon></span>
            <span class="section-title">Cleaning</span>
          </div>
          <span class="section-action">Details →</span>
        </div>

        <div class="vacuum-row">
          <lumina-ring
            .value=${battery}
            .size=${56}
            .strokeWidth=${3}
            color=${battery > 20 ? 'var(--lumina-tertiary)' : 'var(--lumina-error)'}
            ?inactive=${!isCleaning}
          >
          </lumina-ring>
          <div class="vacuum-info">
            <span class="vacuum-state">${stateLabel}</span>
            <span class="vacuum-battery">Battery ${battery}%</span>
          </div>
        </div>

        <div class="vacuum-actions">
          <lumina-chip
            icon="mdi:play"
            label="Start"
            ?active=${isCleaning}
            variant="tertiary"
            @click=${() => callService(this.hass, 'vacuum', 'start', { entity_id: this.config.vacuum_entity })}
          ></lumina-chip>
          <lumina-chip
            icon="mdi:pause"
            label="Pause"
            @click=${() => callService(this.hass, 'vacuum', 'pause', { entity_id: this.config.vacuum_entity })}
          ></lumina-chip>
          <lumina-chip
            icon="mdi:home"
            label="Dock"
            @click=${() => callService(this.hass, 'vacuum', 'return_to_base', { entity_id: this.config.vacuum_entity })}
          ></lumina-chip>
        </div>
      </div>
    `;
  }

  // ─── Render ───────────────────────────────────────

  protected render() {
    if (!this.config || !this.hass) return nothing;

    const sections = this.config.sections || ['lights', 'climate', 'media', 'vacuum'];

    return html`
      <div class="room-popup" style="position:relative;">
        ${render3dBackground(this.config.image, true)}
        <div class="lumina-3d-content">
        ${sections.map((section) => {
          switch (section) {
            case 'lights': return this._renderLightsSection();
            case 'climate': return this._renderClimateSection();
            case 'media': return this._renderMediaSection();
            case 'vacuum': return this._renderVacuumSection();
            default: return nothing;
          }
        })}
        </div>
      </div>
    `;
  }
}
