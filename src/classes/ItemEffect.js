/* eslint-disable no-unused-vars */
import Effect from './Effect';

export default class ItemEffect extends Effect {
  /**
   * returns whether or not this item effect meets all requirements to be active
   * @param calculation
   * @returns true if item effect should be applied
   */
  static check(calculation) {
    throw new Error('Override this method!');
  }
}
