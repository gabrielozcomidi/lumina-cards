import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { luminaTokens } from '../../styles/tokens';
import { sharedStyles } from '../../styles/shared';
import { climateCardStyles } from './styles';
import { LuminaClimateCardConfig } from '../../types';
import { HomeAssistant, ClimateEntity, HvacMode } from '../../types/ha-types';
import { getEntity, isEntityAvailable, formatTemperature, callService } from '../../utils/ha-helpers';
import { render3dBackground } from '../../utils/render-3d-bg';

import '../../components/lumina-ring';
import '../../components/lumina-chip';
import '../../components/lumina-icon-button';

const MODE_ICONS: Record<string, string> = {
  off: 'mdi:power',
  heat: 'mdi:fire',
  cool: 'mdi:snowflake',
  heat_cool: 'mdi:autorenew',
  auto: 'mdi:thermostat-auto',
  dry: 'mdi:water-percent',
  fan_only: 'mdi:fan',
};

const MODE_COLORS: Record<string, string> = {
  cool: 'var(--lumina-primary)',
  heat: 'var(--lumina-secondary)',
  heat_cool: 'var(--lumina-tertiary)',
  auto: 'var(--lumina-tertiary)',
  dry: 'var(--lumina-on-surface-variant)',
  fan_only: 'var(--lumina-primary)',
  off: 'var(--lumina-outline)',
};

const MODE_LABELS: Record<string, string> = {
  off: 'Off',
  heat: 'Heating',
  cool: 'Cooling',
  heat_cool: 'Heat/Cool',
  auto: 'Auto',
  dry: 'Drying',
  fan_only: 'Fan',
};

