import Settings from './Settings';

export default class Loadout {
  uuid;

  name;

  description;

  dateAdded;

  dateUpdated;

  constructor({
    skills, equipment, stance, spell, prayers, potions, settings,
  }) {
    this.skills = skills;
    this.equipment = equipment;
    this.stance = stance;
    this.spell = spell;
    this.prayers = prayers;
    this.potions = potions;
    this.settings = settings ?? new Settings();
  }

  get bonuses() {
    return this.equipment.bonuses;
  }

  get boosts() {
    return [];
  }

  get weapon() {
    return this.equipment.weapon;
  }
}
