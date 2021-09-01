import Effect from '../../Effect';

class SuperStrengthPotion extends Effect {
  static priority = 1000;

  static categories = ['potion', 'strength'];

  static name = 'Super strength potion';

  static apply(calculation) {
    if (calculation.dpsType === 'melee') {
      const { effectiveStrength } = calculation;
      calculation.visibleStrengthBonus += Math.floor(effectiveStrength * 0.15) + 5;
      return true;
    }
    return false;
  }
}

export default SuperStrengthPotion;
