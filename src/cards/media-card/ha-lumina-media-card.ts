import { LitElement, html, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { luminaTokens } from '../../styles/tokens';
import { sharedStyles } from '../../styles/shared';
import { mediaCardStyles } from './styles';
import { LuminaMediaCardConfig, MediaEntityConfig, MediaShortcut } from '../../types';
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

/** Normalize entity config */
function normalizeMediaEntity(cfg: string | MediaEntityConfig): { id: string; customName?: string } {
  if (typeof cfg === 'string') return { id: cfg };
  return { id: cfg.entity, customName: cfg.name };
}

@customElement('ha-lumina-media-card')
export class HaLuminaMediaCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: LuminaMediaCardConfig;

  @state() private _currentPosition = 0;
  @state() private _activeEntityId: string | null = null;
  private _positionTimer: ReturnType<typeof setInterval> | undefined;

  static styles = [luminaTokens, sharedStyles, mediaCardStyles];

  private _debouncedVolume = debounce((volume: number) => {
    callService(this.hass, 'media_player', 'volume_set', {
      entity_id: this._activeId,
      volume_level: volume / 100,
    });
  }, 150);

  public setConfig(config: LuminaMediaCardConfig): void {
    if (!config.entity && (!config.entities || !config.entities.length)) {
      throw new Error('Please define at least one media_player entity');
    }
    this.config = { show_source: true, show_progress: true, show_speaker_management: true, ...config };
  }

  public getCardSize(): number { return 6; }

  static getConfigElement(): HTMLElement {
    return document.createElement('ha-lumina-media-card-editor');
  }

  static getStubConfig() {
    return { type: 'custom:ha-lumina-media-card', entities: [], show_source: true, show_progress: true };
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

  // ─── Entity Resolution ─────────────────────────────

  private get _allEntities(): Array<{ id: string; customName?: string }> {
    if (this.config.entities?.length) {
      return this.config.entities.map(normalizeMediaEntity);
    }
    if (this.config.entity) {
      return [{ id: this.config.entity }];
    }
    return [];
  }

  private get _hasMultiple(): boolean {
    return this._allEntities.length > 1;
  }

  private get _activeId(): string {
    // If user selected one, use it (if still valid)
    if (this._activeEntityId && this._allEntities.some((e) => e.id === this._activeEntityId)) {
      return this._activeEntityId;
    }
    // Auto-select: prefer first playing entity, else first
    const playing = this._allEntities.find((e) => {
      const ent = getEntity(this.hass, e.id);
      return ent?.state === 'playing';
    });
    return playing?.id || this._allEntities[0]?.id || '';
  }

  private _getMediaEntity(id: string): MediaPlayerEntity | undefined {
    return getEntity(this.hass, id) as MediaPlayerEntity | undefined;
  }

  private _getDisplayName(id: string, customName?: string): string {
    if (customName) return customName;
    const entity = this._getMediaEntity(id);
    return entity ? entityName(entity) : id.split('.')[1] || id;
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
      if (this._entity?.state === 'playing' && this._duration > 0) {
        this._currentPosition += 1;
      }
    }, 1000);
  }

  private _stopPositionTracking(): void {
    if (this._positionTimer) { clearInterval(this._positionTimer); this._positionTimer = undefined; }
  }

  // ─── Computed ─────────────────────────────────────

  private get _entity(): MediaPlayerEntity | undefined {
    return this._getMediaEntity(this._activeId);
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
    const found = this._allEntities.find((e) => e.id === this._activeId);
    if (!this._isGrouped) return this._getDisplayName(this._activeId, found?.customName);
    return this._groupMembers
      .map((id) => {
        const e = getEntity(this.hass, id);
        return e ? entityName(e) : id.split('.')[1];
      })
      .join(' + ');
  }

  private get _audioFormat(): string | null {
    const entity = this._entity;
    if (!entity) return null;
    const contentType = entity.attributes.media_content_type as string | undefined;
    if (!contentType) return null;
    return contentType.charAt(0).toUpperCase() + contentType.slice(1);
  }

  /** All media_player entities known to HA (for join/unjoin) */
  private get _availableSpeakers(): Array<{ id: string; name: string }> {
    if (!this.hass?.states) return [];
    return Object.keys(this.hass.states)
      .filter((id) => id.startsWith('media_player.') && id !== this._activeId)
      .map((id) => ({
        id,
        name: entityName(this.hass.states[id]),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  // ─── Actions ──────────────────────────────────────

  private _selectPlayer(id: string): void {
    this._activeEntityId = id;
  }

  private _playPause(): void { callService(this.hass, 'media_player', 'media_play_pause', { entity_id: this._activeId }); }
  private _prev(): void { callService(this.hass, 'media_player', 'media_previous_track', { entity_id: this._activeId }); }
  private _next(): void { callService(this.hass, 'media_player', 'media_next_track', { entity_id: this._activeId }); }
  private _onVolume(e: CustomEvent): void { this._debouncedVolume(e.detail.value); }
  private _selectSource(source: string): void {
    callService(this.hass, 'media_player', 'select_source', { entity_id: this._activeId, source });
  }

  private _joinSpeaker(speakerId: string): void {
    callService(this.hass, 'media_player', 'join', {
      entity_id: this._activeId,
      group_members: [speakerId],
    });
  }

  private _unjoinSpeaker(speakerId: string): void {
    callService(this.hass, 'media_player', 'unjoin', {
      entity_id: speakerId,
    });
  }

  private _playShortcut(shortcut: MediaShortcut): void {
    callService(this.hass, 'media_player', 'play_media', {
      entity_id: this._activeId,
      media_content_id: shortcut.media_content_id,
      media_content_type: shortcut.media_content_type,
    });
  }

  private _getSourceIcon(source: string): string {
    const s = source.toLowerCase();
    if (s.includes('spotify')) return 'mdi:spotify';
    if (s.includes('airplay')) return 'mdi:apple';
    if (s.includes('bluetooth')) return 'mdi:bluetooth';
    if (s.includes('tv') || s.includes('hdmi')) return 'mdi:television';
    if (s.includes('aux') || s.includes('line')) return 'mdi:audio-input-stereo-minijack';
    if (s.includes('radio') || s.includes('tunein')) return 'mdi:radio';
    if (s.includes('youtube')) return 'mdi:youtube';
    if (s.includes('amazon') || s.includes('alexa')) return 'mdi:amazon';
    if (s.includes('apple') || s.includes('music')) return 'mdi:music-box';
    return 'mdi:speaker';
  }

  // ─── Render ───────────────────────────────────────

  protected render() {
    if (!this.config || !this.hass) return nothing;
    if (!this._allEntities.length) {
      return html`<div class="media-card"><span class="body-md text-muted">No media players configured</span></div>`;
    }

    const entity = this._entity;
    if (!entity || !isEntityAvailable(entity)) {
      return html`<div class="media-card">
        ${this._hasMultiple ? this._renderPlayerSelector() : nothing}
        <div class="idle-state">
          <ha-icon icon="mdi:speaker-off"></ha-icon>
          <span class="idle-text">Media player unavailable</span>
        </div>
      </div>`;
    }

    if (!this._isActive) {
      return html`
        <div class="media-card">
          ${this._hasMultiple ? this._renderPlayerSelector() : nothing}
          <div class="idle-state">
            <ha-icon icon="mdi:speaker-off"></ha-icon>
            <span class="idle-text">No media playing</span>
          </div>
          ${this._renderShortcuts()}
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

        <!-- Player Selector (multi-entity) -->
        ${this._hasMultiple ? this._renderPlayerSelector() : nothing}

        <!-- Now Playing Header -->
        <div class="now-playing-header">
          <div class="now-playing-left">
            <span class="now-playing-label">Now Playing</span>
            ${this._audioFormat ? html`
              <span class="audio-format-badge">${this._audioFormat}</span>
            ` : nothing}
          </div>
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

        <!-- Progress Bar -->
        ${this.config.show_progress && this._duration > 0 ? html`
          <div class="progress-section">
            <span class="progress-time">${formatDuration(this._currentPosition)}</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progressPct}%"></div>
            </div>
            <span class="progress-time">${formatDuration(this._duration)}</span>
          </div>
        ` : nothing}

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

        <!-- Sources -->
        ${this.config.show_source && sourceList.length ? html`
          <div class="sources-section">
            <span class="sources-label">Sources</span>
            <div class="sources-list">
              ${sourceList.map((source) => html`
                <div class="source-item ${currentSource === source ? 'active' : ''}"
                  @click=${() => this._selectSource(source)}>
                  <ha-icon icon="${this._getSourceIcon(source)}"></ha-icon>
                  <span class="source-name">${source}</span>
                </div>
              `)}
            </div>
          </div>
        ` : nothing}

        <!-- Shortcuts -->
        ${this._renderShortcuts()}

        <!-- Speaker Management -->
        ${this.config.show_speaker_management !== false ? this._renderSpeakerManagement() : nothing}

      </div><!-- /lumina-3d-content -->
      </div>
    `;
  }

  // ─── Render: Player Selector ────────────────────────

  private _renderPlayerSelector() {
    return html`
      <div class="player-selector">
        ${this._allEntities.map(({ id, customName }) => {
          const ent = this._getMediaEntity(id);
          const isActive = id === this._activeId;
          const isPlaying = ent?.state === 'playing';
          const name = this._getDisplayName(id, customName);
          return html`
            <button class="player-tab ${isActive ? 'active' : ''}"
              @click=${() => this._selectPlayer(id)}>
              <span class="player-tab-dot ${isPlaying ? 'playing' : ''}"></span>
              <span class="player-tab-name">${name}</span>
            </button>
          `;
        })}
      </div>
    `;
  }

  // ─── Render: Speaker Management ─────────────────────

  private _renderSpeakerManagement() {
    const groupMembers = this._groupMembers;
    const availableSpeakers = this._availableSpeakers;
    // Only show speakers that aren't already in the group
    const joinable = availableSpeakers.filter((s) => !groupMembers.includes(s.id));

    if (groupMembers.length === 0 && joinable.length === 0) return nothing;

    return html`
      <div class="rooms-section">
        <div class="rooms-header">
          <span class="rooms-title">Speakers</span>
        </div>

        <!-- Current group members -->
        ${groupMembers.map((memberId) => {
          const member = getEntity(this.hass, memberId);
          const isPlaying = member?.state === 'playing';
          const memberName = member ? entityName(member) : memberId.split('.')[1];
          const isSelf = memberId === this._activeId;
          const memberVolume = member ? getVolumePercent(member as MediaPlayerEntity) : 0;
          return html`
            <div class="room-item">
              <div class="room-item-dot ${isPlaying ? 'playing' : 'idle'}"></div>
              <div class="room-item-info">
                <span class="room-item-name">${memberName}${isSelf ? ' (Host)' : ''}</span>
                <span class="room-item-state">${isPlaying ? 'Playing' : 'Idle'} · ${memberVolume}%</span>
              </div>
              ${!isSelf ? html`
                <button class="room-item-action unjoin" @click=${() => this._unjoinSpeaker(memberId)}
                  title="Remove from group">
                  <ha-icon icon="mdi:minus-circle-outline"></ha-icon>
                </button>
              ` : nothing}
            </div>
          `;
        })}

        <!-- Joinable speakers -->
        ${joinable.length ? html`
          <span class="rooms-subtitle">Available</span>
          ${joinable.map((speaker) => html`
            <div class="room-item joinable">
              <div class="room-item-dot idle"></div>
              <div class="room-item-info">
                <span class="room-item-name">${speaker.name}</span>
              </div>
              <button class="room-item-action join" @click=${() => this._joinSpeaker(speaker.id)}
                title="Add to group">
                <ha-icon icon="mdi:plus-circle-outline"></ha-icon>
              </button>
            </div>
          `)}
        ` : nothing}
      </div>
    `;
  }

  // ─── Render: Shortcuts ──────────────────────────────

  private _renderShortcuts() {
    if (!this.config.shortcuts?.length) return nothing;
    return html`
      <div class="shortcuts-section">
        <span class="shortcuts-label">Shortcuts</span>
        <div class="shortcuts-list">
          ${this.config.shortcuts.map((shortcut) => html`
            <lumina-chip
              .icon=${shortcut.icon || 'mdi:play-circle'}
              .label=${shortcut.name}
              @click=${() => this._playShortcut(shortcut)}
            ></lumina-chip>
          `)}
        </div>
      </div>
    `;
  }
}
