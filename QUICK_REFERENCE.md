# RPG - Caza Dragones Quick Reference

## Method Reference

### Navigation
```javascript
game.goTown()        // → Town square
game.goStore()       // → Shop
game.goCave()        // → Monster cave
game.goFight(index)  // → Combat (index: 0=slime, 1=beast, 2=dragon)
game.easterEgg()     // → Secret game
game.goStart()       // → Start screen
```

### Combat
```javascript
game.attack()        // Attack current monster
game.dodge()         // Dodge (no damage taken)
```

### Shop Actions
```javascript
game.buyHealthAction()      // Buy 10 health for 10 gold
game.buyWeapon()           // Buy next weapon for 30 gold
game.sellWeapon()          // Sell oldest weapon for 15 gold
```

### Game Management
```javascript
game.restart()             // Reset to initial state
game.pick(2)              // Easter egg: pick number 2
game.pick(8)              // Easter egg: pick number 8
```

### UI Updates
```javascript
game.updateStatsUI()       // Refresh player stats
game.updateInventoryUI()   // Refresh inventory
game.updateAllUI()         // Refresh all displays
```

### Visual Effects
```javascript
game.flashDamage(element)              // Red damage flash
game.flashStat(element, 'gold-gain')   // Gold gain effect
game.flashStat(element, 'xp-gain')     // XP gain effect
```

## Data Access

### Player Stats
```javascript
game.player.xp           // Experience points
game.player.health       // Current health
game.player.gold         // Current gold
game.player.inventory    // Weapon array
```

### Game Configuration
```javascript
game.gameConfig.healthCost        // 10 (gold per health)
game.gameConfig.weaponCost        // 30 (gold per weapon)
game.gameConfig.sellWeaponValue   // 15 (gold from selling)
```

### Game Data
```javascript
game.weapons[0]   // { name: "palo", power: 5 }
game.weapons[1]   // { name: "daga", power: 30 }
game.weapons[2]   // { name: "martillo de garra", power: 50 }
game.weapons[3]   // { name: "espada", power: 100 }

game.monsters[0]  // { name: "limo", level: 2, health: 15 }
game.monsters[1]  // { name: "bestia con colmillos", level: 8, health: 60 }
game.monsters[2]  // { name: "dragón", level: 20, health: 300 }
```

## Common Usage Patterns

### Check Player Can Afford Item
```javascript
if (game.player.gold >= game.gameConfig.healthCost) {
    game.buyHealthAction();
}
```

### Check Combat Status
```javascript
if (game.gameState.currentMonsterIndex !== null) {
    // Player is in combat
    console.log(`Fighting: ${game.monsters[game.gameState.currentMonsterIndex].name}`);
}
```

### Get Current Weapon
```javascript
const currentWeapon = game.player.inventory[game.player.inventory.length - 1];
console.log(`Current weapon: ${currentWeapon.name} (${currentWeapon.power} power)`);
```

### Calculate Monster Reward
```javascript
const monster = game.monsters[index];
const goldReward = Math.floor(monster.level * game.gameConfig.monsterGoldMultiplier);
const xpReward = monster.level;
```

## Event Simulation

### Simulate Combat
```javascript
// Start fight with slime
game.goFight(0);

// Attack until monster dies or player dies
while (game.gameState.monsterHealth > 0 && game.player.health > 0) {
    game.attack();
}
```

### Simulate Shopping
```javascript
// Go to store
game.goStore();

// Buy health if affordable
if (game.player.gold >= game.gameConfig.healthCost) {
    game.buyHealthAction();
}

// Try to buy weapon
game.buyWeapon();
```

### Simulate Full Game Loop
```javascript
// Start new game
game.restart();

// Go to cave and fight monsters
game.goCave();
game.goFight(0);  // Fight slime
// ... combat until victory

game.goFight(1);  // Fight beast  
// ... combat until victory

// Go to town, buy upgrades
game.goTown();
game.goStore();
game.buyWeapon();
game.buyHealthAction();

// Final boss fight
game.goTown();
game.goFight(2);  // Fight dragon
// ... combat until victory = win game
```

## DOM Element IDs

### Interactive Elements
- `#button1, #button2, #button3` - Action buttons
- Game automatically manages click handlers

### Display Elements
- `#text` - Main narrative text
- `#xpText` - Experience points
- `#healthText` - Current health
- `#goldText` - Current gold
- `#monsterName` - Current monster name
- `#monsterHealth` - Current monster health
- `#inventory` - Weapon list
- `#monsterStats` - Monster info panel

## CSS Classes for Styling

### Animation Classes
- `.damage-taken` - Red damage flash (500ms)
- `.gold-gain` - Golden flash effect (600ms)  
- `.xp-gain` - Green flash effect (600ms)
- `.visible` - Show monster stats panel

### Layout Classes
- `#game` - Main container
- `#ui-left` - Left column (stats/inventory)
- `#ui-right` - Right column (buttons/text)
- `#stats` - Player stats bar
- `#controls` - Button container

## Game Balance

### Combat Calculations
```javascript
// Player damage to monster
damage = weaponPower + random(playerXP) + 1;

// Monster damage to player  
damage = max(0, monsterLevel * 5 - random(playerXP));

// Miss chance
missChance = 20% (0% if player health < 20);

// Weapon break chance
breakChance = 5% (only if player has >1 weapon);
```

### Economy
- Health: 10 gold → 10 health points
- Weapons: 30 gold → next tier weapon
- Selling: weapon → 15 gold  
- Monster rewards: monster level × 6.7 gold + monster level XP

### Progression
1. Stick (5 power) → Dagger (30 power) → Claw Hammer (50 power) → Sword (100 power)
2. Slime (15 HP) → Beast (60 HP) → Dragon (300 HP)
3. Starting stats: 0 XP, 100 health, 50 gold