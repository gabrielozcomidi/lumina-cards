/**
 * LuminaCardBase — base class for all Lumina cards.
 *
 * Why this exists: most cards only care about a handful of entities, but the
 * default Lit + HA pattern re-renders on every `hass` property change — and
 * HA pushes a fresh `hass` object whenever ANY entity state changes anywhere
 * in the system. On a busy install that's many updates per second. Without
 * `shouldUpdate` short-circuiting, a card with a single light entity still
 * re-renders when an unrelated sensor in another room ticks.
 *
 * Cards override two small hooks:
 *
 *   protected trackedEntities(): string[]   // entity IDs to watch
 *   protected defaults(): Partial<C>        // config defaults
 *   protected validateConfig(c: C): void    // throw on bad config (optional)
 *
 * The base then:
 *
 *   • merges `defaults()` into the config when `setConfig` is called
 *   • re-renders if config or any @state property changes
 *   • on a pure hass change, diffs `hass.states[id]` for each tracked id and
 *     skips the render if nothing relevant moved
 *
 * If a card returns an empty list from `trackedEntities()` the base assumes
 * "this card doesn't care about HA state" and skips ALL hass-only updates
 * (correct for purely visual cards like clock-card that tick from a timer).
 *
 * Cards that DO want to always re-render on hass (e.g. ones that read from
 * `hass.themes` or `hass.locale`) can override `shouldUpdate` directly or
 * include a sentinel like `hass:locale` in their tracked list — see the
 * pattern in HOME-ASSISTANT, not implemented here yet.
 */

import { LitElement, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { LovelaceCardConfig } from 'custom-card-helpers';
import { HomeAssistant } from '../types/ha-types';

export abstract class LuminaCardBase<
  C extends LovelaceCardConfig = LovelaceCardConfig,
> extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() protected _config!: C;

  /**
   * Public `config` accessor — restores `.config=${...}` property binding
   * for cards composed into other cards (room-card → light-card etc.).
   *
   * HA's standard pattern is `cardElement.setConfig(config)`, which Lovelace
   * calls directly. But composed cards typically bind via Lit's
   * `.config=${childConfig}` syntax — that needs a public `config` property
   * to land on. Without this accessor a composed child gets no config and
   * silently renders nothing.
   *
   * Implementation notes:
   *   • Tracks the last input by reference (_lastConfigInput) so identity-
   *     stable parent re-renders don't re-run setConfig.
   *   • Catches validation errors — composed parents often build minimal
   *     configs (e.g. light-card with empty entities) that would throw if
   *     setConfig ran them through validateConfig. The catch lets such
   *     children fall through to their render() empty-guards instead of
   *     crashing the parent's render.
   */
  private _lastConfigInput?: C;
  public get config(): C | undefined {
    return this._config;
  }
  public set config(value: C | undefined) {
    if (!value || value === this._lastConfigInput) return;
    this._lastConfigInput = value;
    try {
      this.setConfig(value);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(`${this.tagName.toLowerCase()}: ${(e as Error).message}`);
    }
  }

  /** Override to throw on invalid config. Called from setConfig before defaults merge. */
  protected validateConfig(_config: C): void {
    /* default: nothing to validate */
  }

  /** Override to provide default values. Merged BEFORE user-supplied config (user wins). */
  protected defaults(): Partial<C> {
    return {};
  }

  /**
   * Override to list the entity IDs this card cares about.
   * - Return a non-empty list → base re-renders only when one of those entities changes.
   * - Return an empty list → base SKIPS all hass-only updates (good for purely visual cards).
   */
  protected trackedEntities(): string[] {
    return [];
  }

  /** Default card size; cards override for taller layouts (e.g. status, weather, room). */
  public getCardSize(): number {
    return 3;
  }

  public setConfig(config: C): void {
    this.validateConfig(config);
    this._config = { ...this.defaults(), ...config } as C;
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    // Anything other than hass changing (config, internal @state) → re-render.
    if (changed.size !== 1 || !changed.has('hass')) return true;
    if (!this._config) return false;

    const oldHass = changed.get('hass') as HomeAssistant | undefined;
    if (!oldHass) return true; // first hass assignment

    const tracked = this.trackedEntities();
    if (!tracked.length) return false; // card doesn't track HA state
    return tracked.some((id) => oldHass.states[id] !== this.hass.states[id]);
  }
}
