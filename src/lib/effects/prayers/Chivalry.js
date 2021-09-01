import Effect from '../../Effect';

class Chivalry extends Effect {
  static priority = 900;

  static name = 'Chivalry';

  static description = '+15% Attack, +18% Strength, +20% Defence';

  static apply(calculation) {
    if (calculation.dpsType === 'melee') {
      const { effectiveStrength, effectiveAttack } = calculation;
      calculation.invisibleStrengthBonus += Math.floor(effectiveStrength * 0.18);
      calculation.invisibleAttackBonus += Math.floor(effectiveAttack * 0.15);
      return true;
    }
    return false;
  }
}

export default Chivalry;
