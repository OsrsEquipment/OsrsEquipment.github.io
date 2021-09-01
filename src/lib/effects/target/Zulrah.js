import TargetEffect from '../../TargetEffect';

export default class Zulrah extends TargetEffect {
  static priority = -1;

  static name = 'Zulrah';

  static description = 'Max hit on Zulrah is 50';

  static check(calculation) {
    return [2042, 2043, 2044].includes(calculation.target.id);
  }

  static apply(calculation) {
    const cap = 50;
    const minCap = 45;
    // Formula was checked by running a simulation that tested 1 billion hits
    // (((cap * (cap + 1) / 2) + ((cap - (cap - minCap) / 2)
    // * (maxHit - cap))) / (maxHit + 1)) * accuracy
    calculation.addTransformer('averageDamage', (avgDmg, calc) => (((cap * (cap + 1) / 2) + ((cap - (cap - minCap) / 2)
      * (calc.maxHit - cap))) / (calc.maxHit + 1)) * calc.hitChance);
    return true;
  }
}
