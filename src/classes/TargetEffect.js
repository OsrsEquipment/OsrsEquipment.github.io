/* eslint-disable no-unused-vars */
import Effect from './Effect';

export default class TargetEffect extends Effect {
  /**
   * returns whether or not this target effect meets all requirements to be active
   * @param calculation
   * @returns true if target effect should be applied
   */
  static check(calculation) {
    throw new Error('Override this method!');
  }
}
