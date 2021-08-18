export default class Calculation {
  tickSpeed = 0.6;

  /**
   * What type of dps is being calculated
   * @type 'meleeDps' | 'rangedDps' | 'magicDps'
   */
  dpsType = 'meleeDps';

  loadout;

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

  calculate() {
    this.bonuses = { ...this.loadout.bonuses };
    this.skills = { ...this.loadout.skills };
    this.target = { ...this.target };
    this.loadout.boosts
      .sort((a, b) => b.priority - a.priority)
      .forEach((boost) => {
        boost.active = boost.apply(this);
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
    const { attackRoll, defenceRoll } = this;
    if (attackRoll > defenceRoll) {
      return 1 - ((defenceRoll + 2) / (2 * attackRoll + 1));
    }
    return attackRoll / (2 * defenceRoll + 1);
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
      case 'meleeDps':
        result = this.loadout.skills.strength;
        break;
      case 'rangedDps':
        result = this.loadout.skills.ranged;
        break;
      case 'magicDps':
        result = this.loadout.skills.magic;
        break;
    }
    return result + this.effectiveStrengthBonus;
  }

  get strengthBonus() {
    switch (this.dpsType) {
      case 'meleeDps': return this.loadout.bonuses.melee_strength;
      case 'rangedDps': return this.loadout.bonuses.ranged_strength;
      case 'magicDps': return this.loadout.bonuses.magic_damage;
    }
    return undefined;
  }

  get effectiveAttack() {
    let result;
    switch (this.dpsType) {
      case 'meleeDps':
        result = this.loadout.skills.attack;
        break;
      case 'rangedDps':
        result = this.loadout.skills.ranged;
        break;
      case 'magicDps':
        result = this.loadout.skills.magic;
        break;
    }
    return result + this.effectiveAttackBonus;
  }

  get attackBonus() {
    switch (this.dpsType) {
      case 'meleeDps': return this.loadout.bonuses[`attack_${this.attackType}`];
      case 'rangedDps': return this.loadout.bonuses.attack_ranged;
      case 'magicDps': return this.loadout.bonuses.attack_magic;
    }
    return undefined;
  }

  get targetDefence() {
    switch (this.dpsType) {
      case 'meleeDps': return this.target.defence_level;
      case 'rangedDps': return this.target.defence_level;
      case 'magicDps': return this.target.magic_level;
    }
    return undefined;
  }

  get targetDefenceBonus() {
    switch (this.dpsType) {
      case 'meleeDps': return this.target[`defence_${this.attackType}`];
      case 'rangedDps': return this.target.defence_ranged;
      case 'magicDps': return this.target.defence_magic;
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
}
