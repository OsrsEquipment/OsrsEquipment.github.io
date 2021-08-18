export default class Settings {
  constructor(settings = {
    onSlayerTask: true,
    inWilderness: true,
    currentHitpoints: 1,
  }) {
    this.settings = settings;
  }
}
