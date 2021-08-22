import Effect from '../../Effect';

class ImbuedHeart extends Effect {
  static priority = 1000;

  static categories = ['potion', 'magic'];

  static name = 'Imbued heart';

  static apply(calculation) {
    if (calculation.dpsType === 'magic') {
      const { effectiveAttack, effectiveStrength } = calculation;
      calculation.visibleAttackBonus += Math.floor(effectiveAttack * 0.1) + 1;
      calculation.visibleStrengthBonus += Math.floor(effectiveStrength * 0.1) + 1;
      return true;
    }
    return false;
  }
}

export default ImbuedHeart;
