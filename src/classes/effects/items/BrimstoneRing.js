import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class BrimstoneRing extends ItemEffect {
  static name = 'Brimstone ring';

  static description = '25% chance to reduce target\'s defence by 10% for that hit.';

  static categories = ['item', 'magic'];

  static check(calculation) {
    return Utils.hasEquipped(calculation.loadout.equipment, 22975);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'magic') {
      calculation.addTargetDefenceRollModifier(BrimstoneRing.name, 0.975);
      return true;
    }
    return false;
  }
}
