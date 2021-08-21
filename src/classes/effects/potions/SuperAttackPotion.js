import Effect from '../../Effect';

class SuperAttackPotion extends Effect {
  static priority = 1000;

  static categories = ['potion', 'attack'];

  static name = 'Super attack potion';

  static apply(calculation) {
    if (calculation.dpsType === 'melee') {
      const { effectiveAttack } = calculation;
      calculation.effectiveAttackBonus += Math.floor(effectiveAttack * 0.15) + 5;
      return true;
    }
    return false;
  }
}

export default SuperAttackPotion;
