import Effect from '../../Effect';

class IncredibleReflexes extends Effect {
  static priority = 900;

  static name = 'Incredible Reflexes';

  static description = '+15% Attack';

  static apply(calculation) {
    if (calculation.dpsType === 'melee') {
      const { effectiveAttack } = calculation;
      calculation.invisibleAttackBonus += Math.floor(effectiveAttack * 0.15);
      return true;
    }
    return false;
  }
}

export default IncredibleReflexes;
