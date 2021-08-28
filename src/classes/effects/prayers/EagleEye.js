import Effect from '../../Effect';

class EagleEye extends Effect {
  static priority = 900;

  static name = 'Eagle Eye';

  static description = '+15% Ranged';

  static apply(calculation) {
    if (calculation.dpsType === 'ranged') {
      const { effectiveStrength, effectiveAttack } = calculation;
      calculation.invisibleStrengthBonus += Math.floor(effectiveStrength * 0.15);
      calculation.invisibleAttackBonus += Math.floor(effectiveAttack * 0.15);
      return true;
    }
    return false;
  }
}

export default EagleEye;
