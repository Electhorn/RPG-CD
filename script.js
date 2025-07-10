document.addEventListener("DOMContentLoaded", () => {
  new Game();
});

class Game {
  constructor() {
    // --- 1. Selectores del DOM ---
    this.button1 = document.querySelector("#button1");
    this.button2 = document.querySelector("#button2");
    this.button3 = document.querySelector("#button3");
    this.text = document.querySelector("#text");
    this.xpText = document.querySelector("#xpText");
    this.healthText = document.querySelector("#healthText");
    this.goldText = document.querySelector("#goldText");
    this.monsterStats = document.querySelector("#monsterStats");
    this.monsterName = document.querySelector("#monsterName");
    this.monsterHealthText = document.querySelector("#monsterHealth");
    this.inventoryDiv = document.querySelector("#inventory");

    // --- 2. Configuración y Datos Estáticos ---
    this.gameConfig = {
      healthCost: 10,
      weaponCost: 30,
      sellWeaponValue: 15,
      monsterGoldMultiplier: 6.7,
      healthPurchaseAmount: 10,
      baseMissChance: 0.2,
      guaranteedHitHealthThreshold: 20,
      easterEggWinGold: 20,
      easterEggLoseHealth: 10,
      breakWeaponChance: 0.05,
    };

    this.weapons = [
      { name: "palo", power: 5 },
      { name: "daga", power: 30 },
      { name: "martillo de garra", power: 50 },
      { name: "espada", power: 100 },
    ];

    this.monsters = [
      { name: "limo", level: 2, health: 15 },
      { name: "bestia con colmillos", level: 8, health: 60 },
      { name: "dragón", level: 20, health: 300 },
    ];

    // CAMBIO CLAVE #1: textStrings ahora es 100% estático. No más funciones aquí.
    this.textStrings = {
      locations: {
        start: {
          text: "Bienvenido/a a Caza Dragones. Debes derrotar al dragón que impide que la gente abandone el pueblo. Estás en la plaza del pueblo. ¿A dónde quieres ir? Usa los botones de arriba.",
          buttons: ["¡Comenzar aventura!"],
        },
        townSquare: {
          text: 'Estás en la plaza del pueblo. Ves un letrero que dice "Tienda".',
          buttons: [
            "Ir a la tienda",
            "Ir a la cueva",
            "Luchar contra el dragón",
          ],
        },
        store: { text: "Entras en la tienda." },
        cave: {
          text: "Entras en la cueva. Ves algunos monstruos.",
          buttons: [
            "Luchar contra limo",
            "Luchar contra bestia con colmillos",
            "Volver a la plaza",
          ],
        },
        fight: {
          text: "Estás luchando contra un monstruo.",
          buttons: ["Atacar", "Esquivar", "Huir"],
        },
        killMonster: {
          text: 'El monstruo grita "¡Arg!" al morir. Ganas puntos de experiencia y encuentras oro.',
          buttons: [
            "Volver a la plaza",
            "Volver a la plaza",
            "Volver a la plaza",
          ],
        },
        lose: {
          text: "Mueres. ☠",
          buttons: ["¿JUGAR DE NUEVO?", "¿JUGAR DE NUEVO?", "¿JUGAR DE NUEVO?"],
        },
        win: {
          text: "¡Derrotaste al dragón! ¡GANASTE EL JUEGO! 🎊",
          buttons: ["¿JUGAR DE NUEVO?", "¿JUGAR DE NUEVO?", "¿JUGAR DE NUEVO?"],
        },
        easterEgg: {
          text: "Encuentras un juego secreto. Elige un número. Se elegirán diez números al azar entre 0 y 10. Si tu número coincide con uno de los números aleatorios, ¡ganas!",
          buttons: ["2", "8", "¿Volver a la plaza?"],
        },
      },
      gameMessages: {
        attack: "El/La {0} ataca. Lo atacas con tu {1}.",
        miss: " Fallas.",
        weaponBreak: " Tu {0} se rompe.",
        dodge: "Esquivas el ataque de {0}.",
        notEnoughGold: "No tienes suficiente oro para comprar vida.",
        notEnoughGoldWeapon: "No tienes suficiente oro para comprar un arma.",
        mostPowerfulWeapon: "¡Ya tienes el arma más poderosa!",
        boughtWeapon: "Ahora tienes un(a) {0}. En tu inventario tienes: {1}.",
        soldWeapon: "Vendiste un(a) {0}. En tu inventario tienes: {1}.",
        dontSellWeapon: "¡No vendas tu única arma!",
        boughtHealth: "Compraste {0} de vida.",
        pickResult: "Elegiste {0}. Aquí están los números aleatorios:\n{1}",
        pickWin: "¡Correcto! Ganas {0} de oro.",
        pickLose: "¡Incorrecto! Pierdes {0} de vida.",
      },
    };

    // --- 3. Estado Inicial del Juego ---
    this.initializeState();

    // --- 4. Definición de Escenas (Locations) ---
    // Este es el "cerebro" que conecta la lógica a la UI.
    this.locations = this.setupLocations();

    // --- 5. Inicio del Juego ---
    this.init();
  }

