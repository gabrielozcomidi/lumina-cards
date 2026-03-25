import { LitElement, html, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { luminaTokens } from '../../styles/tokens';
import { sharedStyles } from '../../styles/shared';
import { mediaCardStyles } from './styles';
import { LuminaMediaCardConfig } from '../../types';
import { HomeAssistant, MediaPlayerEntity } from '../../types/ha-types';
import {
  getEntity,
  isEntityAvailable,
  entityName,
  getVolumePercent,
  formatDuration,
  callService,
} from '../../utils/ha-helpers';
import { render3dBackground } from '../../utils/render-3d-bg';
import { debounce } from '../../utils/debounce';

import '../../components/lumina-chip';
import '../../components/lumina-slider';
import '../../components/lumina-icon-button';

@customElement('ha-lumina-media-card')
export class HaLuminaMediaCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: LuminaMediaCardConfig;

  @state() private _currentPosition = 0;
  private _positionTimer: ReturnType<typeof setInterval> | undefined;

  static styles = [luminaTokens, sharedStyles, mediaCardStyles];

  private _debouncedVolume = debounce((volume: number) => {
    callService(this.hass, 'media_player', 'volume_set', {
      entity_id: this.config.entity,
      volume_level: volume / 100,
    });
  }, 150);

  public setConfig(config: LuminaMediaCardConfig): void {
    if (!config.entity) throw new Error('Please define a media_player entity');
    this.config = { show_source: true, show_progress: true, ...config };
  }

  public getCardSize(): number { return 6; }

  static getConfigElement(): HTMLElement {
    return document.createElement('ha-lumina-media-card-editor');
  }

  static getStubConfig() {
    return { type: 'custom:ha-lumina-media-card', entity: '', show_source: true, show_progress: true };
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._startPositionTracking();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopPositionTracking();
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('hass')) this._syncPosition();
  }

  // ─── Position Tracking ────────────────────────────

  private _syncPosition(): void {
    const entity = this._entity;
    if (!entity) return;
    const position = entity.attributes.media_position as number | undefined;
    const updatedAt = entity.attributes.media_position_updated_at as string | undefined;
    if (position !== undefined && updatedAt && entity.state === 'playing') {
      const elapsed = (Date.now() - new Date(updatedAt).getTime()) / 1000;
      this._currentPosition = position + elapsed;
    } else if (position !== undefined) {
      this._currentPosition = position;
    }
  }

  private _startPositionTracking(): void {
    this._stopPositionTracking();
    this._positionTimer = setInterval(() => {
      if (this._entity?.state === 'playing') {
        this._currentPosition += 1;
        this.requestUpdate();
      }
    }, 1000);
  }

  private _stopPositionTracking(): void {
    if (this._positionTimer) { clearInterval(this._positionTimer); this._positionTimer = undefined; }
  }

  // ─── Computed ─────────────────────────────────────

  private get _entity(): MediaPlayerEntity | undefined {
    return getEntity(this.hass, this.config.entity) as MediaPlayerEntity | undefined;
  }

  private get _isPlaying(): boolean { return this._entity?.state === 'playing'; }
  private get _isPaused(): boolean { return this._entity?.state === 'paused'; }
  private get _isActive(): boolean { return this._isPlaying || this._isPaused; }

  private get _artUrl(): string | null {
    const pic = this._entity?.attributes.entity_picture;
    if (!pic) return null;
    return pic.startsWith('/') ? `${location.origin}${pic}` : pic;
  }

  private get _duration(): number {
    return (this._entity?.attributes.media_duration as number) || 0;
  }

  private get _groupMembers(): string[] {
    return (this._entity?.attributes.group_members as string[]) || [];
  }

  private get _isGrouped(): boolean {
    return this._groupMembers.length > 1;
  }

  private get _groupedRoomName(): string {
    if (!this._isGrouped) return entityName(this._entity);
    return this._groupMembers
      .map((id) => {
        const e = getEntity(this.hass, id);
        return e ? entityName(e) : id.split('.')[1];
      })
      .join(' + ');
  }

  // ─── Actions ──────────────────────────────────────

  private _playPause(): void { callService(this.hass, 'media_player', 'media_play_pause', { entity_id: this.config.entity }); }
  private _prev(): void { callService(this.hass, 'media_player', 'media_previous_track', { entity_id: this.config.entity }); }
  private _next(): void { callService(this.hass, 'media_player', 'media_next_track', { entity_id: this.config.entity }); }
  private _onVolume(e: CustomEvent): void { this._debouncedVolume(e.detail.value); }
  private _selectSource(source: string): void {
    callService(this.hass, 'media_player', 'select_source', { entity_id: this.config.entity, source });
  }

  // ─── Render ───────────────────────────────────────

  protected render() {
    if (!this.config || !this.hass) return nothing;

    const entity = this._entity;
    if (!entity || !isEntityAvailable(entity)) {
      return html`<div class="media-card"><span class="body-md text-muted">Media player unavailable</span></div>`;
    }

    if (!this._isActive) {
      return html`
        <div class="media-card">
          <div class="idle-state">
            <ha-icon icon="mdi:speaker-off"></ha-icon>
            <span class="idle-text">No media playing</span>
          </div>
        </div>
      `;
    }

    const title = entity.attributes.media_title || 'Unknown';
    const artist = entity.attributes.media_artist || '';
    const album = entity.attributes.media_album_name || '';
    const volumePercent = getVolumePercent(entity);
    const sourceList = (entity.attributes.source_list as string[]) || [];
    const currentSource = entity.attributes.source as string | undefined;
    const progressPct = this._duration ? Math.min(100, (this._currentPosition / this._duration) * 100) : 0;

    return html`
      <div class="media-card" style="position:relative;">
        ${render3dBackground(this.config.image, true)}
        <div class="lumina-3d-content">
        <!-- Now Playing Header -->
        <div class="now-playing-header">
          <span class="now-playing-label">Now Playing</span>
          ${this._isGrouped
            ? html`<span class="grouped-badge"><ha-icon icon="mdi:speaker-multiple"></ha-icon> Grouped</span>`
            : nothing}
        </div>

        <!-- Room Title -->
        <div class="room-title">${this._groupedRoomName}</div>

        <!-- Album Art -->
        <div class="album-section">
          ${this._artUrl
            ? html`<img class="album-art" src=${this._artUrl} alt="Album art" />`
            : html`<div class="album-art-placeholder"><ha-icon icon="mdi:music"></ha-icon></div>`}
        </div>

        <!-- Track Info -->
        <div class="track-info">
          <span class="track-title">${title}</span>
          <span class="track-artist">${artist}${album ? ` \u2014 ${album}` : ''}</span>
        </div>

        <!-- Playback Controls -->
        <div class="playback-controls">
          <lumina-icon-button icon="mdi:skip-previous" @click=${this._prev}></lumina-icon-button>
          <lumina-icon-button
            icon=${this._isPlaying ? 'mdi:pause' : 'mdi:play'}
            size="lg"
            variant="filled"
            @click=${this._playPause}
          ></lumina-icon-button>
          <lumina-icon-button icon="mdi:skip-next" @click=${this._next}></lumina-icon-button>
        </div>

        <!-- Volume -->
        <div class="volume-section">
          <span class="volume-icon"><ha-icon icon="mdi:volume-low"></ha-icon></span>
          <div class="volume-slider-wrapper">
            <lumina-slider
              .value=${volumePercent}
              .min=${0}
              .max=${100}
              color="var(--lumina-primary)"
              @value-changed=${this._onVolume}
            ></lumina-slider>
          </div>
          <span class="volume-icon"><ha-icon icon="mdi:volume-high"></ha-icon></span>
        </div>

        <!-- Browse Music / View Queue -->
        <div class="action-buttons-row">
          <div class="action-card">
            <div class="action-card-icon browse">
              <ha-icon icon="mdi:music-box-multiple"></ha-icon>
            </div>
            <div class="action-card-text">
              <span class="action-card-title">Browse Music</span>
              <span class="action-card-sub">Sources</span>
            </div>
          </div>
          <div class="action-card">
            <div class="action-card-icon queue">
              <ha-icon icon="mdi:playlist-music"></ha-icon>
            </div>
            <div class="action-card-text">
              <span class="action-card-title">View Queue</span>
              <span class="action-card-sub">Tracklist</span>
            </div>
          </div>
        </div>

        <!-- Manage Rooms (if grouped or multiple speakers) -->
        ${this._groupMembers.length > 0
          ? html`
              <div class="rooms-section">
                <div class="rooms-header">
                  <span class="rooms-title">Manage Rooms</span>
                  <span class="rooms-grid-icon"><ha-icon icon="mdi:view-grid"></ha-icon></span>
                </div>
                ${this._groupMembers.map((memberId) => {
                  const member = getEntity(this.hass, memberId);
                  const isPlaying = member?.state === 'playing';
                  const memberName = member ? entityName(member) : memberId.split('.')[1];
                  return html`
                    <div class="room-item">
                      <div class="room-item-dot ${isPlaying ? 'playing' : 'idle'}"></div>
                      <div class="room-item-info">
                        <span class="room-item-name">${memberName}</span>
                        <span class="room-item-state">${isPlaying ? 'Playing' : 'Idle'}</span>
                      </div>
                      <span class="room-item-volume"><ha-icon icon="mdi:signal-cellular-3"></ha-icon></span>
                    </div>
                  `;
                })}
              </div>
            `
          : nothing}

        <!-- Source Selector -->
        ${this.config.show_source && sourceList.length
          ? html`
              <div class="source-section">
                <span class="source-label">Source</span>
                <div class="source-chips">
                  ${sourceList.map((source) => html`
                    <lumina-chip .label=${source} ?active=${currentSource === source} size="sm"
                      @click=${() => this._selectSource(source)}></lumina-chip>
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
