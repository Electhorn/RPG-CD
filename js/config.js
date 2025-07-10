export const gameConfig = {
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

export const weapons = [
  { name: "palo", power: 5 },
  { name: "daga", power: 30 },
  { name: "martillo de garra", power: 50 },
  { name: "espada", power: 100 },
];

export const monsters = [
  { name: "limo", level: 2, health: 15 },
  { name: "bestia con colmillos", level: 8, health: 60 },
  { name: "dragón", level: 20, health: 300 },
];

export const textStrings = {
  locations: {
    start: {
      text: "Bienvenido/a a Caza Dragones. Debes derrotar al dragón que impide que la gente abandone el pueblo. Estás en la plaza del pueblo. ¿A dónde quieres ir? Usa los botones de arriba.",
      buttons: ["¡Comenzar aventura!"],
    },
    townSquare: {
      text: 'Estás en la plaza del pueblo. Ves un letrero que dice "Tienda".',
      buttons: ["Ir a la tienda", "Ir a la cueva", "Luchar contra el dragón"],
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
      buttons: ["Volver a la plaza", "Volver a la plaza", "Volver a la plaza"],
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