  // --- MÉTODOS DE CONFIGURACIÓN Y ESTADO ---

  initializeState() {
    this.showSellWeapon = false;
    this.gameState = { currentMonsterIndex: null, monsterHealth: 0 };
    this.player = {
      xp: 0,
      health: 100,
      gold: 50,
      inventory: [this.weapons[0]],
      // CAMBIO CLAVE #2: Se restaura el método reset en el player para una mejor organización.
      reset: () => {
        this.player.xp = 0;
        this.player.health = 100;
        this.player.gold = 50;
        this.player.inventory = [this.weapons[0]];
      },
    };
  }

  setupLocations() {
    // CAMBIO CLAVE #3: La lógica para generar textos de botones está aquí,
    // donde 'this' se refiere correctamente a la instancia de Game.
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
          () => this.goFight(2),
        ],
        getText: () => this.textStrings.locations.townSquare.text,
      },
      store: {
        getButtonText: () => {
          const buyHealthText = `Comprar ${this.gameConfig.healthPurchaseAmount} de vida (${this.gameConfig.healthCost} oro)`;
          if (this.showSellWeapon) {
            const sellWeaponText =
              this.player.inventory.length > 1
                ? `Vender arma por ${this.gameConfig.sellWeaponValue} oro`
                : "Nada que vender";
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
          () => this.goFight(0),
          () => this.goFight(1),
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
    this.updateStatsUI();
    this.updateInventoryUI();
    this.goStart();
  }

  // --- MÉTODOS DE ACTUALIZACIÓN DE UI --- (Sin cambios significativos, solo usando 'this')
  // (Incluyo el resto del código para que sea una solución completa)

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

    this.text.innerHTML = location.getText(); // innerHTML se mantiene por si el texto tiene saltos de línea \n
  }

  // ... el resto de métodos (goTown, attack, etc.) van aquí sin cambios
  // a excepción de llamar a this.player.reset() en restart().

  goTown() {
    this.update(this.locations.townSquare);
  }
  goStore() {
    this.showSellWeapon = false;
    this.update(this.locations.store);
  }
  goCave() {
    this.update(this.locations.cave);
  }
  goFight(monsterIndex) {
    this.gameState.currentMonsterIndex = monsterIndex;
    const currentMonster = this.monsters[this.gameState.currentMonsterIndex];
    this.gameState.monsterHealth = currentMonster.health;
    this.monsterStats.classList.add("visible");
    this.monsterName.innerText = currentMonster.name;
    this.monsterHealthText.innerText = this.gameState.monsterHealth;
    this.update(this.locations.fight);
  }
  easterEgg() {
    this.update(this.locations.easterEgg);
  }
  goStart() {
    this.update(this.locations.start);
  }

  updateStatsUI() {
    this.xpText.innerText = this.player.xp;
    this.healthText.innerText = this.player.health;
    this.goldText.innerText = this.player.gold;
  }
  updateAllUI() {
    this.updateStatsUI();
    if (this.gameState.monsterHealth > 0) {
      this.monsterHealthText.innerText = this.gameState.monsterHealth;
    }
  }
  updateInventoryUI() {
    /* sin cambios, pero es un método de la clase */
    this.inventoryDiv.innerHTML = "<h4>Inventario</h4>";
    if (this.player.inventory.length === 0) {
      const emptyText = document.createElement("div");
      emptyText.innerText = "(Vacío)";
      this.inventoryDiv.appendChild(emptyText);
    } else {
      this.player.inventory.forEach((weapon) => {
        const weaponEl = document.createElement("div");
        weaponEl.innerText = weapon.name;
        this.inventoryDiv.appendChild(weaponEl);
      });
    }
  }

  buyHealthAction() {
    if (this.player.gold >= this.gameConfig.healthCost) {
      this.player.gold -= this.gameConfig.healthCost;
      this.player.health += this.gameConfig.healthPurchaseAmount;
      this.text.innerText = this.formatString(
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
        this.text.innerText = this.formatString(
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
      this.text.innerText = this.formatString(
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
    const currentMonster = this.monsters[this.gameState.currentMonsterIndex];
    const playerWeapon =
      this.player.inventory[this.player.inventory.length - 1];
    let message = this.formatString(
      this.textStrings.gameMessages.attack,
      currentMonster.name,
      playerWeapon.name
    );
    this.player.health -= this.calculateMonsterDamage(currentMonster.level);
    this.flashDamage(this.healthText);
    if (this.isMonsterHit()) {
      const damageDealt =
        playerWeapon.power + Math.floor(Math.random() * this.player.xp) + 1;
      this.gameState.monsterHealth -= damageDealt;
      this.flashDamage(this.monsterHealthText);
    } else {
      message += this.textStrings.gameMessages.miss;
    }
    if (
      Math.random() <= this.gameConfig.breakWeaponChance &&
      this.player.inventory.length > 1
    ) {
      const brokenWeapon = this.player.inventory.pop();
      message += this.formatString(
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
    const monster = this.monsters[this.gameState.currentMonsterIndex];
    this.text.innerText = this.formatString(
      this.textStrings.gameMessages.dodge,
      monster.name
    );
  }

  calculateMonsterDamage(level) {
    return Math.max(0, level * 5 - Math.floor(Math.random() * this.player.xp));
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
      this.monsters[this.gameState.currentMonsterIndex].name === "dragón"
        ? this.winGame()
        : this.defeatMonster();
    }
  }

  defeatMonster() {
    const monster = this.monsters[this.gameState.currentMonsterIndex];
    this.player.gold += Math.floor(
      monster.level * this.gameConfig.monsterGoldMultiplier
    );
    this.player.xp += monster.level;
    this.updateStatsUI();
    this.flashStat(this.goldText, "gold-gain");
    this.flashStat(this.xpText, "xp-gain");
    this.update(this.locations.killMonster);
  }

  lose() {
    this.update(this.locations.lose);
  }
  winGame() {
    this.update(this.locations.win);
  }

  restart() {
    this.player.reset(); // Usamos el método limpio de reset.
    this.showSellWeapon = false;
    this.updateStatsUI();
    this.updateInventoryUI();
    this.goTown();
  }

  pick(guess) {
    const numbers = [];
    while (numbers.length < 10) {
      numbers.push(Math.floor(Math.random() * 11));
    }
    let message = this.formatString(
      this.textStrings.gameMessages.pickResult,
      guess,
      numbers.join("\n")
    );
    if (numbers.includes(guess)) {
      message +=
        "\n" +
        this.formatString(
          this.textStrings.gameMessages.pickWin,
          this.gameConfig.easterEggWinGold
        );
      this.player.gold += this.gameConfig.easterEggWinGold;
    } else {
      message +=
        "\n" +
        this.formatString(
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
  formatString(str, ...args) {
    return str.replace(/{(\d+)}/g, (match, number) => {
      return typeof args[number] !== "undefined" ? args[number] : match;
    });
  }
  flashDamage(element) {
    element.classList.add("damage-taken");
    setTimeout(() => element.classList.remove("damage-taken"), 500);
  }
  flashStat(element, className) {
    element.parentElement.classList.add(className);
    setTimeout(() => element.parentElement.classList.remove(className), 600);
  }
}
