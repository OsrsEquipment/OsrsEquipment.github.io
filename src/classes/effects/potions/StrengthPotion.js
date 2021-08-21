import Effect from '../../Effect';

class StrengthPotion extends Effect {
  static priority = 1000;

  static categories = ['potion', 'strength'];

  static name = 'Strength potion';

  static apply(calculation) {
    if (calculation.dpsType === 'melee') {
      const { effectiveStrength } = calculation;
      calculation.effectiveStrengthBonus += Math.floor(effectiveStrength * 0.1) + 3;
      return true;
    }
    return false;
  }
}

export default StrengthPotion;
