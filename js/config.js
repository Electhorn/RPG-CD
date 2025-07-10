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
export const caveMonsters = [
  { name: "limo", level: 2, health: 15 },
  { name: "bestia con colmillos", level: 8, health: 60 },
  { name: "goblin asustadizo", level: 3, health: 20 },
  { name: "esqueleto guerrero", level: 5, health: 40 },
  { name: "trol de las cavernas", level: 10, health: 80 },
  { name: "murciélago vampiro", level: 4, health: 30 },
  { name: "araña gigante", level: 7, health: 55 },
  { name: "golem de roca", level: 12, health: 100 },
  { name: "elemental de sombra", level: 9, health: 65 },
  { name: "gusano de túnel", level: 6, health: 50 },
];
export const monsters = [{ name: "dragón", level: 20, health: 300 }];

export const textStrings = {
  locations: {
    start: {
      text: "Bienvenido/a a Caza Dragones, un mundo de fantasía donde la magia y la aventura te esperan. Debes derrotar al dragón que impide que la gente abandone el pueblo. Estás en la plaza del pueblo, rodeado de casas de piedra y techos de paja. La gente del pueblo te mira con esperanza en sus ojos. ¿A dónde quieres ir? Usa los botones de arriba.",
      buttons: ["¡Comenzar aventura!"],
    },
    townSquare: {
      text: 'Estás en la plaza del pueblo, rodeado de la vida cotidiana. Ves un letrero que dice "Tienda" en la parte superior de una casa de piedra. La tienda parece estar llena de objetos interesantes. También ves la entrada de la cueva, oscura y misteriosa. Y, por supuesto, el dragón que te espera en la distancia. ¿Qué decides hacer?',
      buttons: ["Ir a la tienda", "Ir a la cueva", "Luchar contra el dragón"],
    },
    store: {
      text: "Entras en la tienda y te rodea el olor a cuero y metal. El dueño de la tienda te saluda y te muestra sus productos. Ves armas y armaduras, pociones y objetos mágicos. ¿Qué quieres comprar?",
    },
    cave: {
      text: "Entras en la cueva y te rodea la oscuridad. La única luz proviene de unas antorchas que cuelgan de la pared. Ves dos pasadizos oscuros que se bifurcan en diferentes direcciones. Ruidos inquietantes provienen de ambas direcciones. ¿Qué camino eliges?",
      buttons: [
        "Ir por la izquierda",
        "Ir por la derecha",
        "Volver a la plaza",
      ],
    },
    fight: {
      text: "Estás luchando contra un monstruo. La batalla es intensa y el monstruo es fuerte. ¿Qué decides hacer?",
      buttons: ["Atacar", "Esquivar", "Huir"],
    },
    killMonster: {
      text: 'El monstruo grita "¡Arg!" al morir. Ganas puntos de experiencia y encuentras oro.',
      buttons: ["Volver a la plaza", "Volver a la plaza", "Volver a la plaza"],
    },
    lose: {
      text: "Mueres. ☠ Tu aventura ha terminado. Pero no te preocupes, puedes volver a empezar.",
      buttons: ["¿JUGAR DE NUEVO?", "¿JUGAR DE NUEVO?", "¿JUGAR DE NUEVO?"],
    },
    win: {
      text: "¡Derrotaste al dragón! ¡GANASTE EL JUEGO! 🎊 La gente del pueblo te aclama como un héroe. ¿Qué decides hacer ahora?",
      buttons: ["¿JUGAR DE NUEVO?", "¿JUGAR DE NUEVO?", "¿JUGAR DE NUEVO?"],
    },
    easterEgg: {
      text: "Encuentras un juego secreto. Elige un número. Se elegirán diez números al azar entre 0 y 10. Si tu número coincide con uno de los números aleatorios, ¡ganas!",
      buttons: ["2", "8", "¿Volver a la plaza?"],
    },
  },
  gameMessages: {
    attack:
      "Con un grito de batalla, te lanzas hacia el {0} con tu {1} en mano. El impacto es contundente y el monstruo se tambalea hacia atrás.",
    miss: " Tu ataque falla por poco y el {0} se aprovecha de tu error.",
    weaponBreak:
      " Tu {0} se rompe en pedazos después de un golpe especialmente fuerte.",
    dodge:
      "Con una rapidez sobrehumana, logras esquivar el ataque del {0}. Ahora es tu turno de contraatacar.",
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
