 import ItemEffect from '../item-effect';
import Utils from '../../services/utils';
import { BerserkerNecklacePassive } from '../boosts';

class BerserkerNecklace extends ItemEffect {
  static name = 'Berserker necklace';

  static ids = [11128, 23240];

  static check(equipment) {
    return Utils.hasAnyEquipped(equipment, BerserkerNecklace.ids);
  }

  static boost() {
    return new BerserkerNecklacePassive();
  }
}

export default BerserkerNecklace;
