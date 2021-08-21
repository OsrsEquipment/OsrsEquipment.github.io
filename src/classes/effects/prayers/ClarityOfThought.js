import Effect from '../../Effect';

class ClarityOfThought extends Effect {
  static priority = 900;

  static name = 'Clarity of Thought';

  static description = '+5% Attack';

  static apply(calculation) {
    if (calculation.dpsType === 'melee') {
      const { effectiveAttack } = calculation;
      calculation.effectiveAttackBonus += Math.floor(effectiveAttack * 0.05);
      return true;
    }
    return false;
  }
}

export default ClarityOfThought;
