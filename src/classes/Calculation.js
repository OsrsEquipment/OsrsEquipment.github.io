import PassiveEffect from './effects/PassiveEffect';
import StancePassive from './effects/StancePassive';
import EffectDirectory from './EffectDirectory';

export default class Calculation {
  tickSpeed = 0.6;

  /**
   * What type of dps is being calculated
   * @type 'melee' | 'ranged' | 'magic'
   */
  dpsType = 'melee';

  bonuses;

  skills;

  target;

  effectiveStrengthBonus = 0;

  effectiveAttackBonus = 0;

  /**
   * Key = name of the boost
   * Value = float to modify damage by
   * Modifies max hit
   * @type {Map<string, float>}
   */
  damageModifiers = new Map();

  /**
   * Key = name of the boost
   * Value = float to modify damage by
   * Modifies average damage
   * @type {Map<string, float>}
   */
  averageDamageModifiers = new Map();

  /**
   * Key = name of the boost
   * Value = float to modify damage by
   * Modifies attack roll
   * @type {Map<string, float>}
   */
  accuracyModifiers = new Map();

  /**
   * Key = name of the boost
   * Value = float to modify damage by
   * Modifies target defence roll
   * @type {Map<string, float>}
   */
  targetDefenceModifiers = new Map();

  visibleEffects = new Map();

  constructor(loadout, target) {
    this.loadout = loadout;
    this.target = target;
  }

  init() {
    this.effectiveStrengthBonus = 0;
    this.effectiveAttackBonus = 0;
    this.damageModifiers = new Map();
    this.averageDamageModifiers = new Map();
    this.accuracyModifiers = new Map();
    this.targetDefenceModifiers = new Map();
    this.visibleEffects = new Map();
    this.bonuses = { ...this.loadout.bonuses };
    this.skills = { ...this.loadout.skills };
    this.target = { ...this.target };
    this.effects
      .sort((a, b) => b.priority - a.priority)
      .forEach((effect) => {
        const activated = effect.apply(this);
        if (effect.show) {
          this.visibleEffects.set(effect.name, activated);
        }
      });
  }

  get maxHit() {
    let result = this.effectiveStrength;
    result *= (this.strengthBonus + 64);
    result += 320;
    result /= 640;
    result = Math.floor(result);
    result *= Math.max(this.bonuses.slayer, this.bonuses.undead);
    result = Math.floor(result);
    for (const value of this.damageModifiers.values()) {
      result = Math.floor(result * value);
    }
    return result;
  }

  get attackRoll() {
    let result = this.effectiveAttack;
    result *= (this.attackBonus + 64);
    result *= Math.max(this.bonuses.slayer, this.bonuses.undead);
    result = Math.floor(result);
    for (const value of this.accuracyModifiers.values()) {
      result = Math.floor(result * value);
    }
    return result;
  }

  get targetDefenceRoll() {
    const targetDefence = this.targetDefence + 9;
    const targetStyleDefence = this.targetDefenceBonus + 64;
    let result = targetDefence * targetStyleDefence;
    for (const value of this.targetDefenceModifiers.values()) {
      result = Math.floor(result * value);
    }
    return result;
  }

  get hitChance() {
    const {
      attackRoll,
      targetDefenceRoll,
    } = this;
    if (attackRoll > targetDefenceRoll) {
      return 1 - ((targetDefenceRoll + 2) / (2 * attackRoll + 1));
    }
    return attackRoll / (2 * targetDefenceRoll + 1);
  }

  get averageDamage() {
    let avgDmg = this.maxHit * this.hitChance / 2;
    for (const value of this.averageDamageModifiers.values()) {
      avgDmg *= value;
    }
    return avgDmg;
  }

  get dps() {
    return this.averageDamage / this.attackSpeedInSeconds;
  }

  setSkill(name, level) {
    if (Object.prototype.hasOwnProperty.call(this.skills, name)) {
      this.skills[name] = level;
    } else {
      throw new Error(`Skill '${name}' not found.`);
    }
  }

