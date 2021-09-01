import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class DarkBow extends ItemEffect {
  static name = 'Dark bow';

  static description = 'Shoots two arrows at once';

  static categories = ['item', 'ranged'];

  static check(calculation) {
    return Utils.hasEquipped(calculation.loadout.equipment, 11235);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'ranged') {
      calculation.addModifier('averageDamage', 2);
      return true;
    }
    return false;
  }

  static usingDragonArrows(equipment) {
    return equipment.ammo && [11212].includes(equipment.ammo.id);
  }
}
