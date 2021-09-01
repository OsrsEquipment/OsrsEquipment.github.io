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
  BlackMask,
  BrimstoneRing,
  ChaosGauntlets,
  CrawsBow,
  DarkBow,
  DragonHunterCrossbow,
  DragonHunterLance,
  HarmonisedNightmareStaff,
  Keris,
  LeafBladedBattleaxe,
  PoweredStaves,
  SalveAmulet,
  ScytheOfVitur,
  SmokeBattlestaff,
  ThammaronsSceptre,
  TomeOfFire,
  TomeOfWater,
  TwistedBow,
  ViggorasChainmace,
} from './effects/items';
import {
  AhrimsSet,
  CrystalArmour,
  DharoksSet, InquisitorsArmour, KarilsSet, ObsidianArmour, VeracsSet, VoidSet,
} from './effects/sets';
import {
  AbyssalBludgeonSpecial,
  AbyssalDaggerSpecial,
  AbyssalWhipSpecial,
  DiamondBoltsEnchanted,
  DragonClawsSpecial,
  DragonDaggerSpecial,
  DragonHalberdSpecial,
  DragonHastaSpecial,
  DragonLongswordSpecial,
  DragonMaceSpecial, DragonScimitarSpecial,
  DragonstoneBoltsEnchanted, DragonSwordSpecial, DragonWarhammerSpecial,
  OnyxBoltsEnchanted,
  OpalBoltsEnchanted,
  PearlBoltsEnchanted,
  RubyBoltsEnchanted,
  StatiusWarhammerSpecial,
  VestasLongswordSpecial,
} from './effects/specials';
import { CorporealBeast, NylocasMatomenos, Zulrah } from './effects/target';
import {
  ArclightSpecialSetting,
  BandosGodswordSpecialSetting,
  DragonWarhammerSpecialSetting,
} from './effects/settings';

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
    [DarkBow.name, DarkBow],
  ]);

  static sets = new Map([
    [VoidSet.name, VoidSet],
    [DharoksSet.name, DharoksSet],
    [InquisitorsArmour.name, InquisitorsArmour],
    [ObsidianArmour.name, ObsidianArmour],
    [CrystalArmour.name, CrystalArmour],
    [VeracsSet.name, VeracsSet],
    [KarilsSet.name, KarilsSet],
    [AhrimsSet.name, AhrimsSet],
  ]);

  static targets = new Map([
    [Zulrah.name, Zulrah],
    [CorporealBeast.name, CorporealBeast],
    [NylocasMatomenos.name, NylocasMatomenos],
  ]);

  static specials = new Map([
    [RubyBoltsEnchanted.name, RubyBoltsEnchanted],
    [OpalBoltsEnchanted.name, OpalBoltsEnchanted],
    [PearlBoltsEnchanted.name, PearlBoltsEnchanted],
    [DiamondBoltsEnchanted.name, DiamondBoltsEnchanted],
    [DragonstoneBoltsEnchanted.name, DragonstoneBoltsEnchanted],
    [OnyxBoltsEnchanted.name, OnyxBoltsEnchanted],
    [AbyssalBludgeonSpecial.name, AbyssalBludgeonSpecial],
    [AbyssalDaggerSpecial.name, AbyssalDaggerSpecial],
    [AbyssalWhipSpecial.name, AbyssalWhipSpecial],
    [StatiusWarhammerSpecial.name, StatiusWarhammerSpecial],
    [VestasLongswordSpecial.name, VestasLongswordSpecial],
    [DragonClawsSpecial.name, DragonClawsSpecial],
    [DragonDaggerSpecial.name, DragonDaggerSpecial],
    [DragonHalberdSpecial.name, DragonHalberdSpecial],
    [DragonHastaSpecial.name, DragonHastaSpecial],
    [DragonLongswordSpecial.name, DragonLongswordSpecial],
    [DragonMaceSpecial.name, DragonMaceSpecial],
    [DragonScimitarSpecial.name, DragonScimitarSpecial],
    [DragonSwordSpecial.name, DragonSwordSpecial],
    [DragonWarhammerSpecial.name, DragonWarhammerSpecial],
  ]);

  static convertSettingsToEffects(settings) {
    const result = [];
    if (settings.arclightSpecials && settings.arclightSpecials > 0) {
      result.push(ArclightSpecialSetting);
    }
    if (settings.dwhSpecials && settings.dwhSpecials > 0) {
      result.push(DragonWarhammerSpecialSetting);
    }
    if (settings.bgsSpecialDamage && settings.bgsSpecialDamage > 0) {
      result.push(BandosGodswordSpecialSetting);
    }
    return result;
  }
}