  setBonus(name, value) {
    if (Object.prototype.hasOwnProperty.call(this.bonuses, name)) {
      this.bonuses[name] = value;
    } else {
      throw new Error(`Bonus '${name}' not found.`);
    }
  }

  addDamageModifier(name, modifier) {
    if (this.damageModifiers.has(name)) {
      throw new Error(`Attempting to add ${name} damage modifier to the list twice`);
    } else {
      this.damageModifiers.set(name, modifier);
    }
  }

  addAccuracyModifier(name, modifier) {
    if (this.accuracyModifiers.has(name)) {
      throw new Error(`Attempting to add ${name} accuracy modifier to the list twice`);
    } else {
      this.accuracyModifiers.set(name, modifier);
    }
  }

  addAverageDamageModifier(name, modifier) {
    if (this.averageDamageModifiers.has(name)) {
      throw new Error(`Attempting to add ${name} average damage modifier to the list twice`);
    } else {
      this.averageDamageModifiers.set(name, modifier);
    }
  }

  addTargetDefenceRollModifier(name, modifier) {
    if (this.targetDefenceModifiers.has(name)) {
      throw new Error(`Attempting to add ${name} target defence roll modifier to the list twice`);
    } else {
      this.targetDefenceModifiers.set(name, modifier);
    }
  }

  get effectiveStrength() {
    let result;
    switch (this.dpsType) {
      case 'melee':
        result = this.loadout.skills.strength;
        break;
      case 'ranged':
        result = this.loadout.skills.ranged;
        break;
      case 'magic':
        result = this.loadout.skills.magic;
        break;
    }
    return result + this.effectiveStrengthBonus;
  }

  get strengthBonus() {
    switch (this.dpsType) {
      case 'melee':
        return this.loadout.bonuses.melee_strength;
      case 'ranged':
        return this.loadout.bonuses.ranged_strength;
      case 'magic':
        return this.loadout.bonuses.magic_damage;
    }
    return undefined;
  }

  get effectiveAttack() {
    let result;
    switch (this.dpsType) {
      case 'melee':
        result = this.loadout.skills.attack;
        break;
      case 'ranged':
        result = this.loadout.skills.ranged;
        break;
      case 'magic':
        result = this.loadout.skills.magic;
        break;
    }
    return result + this.effectiveAttackBonus;
  }

  get attackBonus() {
    switch (this.dpsType) {
      case 'melee':
        return this.loadout.bonuses[`attack_${this.attackType}`];
      case 'ranged':
        return this.loadout.bonuses.attack_ranged;
      case 'magic':
        return this.loadout.bonuses.attack_magic;
    }
    return undefined;
  }

  get targetDefence() {
    switch (this.dpsType) {
      case 'melee':
        return this.target.defence_level;
      case 'ranged':
        return this.target.defence_level;
      case 'magic':
        return this.target.magic_level;
    }
    return undefined;
  }

  get targetDefenceBonus() {
    switch (this.dpsType) {
      case 'melee':
        return this.target[`defence_${this.attackType}`];
      case 'ranged':
        return this.target.defence_ranged;
      case 'magic':
        return this.target.defence_magic;
    }
    return undefined;
  }

  get attackType() {
    return this.loadout.stance.attack_type;
  }

  get attackSpeed() {
    return this.loadout.weapon.attackSpeed;
  }

  get attackSpeedInSeconds() {
    return this.attackSpeed * this.tickSpeed;
  }

  get effects() {
    const result = [];
    result.push(...[PassiveEffect, StancePassive]);

    if (this.loadout.potions) {
      result.push(
        ...this.loadout.potions
          .map((potion) => EffectDirectory.potions.get(potion)),
      );
    }

    if (this.loadout.prayers) {
      result.push(
        ...this.loadout.prayers
          .filter((prayer) => EffectDirectory.prayers.get(prayer))
          .map((prayer) => EffectDirectory.prayers.get(prayer)),
      );
    }

    if (this.loadout.equipment) {
      result.push(
        ...[...EffectDirectory.items.values()]
          .filter((itemEffect) => itemEffect.check(this)),
      );
    }

    return result;
  }
}
