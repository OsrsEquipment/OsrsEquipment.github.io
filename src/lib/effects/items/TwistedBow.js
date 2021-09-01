import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class TwistedBow extends ItemEffect {
  static priority = 100;

  static name = 'Twisted bow';

  static description = 'Twisted bow damage and accuracy gets influenced by targets magic level';

  static categories = ['item', 'ranged'];

  static check(calculation) {
    return Utils.hasEquipped(calculation.loadout.equipment, 20997);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'ranged') {
      const insideChambers = false;
      const targetMagic = Math.min(
        Math.max(
          calculation.target.magic_level,
          calculation.target.attack_magic,
        ),
        insideChambers ? 350 : 250,
      );

      const accuracyModifier = 140
        + (10 * 3 * targetMagic / 10 - 10) / 100
        - (((3 * targetMagic / 10) - 100) ** 2) / 100;

      const damageModifier = 250
        + (10 * 3 * targetMagic / 10 - 14) / 100
        - (((3 * targetMagic / 10) - 140) ** 2) / 100;

      calculation.addModifier('attackRoll', Math.min(accuracyModifier, 140) / 100);
      calculation.addModifier('maxHit', Math.min(damageModifier, 250) / 100);
      return true;
    }
    return false;
  }
}