@customElement('ha-lumina-climate-card')
export class HaLuminaClimateCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: LuminaClimateCardConfig;

  static styles = [luminaTokens, sharedStyles, climateCardStyles];

  public setConfig(config: LuminaClimateCardConfig): void {
    if (!config.entity) {
      throw new Error('Please define a climate entity');
    }
    this.config = {
      show_humidity: true,
      show_fan_speed: true,
      ...config,
    };
  }

  public getCardSize(): number {
    return 5;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('ha-lumina-climate-card-editor');
  }

  static getStubConfig() {
    return { type: 'custom:ha-lumina-climate-card', entity: '', show_humidity: true, show_fan_speed: true };
  }

  // ─── Computed ─────────────────────────────────────

  private get _entity(): ClimateEntity | undefined {
    return getEntity(this.hass, this.config.entity) as ClimateEntity | undefined;
  }

  private get _isAvailable(): boolean {
    return isEntityAvailable(this._entity);
  }

  private get _currentTemp(): number | undefined {
    return this._entity?.attributes.current_temperature as number | undefined;
  }

  private get _targetTemp(): number | undefined {
    return this._entity?.attributes.temperature as number | undefined;
  }

  private get _mode(): string {
    return this._entity?.state || 'off';
  }

  private get _modeColor(): string {
    return MODE_COLORS[this._mode] || 'var(--lumina-outline)';
  }

  private get _minTemp(): number {
    return (this._entity?.attributes.min_temp as number) || 16;
  }

  private get _maxTemp(): number {
    return (this._entity?.attributes.max_temp as number) || 32;
  }

  private get _tempStep(): number {
    return (this._entity?.attributes.target_temp_step as number) || 0.5;
  }

  private get _tempPercent(): number {
    const current = this._currentTemp;
    if (current === undefined) return 0;
    const range = this._maxTemp - this._minTemp;
    if (range === 0) return 0;
    return Math.round(((current - this._minTemp) / range) * 100);
  }

  private get _targetTempPercent(): number {
    const target = this._targetTemp;
    if (target === undefined) return 0;
    const range = this._maxTemp - this._minTemp;
    if (range === 0) return 0;
    return Math.round(((target - this._minTemp) / range) * 100);
  }

  private get _hvacModes(): string[] {
    return (this._entity?.attributes.hvac_modes as string[]) || [];
  }

  private get _fanModes(): string[] {
    return (this._entity?.attributes.fan_modes as string[]) || [];
  }

  private get _currentFanMode(): string {
    return (this._entity?.attributes.fan_mode as string) || '';
  }

  private get _humidity(): number | undefined {
    return this._entity?.attributes.current_humidity as number | undefined;
  }

  private get _statusLabel(): string {
    return MODE_LABELS[this._mode] || this._mode.charAt(0).toUpperCase() + this._mode.slice(1).replaceAll('_', ' ');
  }

  // ─── Actions ──────────────────────────────────────

  private _setMode(mode: string): void {
    callService(this.hass, 'climate', 'set_hvac_mode', {
      entity_id: this.config.entity,
      hvac_mode: mode,
    });
  }

  private _setFanMode(fanMode: string): void {
    callService(this.hass, 'climate', 'set_fan_mode', {
      entity_id: this.config.entity,
      fan_mode: fanMode,
    });
  }

  private _adjustTemp(delta: number): void {
    const current = this._targetTemp;
    if (current === undefined) return;
    const newTemp = Math.min(this._maxTemp, Math.max(this._minTemp, current + delta));
    callService(this.hass, 'climate', 'set_temperature', {
      entity_id: this.config.entity,
      temperature: newTemp,
    });
  }

  // ─── Render ───────────────────────────────────────

  protected render() {
    if (!this.config || !this.hass) return nothing;
    if (!this._entity || !this._isAvailable) {
      return html`<div class="climate-card"><span class="body-md text-muted">Climate entity unavailable</span></div>`;
    }

    const isActive = this._mode !== 'off';

    return html`
      <div class="climate-card" style="position:relative;">
        ${render3dBackground(this.config.image, true)}
        <div class="lumina-3d-content">

        <!-- Header with status badge + humidity -->
        <div class="climate-header">
          <div class="header-left">
            <span class="header-title">HVAC Control</span>
            ${this.config.show_humidity && this._humidity !== undefined
              ? html`
                <div class="header-humidity">
                  <ha-icon icon="mdi:water-percent"></ha-icon>
                  <span class="header-humidity-value">${this._humidity}%</span>
                  <span class="header-humidity-label">Humidity</span>
                </div>
              ` : nothing}
          </div>
          <div class="status-badge" style="--badge-color: ${this._modeColor}">
            <span class="status-dot"></span>
            <span class="status-text">${this._statusLabel.toUpperCase()}</span>
          </div>
        </div>

        <!-- Hero Ring — Target Temperature -->
        <div class="hero-section">
          <lumina-icon-button
            icon="mdi:minus"
            size="md"
            @click=${() => this._adjustTemp(-this._tempStep)}
            ?disabled=${!isActive}
          ></lumina-icon-button>

          <div class="hero-ring-wrapper">
            <lumina-ring
              .value=${this._targetTempPercent}
              .size=${180}
              .strokeWidth=${4}
              color=${this._modeColor}
              ?inactive=${!isActive}
            >
              <div class="hero-center">
                <span class="hero-label">TARGET</span>
                <span class="hero-temp">${this._targetTemp !== undefined ? formatTemperature(this._targetTemp) : '--°'}</span>
              </div>
            </lumina-ring>
          </div>

          <lumina-icon-button
            icon="mdi:plus"
            size="md"
            @click=${() => this._adjustTemp(this._tempStep)}
            ?disabled=${!isActive}
          ></lumina-icon-button>
        </div>

        <!-- Current Temperature (below ring) -->
        <div class="target-section">
          <span class="target-label">Current</span>
          <span class="target-value">${this._currentTemp !== undefined ? formatTemperature(this._currentTemp) : '--°'}</span>
        </div>

        <!-- HVAC Modes — Circular Icon Buttons -->
        <div class="mode-section">
          <span class="section-label">Mode</span>
          <div class="mode-buttons">
            ${this._hvacModes.map((mode) => {
              const icon = MODE_ICONS[mode] || 'mdi:thermostat';
              const label = mode.charAt(0).toUpperCase() + mode.slice(1).replaceAll('_', ' ');
              return html`
                <div class="mode-btn ${this._mode === mode ? 'active' : ''}"
                     style="--mode-color: ${MODE_COLORS[mode] || 'var(--lumina-outline)'}"
                     @click=${() => this._setMode(mode)}>
                  <div class="mode-btn-circle">
                    <ha-icon icon="${icon}"></ha-icon>
                  </div>
                  <span class="mode-btn-label">${label}</span>
                </div>
              `;
            })}
          </div>
        </div>

        <!-- Fan Speed -->
        ${this.config.show_fan_speed && this._fanModes.length
          ? html`
              <div class="fan-section">
                <span class="section-label">Fan Speed</span>
                <div class="fan-chips">
                  ${this._fanModes.map((fm) => html`
                    <lumina-chip
                      .label=${fm.charAt(0).toUpperCase() + fm.slice(1)}
                      ?active=${this._currentFanMode === fm}
                      size="sm"
                      @click=${() => this._setFanMode(fm)}
                    ></lumina-chip>
                  `)}
                </div>
              </div>
            `
          : nothing}

      </div><!-- /lumina-3d-content -->
      </div>
    `;
  }
}
