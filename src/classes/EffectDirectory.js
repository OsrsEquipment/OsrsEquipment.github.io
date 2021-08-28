import {
  AttackPotion,
  ImbuedHeart,
  MagicPotion,
  OverloadPlusPotion,
  RangingPotion,
  StrengthPotion,
  SuperAttackPotion,
  SuperMagicPotion,
  SuperRangingPotion,
  SuperStrengthPotion,
  ZamorakBrew,
} from './effects/potions';

import {
  Augury,
  BurstOfStrength,
  Chivalry,
  ClarityOfThought,
  EagleEye,
  HawkEye,
  ImprovedReflexes,
  IncredibleReflexes,
  MysticLore,
  MysticMight,
  MysticWill,
  Piety,
  Rigour,
  SharpEye,
  SuperhumanStrength,
  UltimateStrength,
} from './effects/prayers';
import {
  Arclight,
  BerserkerNecklace,
  BlackMask, BrimstoneRing, ChaosGauntlets, CrawsBow, DragonHunterCrossbow, DragonHunterLance,
  HarmonisedNightmareStaff, Keris, LeafBladedBattleaxe,
  PoweredStaves, SalveAmulet, ScytheOfVitur, SmokeBattlestaff, ThammaronsSceptre,
  TomeOfFire, TomeOfWater,
  TwistedBow, ViggorasChainmace,
} from './effects/items';
import {
  CrystalArmour,
  DharoksSet, InquisitorsArmour, ObsidianArmour, VoidSet,
} from './effects/sets';
import { ArclightSpecial, BandosGodswordSpecial, DragonWarhammerSpecial } from './effects/specials';
import { CorporealBeast, Zulrah } from './effects/target';

export default class EffectDirectory {
  static potions = new Map([
    [AttackPotion.name, AttackPotion],
    [MagicPotion.name, MagicPotion],
    [RangingPotion.name, RangingPotion],
    [StrengthPotion.name, StrengthPotion],
    [SuperAttackPotion.name, SuperAttackPotion],
    [SuperMagicPotion.name, SuperMagicPotion],
    [SuperRangingPotion.name, SuperRangingPotion],
    [SuperStrengthPotion.name, SuperStrengthPotion],
    [ZamorakBrew.name, ZamorakBrew],
    [ImbuedHeart.name, ImbuedHeart],
    [OverloadPlusPotion.name, OverloadPlusPotion],
  ]);

  static prayers = new Map([
    [Augury.name, Augury],
    [BurstOfStrength.name, BurstOfStrength],
    [Chivalry.name, Chivalry],
    [ClarityOfThought.name, ClarityOfThought],
    [EagleEye.name, EagleEye],
    [HawkEye.name, HawkEye],
    [ImprovedReflexes.name, ImprovedReflexes],
    [IncredibleReflexes.name, IncredibleReflexes],
    [MysticLore.name, MysticLore],
    [MysticMight.name, MysticMight],
    [MysticWill.name, MysticWill],
    [Piety.name, Piety],
    [Rigour.name, Rigour],
    [SharpEye.name, SharpEye],
    [SuperhumanStrength.name, SuperhumanStrength],
    [UltimateStrength.name, UltimateStrength],
  ]);

  static items = new Map([
    [BlackMask.name, BlackMask],
    [HarmonisedNightmareStaff.name, HarmonisedNightmareStaff],
    [TomeOfFire.name, TomeOfFire],
    [Arclight.name, Arclight],
    [TwistedBow.name, TwistedBow],
    [PoweredStaves.name, PoweredStaves],
    [BerserkerNecklace.name, BerserkerNecklace],
    [BrimstoneRing.name, BrimstoneRing],
    [ChaosGauntlets.name, ChaosGauntlets],
    [CrawsBow.name, CrawsBow],
    [DragonHunterCrossbow.name, DragonHunterCrossbow],
    [DragonHunterLance.name, DragonHunterLance],
    [Keris.name, Keris],
    [LeafBladedBattleaxe.name, LeafBladedBattleaxe],
    [ScytheOfVitur.name, ScytheOfVitur],
    [SalveAmulet.name, SalveAmulet],
    [ThammaronsSceptre.name, ThammaronsSceptre],
    [ViggorasChainmace.name, ViggorasChainmace],
    [SmokeBattlestaff.name, SmokeBattlestaff],
    [TomeOfWater.name, TomeOfWater],
  ]);

  static sets = new Map([
    [VoidSet.name, VoidSet],
    [DharoksSet.name, DharoksSet],
    [InquisitorsArmour.name, InquisitorsArmour],
    [ObsidianArmour.name, ObsidianArmour],
    [CrystalArmour.name, CrystalArmour],
  ]);

  static targets = new Map([
    [Zulrah.name, Zulrah],
    [CorporealBeast.name, CorporealBeast],
  ]);

  static convertSettingsToEffects(settings) {
    const result = [];
    if (settings.arclightSpecials && settings.arclightSpecials > 0) {
      result.push(ArclightSpecial);
    }
    if (settings.dwhSpecials && settings.dwhSpecials > 0) {
      result.push(DragonWarhammerSpecial);
    }
    if (settings.bgsSpecialDamage && settings.bgsSpecialDamage > 0) {
      result.push(BandosGodswordSpecial);
    }
    return result;
  }
}
