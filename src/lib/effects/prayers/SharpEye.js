import Effect from '../../Effect';

class SharpEye extends Effect {
  static priority = 900;

  static name = 'Sharp Eye';

  static description = '+5% Ranged';

  static apply(calculation) {
    if (calculation.dpsType === 'ranged') {
      const { effectiveStrength, effectiveAttack } = calculation;
      calculation.invisibleStrengthBonus += Math.floor(effectiveStrength * 0.05);
      calculation.invisibleAttackBonus += Math.floor(effectiveAttack * 0.05);
      return true;
    }
    return false;
  }
}

export default SharpEye;
