import Effect from '../../Effect';

class HawkEye extends Effect {
  static priority = 900;

  static name = 'Hawk Eye';

  static description = '+10% Ranged';

  static apply(calculation) {
    if (calculation.dpsType === 'ranged') {
      const { effectiveStrength, effectiveAttack } = calculation;
      calculation.invisibleStrengthBonus += Math.floor(effectiveStrength * 0.1);
      calculation.invisibleAttackBonus += Math.floor(effectiveAttack * 0.1);
      return true;
    }
    return false;
  }
}

export default HawkEye;
