import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class SmokeBattlestaff extends ItemEffect {
  static name = 'Smoke Battlestaff';

  static description = 'Provides 10% increased accuracy and damage for standard spellbook spells';

  static categories = ['item', 'magic'];

  static staffIds = [11998, 12000];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [...SmokeBattlestaff.staffIds]);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'magic') {
      if (calculation.spell && calculation.isStandardSpell()) {
        calculation.addModifier('attackRoll', 1.1);
        calculation.invisibleMagicDamageBonus += 10;
        return true;
      }
    }
    return false;
  }
}
