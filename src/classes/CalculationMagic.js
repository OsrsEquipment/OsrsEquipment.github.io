import Calculation from './Calculation';

export default class CalculationMagic extends Calculation {
  dpsType = 'magic';

  magicDamageBonus = 0;

  maxHitBonus = 0;

  get maxHit() {
    let max;
    if (this.spell) {
      max = this.spellMaxHit;
    } else if (this.isSalamander()) {
      max = this.salamanderMaxHit;
    }

    max += this.maxHitBonus;
    max += Math.floor(max * this.bonusMagicDamage);
    max += Math.floor(max * this.targetSpecificBonus);

    for (const value of this.damageModifiers.values()) {
      max = Math.floor(max * value);
    }

    return max;
  }

  get spellMaxHit() {
    let max = 0;
    if (this.isStandardSpell() || this.isAncientSpell()) {
      max = this.spell.baseMaxHit;
      if (this.isGodSpell() && this.isCharged()) {
        max += 10;
      }
      if (this.isMagicDart()) {
        if (this.isEnchantedSlayerStaff()) {
          max = Math.floor(this.effectiveStrength * (1 / 6)) + 13;
        } else {
          max = Math.floor(this.effectiveStrength * 0.1) + 10;
        }
      }
      if (this.isPowered()) {
        max = this.spell.baseMaxHit;
        max += Math.max(0, (this.effectiveStrength - 75) / 3);
      }
    }
    return max;
  }

  get salamanderMaxHit() {
    let bonus;
    switch (this.salamanderColor) {
      case 'swamp':
        bonus = 56;
        break;
      case 'orange':
        bonus = 59;
        break;
      case 'red':
        bonus = 77;
        break;
      case 'black':
        bonus = 92;
        break;
    }
    console.log(this.effectiveAttackLevel);
    return Math.floor(0.5 + this.effectiveAttackLevel * (64 + bonus) / 640);
  }

  isSalamander() {
    return /^(Swamp|Orange|Red|Black)\s(salamander|lizard)$/.test(this.loadout.weapon.name);
  }

  isStandardSpell() {
    return this.spell.attributes.includes('standard');
  }

  isAncientSpell() {
    return this.spell.attributes.includes('ancients');
  }

  isGodSpell() {
    return this.spell.attributes.includes('god');
  }

  isCharged() {
    return this.settings.isCharged;
  }

  isPowered() {
    return this.spell.attributes.includes('powered');
  }

  isMagicDart() {
    return this.spell.name === 'Magic dart';
  }

  isEnchantedSlayerStaff() {
    return /Slayer's staff \(e\)/.test(this.loadout.weapon.name);
  }

  get salamanderColor() {
    const sallyName = this.loadout.weapon.name;
    return sallyName.split(' ')[0].toLowerCase();
  }

  get attackSpeed() {
    let baseAttackSpeed = 5;
    if (this.spell) {
      baseAttackSpeed = this.spell.castSpeed;
    }
    for (const value of this.attackSpeedReductions.values()) {
      baseAttackSpeed -= value;
    }
    for (const value of this.attackSpeedModifiers.values()) {
      baseAttackSpeed = Math.ceil(baseAttackSpeed * value);
    }
    return baseAttackSpeed;
  }

  get bonusMagicDamage() {
    return (this.strengthBonus + this.magicDamageBonus) / 100;
  }

  get targetSpecificBonus() {
    return Math.max(this.bonuses.undead, this.bonuses.slayer) - 1;
  }
}
