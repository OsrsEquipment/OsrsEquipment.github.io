/* eslint-disable no-unused-vars */
export default class ItemEffect {
  /**
   * Descriptive name for item effect
   */
  static name;

  /**
   * returns whether or not this item effect meets all requirements to be active
   * @param calculation
   */
  static check(calculation) {
    throw new Error('Override this method!');
  }

  /**
   * The boost that should be applied
   * @param calculation
   */
  static boost(calculation) {
    throw new Error('Override this method!');
  }
}
