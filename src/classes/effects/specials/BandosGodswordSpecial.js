import Effect from '../../Effect';

export default class BandosGodswordSpecial extends Effect {
  static name = 'Warstrike';

  static description = 'Lowers the target\'s combat stats based on damage dealt';

  static categories = ['item', 'melee'];

  static apply(calculation) {
    const amount = Number(calculation.loadout.settings?.bgsSpecialDamage);
    if (amount) {
      const { debuffedTarget } = calculation;
      const reductionOrder = ['defence_level', 'strength_level', 'attack_level', 'magic_level', 'ranged_level'];
      let reductionIndex = 0;
      let currentAmount = amount;
      while (currentAmount > 0 || reductionIndex < reductionIndex.length) {
        const stat = reductionOrder[reductionIndex];
        let statLevel = debuffedTarget[stat];
        if (currentAmount > statLevel) {
          currentAmount -= statLevel;
          statLevel = 0;
        } else {
          statLevel -= currentAmount;
          currentAmount = 0;
        }
        debuffedTarget[stat] = statLevel;
        reductionIndex++;
      }
      return { name: `Warstrike (${amount} damage)` };
    }
    return false;
  }
}
