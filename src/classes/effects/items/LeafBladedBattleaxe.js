import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class LeafBladedBattleaxe extends ItemEffect {
  static name = 'Leaf-bladed battleaxe';

  static description = 'Provides a bonus against certain creatures';

  static categories = ['item', 'melee'];

  static check(calculation) {
    return Utils.hasEquipped(calculation.loadout.equipment, 20727);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'melee' && LeafBladedBattleaxe.isTargetLeafy(calculation.target)) {
      // Conflicting information on the accuracy part.
      // Official news post only mentions damage increase.
      // calculation.addAccuracyModifier(LeafBladedBattleaxe.name, 1.175);
      calculation.addDamageModifier(LeafBladedBattleaxe.name, 1.175);
      return true;
    }
    return false;
  }

  static isTargetLeafy(target) {
    return target.attributes.includes('leafy');
  }
}
