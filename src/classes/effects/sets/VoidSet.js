import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class VoidSet extends ItemEffect {
  static priority = 700;

  static name = 'Void set';

  static description = 'Provides bonuses';

  static categories = ['item', 'attack', 'strength', 'ranged', 'magic'];

  static check(calculation) {
    const voidHelm = Utils.hasEquipped(calculation.loadout.equipment, 11665)
      || Utils.hasEquipped(calculation.loadout.equipment, 11664)
      || Utils.hasEquipped(calculation.loadout.equipment, 11663);

    const voidTop = Utils.hasEquipped(calculation.loadout.equipment, 8839)
      || Utils.hasEquipped(calculation.loadout.equipment, 13072);

    const voidRobe = Utils.hasEquipped(calculation.loadout.equipment, 8840)
      || Utils.hasEquipped(calculation.loadout.equipment, 13073);

    const voidGloves = Utils.hasEquipped(calculation.loadout.equipment, 8842);

    return voidHelm && voidTop && voidRobe && voidGloves;
  }

  static apply(calculation) {
    const elite = Utils.hasEquipped(calculation.loadout.equipment, 13072)
      && Utils.hasEquipped(calculation.loadout.equipment, 13073);
    const { effectiveStrength, effectiveAttack } = calculation;
    if (calculation.dpsType === 'melee') {
      calculation.invisibleStrengthBonus += Math.floor(effectiveStrength * 0.1);
      calculation.invisibleAttackBonus += Math.floor(effectiveAttack * 0.1);
    }
    if (calculation.dpsType === 'ranged') {
      const strengthMulti = elite ? 0.125 : 0.1;
      calculation.invisibleStrengthBonus += Math.floor(effectiveStrength * strengthMulti);
      calculation.invisibleAttackBonus += Math.floor(effectiveAttack * 0.1);
    }
    if (calculation.dpsType === 'magic') {
      calculation.invisibleAttackBonus += Math.floor(effectiveAttack * 0.45);
      if (elite) {
        calculation.magicDamageBonus += 2.5;
      }
    }

    return {
      name: elite ? 'Elite void set' : 'Void set',
    };
  }
}
