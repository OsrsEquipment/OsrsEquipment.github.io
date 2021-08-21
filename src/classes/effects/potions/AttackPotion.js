import Effect from '../../Effect';

class AttackPotion extends Effect {
  static priority = 1000;

  static categories = ['potion', 'attack'];

  static name = 'Attack potion';

  static apply(calculation) {
    if (calculation.dpsType === 'melee') {
      const { effectiveAttack } = calculation;
      calculation.effectiveAttackBonus += Math.floor(effectiveAttack * 0.1) + 3;
      return true;
    }
    return false;
  }
}

export default AttackPotion;
