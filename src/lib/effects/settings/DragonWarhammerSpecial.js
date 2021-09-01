import Effect from '../../Effect';

export default class DragonWarhammerSpecial extends Effect {
  static name = 'Smash';

  static description = 'Lowers the target\'s current defence level by 30%';

  static categories = ['item', 'melee'];

  static apply(calculation) {
    const amount = Number(calculation.loadout.settings?.dwhSpecials);
    if (amount) {
      const { debuffedTarget } = calculation;
      debuffedTarget.defence_level = Math.ceil(debuffedTarget.defence_level * 0.7 ** amount);
      return { name: `Smash x${amount}` };
    }
    return false;
  }
}
