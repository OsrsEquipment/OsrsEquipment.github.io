import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class TomeOfFire extends ItemEffect {
  static name = 'Tome of fire';

  static description = 'Damage of fire spells boosted by 50%';

  static categories = ['item', 'magic'];

  static check(calculation) {
    return Utils.hasEquipped(calculation.loadout.equipment, 20714);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'magic') {
      if (calculation.spell && calculation.spell.attributes.includes('fire')) {
        calculation.addDamageModifier(TomeOfFire.name, 1.5);
        return true;
      }
    }
    return false;
  }
}
