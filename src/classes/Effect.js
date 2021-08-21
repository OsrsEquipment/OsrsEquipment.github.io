/* eslint-disable no-unused-vars */
export default class Effect {
  /**
   * Biggest number gets applied first, lowest gets applied last.
   * @type {number}
   */
  static priority = 1;

  /**
   * A category should describe where the effect came from and what it affects.
   * e.g. item, potion, prayer, attack, strength, ranged, magic
   * @type {[string]}
   */
  static categories = [];

  /**
   * Determines if the effect should be shown as being applied
   * e.g. PassiveEffect always gets applied, so hide it.
   * @type {boolean}
   */
  static show = true;

  /**
   * Determines if this effect is being applied during calculation
   * @type {boolean}
   */
  static active = true;

  /**
   * A useful name for the effect
   * e.g. Dragon hunter lance passive
   * @type {string}
   */
  static name = 'Provide a name';

  /**
   * A useful description for the effect
   * e.g. Target is considered draconic
   * @type {string}
   */
  static description = 'Provide a description';

  /**
   * Apply the current effect to the calculation
   * @param calculation
   */
  static apply(calculation) {
    throw new Error('Method "Apply" must be implemented.');
  }
}
