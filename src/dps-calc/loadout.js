import PassiveBoost from './boosts/passive-boost';
import StanceBoost from './boosts/stance-boost';
import BoostManager from './boost.manager';

class Loadout {
  skills = {
    attack: 1,
    strength: 1,
    defence: 1,
    ranged: 1,
    prayer: 1,
    magic: 1,
    hitpoints: 1,
  };

  equipment = {
    head: undefined,
    cape: undefined,
    neck: undefined,
    ammo: undefined,
    weapon: undefined,
    shield: undefined,
    body: undefined,
    legs: undefined,
    hands: undefined,
    feet: undefined,
    ring: undefined,
  };

  bonuses = {
    attack_stab: 0,
    attack_slash: 0,
    attack_crush: 0,
    attack_magic: 0,
    attack_ranged: 0,
    defence_stab: 0,
    defence_slash: 0,
    defence_crush: 0,
    defence_magic: 0,
    defence_ranged: 0,
    melee_strength: 0,
    ranged_strength: 0,
    magic_damage: 0,
    prayer: 0,
    slayer: 1,
    undead: 1,
  };

  boosts;

  stance;

  spell;

  prayers;

  potions;

  settings;

  constructor({
    skills, equipment, stance, spell, prayers, potions, settings,
  }) {
    this.skills = skills;
    this.equipment = equipment;
    this.stance = stance;
    this.spell = spell;
    this.prayers = prayers;
    this.potions = potions;
    this.settings = settings ?? { onSlayerTask: true, inWilderness: true, currentHitpoints: 1 };
    this.calculateBonuses();
    this.calculateBoosts();
  }

  calculateBonuses() {
    if (!this.equipment) return;
    const skipBonuses = ['requirements', 'slot'];
    Object.values(this.equipment)
      .filter(Boolean)
      .forEach((item) => {
        const equipBonuses = item.equipment;
        Object.keys(equipBonuses)
          .filter((bonus) => skipBonuses.indexOf(bonus) === -1)
          .forEach((bonus) => {
            const bonusValue = equipBonuses[bonus];
            this.bonuses[bonus] += bonusValue;
          });
      });
  }

  calculateBoosts() {
    const boosts = [new PassiveBoost(), new StanceBoost()];
    boosts.push(
      ...BoostManager.getPrayerBoosts(this.prayers),
      ...BoostManager.getEquipmentBoosts(this.equipment),
      ...BoostManager.getPotionBoosts(this.potions),
      ...BoostManager.getOtherBoosts(this.settings),
    );
    this.boosts = boosts;
  }

  // get weapon() {
  //   if (this.equipment.weapon) {
  //     return this.equipment.weapon.weapon;
  //   }
  //   return undefined;
  // }
}

export default Loadout;
