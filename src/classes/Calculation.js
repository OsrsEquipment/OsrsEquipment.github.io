import PassiveEffect from './effects/PassiveEffect';
import StancePassive from './effects/StancePassive';
import EffectDirectory from './EffectDirectory';
import PassiveEffectMagic from './effects/PassiveEffectMagic';

export default class Calculation {
  tickSpeed = 0.6;

  /**
   * What type of dps is being calculated
   * @type 'melee' | 'ranged' | 'magic'
   */
  dpsType = 'melee';

  bonuses;

  skills;

  debuffedTarget;

  target;

  invisibleStrengthBonus = 0;

  invisibleAttackBonus = 0;

  visibleStrengthBonus = 0;

  visibleAttackBonus = 0;

  /**
   * Key = What the modifer applies to (e.g. damage, max hit, ...)
   * Value = array of float values to modify value with
   * Contains all sorts of modifiers
   * @type {Map<string, float[]>}
   */
  modifiers = new Map();

  /**
   * Key = What the modifer applies to (e.g. damage, max hit, ...)
   * Value = array of functions that returns the transformed value
   * Contains all sorts of modifiers
   * @type {Map<string, function[]>}
   */
  transformers = new Map();

  /**
   * Reduces attack speed by a constant value
   * e.g. Rapid -1 tick, Harm staff -1 tick
   * @type {Map<string, number>}
   */
  attackSpeedReductions = new Map();

  /**
   * Reduces attack speed by a percent
   * e.g. Leagues relic halves attack speed
   * @type {Map<string, float>}
   */
  attackSpeedModifiers = new Map();

  visibleEffects = new Map();

  constructor(loadout, target) {
    this.loadout = loadout;
    this.target = target;
  }

  init() {
    this.bonuses = { ...this.loadout.bonuses };
    this.skills = { ...this.loadout.skills };
    this.debuffedTarget = { ...this.target };
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
    return this.processValue('damage', result);
  }

  get attackRoll() {
    let result = this.effectiveAttack;
    result *= (this.attackBonus + 64);
    result *= Math.max(this.bonuses.slayer, this.bonuses.undead);
    result = Math.floor(result);
    return this.processValue('accuracy', result);
  }

  get targetDefenceRoll() {
    const targetDefence = this.targetDefence + 9;
    const targetStyleDefence = this.targetDefenceBonus + 64;
    const result = targetDefence * targetStyleDefence;
    return this.processValue('targetDefence', result);
  }

  get hitChance() {
    const {
      attackRoll,
      targetDefenceRoll,
    } = this;
    let result;
    if (attackRoll > targetDefenceRoll) {
      result = 1 - ((targetDefenceRoll + 2) / (2 * attackRoll + 1));
    } else {
      result = attackRoll / (2 * targetDefenceRoll + 1);
    }
    return this.processValue('hitChance', result);
  }

  get averageDamage() {
    const result = this.maxHit * this.hitChance / 2;
    return this.processValue('averageDamage', result);
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

  addModifier(key, modifier) {
    if (!this.modifiers.has(key)) {
      this.modifiers.set(key, []);
    }
    this.modifiers.get(key)
      .push(modifier);
  }

  addTransformer(key, fn) {
    if (!this.transformers.has(key)) {
      this.transformers.set(key, []);
    }
    this.transformers.get(key)
      .push(fn);
  }

  processValue(key, val) {
    let result = val;
    if (this.modifiers.has(key)) {
      for (const value of this.modifiers.get(key)) {
        result = Math.floor(result * value);
      }
    }
    if (this.transformers.has(key)) {
      for (const fn of this.transformers.get(key)) {
        if (typeof fn === 'function') {
          result = fn.call(undefined, result, this);
        }
      }
    }
    return result;
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
    return result + this.invisibleStrengthBonus + this.visibleStrengthBonus;
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
    return result + this.invisibleAttackBonus + this.visibleAttackBonus;
  }

  get visibleAttackLevel() {
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
    return result + this.visibleAttackBonus;
  }

  get visibleStrengthLevel() {
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
    return result + this.visibleStrengthBonus;
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
        return this.debuffedTarget.defence_level;
      case 'ranged':
        return this.debuffedTarget.defence_level;
      case 'magic':
        return this.debuffedTarget.magic_level;
    }
    return undefined;
  }

  get targetDefenceBonus() {
    switch (this.dpsType) {
      case 'melee':
        return this.debuffedTarget[`defence_${this.attackType}`];
      case 'ranged':
        return this.debuffedTarget.defence_ranged;
      case 'magic':
        return this.debuffedTarget.defence_magic;
    }
    return undefined;
  }

  get attackType() {
    return this.loadout.stance.attack_type;
  }

  get attackSpeed() {
    let result = this.loadout.weapon.attackSpeed;
    if (this.transformers.has('attackSpeed')) {
      for (const fn of this.transformers.get('attackSpeed')) {
        if (typeof fn === 'function') {
          result = fn.call(undefined, result, this);
        }
      }
    }
    if (this.modifiers.has('attackSpeed')) {
      for (const value of this.modifiers.get('attackSpeed')) {
        result = Math.ceil(result * value);
      }
    }
    return result;
  }

  get attackSpeedInSeconds() {
    return this.attackSpeed * this.tickSpeed;
  }

  get spell() {
    return this.loadout.spell;
  }

  get effects() {
    const result = [];

    result.push(...[PassiveEffect, StancePassive, PassiveEffectMagic]);

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
      result.push(
        ...[...EffectDirectory.sets.values()]
          .filter((itemEffect) => itemEffect.check(this)),
      );
    }

    if (this.loadout.settings) {
      result.push(...EffectDirectory.convertSettingsToEffects(this.loadout.settings));
    }

    if (this.target) {
      result.push(
        ...[...EffectDirectory.targets.values()]
          .filter((targetEffect) => targetEffect.check(this)),
      );
    }

    return result;
  }
}
