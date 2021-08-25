import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class TomeOfWater extends ItemEffect {
  static name = 'Tome of fire';

  static description = 'Increases accuracy and damage of water spells by 20%';

  static categories = ['item', 'magic'];

  static check(calculation) {
    return Utils.hasEquipped(calculation.loadout.equipment, 25574);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'magic') {
      if (calculation.spell && calculation.spell.attributes.includes('water')) {
        calculation.addAccuracyModifier(TomeOfWater.name, 1.2);
        calculation.addDamageModifier(TomeOfWater.name, 1.2);
        return true;
      }
    }
    return false;
  }
}
