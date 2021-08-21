import CalculationRanged from './CalculationRanged';
import Loadout from './Loadout';
import CalculationMagic from './CalculationMagic';
import CalculationMelee from './CalculationMelee';

export default class CalculationFactory {
  static generate(loadout, target) {
    let calculation;
    switch (CalculationFactory.determineStyle(loadout.stance)) {
      case 'ranged':
        calculation = new CalculationRanged(new Loadout(loadout), target);
        break;
      case 'magic':
        calculation = new CalculationMagic(new Loadout(loadout), target);
        break;
      default:
        calculation = new CalculationMelee(new Loadout(loadout), target);
    }

    calculation.init();

    return calculation;
  }

  static determineStyle(stance) {
    if (!stance || !stance.experience) return 'melee';
    if (stance.experience.includes('ranged')) {
      return 'ranged';
    }
    if (stance.experience.includes('magic')) {
      return 'magic';
    }
    return 'melee';
  }
}
