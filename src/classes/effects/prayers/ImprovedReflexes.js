import Effect from '../../Effect';

class ImprovedReflexes extends Effect {
  static priority = 900;

  static name = 'Improved Reflexes';

  static description = '+10% Attack';

  static apply(calculation) {
    if (calculation.dpsType === 'melee') {
      const { effectiveAttack } = calculation;
      calculation.effectiveAttackBonus += Math.floor(effectiveAttack * 0.1);
      return true;
    }
    return false;
  }
}

export default ImprovedReflexes;
