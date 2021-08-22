import Effect from '../Effect';

export default class PassiveEffectMagic extends Effect {
  static priority = 600;

  static show = false;

  static name = 'Passive effect for magic';

  static description = 'A passive effect required for accurate results (magic gets applied later)';

  static apply(calculation) {
    if (calculation.dpsType === 'magic') {
      calculation.effectiveAttackBonus += 9;
    }
    return true;
  }
}
