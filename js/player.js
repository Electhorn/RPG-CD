import { weapons } from "./config.js";

export class Player {
  constructor() {
    this.reset();
  }
  reset() {
    this.xp = 0;
    this.health = 100;
    this.gold = 50;
    this.inventory = [weapons[0]];
  }
}
