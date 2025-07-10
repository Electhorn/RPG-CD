import {
  gameConfig,
  weapons,
  monsters,
  caveMonsters,
  textStrings,
} from "./config.js";
import { Player } from "./player.js";
import { updateStatsUI, updateInventoryUI } from "./ui.js";
import { formatString, flashDamage, flashStat } from "./utils.js";

export class Game {
  constructor() {
    this.button1 = document.querySelector("#button1");
    this.button2 = document.querySelector("#button2");
    this.button3 = document.querySelector("#button3");

    this.text = document.querySelector("#text");
    this.xpText = document.querySelector("#xpText");
    this.healthText = document.querySelector("#healthText");
    this.goldText = document.querySelector("#goldText");

    this.monsterStats = document.querySelector("#monsterStats");
    this.monsterName = document.querySelector("#monsterName");
    this.monsterLevel = document.querySelector("#monsterLevel");
    this.monsterHealthText = document.querySelector("#monsterHealth");

    this.inventoryDiv = document.querySelector("#inventory");

    this.gameConfig = gameConfig;
    this.weapons = weapons;
    this.monsters = monsters;
    this.caveMonsters = caveMonsters;
    this.textStrings = textStrings;

    this.initializeState();

    this.locations = this.setupLocations();

    this.init();
  }

  initializeState() {
    this.showSellWeapon = false;

    this.gameState = { currentMonster: null, monsterHealth: 0 };
    this.player = new Player();
  }

  setupLocations() {
    return {
      start: {
        getButtonText: () => this.textStrings.locations.start.buttons,
        buttonFunctions: [() => this.goTown()],
        getText: () => this.textStrings.locations.start.text,
      },
      townSquare: {
        getButtonText: () => this.textStrings.locations.townSquare.buttons,
        buttonFunctions: [
          () => this.goStore(),
          () => this.goCave(),
          () => this.goFight(this.monsters[0]),
        ],
        getText: () => this.textStrings.locations.townSquare.text,
      },
      store: {
        getButtonText: () => {
          const buyHealthText = `Comprar ${this.gameConfig.healthPurchaseAmount} de vida (${this.gameConfig.healthCost} oro)`;
          if (this.showSellWeapon && this.player.inventory.length > 1) {
            const sellWeaponText = `Vender arma por ${this.gameConfig.sellWeaponValue} oro`;
            return [buyHealthText, sellWeaponText, "Volver a la plaza"];
          } else if (
            this.showSellWeapon &&
            this.player.inventory.length === 1
          ) {
            const sellWeaponText = "Nada que vender";
            return [buyHealthText, sellWeaponText, "Volver a la plaza"];
          } else {
            return [
              buyHealthText,
              `Comprar arma (${this.gameConfig.weaponCost} oro)`,
              "Volver a la plaza",
            ];
          }
        },
        buttonFunctions: [
          () => this.buyHealthAction(),
          () => this.buyOrSellWeaponAction(),
          () => this.goTown(),
        ],
        getText: () => this.textStrings.locations.store.text,
      },
      cave: {
        getButtonText: () => this.textStrings.locations.cave.buttons,
        buttonFunctions: [
          () => this.fightRandomCaveMonster(),
          () => this.fightRandomCaveMonster(),
          () => this.goTown(),
        ],
        getText: () => this.textStrings.locations.cave.text,
      },
      fight: {
        getButtonText: () => this.textStrings.locations.fight.buttons,
        buttonFunctions: [
          () => this.attack(),
          () => this.dodge(),
          () => this.goTown(),
        ],
        getText: () => this.textStrings.locations.fight.text,
      },
      killMonster: {
        getButtonText: () => this.textStrings.locations.killMonster.buttons,
        buttonFunctions: [
          () => this.goTown(),
          () => this.goTown(),
          () => this.easterEgg(),
        ],
        getText: () => this.textStrings.locations.killMonster.text,
      },
      lose: {
        getButtonText: () => this.textStrings.locations.lose.buttons,
        buttonFunctions: [
          () => this.restart(),
          () => this.restart(),
          () => this.restart(),
        ],
        getText: () => this.textStrings.locations.lose.text,
      },
      win: {
        getButtonText: () => this.textStrings.locations.win.buttons,
        buttonFunctions: [
          () => this.restart(),
          () => this.restart(),
          () => this.restart(),
        ],
        getText: () => this.textStrings.locations.win.text,
      },
      easterEgg: {
        getButtonText: () => this.textStrings.locations.easterEgg.buttons,
        buttonFunctions: [
          () => this.pick(2),
          () => this.pick(8),
          () => this.goTown(),
        ],
        getText: () => this.textStrings.locations.easterEgg.text,
      },
    };
  }

