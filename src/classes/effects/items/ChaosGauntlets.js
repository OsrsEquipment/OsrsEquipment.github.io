import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class ChaosGauntlets extends ItemEffect {
  static priority = 100;

  static name = 'Chaos gauntlets';

  static description = 'Bolt spells max hit +3';

  static categories = ['item', 'magic'];

  static check(calculation) {
    return Utils.hasEquipped(calculation.loadout.equipment, 777);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'magic') {
      if (calculation.spell && ChaosGauntlets.isBoltSpell(calculation.spell)) {
        calculation.maxHitBonus += 3;
        return true;
      }
    }
    return false;
  }

  static isBoltSpell(spell) {
    return !!spell && spell.attributes.includes('bolt');
  }
}
