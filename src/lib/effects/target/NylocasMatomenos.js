import TargetEffect from '../../TargetEffect';

export default class NylocasMatomenos extends TargetEffect {
  static priority = -1;

  static name = 'Nylocas Matomenos';

  static description = 'Special magic dmg accuracy check';

  static check(calculation) {
    return [8366].includes(calculation.target.id);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'magic' && NylocasMatomenos.isFreezeSpell(calculation.spell)) {
      calculation.addTransformer('hitChance', (hitChance, calc) => {
        const baseMagicBonus = calc.skills.magic + 9;
        const bestAccuracy = (baseMagicBonus) * (64 + 140);
        const minAccuracy = (baseMagicBonus) * 64;
        return calc.attackRoll >= bestAccuracy
          ? 1 : 1 - (bestAccuracy - calc.attackRoll) / (bestAccuracy - minAccuracy);
      });
    }
    return true;
  }

  static isFreezeSpell(spell) {
    return spell && spell.attributes.includes('ice');
  }
}