  init() {
    updateStatsUI(this.player, this.xpText, this.healthText, this.goldText);
    updateInventoryUI(this.player, this.inventoryDiv);
    this.goStart();
  }

  update(location) {
    this.monsterStats.classList.remove("visible");
    const buttonTexts = location.getButtonText();

    this.button1.innerText = buttonTexts[0];
    this.button2.innerText = buttonTexts[1] || "";
    this.button3.innerText = buttonTexts[2] || "";

    this.button1.onclick = buttonTexts[0] ? location.buttonFunctions[0] : null;
    this.button2.onclick = buttonTexts[1] ? location.buttonFunctions[1] : null;
    this.button3.onclick = buttonTexts[2] ? location.buttonFunctions[2] : null;

    this.button1.style.display = buttonTexts[0] ? "inline-block" : "none";
    this.button2.style.display = buttonTexts[1] ? "inline-block" : "none";
    this.button3.style.display = buttonTexts[2] ? "inline-block" : "none";

    this.text.innerHTML = location.getText();
  }

  goTown() {
    this.update(this.locations.townSquare);
  }
  goStore() {
    this.update(this.locations.store);
  }
  goCave() {
    this.update(this.locations.cave);
  }

  goFight(monster) {
    this.update(this.locations.fight);
    Object.assign(this.gameState, {
      currentMonster: monster,
      monsterHealth: monster.health,
    });
    this.monsterName.innerText = monster.name;
    this.monsterLevel.innerText = monster.level;
    this.monsterHealthText.innerText = this.gameState.monsterHealth;
    this.monsterStats.classList.add("visible");
  }

  fightRandomCaveMonster() {
    const index = Math.floor(Math.random() * this.caveMonsters.length);
    const monster = this.caveMonsters[index];
    this.goFight(monster);
  }

  easterEgg() {
    this.update(this.locations.easterEgg);
  }
  goStart() {
    this.update(this.locations.start);
  }

  updateStatsUI() {
    updateStatsUI(this.player, this.xpText, this.healthText, this.goldText);
  }
  updateAllUI() {
    this.updateStatsUI();
    if (
      this.gameState.monsterHealth > 0 &&
      this.gameState.monsterHealth !== this.monsterHealthText.innerText
    ) {
      this.monsterHealthText.innerText = this.gameState.monsterHealth;
    }
  }
  updateInventoryUI() {
    updateInventoryUI(this.player, this.inventoryDiv);
  }

  buyHealthAction() {
    if (this.player.gold >= this.gameConfig.healthCost) {
      this.player.gold -= this.gameConfig.healthCost;
      this.player.health += this.gameConfig.healthPurchaseAmount;
      this.text.innerText = formatString(
        this.textStrings.gameMessages.boughtHealth,
        this.gameConfig.healthPurchaseAmount
      );
      this.updateStatsUI();
    } else {
      this.text.innerText = this.textStrings.gameMessages.notEnoughGold;
    }
  }

  buyOrSellWeaponAction() {
    this.showSellWeapon ? this.sellWeapon() : this.buyWeapon();
  }

  buyWeapon() {
    const currentBestWeapon =
      this.player.inventory[this.player.inventory.length - 1];
    const currentBestWeaponIndex = this.weapons.findIndex(
      (w) => w.name === currentBestWeapon.name
    );
    if (currentBestWeaponIndex < this.weapons.length - 1) {
      if (this.player.gold >= this.gameConfig.weaponCost) {
        this.player.gold -= this.gameConfig.weaponCost;
        const newWeapon = this.weapons[currentBestWeaponIndex + 1];
        this.player.inventory.push(newWeapon);
        const inventoryNames = this.player.inventory
          .map((w) => w.name)
          .join(", ");
        this.text.innerText = formatString(
          this.textStrings.gameMessages.boughtWeapon,
          newWeapon.name,
          inventoryNames
        );
        this.updateStatsUI();
        this.updateInventoryUI();
      } else {
        this.text.innerText = this.textStrings.gameMessages.notEnoughGoldWeapon;
      }
    } else {
      this.text.innerText = this.textStrings.gameMessages.mostPowerfulWeapon;
      this.showSellWeapon = true;
      this.update(this.locations.store);
    }
  }

