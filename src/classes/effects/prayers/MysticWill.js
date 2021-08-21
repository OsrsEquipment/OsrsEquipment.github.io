import Effect from '../../Effect';

class MysticWill extends Effect {
  static priority = 900;

  static name = 'Mystic Will';

  static description = '+5% Magical attack and defence';

  static apply(calculation) {
    if (calculation.dpsType === 'magic') {
      const { effectiveAttack } = calculation;
      calculation.effectiveAttackBonus += Math.floor(effectiveAttack * 0.05);
      return true;
    }
    return false;
  }
}

export default MysticWill;
