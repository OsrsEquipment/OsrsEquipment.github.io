import ItemEffect from '../item-effect';
import Utils from '../../services/utils';
import { DhlPassive } from '../boosts';

class DragonHunterLance extends ItemEffect {
  static name = 'Dragon hunter lance';

  static ids = [22978];

  static check(equipment) {
    return Utils.hasAnyEquipped(equipment, DragonHunterLance.ids);
  }

  static boost() {
    return new DhlPassive();
  }
}

export default DragonHunterLance;
