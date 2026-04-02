import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { luminaTokens } from '../../styles/tokens';
import { sharedStyles } from '../../styles/shared';
import { vacuumCardStyles } from './styles';
import { LuminaVacuumCardConfig } from '../../types';
import { HomeAssistant, VacuumEntity } from '../../types/ha-types';
import { getEntity, isEntityAvailable, callService } from '../../utils/ha-helpers';
import { render3dBackground } from '../../utils/render-3d-bg';

import '../../components/lumina-ring';
import '../../components/lumina-chip';

const STATE_ICONS: Record<string, string> = {
  cleaning: 'mdi:robot-vacuum',
  docked: 'mdi:battery-charging',
  paused: 'mdi:pause-circle',
  idle: 'mdi:robot-vacuum-off',
  returning: 'mdi:home',
  error: 'mdi:alert-circle',
};

@customElement('ha-lumina-vacuum-card')
export class HaLuminaVacuumCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: LuminaVacuumCardConfig;

  static styles = [luminaTokens, sharedStyles, vacuumCardStyles];

  public setConfig(config: LuminaVacuumCardConfig): void {
    if (!config.entity) {
      throw new Error('Please define a vacuum entity');
    }
    this.config = {
      show_fan_speed: true,
      show_map: false,
      ...config,
    };
  }

  public getCardSize(): number {
    return 5;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('ha-lumina-vacuum-card-editor');
  }

  static getStubConfig() {
    return { type: 'custom:ha-lumina-vacuum-card', entity: '', show_fan_speed: true };
  }

  // ─── Computed ─────────────────────────────────────

  private get _entity(): VacuumEntity | undefined {
    return getEntity(this.hass, this.config.entity) as VacuumEntity | undefined;
  }

  private get _state(): string {
    return this._entity?.state || 'unavailable';
  }

  private get _battery(): number {
    return (this._entity?.attributes.battery_level as number) || 0;
  }

  private get _batteryColor(): string {
    if (this._battery <= 20) return 'var(--lumina-error)';
    if (this._battery <= 50) return 'var(--lumina-secondary)';
    return 'var(--lumina-tertiary)';
  }

  private get _stateLabel(): string {
    return this._state.charAt(0).toUpperCase() + this._state.slice(1).replaceAll('_', ' ');
  }

  private get _stateIcon(): string {
    return STATE_ICONS[this._state] || 'mdi:robot-vacuum';
  }

  private get _statusBadgeClass(): string {
    const s = this._state;
    if (s === 'cleaning') return 'cleaning';
    if (s === 'docked' || s === 'idle') return 'docked';
    if (s === 'returning') return 'returning';
    if (s === 'error') return 'error';
    return 'docked';
  }

  private get _fanSpeeds(): string[] {
    return (this._entity?.attributes.fan_speed_list as string[]) || [];
  }

  private get _currentFanSpeed(): string {
    return (this._entity?.attributes.fan_speed as string) || '';
  }

  private get _statusDetail(): string {
    const entity = this._entity;
    if (!entity) return '';
    const status = entity.attributes.status as string | undefined;
    return status || '';
  }

  // ─── Actions ──────────────────────────────────────

  private _start(): void {
    callService(this.hass, 'vacuum', 'start', { entity_id: this.config.entity });
  }

  private _pause(): void {
    callService(this.hass, 'vacuum', 'pause', { entity_id: this.config.entity });
  }

  private _dock(): void {
    callService(this.hass, 'vacuum', 'return_to_base', { entity_id: this.config.entity });
  }

  private _setFanSpeed(speed: string): void {
    callService(this.hass, 'vacuum', 'set_fan_speed', {
      entity_id: this.config.entity,
      fan_speed: speed,
    });
  }

  // ─── Render ───────────────────────────────────────

  protected render() {
    if (!this.config || !this.hass) return nothing;

    const entity = this._entity;
    if (!entity || !isEntityAvailable(entity)) {
      return html`<div class="vacuum-card"><span class="body-md text-muted">Vacuum unavailable</span></div>`;
    }

    const isCleaning = this._state === 'cleaning';

    return html`
      <div class="vacuum-card ${this.config.show_background === false ? 'no-bg' : ''}" style="position:relative;">
        ${render3dBackground(this.config.image, true)}
        <div class="lumina-3d-content">
        <!-- Hero Battery Ring -->
        <div class="hero-section">
          <lumina-ring
            .value=${this._battery}
            .size=${160}
            .strokeWidth=${4}
            color=${this._batteryColor}
            ?inactive=${!isCleaning}
          >
            <div class="hero-icon">
              <ha-icon .icon=${this._stateIcon}></ha-icon>
            </div>
            <span class="hero-battery">${this._battery}%</span>
            <span class="hero-label">Battery</span>
          </lumina-ring>
        </div>

        <!-- Status -->
        <div class="status-section">
          <span class="status-text">${this._stateLabel}</span>
          ${this._statusDetail
            ? html`<span class="status-detail">${this._statusDetail}</span>`
            : nothing}
          <span class="status-badge ${this._statusBadgeClass}">
            <span class="status-dot"></span>
            ${this._stateLabel}
          </span>
        </div>

        <!-- Action Buttons -->
        <div class="actions-section">
          <lumina-chip
            icon="mdi:play"
            label="Start"
            variant="tertiary"
            ?active=${isCleaning}
            @click=${this._start}
          ></lumina-chip>
          <lumina-chip
            icon="mdi:pause"
            label="Pause"
            ?active=${this._state === 'paused'}
            @click=${this._pause}
          ></lumina-chip>
          <lumina-chip
            icon="mdi:home"
            label="Dock"
            ?active=${this._state === 'docked'}
            @click=${this._dock}
          ></lumina-chip>
        </div>

        <!-- Fan Speed -->
        ${this.config.show_fan_speed && this._fanSpeeds.length
          ? html`
              <div class="fan-section">
                <span class="section-label">Suction Power</span>
                <div class="fan-chips">
                  ${this._fanSpeeds.map(
                    (speed) => html`
                      <lumina-chip
                        .label=${speed.charAt(0).toUpperCase() + speed.slice(1)}
                        ?active=${this._currentFanSpeed === speed}
                        size="sm"
                        @click=${() => this._setFanSpeed(speed)}
                      ></lumina-chip>
                    `,
                  )}
                </div>
              </div>
            `
          : nothing}
      </div><!-- /lumina-3d-content -->
      </div>
    `;
  }
}
