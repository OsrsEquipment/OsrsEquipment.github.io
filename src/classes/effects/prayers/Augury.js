import Effect from '../../Effect';

class Augury extends Effect {
  static priority = 900;

  static name = 'Augury';

  static description = '+25% Magical attack and defence, +25% Defence';

  static apply(calculation) {
    if (calculation.dpsType === 'magic') {
      const { effectiveAttack } = calculation;
      calculation.effectiveAttackBonus += Math.floor(effectiveAttack * 0.25);
      return true;
    }
    return false;
  }
}

export default Augury;
