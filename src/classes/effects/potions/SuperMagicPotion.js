import Effect from '../../Effect';

class SuperMagicPotion extends Effect {
  static priority = 1000;

  static categories = ['potion', 'magic'];

  static name = 'Super magic potion';

  static apply(calculation) {
    if (calculation.dpsType === 'magic') {
      const { effectiveAttack, effectiveStrength } = calculation;
      calculation.effectiveAttackBonus += Math.floor(effectiveAttack * 0.15) + 5;
      calculation.effectiveStrengthBonus += Math.floor(effectiveStrength * 0.15) + 5;
      return true;
    }
    return false;
  }
}

export default SuperMagicPotion;
