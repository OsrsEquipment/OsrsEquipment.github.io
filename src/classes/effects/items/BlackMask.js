import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class BlackMask extends ItemEffect {
  static name = 'Black mask';

  static description = 'Provides a bonus on slayer tasks (melee only)';

  static categories = ['item', 'attack', 'strength'];

  static regularIds = [8921, 11864];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment,
      [...BlackMask.regularIds]);
  }

  static apply(calculation) {
    if (!calculation.loadout.settings.onSlayerTask) return false;
    if (calculation.dpsType === 'melee') {
      calculation.setBonus('slayer', 7 / 6);
    }
    return true;
  }
}
