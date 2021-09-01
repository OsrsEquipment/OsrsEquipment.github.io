import Effect from '../../Effect';

class MagicPotion extends Effect {
  static priority = 1000;

  static categories = ['potion', 'magic'];

  static name = 'Magic potion';

  static apply(calculation) {
    if (calculation.dpsType === 'magic') {
      calculation.visibleAttackBonus += 4;
      calculation.visibleStrengthBonus += 4;
      return true;
    }
    return false;
  }
}

export default MagicPotion;
