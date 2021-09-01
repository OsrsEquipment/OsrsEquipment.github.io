import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class BlackMask extends ItemEffect {
  static name = 'Black mask';

  static description = 'Provides a bonus on slayer tasks (melee only)';

  static categories = ['item', 'attack', 'strength', 'ranged', 'magic'];

  static regularIds = [8921, 11864];

  static imbuedIds = [11784, 11865];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment,
      [...BlackMask.regularIds, ...BlackMask.imbuedIds]);
  }

  static apply(calculation) {
    if (!calculation.loadout.settings.onSlayerTask) return false;
    const imbued = Utils.hasAnyEquipped(calculation.loadout.equipment,
      [...BlackMask.imbuedIds]);
    switch (calculation.dpsType) {
      case 'melee':
        calculation.setBonus('slayer', 7 / 6);
        break;
      case 'ranged':
      case 'magic':
        if (imbued) {
          calculation.setBonus('slayer', 1.15);
        } else {
          return false;
        }
    }
    return {
      name: `Black mask${imbued ? ' (i)' : ''}`,
      description: `Provides a bonus on slayer tasks${imbued ? '' : ' (melee only)'}`,
    };
  }
}
