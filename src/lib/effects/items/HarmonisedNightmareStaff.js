import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class HarmonisedNightmareStaff extends ItemEffect {
  static name = 'Harmonised nightmare staff';

  static description = 'Autocast standard spells 1 tick faster';

  static categories = ['item', 'magic'];

  static check(calculation) {
    return Utils.hasEquipped(calculation.loadout.equipment, 24423);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'magic') {
      if (calculation.spell && calculation.isStandardSpell()) {
        calculation.addTransformer('attackSpeed', (attackSpeed) => attackSpeed - 1);
        return true;
      }
    }
    return false;
  }
}
