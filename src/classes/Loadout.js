import Equipment from './Equipment';

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
    this.settings = settings;
  }

  get bonuses() {
    return this.equipment.bonuses;
  }

  get weapon() {
    return this.equipment.weapon;
  }
}
