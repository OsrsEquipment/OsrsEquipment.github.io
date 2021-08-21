import Settings from './Settings';
import PassiveEffect from './effects/PassiveEffect';
import StancePassive from './effects/StancePassive';
import Equipment from './Equipment';
import EffectDirectory from './EffectDirectory';

export default class Loadout {
  uuid;

  name;

  description;

  dateAdded;

  dateUpdated;

  constructor({
    uuid,
    name,
    description,
    dateAdded,
    dateUpdated,
    skills,
    equipment,
    stance,
    spell,
    prayers,
    potions,
    settings,
  }) {
    this.uuid = uuid;
    this.name = name;
    this.description = description;
    this.dateAdded = dateAdded;
    this.dateUpdated = dateUpdated;
    this.skills = skills;
    this.equipment = new Equipment(equipment);
    this.stance = stance;
    this.spell = spell;
    this.prayers = prayers;
    this.potions = potions;
    this.settings = settings ?? new Settings();
  }

  get bonuses() {
    return this.equipment.bonuses;
  }

  get effects() {
    const result = [PassiveEffect, StancePassive];

    if (this.potions) {
      result.push(
        ...this.potions
          .map((potion) => EffectDirectory.potions.get(potion)),
      );
    }

    if (this.prayers) {
      result.push(
        ...this.prayers
          .filter((prayer) => EffectDirectory.prayers.get(prayer))
          .map((prayer) => EffectDirectory.prayers.get(prayer)),
      );
    }

    return result;
  }

  get weapon() {
    return this.equipment.weapon;
  }
}
