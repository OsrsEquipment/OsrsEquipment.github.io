import Calculation from './Calculation';

export default class CalculationMelee extends Calculation {
  constructor(loadout, target) {
    super(loadout, target, 'melee');
  }
}
