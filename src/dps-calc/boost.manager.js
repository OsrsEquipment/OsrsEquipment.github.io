import BurstOfStrength from './boosts/burst-of-strength';
import ClarityOfThought from './boosts/clarity-of-thought';
import SuperhumanStrength from './boosts/superhuman-strength';
import ImprovedReflexes from './boosts/improved-reflexes';
import UltimateStrength from './boosts/ultimate-strength';
import IncredibleReflexes from './boosts/incredible-reflexes';
import Chivalry from './boosts/chivalry';
import Piety from './boosts/piety';
import {
  BlackMask,
  VoidSet,
  DharoksSet,
  TwistedBow,
  PoweredStaves,
  DragonHunterCrossbow,
  DragonHunterLance,
  SalveAmulet,
  CrawsBow,
  ViggorasChainmace,
  ThammaronsSceptre,
  Arclight,
  Keris,
  LeafBladedBattleaxe,
  ChaosGauntlets,
  BerserkerNecklace,
  BrimstoneRing,
  InquisitorsArmour,
  ObsidianArmour,
  ScytheOfVitur,
} from './item-effects';

import {
  StrengthPotion,
  SuperStrengthPotion,
  OverloadPlus,
  AttackPotion,
  SuperAttackPotion,
  ZamorakBrew,
  MagicPotion,
  ImbuedHeart,
  SuperMagicPotion,
  RangingPotion,
  SuperRangingPotion,
  SharpEye,
  HawkEye,
  EagleEye,
  Rigour,
  MysticWill,
  MysticLore,
  MysticMight,
  Augury,
  BgsSpec,
  DwhSpec,
  ArclightSpec,
} from './boosts';

class BoostManager {
  static itemEffects = new Map([
    [BlackMask.name, BlackMask],
    [VoidSet.name, VoidSet],
    [DharoksSet.name, DharoksSet],
    [TwistedBow.name, TwistedBow],
    [PoweredStaves.name, PoweredStaves],
    [DragonHunterCrossbow.name, DragonHunterCrossbow],
    [DragonHunterLance.name, DragonHunterLance],
    [SalveAmulet.name, SalveAmulet],
    [CrawsBow.name, CrawsBow],
    [ViggorasChainmace.name, ViggorasChainmace],
    [ThammaronsSceptre.name, ThammaronsSceptre],
    [Arclight.name, Arclight],
    [Keris.name, Keris],
    [LeafBladedBattleaxe.name, LeafBladedBattleaxe],
    [ChaosGauntlets.name, ChaosGauntlets],
    [BerserkerNecklace.name, BerserkerNecklace],
    [BrimstoneRing.name, BrimstoneRing],
    [InquisitorsArmour.name, InquisitorsArmour],
    [ObsidianArmour.name, ObsidianArmour],
    [ScytheOfVitur.name, ScytheOfVitur],
  ]);

  static potions = new Map([
    ['Strength potion', new StrengthPotion()],
    ['Super strength potion', new SuperStrengthPotion()],
    ['Attack potion', new AttackPotion()],
    ['Super attack potion', new SuperAttackPotion()],
    ['Zamorak brew', new ZamorakBrew()],
    ['Magic potion', new MagicPotion()],
    ['Super magic potion', new SuperMagicPotion()],
    ['Imbued heart', new ImbuedHeart()],
    ['Ranging potion', new RangingPotion()],
    ['Super ranging potion', new SuperRangingPotion()],
    ['Overload (+)', new OverloadPlus()],
  ]);

  static prayers = new Map([
    ['Burst of Strength', new BurstOfStrength()],
    ['Clarity of Thought', new ClarityOfThought()],
    ['Superhuman Strength', new SuperhumanStrength()],
    ['Improved Reflexes', new ImprovedReflexes()],
    ['Ultimate Strength', new UltimateStrength()],
    ['Incredible Reflexes', new IncredibleReflexes()],
    ['Chivalry', new Chivalry()],
    ['Piety', new Piety()],
    ['Sharp Eye', new SharpEye()],
    ['Hawk Eye', new HawkEye()],
    ['Eagle Eye', new EagleEye()],
    ['Rigour', new Rigour()],
    ['Mystic Will', new MysticWill()],
    ['Mystic Lore', new MysticLore()],
    ['Mystic Might', new MysticMight()],
    ['Augury', new Augury()],
  ]);

  /**
   * Pass an array of active prayers get back their boost classes
   *
   * @param activePrayers - an array of strings
   * @returns {*[]|*}
   */
  static getPrayerBoosts(activePrayers) {
    if (activePrayers && Array.isArray(activePrayers) && activePrayers.length > 0) {
      return activePrayers.map((prayer) => BoostManager.prayers.get(prayer)).filter(Boolean);
    }
    return [];
  }

  static getEquipmentBoosts(equipment) {
    if (!equipment) return [];
    const boosts = [];
    BoostManager
      .itemEffects
      .forEach((itemEffect, name) => {
        if (itemEffect.check(equipment)) {
          boosts.push(itemEffect.boost(equipment));
          console.log(`${name} active`);
        }
      });
    return boosts;
  }

  static getPotionBoosts(potions) {
    if (potions && Array.isArray(potions) && potions.length > 0) {
      return potions.map((potion) => BoostManager.potions.get(potion)).filter(Boolean);
    }
    return [];
  }

  static getOtherBoosts(settings) {
    if (!settings) return [];
    const otherBoosts = [];
    if (settings.dwhSpecials > 0) {
      otherBoosts.push(new DwhSpec(settings.dwhSpecials));
    }
    if (settings.arclightSpecials > 0) {
      otherBoosts.push(new ArclightSpec(settings.arclightSpecials));
    }
    if (settings.bgsSpecialDamage > 0) {
      otherBoosts.push(new BgsSpec(settings.bgsSpecialDamage));
    }
    return otherBoosts;
  }
}

export default BoostManager;
