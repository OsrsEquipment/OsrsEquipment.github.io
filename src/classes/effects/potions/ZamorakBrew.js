import Effect from '../../Effect';

class ZamorakBrew extends Effect {
  static priority = 1000;

  static categories = ['potion', 'attack'];

  static name = 'Zamorak brew';

  static apply(calculation) {
    if (calculation.dpsType === 'melee') {
      const { effectiveAttack } = calculation;
      calculation.effectiveAttackBonus += Math.floor(effectiveAttack * 0.2) + 2;
      // strength boost ignored, that way users can combine super strength and this potion.
      return true;
    }
    return false;
  }
}

export default ZamorakBrew;
