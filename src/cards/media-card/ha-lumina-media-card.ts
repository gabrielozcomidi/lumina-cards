import { LitElement, html, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { luminaTokens } from '../../styles/tokens';
import { sharedStyles } from '../../styles/shared';
import { mediaCardStyles } from './styles';
import { LuminaMediaCardConfig, MediaEntityConfig, MediaShortcut, MediaPlayerType } from '../../types';
import { HomeAssistant, MediaPlayerEntity, MediaPlayerItem } from '../../types/ha-types';
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

// ─── Feature bitmask constants (HA MediaPlayerEntityFeature) ───
const SUPPORT_SEEK = 4;
const SUPPORT_SHUFFLE = 32768;
const SUPPORT_REPEAT = 262144;

// ─── Audio format detection regex ─────────────────────────────
const FORMAT_REGEX = /\b(stereo|dolby(?:\s+(?:digital|atmos|surround))?(?:\s+\d+\.\d+)?|atmos|surround(?:\s+\d+\.\d+)?|dts(?:[- ](?:hd|x|ma))?|pcm|flac|aac|mp3|ogg|wav|alac|mono|5\.1|7\.1|lossless|hi-?res)\b/i;
const SKIP_ATTRS = new Set(['friendly_name', 'entity_picture', 'media_title', 'media_artist', 'media_album_name', 'source', 'source_list', 'group_members', 'icon', 'supported_features', 'media_content_id', 'media_position_updated_at']);

interface NormalizedMedia { id: string; customName?: string; playerType: MediaPlayerType }

function normalizeMediaEntity(cfg: string | MediaEntityConfig): NormalizedMedia {
  if (typeof cfg === 'string') return { id: cfg, playerType: 'speaker' };
  return { id: cfg.entity, customName: cfg.name, playerType: cfg.player_type || 'speaker' };
}

function getAppIcon(source: string): string {
  const s = source.toLowerCase();
  if (s.includes('netflix')) return 'mdi:netflix';
  if (s.includes('youtube')) return 'mdi:youtube';
  if (s.includes('disney')) return 'mdi:movie-open';
  if (s.includes('prime') || s.includes('amazon')) return 'mdi:amazon';
  if (s.includes('hbo') || s.includes('max')) return 'mdi:filmstrip';
  if (s.includes('apple')) return 'mdi:apple';
  if (s.includes('plex')) return 'mdi:plex';
  if (s.includes('kodi')) return 'mdi:kodi';
  if (s.includes('spotify')) return 'mdi:spotify';
  if (s.includes('hulu')) return 'mdi:television-play';
  if (s.includes('twitch')) return 'mdi:twitch';
  if (s.includes('tidal')) return 'mdi:music-box-multiple';
  if (s.includes('deezer')) return 'mdi:music-note';
  if (s.includes('qobuz')) return 'mdi:music-circle';
  if (s.includes('soundcloud')) return 'mdi:cloud';
  if (s.includes('chromecast') || s.includes('cast')) return 'mdi:cast';
  if (s.includes('dlna') || s.includes('upnp')) return 'mdi:dlna';
  if (s.includes('hdmi')) return 'mdi:video-input-hdmi';
  if (s.includes('usb')) return 'mdi:usb';
  if (s.includes('game') || s.includes('playstation') || s.includes('xbox') || s.includes('nintendo')) return 'mdi:gamepad-variant';
  if (s.includes('live') || s.includes('dvb') || s.includes('antenna')) return 'mdi:antenna';
  return 'mdi:application';
}

function getSpeakerSourceIcon(source: string): string {
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
  if (s.includes('tidal')) return 'mdi:music-box-multiple';
  if (s.includes('deezer')) return 'mdi:music-note';
  if (s.includes('qobuz')) return 'mdi:music-circle';
  if (s.includes('soundcloud')) return 'mdi:cloud';
  if (s.includes('chromecast') || s.includes('cast')) return 'mdi:cast';
  return 'mdi:speaker';
}

@customElement('ha-lumina-media-card')
export class HaLuminaMediaCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: LuminaMediaCardConfig;

  @state() private _currentPosition = 0;
  @state() private _activeEntityId: string | null = null;
  @state() private _sourcesExpanded = false;
  @state() private _artError = false;
  @state() private _browseMode = false;
  @state() private _browseStack: MediaPlayerItem[] = [];
  @state() private _browseItems: MediaPlayerItem | null = null;
  @state() private _browseLoading = false;
  @state() private _browseSearch = '';
  private _positionTimer: ReturnType<typeof setInterval> | undefined;
  private _lastArtUrl: string | null = null;

  static styles = [luminaTokens, sharedStyles, mediaCardStyles];

  private _debouncedVolume = debounce((volume: number) => {
    callService(this.hass, 'media_player', 'volume_set', {
      entity_id: this._activeId,
      volume_level: volume / 100,
    });
  }, 150);

  public setConfig(config: LuminaMediaCardConfig): void {
    let resolved = config;
    if (config.entity && !config.entities?.length) {
      const { entity, ...rest } = config as Record<string, unknown>;
      resolved = { ...rest, entities: [{ entity: entity as string }] } as LuminaMediaCardConfig;
    }
    if (!resolved.entities?.length && !resolved.entity) {
      throw new Error('Please define at least one media_player entity');
    }
    this.config = { show_source: true, show_progress: true, show_speaker_management: true, ...resolved };
  }

  public getCardSize(): number { return 6; }
  static getConfigElement(): HTMLElement { return document.createElement('ha-lumina-media-card-editor'); }
  static getStubConfig() { return { type: 'custom:ha-lumina-media-card', entities: [], show_source: true, show_progress: true }; }

  connectedCallback(): void {
    super.connectedCallback();
    this._startPositionTracking();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopPositionTracking();
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('hass')) {
      this._syncPosition();
      // Reset art error when URL changes
      const url = this._artUrl;
      if (url !== this._lastArtUrl) {
        this._artError = false;
        this._lastArtUrl = url;
      }
    }
  }

  // ─── Entity Resolution ─────────────────────────────

  private get _allEntities(): NormalizedMedia[] {
    if (this.config.entities?.length) return this.config.entities.map(normalizeMediaEntity);
    if (this.config.entity) return [{ id: this.config.entity, playerType: 'speaker' as MediaPlayerType }];
    return [];
  }

  private get _hasMultiple(): boolean { return this._allEntities.length > 1; }

  private get _activeId(): string {
    if (this._activeEntityId && this._allEntities.some((e) => e.id === this._activeEntityId)) return this._activeEntityId;
    const playing = this._allEntities.find((e) => getEntity(this.hass, e.id)?.state === 'playing');
    return playing?.id || this._allEntities[0]?.id || '';
  }

  private get _activePlayerType(): MediaPlayerType {
    return this._allEntities.find((e) => e.id === this._activeId)?.playerType || 'speaker';
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
      this._currentPosition = position + (Date.now() - new Date(updatedAt).getTime()) / 1000;
    } else if (position !== undefined) {
      this._currentPosition = position;
    }
  }

  private _startPositionTracking(): void {
    this._stopPositionTracking();
    this._positionTimer = setInterval(() => {
      if (this._entity?.state === 'playing' && this._duration > 0) this._currentPosition += 1;
    }, 1000);
  }

  private _stopPositionTracking(): void {
    if (this._positionTimer) { clearInterval(this._positionTimer); this._positionTimer = undefined; }
  }

  // ─── Computed ─────────────────────────────────────

  private get _entity(): MediaPlayerEntity | undefined { return this._getMediaEntity(this._activeId); }
  private get _isPlaying(): boolean { return this._entity?.state === 'playing'; }
  private get _isPaused(): boolean { return this._entity?.state === 'paused'; }
  private get _isActive(): boolean { return this._isPlaying || this._isPaused; }
  private get _duration(): number { return (this._entity?.attributes.media_duration as number) || 0; }
  private get _isMuted(): boolean { return !!this._entity?.attributes.is_volume_muted; }

  private get _artUrl(): string | null {
    const pic = this._entity?.attributes.entity_picture;
    if (!pic) return null;
    return pic.startsWith('/') ? `${location.origin}${pic}` : pic;
  }

  private get _groupMembers(): string[] { return (this._entity?.attributes.group_members as string[]) || []; }
  private get _isGrouped(): boolean { return this._groupMembers.length > 1; }

  private get _groupedRoomName(): string {
    const found = this._allEntities.find((e) => e.id === this._activeId);
    if (!this._isGrouped) return this._getDisplayName(this._activeId, found?.customName);
    return this._groupMembers.map((id) => {
      const e = getEntity(this.hass, id);
      return e ? entityName(e) : id.split('.')[1];
    }).join(' + ');
  }

  private get _audioFormat(): string | null {
    // Primary: read from configured audio format sensor entity
    if (this.config.audio_format_entity) {
      const sensor = getEntity(this.hass, this.config.audio_format_entity);
      if (sensor && sensor.state && sensor.state !== 'unknown' && sensor.state !== 'unavailable') {
        return sensor.state;
      }
    }

    // Fallback: scan media player attributes
    const entity = this._entity;
    if (!entity) return null;
    const attrs = entity.attributes;

    for (const key of ['sonos_audio_format', 'media_channel', 'media_encoding', 'media_format', 'stream_type', 'audio_format']) {
      const val = attrs[key];
      if (typeof val === 'string' && val.length > 0 && FORMAT_REGEX.test(val)) return val;
    }

    for (const [key, val] of Object.entries(attrs)) {
      if (SKIP_ATTRS.has(key) || typeof val !== 'string') continue;
      const match = val.match(FORMAT_REGEX);
      if (match) return match[0];
    }

    return null;
  }

  private get _otherSpeakerIds(): string[] {
    return this._allEntities.filter((e) => e.id !== this._activeId && e.playerType === 'speaker').map((e) => e.id);
  }

  private _hasFeature(feature: number): boolean {
    return !!((this._entity?.attributes.supported_features || 0) & feature);
  }

  // ─── Actions ──────────────────────────────────────

  private _selectPlayer(id: string): void { this._activeEntityId = id; this._sourcesExpanded = false; this._exitBrowseMode(); }
  private _playPause(): void { callService(this.hass, 'media_player', 'media_play_pause', { entity_id: this._activeId }); }
  private _prev(): void { callService(this.hass, 'media_player', 'media_previous_track', { entity_id: this._activeId }); }
  private _next(): void { callService(this.hass, 'media_player', 'media_next_track', { entity_id: this._activeId }); }
  private _onVolume(e: CustomEvent): void { this._debouncedVolume(e.detail.value); }

  private _toggleMute(): void {
    callService(this.hass, 'media_player', 'volume_mute', {
      entity_id: this._activeId,
      is_volume_muted: !this._isMuted,
    });
  }

  private _toggleShuffle(): void {
    callService(this.hass, 'media_player', 'shuffle_set', {
      entity_id: this._activeId,
      shuffle: !this._entity?.attributes.shuffle,
    });
  }

  private _cycleRepeat(): void {
    const current = (this._entity?.attributes.repeat as string) || 'off';
    const next = current === 'off' ? 'all' : current === 'all' ? 'one' : 'off';
    callService(this.hass, 'media_player', 'repeat_set', { entity_id: this._activeId, repeat: next });
  }

  private _selectSource(source: string): void {
    callService(this.hass, 'media_player', 'select_source', { entity_id: this._activeId, source });
    this._sourcesExpanded = false;
  }

  private _togglePower(): void {
    callService(this.hass, 'media_player', 'toggle', { entity_id: this._activeId });
  }

  private _seekToPosition(e: MouseEvent): void {
    const bar = e.currentTarget as HTMLElement;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const position = pct * this._duration;
    callService(this.hass, 'media_player', 'media_seek', { entity_id: this._activeId, seek_position: position });
    this._currentPosition = position;
  }

  private _unjoinSpeaker(speakerId: string): void {
    callService(this.hass, 'media_player', 'unjoin', { entity_id: speakerId });
  }

  private _groupAllSpeakers(): void {
    const others = this._otherSpeakerIds;
    if (!others.length) return;
    callService(this.hass, 'media_player', 'join', { entity_id: this._activeId, group_members: others });
  }

  private _ungroupAllSpeakers(): void {
    this._groupMembers.filter((id) => id !== this._activeId).forEach((id) => {
      callService(this.hass, 'media_player', 'unjoin', { entity_id: id });
    });
  }

  private _playShortcut(shortcut: MediaShortcut): void {
    callService(this.hass, 'media_player', 'play_media', {
      entity_id: this._activeId,
      media_content_id: shortcut.media_content_id,
      media_content_type: shortcut.media_content_type,
    });
  }

  // ─── Browse Media ──────────────────────────────────

  private async _enterBrowseMode(): Promise<void> {
    this._browseMode = true;
    this._browseStack = [];
    this._browseItems = null;
    this._browseLoading = true;
    try {
      const result = await (this.hass as unknown as { callWS: (msg: Record<string, unknown>) => Promise<MediaPlayerItem> }).callWS({
        type: 'media_player/browse_media',
        entity_id: this._activeId,
      });
      if (this.isConnected) this._browseItems = result;
    } catch {
      if (this.isConnected) this._browseItems = null;
    }
    if (this.isConnected) this._browseLoading = false;
  }

  private async _browseInto(item: MediaPlayerItem): Promise<void> {
    if (this._browseItems) this._browseStack = [...this._browseStack, this._browseItems];
    this._browseSearch = '';
    this._browseLoading = true;
    try {
      const result = await (this.hass as unknown as { callWS: (msg: Record<string, unknown>) => Promise<MediaPlayerItem> }).callWS({
        type: 'media_player/browse_media',
        entity_id: this._activeId,
        media_content_id: item.media_content_id,
        media_content_type: item.media_content_type,
      });
      if (this.isConnected) this._browseItems = result;
    } catch { /* stay on current view */ }
    if (this.isConnected) this._browseLoading = false;
  }

  private _browseBack(): void {
    this._browseSearch = '';
    if (this._browseStack.length > 0) {
      const stack = [...this._browseStack];
      this._browseItems = stack.pop()!;
      this._browseStack = stack;
    } else {
      this._exitBrowseMode();
    }
  }

  private _exitBrowseMode(): void {
    this._browseMode = false;
    this._browseStack = [];
    this._browseItems = null;
    this._browseSearch = '';
  }

  private _playBrowseItem(item: MediaPlayerItem): void {
    callService(this.hass, 'media_player', 'play_media', {
      entity_id: this._activeId,
      media_content_id: item.media_content_id,
      media_content_type: item.media_content_type,
    });
    this._exitBrowseMode();
  }

  private _handleBrowseItem(item: MediaPlayerItem): void {
    if (item.can_expand) this._browseInto(item);
    else if (item.can_play) this._playBrowseItem(item);
  }

  private _getBrowseThumb(url?: string | null): string | null {
    if (!url) return null;
    return url.startsWith('/') ? `${location.origin}${url}` : url;
  }

  private _mediaClassIcon(cls: string): string {
    const m: Record<string, string> = {
      directory: 'mdi:folder', playlist: 'mdi:playlist-music', album: 'mdi:album',
      artist: 'mdi:account-music', track: 'mdi:music-note', genre: 'mdi:tag',
      radio: 'mdi:radio', podcast: 'mdi:podcast', movie: 'mdi:movie',
      tvshow: 'mdi:television-classic', channel: 'mdi:television', music: 'mdi:music',
      video: 'mdi:video', app: 'mdi:application', game: 'mdi:gamepad-variant',
    };
    return m[cls] || 'mdi:folder-music';
  }

  private _onArtError(): void { this._artError = true; }

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

    const isSpeaker = this._activePlayerType === 'speaker';

    if (!this._isActive) {
      const lastTitle = entity.attributes.media_title as string | undefined;
      const lastArtist = entity.attributes.media_artist as string | undefined;
      const sourceList = (entity.attributes.source_list as string[]) || [];
      const currentSource = entity.attributes.source as string | undefined;
      return html`
        <div class="media-card">
          ${this._hasMultiple ? this._renderPlayerSelector() : nothing}
          ${!isSpeaker ? html`
            <div class="idle-power-row">
              <button class="power-btn ${entity.state !== 'off' ? 'on' : ''}" @click=${() => this._togglePower()}>
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
            </div>
          ` : nothing}
          <div class="idle-state">
            <ha-icon icon="${isSpeaker ? 'mdi:speaker-off' : 'mdi:television-off'}"></ha-icon>
            ${lastTitle ? html`
              <div class="idle-last-played">
                <span class="idle-last-title">${lastTitle}</span>
                ${lastArtist ? html`<span class="idle-last-artist">${lastArtist}</span>` : nothing}
              </div>
            ` : html`<span class="idle-text">No media playing</span>`}
          </div>
          <!-- Source selector available in idle state too -->
          ${this.config.show_source && sourceList.length
            ? isSpeaker
              ? this._renderSpeakerSources(sourceList, currentSource)
              : this._renderTvApps(sourceList, currentSource)
            : nothing}
          ${isSpeaker ? this._renderShortcuts() : nothing}
          ${isSpeaker ? this._renderBrowseMedia() : nothing}
          ${isSpeaker && this.config.show_speaker_management !== false ? this._renderSpeakerManagement() : nothing}
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
    const showArt = this._artUrl && !this._artError;

    return html`
      <div class="media-card" style="position:relative;">
        ${render3dBackground(this.config.image, true)}
        <div class="lumina-3d-content">

        ${this._hasMultiple ? this._renderPlayerSelector() : nothing}

        <!-- Now Playing Header + Title -->
        <div class="now-playing-group">
          <div class="now-playing-header">
            <div class="now-playing-left">
              <span class="now-playing-label">Now Playing</span>
              ${this._audioFormat ? html`<span class="audio-format-badge">${this._audioFormat}</span>` : nothing}
            </div>
            <div class="now-playing-right">
              ${this._isGrouped ? html`<span class="grouped-badge"><ha-icon icon="mdi:speaker-multiple"></ha-icon> Grouped</span>` : nothing}
              ${isSpeaker && this.config.show_source && sourceList.length ? html`
                <button class="header-action-btn" @click=${() => { this._sourcesExpanded = !this._sourcesExpanded; }}>
                  <ha-icon icon="mdi:speaker"></ha-icon>
                </button>
              ` : nothing}
              ${!isSpeaker && this.config.show_source && sourceList.length ? html`
                <button class="header-action-btn" @click=${() => { this._sourcesExpanded = !this._sourcesExpanded; }}>
                  <ha-icon icon="mdi:apps"></ha-icon>
                </button>
              ` : nothing}
              ${isSpeaker ? html`
                <button class="header-action-btn" @click=${() => this._enterBrowseMode()}>
                  <ha-icon icon="mdi:folder-music"></ha-icon>
                </button>
              ` : nothing}
              ${!isSpeaker ? html`
                <button class="power-btn on" @click=${() => this._togglePower()}>
                  <ha-icon icon="mdi:power"></ha-icon>
                </button>
              ` : nothing}
            </div>
          </div>
          <div class="room-title">${this._groupedRoomName}</div>
        </div>

        <!-- Album Art -->
        <div class="album-section">
          ${showArt
            ? html`<img class="album-art" src=${this._artUrl!} alt="Album art" @error=${() => this._onArtError()} />`
            : html`<div class="album-art-placeholder"><ha-icon icon="${isSpeaker ? 'mdi:music' : 'mdi:television'}"></ha-icon></div>`}
        </div>

        <!-- Track Info -->
        <div class="track-info">
          <span class="track-title">${title}</span>
          <span class="track-artist">${artist}${album ? ` \u2014 ${album}` : ''}</span>
        </div>

        <!-- Seekable Progress Bar -->
        ${this.config.show_progress && this._duration > 0 ? html`
          <div class="progress-section">
            <span class="progress-time">${formatDuration(this._currentPosition)}</span>
            <div class="progress-bar ${this._hasFeature(SUPPORT_SEEK) ? 'seekable' : ''}"
              @click=${this._hasFeature(SUPPORT_SEEK) ? (e: MouseEvent) => this._seekToPosition(e) : nothing}>
              <div class="progress-fill" style="width: ${progressPct}%"></div>
            </div>
            <span class="progress-time">${formatDuration(this._duration)}</span>
          </div>
        ` : nothing}

        <!-- Playback Controls -->
        <div class="playback-controls">
          ${this._hasFeature(SUPPORT_SHUFFLE) ? html`
            <lumina-icon-button icon="mdi:shuffle-variant"
              class="${entity.attributes.shuffle ? 'control-active' : ''}"
              @click=${() => this._toggleShuffle()}></lumina-icon-button>
          ` : nothing}
          <lumina-icon-button icon="mdi:skip-previous" @click=${() => this._prev()}></lumina-icon-button>
          <lumina-icon-button
            icon=${this._isPlaying ? 'mdi:pause' : 'mdi:play'}
            size="lg" variant="filled"
            @click=${() => this._playPause()}
          ></lumina-icon-button>
          <lumina-icon-button icon="mdi:skip-next" @click=${() => this._next()}></lumina-icon-button>
          ${this._hasFeature(SUPPORT_REPEAT) ? html`
            <lumina-icon-button
              icon="${entity.attributes.repeat === 'one' ? 'mdi:repeat-once' : 'mdi:repeat'}"
              class="${entity.attributes.repeat && entity.attributes.repeat !== 'off' ? 'control-active' : ''}"
              @click=${() => this._cycleRepeat()}></lumina-icon-button>
          ` : nothing}
        </div>

        <!-- Volume with Mute -->
        <div class="volume-section">
          <button class="volume-mute-btn ${this._isMuted ? 'muted' : ''}" @click=${() => this._toggleMute()}>
            <ha-icon icon="${this._isMuted ? 'mdi:volume-off' : 'mdi:volume-low'}"></ha-icon>
          </button>
          <div class="volume-slider-wrapper">
            <lumina-slider .value=${volumePercent} .min=${0} .max=${100}
              color="var(--lumina-primary)" @value-changed=${this._onVolume}
            ></lumina-slider>
          </div>
          <span class="volume-icon"><ha-icon icon="mdi:volume-high"></ha-icon></span>
        </div>

        <!-- Sources / Apps (collapsible, triggered from header) -->
        ${this._sourcesExpanded && this.config.show_source && sourceList.length
          ? isSpeaker
            ? this._renderSpeakerSources(sourceList, currentSource)
            : this._renderTvApps(sourceList, currentSource)
          : nothing}

        ${isSpeaker ? this._renderShortcuts() : nothing}
        ${isSpeaker && this.config.show_speaker_management !== false ? this._renderSpeakerManagement() : nothing}

      </div>
      ${this._renderBrowseOverlay()}
      </div>
    `;
  }

  // ─── Render: Player Selector ────────────────────────

  private _renderPlayerSelector() {
    return html`
      <div class="player-selector">
        ${this._allEntities.map(({ id, customName, playerType }) => {
          const ent = this._getMediaEntity(id);
          const isActive = id === this._activeId;
          const isPlaying = ent?.state === 'playing';
          const name = this._getDisplayName(id, customName);
          const icon = playerType === 'tv' ? 'mdi:television' : 'mdi:speaker';
          return html`
            <button class="player-tab ${isActive ? 'active' : ''}" @click=${() => this._selectPlayer(id)}>
              <ha-icon class="player-tab-icon" icon="${icon}"></ha-icon>
              <span class="player-tab-dot ${isPlaying ? 'playing' : ''}"></span>
              <span class="player-tab-name">${name}</span>
            </button>
          `;
        })}
      </div>
    `;
  }

  // ─── Render: Speaker Sources (collapsible) ──────────

  private _renderSpeakerSources(sourceList: string[], currentSource?: string) {
    if (!this._sourcesExpanded) {
      return html`
        <button class="source-compact" @click=${() => { this._sourcesExpanded = true; }}>
          <ha-icon icon="${currentSource ? getSpeakerSourceIcon(currentSource) : 'mdi:speaker'}"></ha-icon>
          <span class="source-compact-name">${currentSource || 'Select Source'}</span>
          <ha-icon class="source-compact-chevron" icon="mdi:chevron-down"></ha-icon>
        </button>
      `;
    }
    return html`
      <div class="sources-section">
        <div class="sources-header">
          <span class="sources-label">Sources</span>
          <button class="sources-close" @click=${() => { this._sourcesExpanded = false; }}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
        <div class="sources-list">
          ${sourceList.map((source) => html`
            <div class="source-item ${currentSource === source ? 'active' : ''}"
              @click=${() => this._selectSource(source)}>
              <ha-icon icon="${getSpeakerSourceIcon(source)}"></ha-icon>
              <span class="source-name">${source}</span>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  // ─── Render: TV Apps (collapsible) ──────────────────

  private _renderTvApps(sourceList: string[], currentSource?: string) {
    if (!this._sourcesExpanded) {
      return html`
        <button class="source-compact" @click=${() => { this._sourcesExpanded = true; }}>
          <ha-icon icon="${currentSource ? getAppIcon(currentSource) : 'mdi:application'}"></ha-icon>
          <span class="source-compact-name">${currentSource || 'Select App'}</span>
          <ha-icon class="source-compact-chevron" icon="mdi:chevron-down"></ha-icon>
        </button>
      `;
    }
    return html`
      <div class="sources-section">
        <div class="sources-header">
          <span class="sources-label">Apps & Inputs</span>
          <button class="sources-close" @click=${() => { this._sourcesExpanded = false; }}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
        <div class="app-grid">
          ${sourceList.map((source) => html`
            <button class="app-item ${currentSource === source ? 'active' : ''}"
              @click=${() => this._selectSource(source)}>
              <ha-icon icon="${getAppIcon(source)}"></ha-icon>
              <span class="app-name">${source}</span>
            </button>
          `)}
        </div>
      </div>
    `;
  }

  // ─── Render: Browse Media Button ────────────────────

  private _renderBrowseMedia() {
    return html`
      <div class="browse-media-section">
        <button class="browse-media-btn" @click=${() => this._enterBrowseMode()}>
          <ha-icon icon="mdi:folder-music"></ha-icon>
          <span>Browse Media</span>
        </button>
      </div>
    `;
  }

  // ─── Render: Browse Overlay ───────────────────────────

  private _renderBrowseOverlay() {
    if (!this._browseMode) return nothing;

    const ALLOWED_KEYWORDS = /artist|album|track|playlist|radio|podcast|music|librar|favorite|recent/i;
    const items = this._browseItems;
    const isRoot = this._browseStack.length === 0;
    const title = isRoot ? 'Browse Media' : (items?.title || 'Browse');

    // Filter root children to relevant music categories
    const rootChildren = isRoot && items?.children
      ? items.children.filter((c) =>
          ALLOWED_KEYWORDS.test(c.title) ||
          ALLOWED_KEYWORDS.test(c.media_class) ||
          ALLOWED_KEYWORDS.test(c.media_content_type))
      : null;

    // Filter list items by search query
    const query = this._browseSearch.toLowerCase();
    const filteredChildren = !isRoot && items?.children
      ? (query ? items.children.filter((c) => c.title.toLowerCase().includes(query)) : items.children)
      : null;

    return html`
      <div class="browse-overlay" @click=${(e: Event) => { if (e.target === e.currentTarget) this._exitBrowseMode(); }}>
        <div class="browse-panel">
          <div class="browse-header">
            <button class="browse-back-btn" @click=${() => this._browseBack()}>
              <ha-icon icon="${isRoot ? 'mdi:close' : 'mdi:arrow-left'}"></ha-icon>
            </button>
            <span class="browse-title">${title}</span>
          </div>

          <!-- Search bar -->
          ${!isRoot ? html`
            <div class="browse-search">
              <ha-icon icon="mdi:magnify"></ha-icon>
              <input type="text" class="browse-search-input"
                placeholder="Search ${title.toLowerCase()}..."
                .value=${this._browseSearch}
                @input=${(e: Event) => { this._browseSearch = (e.target as HTMLInputElement).value; }}
              />
              <button class="browse-search-clear ${this._browseSearch ? 'visible' : ''}"
                @click=${() => { this._browseSearch = ''; }}>
                <ha-icon icon="mdi:close"></ha-icon>
              </button>
            </div>
          ` : nothing}

          ${this._browseLoading ? html`
            <div class="browse-loading"><div class="browse-spinner"></div></div>
          ` : isRoot ? html`
            ${rootChildren?.length ? html`
              <div class="browse-grid">
                ${rootChildren.map((item) => html`
                  <button class="browse-category" @click=${() => this._handleBrowseItem(item)}>
                    <div class="browse-category-icon">
                      <ha-icon icon="${this._mediaClassIcon(item.media_class || item.media_content_type)}"></ha-icon>
                    </div>
                    <span class="browse-category-title">${item.title}</span>
                  </button>
                `)}
              </div>
            ` : html`
              <div class="browse-empty">
                <ha-icon icon="mdi:folder-open-outline"></ha-icon>
                <span>No media sources available</span>
              </div>
            `}
          ` : !filteredChildren?.length ? html`
            <div class="browse-empty">
              <ha-icon icon="mdi:folder-open-outline"></ha-icon>
              <span>${query ? 'No results found' : 'No items found'}</span>
            </div>
          ` : html`
            <!-- Folder: item list -->
            <div class="browse-list">
              ${filteredChildren!.map((item) => {
                const thumb = this._getBrowseThumb(item.thumbnail);
                return html`
                  <div class="browse-list-item" @click=${() => this._handleBrowseItem(item)}>
                    ${thumb
                      ? html`<img class="browse-thumb" src="${thumb}" alt="" @error=${(e: Event) => { (e.target as HTMLImageElement).style.display = 'none'; }} />`
                      : html`<div class="browse-thumb-placeholder"><ha-icon icon="${this._mediaClassIcon(item.media_class)}"></ha-icon></div>`
                    }
                    <div class="browse-item-info">
                      <span class="browse-item-title">${item.title}</span>
                      ${item.children_media_class ? html`<span class="browse-item-subtitle">${item.children_media_class}</span>` : nothing}
                    </div>
                    <div class="browse-item-actions">
                      ${item.can_play ? html`
                        <button class="browse-play-btn" @click=${(e: Event) => { e.stopPropagation(); this._playBrowseItem(item); }}>
                          <ha-icon icon="mdi:play"></ha-icon>
                        </button>
                      ` : nothing}
                      ${item.can_expand ? html`<ha-icon class="browse-chevron" icon="mdi:chevron-right"></ha-icon>` : nothing}
                    </div>
                  </div>
                `;
              })}
            </div>
          `}
        </div>
      </div>
    `;
  }

  // ─── Render: Speaker Management ─────────────────────

  private _renderSpeakerManagement() {
    const groupMembers = this._groupMembers;
    const otherSpeakers = this._otherSpeakerIds;
    const isGrouped = this._isGrouped;

    if (!isGrouped && otherSpeakers.length === 0) return nothing;

    return html`
      <div class="rooms-section">
        <div class="rooms-header">
          <span class="rooms-title">Speakers</span>
          ${otherSpeakers.length > 0 ? html`
            <button class="group-btn ${isGrouped ? 'grouped' : ''}"
              @click=${() => isGrouped ? this._ungroupAllSpeakers() : this._groupAllSpeakers()}>
              <ha-icon icon="${isGrouped ? 'mdi:speaker-off' : 'mdi:speaker-multiple'}"></ha-icon>
              <span>${isGrouped ? 'Ungroup' : 'Group All'}</span>
            </button>
          ` : nothing}
        </div>

        ${(isGrouped ? groupMembers : [this._activeId]).map((memberId) => {
          const member = getEntity(this.hass, memberId);
          const isPlaying = member?.state === 'playing';
          const memberName = member ? entityName(member) : memberId.split('.')[1];
          const isSelf = memberId === this._activeId;
          const memberVolume = member ? getVolumePercent(member as MediaPlayerEntity) : 0;
          return html`
            <div class="room-item">
              <div class="room-item-dot ${isPlaying ? 'playing' : 'idle'}"></div>
              <div class="room-item-info">
                <span class="room-item-name">${memberName}${isSelf && isGrouped ? ' (Host)' : ''}</span>
                <span class="room-item-state">${isPlaying ? 'Playing' : 'Idle'} · ${memberVolume}%</span>
              </div>
              ${!isSelf && isGrouped ? html`
                <button class="room-item-action unjoin" @click=${() => this._unjoinSpeaker(memberId)} title="Remove from group">
                  <ha-icon icon="mdi:minus-circle-outline"></ha-icon>
                </button>
              ` : nothing}
            </div>
          `;
        })}
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
            <lumina-chip .icon=${shortcut.icon || 'mdi:play-circle'} .label=${shortcut.name}
              @click=${() => this._playShortcut(shortcut)}></lumina-chip>
          `)}
        </div>
      </div>
    `;
  }
}
