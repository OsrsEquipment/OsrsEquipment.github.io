import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class AbyssalWhipSpecial extends ItemEffect {
  static name = 'Energy Drain';

  static description = 'Increased accuracy';

  static categories = ['item', 'melee'];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [4151]);
  }

  static apply(calculation) {
    calculation.addModifier('specialAttackRoll', 1.25);
    calculation.hasSpecial = true;
    return true;
  }
}
