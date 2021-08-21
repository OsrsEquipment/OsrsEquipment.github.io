import Effect from '../../Effect';

class MysticWill extends Effect {
  static priority = 900;

  static name = 'Mystic Lore';

  static description = '+10% Magical attack and defence';

  static apply(calculation) {
    if (calculation.dpsType === 'magic') {
      const { effectiveAttack } = calculation;
      calculation.effectiveAttackBonus += Math.floor(effectiveAttack * 0.1);
      return true;
    }
    return false;
  }
}

export default MysticWill;
