import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';
import SpellDirectory from '../../SpellDirectory';

export default class PoweredStaves extends ItemEffect {
  static name = 'Powered staff';

  static description = 'Autocast standard spells 1 tick faster';

  static categories = ['item', 'magic'];

  static show = false;

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [
      11907, // Trident of the seas
      12899, // Trident of the swamp
      22323, // Sanguinesti staff
      23852, // Corrupted staff (basic)
      23853, // Corrupted staff (attuned)
      23854, // Corrupted staff (perfected)
      23898, // Crystal staff (basic)
      23899, // Crystal staff (attuned)
      23900, // Crystal staff (perfected)
    ]);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'magic') {
      const weaponId = calculation.loadout.weapon.id;
      switch (weaponId) {
        case 11907:
          calculation.loadout.spell = SpellDirectory.getByName('Trident of the seas');
          break;
        case 12899:
          calculation.loadout.spell = SpellDirectory.getByName('Trident of the swamp');
          break;
        case 22323:
          calculation.loadout.spell = SpellDirectory.getByName('Sanguinesti staff');
          break;
        case 23852:
          calculation.loadout.spell = SpellDirectory.getByName('Corrupted staff (basic)');
          break;
        case 23853:
          calculation.loadout.spell = SpellDirectory.getByName('Corrupted staff (attuned)');
          break;
        case 23854:
          calculation.loadout.spell = SpellDirectory.getByName('Corrupted staff (perfected)');
          break;
        case 23898:
          calculation.loadout.spell = SpellDirectory.getByName('Crystal staff (basic)');
          break;
        case 23899:
          calculation.loadout.spell = SpellDirectory.getByName('Crystal staff (attuned)');
          break;
        case 23900:
          calculation.loadout.spell = SpellDirectory.getByName('Crystal staff (perfected)');
          break;
      }
      return true;
    }
    return false;
  }
}