  sellWeapon() {
    if (this.player.inventory.length > 1) {
      this.player.gold += this.gameConfig.sellWeaponValue;
      const soldWeapon = this.player.inventory.shift();
      const inventoryNames = this.player.inventory
        .map((w) => w.name)
        .join(", ");
      this.text.innerText = formatString(
        this.textStrings.gameMessages.soldWeapon,
        soldWeapon.name,
        inventoryNames
      );
      this.updateStatsUI();
      this.updateInventoryUI();
      if (this.player.inventory.length === 1) {
        this.update(this.locations.store);
      }
    } else {
      this.text.innerText = this.textStrings.gameMessages.dontSellWeapon;
    }
  }

  attack() {
    const currentMonster = this.gameState.currentMonster;
    const playerWeapon =
      this.player.inventory[this.player.inventory.length - 1];
    let message = formatString(
      this.textStrings.gameMessages.attack,
      currentMonster.name,
      playerWeapon.name
    );
    this.player.health -= this.calculateMonsterDamage(currentMonster.level);
    flashDamage(this.healthText);
    if (this.isMonsterHit()) {
      const damageDealt =
        playerWeapon.power + Math.floor(Math.random() * this.player.xp) + 1;
      this.gameState.monsterHealth -= damageDealt;
      flashDamage(this.monsterHealthText);
    } else {
      message += this.textStrings.gameMessages.miss;
    }
    if (
      Math.random() <= this.gameConfig.breakWeaponChance &&
      this.player.inventory.length > 1
    ) {
      const brokenWeapon = this.player.inventory.pop();
      message += formatString(
        this.textStrings.gameMessages.weaponBreak,
        brokenWeapon.name
      );
      this.updateInventoryUI();
    }
    this.text.innerText = message;
    this.updateAllUI();
    this.checkGameStatus();
  }

  dodge() {
    const monster = this.gameState.currentMonster;
    this.text.innerText = formatString(
      this.textStrings.gameMessages.dodge,
      monster.name
    );
  }

  calculateMonsterDamage() {
    const monster = this.gameState.currentMonster;
    return Math.max(
      0,
      monster.level * 5 - Math.floor(Math.random() * this.player.xp)
    );
  }
  isMonsterHit() {
    return (
      Math.random() > this.gameConfig.baseMissChance ||
      this.player.health < this.gameConfig.guaranteedHitHealthThreshold
    );
  }

  checkGameStatus() {
    if (this.player.health <= 0) {
      this.lose();
    } else if (this.gameState.monsterHealth <= 0) {
      this.gameState.currentMonster.name === "dragón"
        ? this.winGame()
        : this.defeatMonster();
    }
  }

  defeatMonster() {
    const monster = this.gameState.currentMonster;
    this.player.gold += Math.floor(
      monster.level * this.gameConfig.monsterGoldMultiplier
    );
    this.player.xp += monster.level;
    this.updateStatsUI();
    flashStat(this.goldText, "gold-gain");
    flashStat(this.xpText, "xp-gain");
    this.update(this.locations.killMonster);
  }

  lose() {
    this.update(this.locations.lose);
  }
  winGame() {
    this.update(this.locations.win);
  }

  restart() {
    this.player.reset();
    this.showSellWeapon = false;
    this.updateStatsUI();
    this.updateInventoryUI();
    this.goTown();
  }

  /**
   * Simulates a guessing game where the player picks a number and
   * compares it against a random set of numbers. If the player's
   * guess matches any of the random numbers, they win gold;
   * otherwise, they lose health. The outcome is displayed as a
   * message, and the player's stats are updated accordingly.
   *
   * @param {number} guess - The number guessed by the player.
   */

  pick(guess) {
    const numbers = [];
    while (numbers.length < 10) {
      numbers.push(Math.floor(Math.random() * 11));
    }
    let message = formatString(
      this.textStrings.gameMessages.pickResult,
      guess,
      numbers.join("\n")
    );
    if (numbers.includes(guess)) {
      message +=
        "\n" +
        formatString(
          this.textStrings.gameMessages.pickWin,
          this.gameConfig.easterEggWinGold
        );
      this.player.gold += this.gameConfig.easterEggWinGold;
    } else {
      message +=
        "\n" +
        formatString(
          this.textStrings.gameMessages.pickLose,
          this.gameConfig.easterEggLoseHealth
        );
      this.player.health -= this.gameConfig.easterEggLoseHealth;
    }
    this.text.innerText = message;
    this.updateStatsUI();
    if (this.player.health <= 0) {
      this.lose();
    }
  }
}
