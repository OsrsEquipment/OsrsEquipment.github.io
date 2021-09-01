import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class InquisitorsArmour extends ItemEffect {
  static priority = 100;

  static name = 'Inquisitor\'s armour';

  static description = 'Increases your accuracy and damage when using the crush attack style';

  static categories = ['item', 'melee'];

  static helmId = 24419;

  static bodyId = 24420;

  static legsId = 24421;

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [
      InquisitorsArmour.helmId,
      InquisitorsArmour.bodyId,
      InquisitorsArmour.legsId,
    ]);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'melee' && InquisitorsArmour.isCrushStance(calculation.loadout.stance)) {
      const { equipment } = calculation.loadout;
      const hasHelmEquipped = Utils.hasEquipped(equipment, InquisitorsArmour.helmId);
      const hasBodyEquipped = Utils.hasEquipped(equipment, InquisitorsArmour.bodyId);
      const hasLegsEquipped = Utils.hasEquipped(equipment, InquisitorsArmour.legsId);

      let bonus = 1;
      bonus += hasHelmEquipped ? 0.005 : 0;
      bonus += hasBodyEquipped ? 0.005 : 0;
      bonus += hasLegsEquipped ? 0.005 : 0;
      if (hasHelmEquipped && hasBodyEquipped && hasLegsEquipped) {
        bonus += 0.01;
      }

      calculation.addModifier('attackRoll', bonus);
      calculation.addModifier('maxHit', bonus);
      return true;
    }
    return false;
  }

  static isCrushStance(stance) {
    return stance.attack_type === 'crush';
  }
}
