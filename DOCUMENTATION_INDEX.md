# RPG - Caza Dragones Documentation Index

Welcome to the complete documentation for the RPG - Caza Dragones browser game! This index will help you find the right documentation for your needs.

## 📚 Documentation Overview

### For Players 🎮
- **[README.md](README.md)** - Start here! Game overview, features, and how to play
- **[Getting Started](#getting-started)** - Quick setup instructions
- **[Gameplay Guide](#gameplay-guide)** - How to play and win

### For Developers 👨‍💻
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Complete technical reference
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick method lookup and examples
- **[Source Code Analysis](#source-code-analysis)** - Code structure overview

### For Contributors 🤝
- **[Contributing Guidelines](#contributing-guidelines)** - How to contribute to the project
- **[Customization Guide](#customization-guide)** - How to modify and extend the game

---

## Getting Started

### 1. Play the Game
```bash
# No installation needed!
1. Download or clone the repository
2. Open index.html in your browser
3. Start playing immediately
```

### 2. Understand the Code
```bash
# File structure overview
index.html          # UI layout and styling
script.js           # Game logic (single Game class)
README.md           # Project overview
API_DOCUMENTATION.md # Complete API reference
QUICK_REFERENCE.md   # Developer cheat sheet
```

### 3. Make Modifications
```javascript
// Key areas to customize
gameConfig: { /* Game balance settings */ }
weapons: [ /* Weapon definitions */ ]
monsters: [ /* Monster definitions */ ]
textStrings: { /* All game text */ }
```

---

## Gameplay Guide

### Objective
Defeat the dragon that prevents people from leaving their town by progressing through smaller monsters, buying upgrades, and managing resources.

### Game Flow
```
Town Square → Cave (fight monsters) → Shop (buy upgrades) → Repeat → Dragon Boss
```

### Strategy Tips
1. **Early Game**: Fight slimes to gain gold and XP
2. **Mid Game**: Buy weapon upgrades and health potions
3. **Late Game**: Fight beasts for better rewards
4. **End Game**: Challenge the dragon with best equipment

### Resource Management
- **Health**: Buy potions (10 gold = 10 health)
- **Gold**: Earned from monster fights, spent on upgrades
- **XP**: Increases damage and reduces monster damage
- **Weapons**: 4 tiers with increasing power

---

## Source Code Analysis

### Architecture Overview
- **Single Class Design**: Everything managed by `Game` class
- **Location-Based Navigation**: UI state controlled by location objects
- **Configuration-Driven**: Easy to modify through config objects
- **Responsive UI**: CSS Grid/Flexbox with mobile-first design

### Key Components

#### 1. Game Class (`script.js:5-536`)
```javascript
class Game {
  constructor()           // Initialize game
  
  // Navigation methods
  goTown(), goStore(), goCave(), goFight()
  
  // Combat methods  
  attack(), dodge(), checkGameStatus()
  
  // Shop methods
  buyHealthAction(), buyWeapon(), sellWeapon()
  
  // UI methods
  updateStatsUI(), updateInventoryUI(), flashDamage()
  
  // Utility methods
  formatString(), restart(), pick()
}
```

#### 2. Configuration Objects
```javascript
gameConfig     // Game balance settings
weapons[]      // Weapon definitions  
monsters[]     // Monster definitions
textStrings    // All game text and messages
locations      // UI state definitions
```

#### 3. UI Structure (`index.html:1-315`)
```html
<div id="game">
  <div id="ui-left">     <!-- Stats, inventory, monster info -->
    <div id="stats">
    <div id="inventory">
    <div id="monsterStats">
  </div>
  <div id="ui-right">    <!-- Buttons and text -->
    <div id="controls">
    <div id="text">
  </div>
</div>
```

---

## API Quick Reference

### Most Common Methods
```javascript
// Navigation
game.goTown()           // Return to town square
game.goStore()          // Visit shop
game.goCave()           // Enter monster cave
game.goFight(index)     // Fight specific monster

// Combat
game.attack()           // Attack current monster
game.dodge()            // Avoid damage

// Shopping  
game.buyHealthAction()  // Buy health potion
game.buyWeapon()        // Upgrade weapon

// Game state
game.restart()          // Reset game
game.player.health      // Current health
game.player.gold        // Current gold
```

### Data Access
```javascript
// Player stats
game.player.xp          // Experience points
game.player.inventory   // Weapon array

// Game data
game.monsters[0-2]      // Monster definitions
game.weapons[0-3]       // Weapon definitions
game.gameConfig         // Balance settings
```

---

## Contributing Guidelines

### Before Contributing
1. **Read** the complete API documentation
2. **Play** the game to understand mechanics
3. **Review** the source code structure
4. **Test** your changes thoroughly

### Development Setup
```bash
# No build process needed
1. Fork the repository
2. Edit files directly
3. Test in browser
4. Submit pull request
```

### Coding Standards
- **ES6+ JavaScript**: Use modern syntax
- **Clear naming**: Descriptive method and variable names
- **Comments**: Document complex logic
- **Consistent style**: Follow existing patterns

### Testing Checklist
- [ ] Game loads without errors
- [ ] All buttons work correctly
- [ ] Combat mechanics function properly
- [ ] Shop transactions work
- [ ] Responsive design maintained
- [ ] No console errors

---

## Customization Guide

### Easy Customizations

#### 1. Game Balance
```javascript
// Edit gameConfig in script.js
gameConfig: {
  healthCost: 15,           // Change health potion cost
  weaponCost: 25,           // Change weapon upgrade cost
  monsterGoldMultiplier: 8, // Increase gold rewards
}
```

#### 2. Add New Weapons
```javascript
// Add to weapons array
weapons: [
  { name: "palo", power: 5 },
  { name: "daga", power: 30 },
  { name: "martillo de garra", power: 50 },
  { name: "espada", power: 100 },
  { name: "espada mágica", power: 200 }, // New weapon
]
```

#### 3. Add New Monsters
```javascript
// Add to monsters array
monsters: [
  { name: "limo", level: 2, health: 15 },
  { name: "bestia con colmillos", level: 8, health: 60 },
  { name: "dragón", level: 20, health: 300 },
  { name: "dragón antiguo", level: 30, health: 500 }, // New boss
]
```

### Advanced Customizations

#### 1. New Game Locations
1. Add location to `textStrings.locations`
2. Add location object to `this.locations` in `setupLocations()`
3. Create navigation methods to/from new location

#### 2. New Game Mechanics
1. Add properties to `gameConfig` or `player` objects
2. Create new methods in `Game` class
3. Update UI display methods as needed
4. Add new button functions to locations

#### 3. UI Modifications
1. Edit HTML structure in `index.html`
2. Update CSS selectors and styling
3. Modify DOM references in `Game` constructor
4. Update responsive breakpoints if needed

---

## Troubleshooting

### Common Issues

#### Game Won't Load
- Check browser console for JavaScript errors
- Ensure JavaScript is enabled
- Try a different browser
- Clear browser cache

#### Buttons Not Working
- Check that event handlers are properly assigned
- Verify DOM element IDs match JavaScript selectors
- Look for JavaScript errors in console

#### Layout Problems
- Check CSS media queries
- Verify minimum screen width (320px)
- Test on different devices/orientations
- Validate HTML structure

#### Performance Issues
- Check for infinite loops in game logic
- Monitor memory usage during gameplay
- Verify animations complete properly
- Test on slower devices

### Debug Tools
```javascript
// Useful debug commands in browser console
console.log(game.player);        // Check player state
console.log(game.gameState);     // Check game state  
console.log(game.gameConfig);    // Check configuration

// Force game states for testing
game.player.gold = 1000;         // Give unlimited gold
game.player.health = 1000;       // Give high health
game.goFight(2);                 // Jump to dragon fight
```

---

## File Reference Summary

| File | Purpose | Target Audience |
|------|---------|-----------------|
| `README.md` | Project overview and getting started | Everyone |
| `API_DOCUMENTATION.md` | Complete technical reference | Developers |
| `QUICK_REFERENCE.md` | Method lookup and examples | Developers |
| `DOCUMENTATION_INDEX.md` | This file - documentation guide | Everyone |
| `index.html` | Game UI and layout | Players/Developers |
| `script.js` | Game logic and API | Developers |

---

**Happy coding and gaming! 🎮✨**