import Calculation from './Calculation';

export default class CalculationRanged extends Calculation {
  dpsType = 'ranged';

  isRapid = false;

  get attackSpeed() {
    return super.attackSpeed - (this.isRapid ? 1 : 0);
  }
}
