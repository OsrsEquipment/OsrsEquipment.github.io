class Dps {
  tickSpeed = 0.6;

  skills;

  equipment;

  bonuses;

  boosts;

  stance;

  spell;

  weapon;

  target;

  debuffedTarget;

  settings;

  // key: name
  // value: modifier
  damageModifiers = new Map();

  // key: name
  // value: modifier
  accuracyModifiers = new Map();

  // key: name
  // value: modifier
  averageDamageModifier = new Map();

  dpsType = 'meleeDps'; // meleeDps, rangedDps, magicDps

  effectiveStrength;

  strengthBonus;

  effectiveAttack;

  attackBonus;

  targetDefence;

  targetDefenceBonus;

  targetDefenceRollModifiers = new Map();

  constructor({
    skills, equipment, bonuses, boosts, stance, weapon, spell, settings,
  }, target) {
    this.skills = { ...skills };
    this.equipment = { ...equipment };
    this.bonuses = { ...bonuses };
    this.boosts = [...boosts];
    this.stance = stance;
    this.weapon = weapon;
    this.target = { ...target };
    this.debuffedTarget = { ...target };
    this.settings = { ...settings };
    this.spell = spell;
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
    if (this.averageDamageModifier.has(name)) {
      throw new Error(`Attempting to add ${name} average damage modifier to the list twice`);
    } else {
      this.averageDamageModifier.set(name, modifier);
    }
  }

  addTargetDefenceRollModifier(name, modifier) {
    if (this.targetDefenceRollModifiers.has(name)) {
      throw new Error(`Attempting to add ${name} target defence roll modifier to the list twice`);
    } else {
      this.targetDefenceRollModifiers.set(name, modifier);
    }
  }

  calculate() {
    this.boosts.sort((a, b) => b.priority - a.priority)
      .forEach((boost) => {
        boost.active = boost.apply({ [this.dpsType]: this });
      });

    return this;
  }

  get maxHit() {
    Object.defineProperty(this, 'maxHit', {
      value: (() => {
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
      })(),
    });
    return this.maxHit;
  }

  get attackRoll() {
    Object.defineProperty(this, 'attackRoll', {
      value: (() => {
        let result = this.effectiveAttack;
        result *= (this.attackBonus + 64);
        result *= Math.max(this.bonuses.slayer, this.bonuses.undead);
        result = Math.floor(result);
        for (const value of this.accuracyModifiers.values()) {
          result = Math.floor(result * value);
        }
        return result;
      })(),
    });
    return this.attackRoll;
  }

  get defenceRoll() {
    Object.defineProperty(this, 'defenceRoll', {
      value: (() => {
        const targetDefence = this.targetDefence + 9;
        const targetStyleDefence = this.targetDefenceBonus + 64;
        let result = targetDefence * targetStyleDefence;
        for (const value of this.targetDefenceRollModifiers.values()) {
          result = Math.floor(result * value);
        }
        return result;
      })(),
    });
    return this.defenceRoll;
  }

  get hitChance() {
    Object.defineProperty(this, 'hitChance', {
      value: (() => {
        const { attackRoll } = this;
        const { defenceRoll } = this;
        if (attackRoll > defenceRoll) {
          return 1 - ((defenceRoll + 2) / (2 * attackRoll + 1));
        }
        return attackRoll / (2 * defenceRoll + 1);
      })(),
    });
    return this.hitChance;
  }

  get averageDamage() {
    Object.defineProperty(this, 'averageDamage', {
      value: (() => {
        let avgDmg = this.maxHit * this.hitChance / 2;
        for (const value of this.averageDamageModifier.values()) {
          avgDmg *= value;
        }
        return avgDmg;
      })(),
    });
    return this.averageDamage;
  }

  get dps() {
    return this.averageDamage / this.attackSpeedInSeconds;
  }

  get attackType() {
    return this.stance.attack_type;
  }

  get attackSpeed() {
    return this.weapon ? this.weapon.attack_speed : 4;
  }

  get attackSpeedInSeconds() {
    return this.attackSpeed * this.tickSpeed;
  }
}

export default Dps;
