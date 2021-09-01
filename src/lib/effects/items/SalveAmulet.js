import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class SalveAmulet extends ItemEffect {
  static name = 'Salve amulet';

  static description = 'Increased damage against undead';

  static categories = ['item', 'melee', 'ranged', 'magic'];

  static regularSalve = 4081;

  static enchantedSalve = 10588;

  static imbuedSalve = 12017;

  static imbuedEnchantedSalve = 12018;

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [
      SalveAmulet.regularSalve,
      SalveAmulet.enchantedSalve,
      SalveAmulet.imbuedSalve,
      SalveAmulet.imbuedEnchantedSalve,
    ]);
  }

  static apply(calculation) {
    if (!SalveAmulet.isTargetUndead(calculation.target)) return false;
    const { equipment } = calculation.loadout;
    const isEnchanted = Utils.hasAnyEquipped(equipment, [
      SalveAmulet.enchantedSalve,
      SalveAmulet.imbuedEnchantedSalve,
    ]);
    const isImbued = Utils.hasAnyEquipped(equipment, [
      SalveAmulet.imbuedSalve,
      SalveAmulet.imbuedEnchantedSalve,
    ]);

    if (calculation.dpsType === 'melee') {
      calculation.setBonus('undead', isEnchanted ? 1.2 : 7 / 6);
      return true;
    }

    if (isImbued) {
      if (calculation.dpsType === 'ranged') {
        calculation.setBonus('undead', isEnchanted ? 1.2 : 7 / 6);
      }
      if (calculation.dpsType === 'magic') {
        calculation.setBonus('undead', isEnchanted ? 1.2 : 1.15);
      }
      return true;
    }

    return false;
  }

  static isTargetUndead(target) {
    return target.attributes.includes('undead');
  }
}
