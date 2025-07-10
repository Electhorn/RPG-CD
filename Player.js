import { weapons } from "./GameConfig.js";

class Player {
  constructor() {
    this.xp = 0;
    this.health = 100;
    this.gold = 50;
    this.inventory = [weapons[0]];
  }

  reset() {
    this.xp = 0;
    this.health = 100;
    this.gold = 50;
    this.inventory = [weapons[0]];
  }
}

export default Player;
