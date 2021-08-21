import Effect from '../../Effect';

class MagicPotion extends Effect {
  static priority = 1000;

  static categories = ['potion', 'magic'];

  static name = 'Magic potion';

  static apply(calculation) {
    if (calculation.dpsType === 'magic') {
      calculation.effectiveAttackBonus += 4;
      calculation.effectiveStrengthBonus += 4;
      return true;
    }
    return false;
  }
}

export default MagicPotion;
