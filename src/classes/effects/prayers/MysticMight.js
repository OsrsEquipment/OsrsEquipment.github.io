import Effect from '../../Effect';

class MysticMight extends Effect {
  static priority = 900;

  static name = 'Mystic Might';

  static description = '+15% Magical attack and defence';

  static apply(calculation) {
    if (calculation.dpsType === 'magic') {
      const { effectiveAttack } = calculation;
      calculation.effectiveAttackBonus += Math.floor(effectiveAttack * 0.15);
      return true;
    }
    return false;
  }
}

export default MysticMight;
