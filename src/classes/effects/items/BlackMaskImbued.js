import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class BlackMaskImbued extends ItemEffect {
  static name = 'Black mask (i)';

  static description = 'Provides a bonus on slayer tasks';

  static categories = ['item', 'attack', 'strength', 'magic', 'ranged'];

  static imbuedIds = [11784, 11865];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment,
      [...BlackMaskImbued.imbuedIds]);
  }

  static apply(calculation) {
    if (!calculation.loadout.settings.onSlayerTask) return false;
    switch (calculation.dpsType) {
      case 'melee':
        calculation.setBonus('slayer', 7 / 6);
        break;
      case 'ranged':
      case 'magic':
        calculation.setBonus('slayer', 1.15);
    }
    return true;
  }
}
