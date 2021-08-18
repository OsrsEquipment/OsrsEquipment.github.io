/* eslint-disable no-unused-vars */
export default class Boost {
  /**
   * Biggest number gets applied first, lowest gets applied last.
   * @type {number}
   */
  static priority = 1;

  /**
   * A category should describe where the boost came from and what it affects.
   * e.g. item, potion, prayer, attack, strength, ranged, magic
   * @type {[string]}
   */
  static categories = [];

  /**
   * Determines if the boost should be shown as being applied
   * e.g. PassiveBoost always gets applied, so hide it.
   * @type {boolean}
   */
  static show = true;

  /**
   * Determines if this boost is being applied during calculation
   * @type {boolean}
   */
  static active = true;

  /**
   * A useful name for the boost
   * e.g. Dragon hunter lance passive
   * @type {string}
   */
  static name = 'Provide a name';

  /**
   * A useful description for the boost
   * e.g. Target is considered draconic
   * @type {string}
   */
  static description = 'Provide a description';

  /**
   * Apply the current boost to the calculation
   * @param calculation
   */
  static apply(calculation) {
    throw new Error('Method "Apply" must be implemented.');
  }
}
