import MeleeDps from './melee-dps';
import RangedDps from './ranged-dps';
import MagicDps from './magic-dps';
import Loadout from './loadout';

class DpsCalculator {
  calculate(loadout, target) {
    let dps;
    switch (this.determineStyle(loadout.stance)) {
      case 'ranged':
        dps = new RangedDps(new Loadout(loadout), target);
        break;
      case 'magic':
        dps = new MagicDps(new Loadout(loadout), target);
        break;
      default:
        dps = new MeleeDps(new Loadout(loadout), target);
    }
    console.log('Calculating!');
    const t0 = performance.now();
    const result = dps.calculate();
    const t1 = performance.now();
    console.log(`Done in ${t1 - t0} milliseconds`);
    return result;
  }

  determineStyle(stance) {
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

export default new DpsCalculator();
