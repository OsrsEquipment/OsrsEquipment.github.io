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
  BlackMask, BrimstoneRing, ChaosGauntlets,
  HarmonisedNightmareStaff,
  PoweredStaves,
  TomeOfFire,
  TwistedBow,
} from './effects/items';
import { VoidSet } from './effects/sets';

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
  ]);

  static sets = new Map([
    [VoidSet.name, VoidSet],
  ]);
}
