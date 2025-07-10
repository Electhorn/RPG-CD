# RPG - Caza Dragones API Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Installation & Setup](#installation--setup)
3. [Game Class API](#game-class-api)
4. [Public Methods](#public-methods)
5. [Configuration Objects](#configuration-objects)
6. [Data Structures](#data-structures)
7. [UI Components](#ui-components)
8. [Usage Examples](#usage-examples)
9. [Event Handling](#event-handling)
10. [CSS Classes & Animations](#css-classes--animations)

## Project Overview

**RPG - Caza Dragones** is a browser-based role-playing game where players must defeat a dragon that prevents people from leaving their town. The game features turn-based combat, a shop system, inventory management, and an easter egg mini-game.

### Features
- Turn-based combat system
- Weapon upgrade progression
- Health and gold management
- Inventory system
- Easter egg number guessing game
- Responsive design (mobile-first)
- Animated UI feedback

### Technologies
- **Frontend**: HTML5, CSS3 (Grid/Flexbox), Vanilla JavaScript (ES6+)
- **Fonts**: Google Fonts (Cinzel, Lato)
- **Design**: Mobile-first responsive design

## Installation & Setup

### Quick Start
1. Download or clone the project files
2. Open `index.html` in a modern web browser
3. The game will start automatically

### File Structure
```
rpg-cd/
├── index.html          # Main HTML file with UI structure
├── script.js           # Game logic and API
├── README.md           # Project name
└── API_DOCUMENTATION.md # This documentation
```

### Browser Requirements
- Modern browser with ES6+ support
- JavaScript enabled
- Minimum screen width: 320px

## Game Class API

The entire game is managed through a single `Game` class that handles all game logic, UI updates, and player interactions.

### Constructor

```javascript
const game = new Game();
```

**Description**: Initializes a new game instance with default configuration, sets up DOM references, and starts the game.

**Parameters**: None

**Returns**: Game instance

**Example**:
```javascript
// Game automatically starts when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Game();
});
```

## Public Methods

### Navigation Methods

#### `goTown()`
**Description**: Navigates player to the town square (main hub).
**Parameters**: None
**Returns**: void
**Usage**: Called when player wants to return to the main area.

#### `goStore()`
**Description**: Navigates player to the weapon/health shop.
**Parameters**: None
**Returns**: void
**Side Effects**: Resets `showSellWeapon` flag to false.

#### `goCave()`
**Description**: Navigates player to the monster cave for combat.
**Parameters**: None
**Returns**: void

#### `goFight(monsterIndex)`
**Description**: Initiates combat with a specific monster.
**Parameters**:
- `monsterIndex` (number): Index of monster in monsters array (0-2)
**Returns**: void
**Side Effects**: Updates game state and shows monster stats UI.

**Example**:
```javascript
// Fight the dragon (index 2)
game.goFight(2);

// Fight slime (index 0)
game.goFight(0);
```

#### `easterEgg()`
**Description**: Navigates to the secret number guessing mini-game.
**Parameters**: None
**Returns**: void

#### `goStart()`
**Description**: Navigates to the game start screen.
**Parameters**: None
**Returns**: void

### Combat Methods

#### `attack()`
**Description**: Executes player attack against current monster.
**Parameters**: None
**Returns**: void
**Side Effects**: 
- Applies damage to monster
- Player takes counter-damage
- May break weapon (5% chance)
- Updates UI with battle results

**Game Logic**:
- Damage dealt = weapon power + random(XP) + 1
- Miss chance = 20% (guaranteed hit if health < 20)
- Player damage = max(0, monster level × 5 - random(XP))

#### `dodge()`
**Description**: Player attempts to dodge monster attack.
**Parameters**: None
**Returns**: void
**Side Effects**: Updates text with dodge message (no damage taken).

### Shop Methods

#### `buyHealthAction()`
**Description**: Attempts to purchase health restoration.
**Parameters**: None
**Returns**: void
**Cost**: 10 gold for 10 health points
**Side Effects**: Updates player stats and UI if purchase successful.

#### `buyWeapon()`
**Description**: Attempts to purchase next tier weapon.
**Parameters**: None
**Returns**: void
**Cost**: 30 gold per weapon upgrade
**Side Effects**: Adds weapon to inventory, updates UI.

#### `sellWeapon()`
**Description**: Sells oldest weapon in inventory.
**Parameters**: None
**Returns**: void
**Value**: 15 gold per weapon
**Restrictions**: Cannot sell if only one weapon remains.

#### `buyOrSellWeaponAction()`
**Description**: Toggle between buy/sell weapon modes based on `showSellWeapon` flag.
**Parameters**: None
**Returns**: void

### Game State Methods

#### `restart()`
**Description**: Resets game to initial state.
**Parameters**: None
**Returns**: void
**Side Effects**: 
- Resets player stats to defaults
- Clears inventory except starting weapon
- Returns to town square

#### `checkGameStatus()`
**Description**: Evaluates win/lose conditions after combat.
**Parameters**: None
**Returns**: void
**Logic**:
- Player health ≤ 0 → Game Over
- Monster health ≤ 0 & Dragon → Victory
- Monster health ≤ 0 & Other → Continue

#### `pick(guess)`
**Description**: Processes easter egg number guessing game.
**Parameters**:
- `guess` (number): Player's number choice (2 or 8)
**Returns**: void
**Logic**: Generates 10 random numbers (0-10), wins if guess matches any.
**Rewards**: +20 gold (win) or -10 health (lose)

### UI Update Methods

#### `updateStatsUI()`
**Description**: Updates player statistics display (XP, Health, Gold).
**Parameters**: None
**Returns**: void

#### `updateInventoryUI()`
**Description**: Refreshes inventory display with current weapons.
**Parameters**: None
**Returns**: void

#### `updateAllUI()`
**Description**: Updates both player stats and monster health display.
**Parameters**: None
**Returns**: void

### Utility Methods

#### `formatString(str, ...args)`
**Description**: String formatting utility for message templates.
**Parameters**:
- `str` (string): Template string with {0}, {1}, etc. placeholders
- `...args` (any[]): Values to substitute into placeholders
**Returns**: string
**Example**:
```javascript
const message = game.formatString("Hello {0}, you have {1} gold!", "Player", 50);
// Returns: "Hello Player, you have 50 gold!"
```

#### `flashDamage(element)`
**Description**: Applies damage flash animation to DOM element.
**Parameters**:
- `element` (HTMLElement): Element to animate
**Returns**: void
**Duration**: 500ms

#### `flashStat(element, className)`
**Description**: Applies stat gain animation to element's parent.
**Parameters**:
- `element` (HTMLElement): Child element of container to animate
- `className` (string): CSS class name for animation ('gold-gain' or 'xp-gain')
**Returns**: void
**Duration**: 600ms

## Configuration Objects

### Game Configuration (`gameConfig`)

```javascript
{
  healthCost: 10,                    // Gold cost per health purchase
  weaponCost: 30,                    // Gold cost per weapon upgrade
  sellWeaponValue: 15,               // Gold gained from selling weapon
  monsterGoldMultiplier: 6.7,        // Multiplier for gold rewards
  healthPurchaseAmount: 10,          // Health points gained per purchase
  baseMissChance: 0.2,               // 20% base miss chance in combat
  guaranteedHitHealthThreshold: 20,   // Health level for guaranteed hits
  easterEggWinGold: 20,              // Gold reward for easter egg win
  easterEggLoseHealth: 10,           // Health penalty for easter egg loss
  breakWeaponChance: 0.05            // 5% chance to break weapon in combat
}
```

### Weapons Array

```javascript
[
  { name: "palo", power: 5 },           // Starting weapon
  { name: "daga", power: 30 },          // First upgrade
  { name: "martillo de garra", power: 50 }, // Second upgrade
  { name: "espada", power: 100 }        // Final weapon
]
```

### Monsters Array

```javascript
[
  { name: "limo", level: 2, health: 15 },              // Cave monster
  { name: "bestia con colmillos", level: 8, health: 60 }, // Cave monster
  { name: "dragón", level: 20, health: 300 }           // Final boss
]
```

## Data Structures

### Player Object

```javascript
{
  xp: 0,                    // Experience points
  health: 100,              // Current health (max varies)
  gold: 50,                 // Current gold amount
  inventory: [weapon],      // Array of weapon objects
  reset: function()         // Method to reset player stats
}
```

### Game State Object

```javascript
{
  currentMonsterIndex: null,  // Index of monster being fought
  monsterHealth: 0           // Current monster health in combat
}
```

### Location Object Structure

```javascript
{
  getButtonText: function(),    // Returns array of button labels
  buttonFunctions: [function()], // Array of button click handlers
  getText: function()          // Returns location description text
}
```

## UI Components

### DOM Element References

The Game class automatically binds to these HTML elements:

- `#button1, #button2, #button3` - Action buttons
- `#text` - Main text display area
- `#xpText, #healthText, #goldText` - Player stat displays
- `#monsterStats` - Monster information panel
- `#monsterName, #monsterHealth` - Monster stat displays
- `#inventory` - Inventory display area

### Responsive Layout

The game uses CSS Grid and Flexbox for responsive design:

- **Mobile (default)**: Single column layout
- **Landscape (≥550px) or Desktop (≥820px)**: Two-column grid layout

### Visual Feedback

- **Damage Flash**: Red glow effect on damage taken
- **Gold Gain**: Golden flash effect on gold acquisition
- **XP Gain**: Green flash effect on experience gain
- **Monster Visibility**: Smooth fade-in/out transitions

## Usage Examples

### Basic Game Initialization

```javascript
// Game starts automatically when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  new Game();
});
```

### Manual Method Calls

```javascript
// Navigate to different locations
game.goStore();    // Visit shop
game.goCave();     // Enter monster cave
game.goTown();     // Return to town square

// Combat actions (only available during fights)
game.attack();     // Attack current monster
game.dodge();      // Dodge monster attack

// Shop actions (only available in store)
game.buyHealthAction();      // Buy health
game.buyWeapon();           // Buy weapon upgrade
game.sellWeapon();          // Sell oldest weapon

// Game management
game.restart();             // Reset game
game.easterEgg();          // Access secret game
```

### Accessing Game Data

```javascript
// Check player stats
console.log(game.player.health);    // Current health
console.log(game.player.gold);      // Current gold
console.log(game.player.xp);        // Experience points
console.log(game.player.inventory); // Weapon array

// Check game configuration
console.log(game.gameConfig.weaponCost);    // 30
console.log(game.weapons);                  // All available weapons
console.log(game.monsters);                 // All monsters
```

### Custom UI Updates

```javascript
// Manually trigger UI updates
game.updateStatsUI();       // Refresh player stats display
game.updateInventoryUI();   // Refresh inventory display
game.updateAllUI();         // Refresh all UI elements

// Apply visual effects
game.flashDamage(game.healthText);        // Flash damage on health
game.flashStat(game.goldText, 'gold-gain'); // Flash gold gain effect
```

## Event Handling

### Button Click Events

The game automatically manages button click events through the location system:

```javascript
// Button events are dynamically assigned based on current location
this.button1.onclick = location.buttonFunctions[0];
this.button2.onclick = location.buttonFunctions[1];
this.button3.onclick = location.buttonFunctions[2];
```

### Game State Changes

Location changes trigger automatic UI updates:

```javascript
// Each navigation method calls update() internally
update(location) {
  // Updates button text and functions
  // Updates main text display
  // Shows/hides monster stats
  // Manages button visibility
}
```

## CSS Classes & Animations

### Animation Classes

```css
.damage-taken    /* Applied during damage flash (500ms) */
.gold-gain       /* Applied during gold acquisition (600ms) */
.xp-gain         /* Applied during XP gain (600ms) */
.visible         /* Shows monster stats panel */
```

### Layout Classes

```css
#game            /* Main game container with responsive grid */
#ui-left         /* Left column (stats, inventory, monster info) */
#ui-right        /* Right column (buttons, text) */
#stats           /* Player statistics display */
#inventory       /* Weapon inventory display */
#controls        /* Action buttons container */
#text            /* Main text content area */
#monsterStats    /* Monster information panel */
```

### Usage in JavaScript

```javascript
// Apply damage animation
element.classList.add('damage-taken');
setTimeout(() => element.classList.remove('damage-taken'), 500);

// Show monster stats
this.monsterStats.classList.add('visible');

// Hide monster stats  
this.monsterStats.classList.remove('visible');
```

---

## Support & Contribution

This documentation covers all public APIs and components of the RPG - Caza Dragones game. For additional functionality or modifications, refer to the source code in `script.js` and `index.html`.

### Key Design Patterns

- **Single Class Architecture**: All game logic contained in one `Game` class
- **Location-Based Navigation**: UI state managed through location objects
- **Configuration-Driven**: Game balance controlled through config objects
- **Event-Driven UI**: Dynamic button assignment based on game state
- **Responsive Design**: Mobile-first CSS with progressive enhancement