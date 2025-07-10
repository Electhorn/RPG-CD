# RPG - Caza Dragones

A browser-based role-playing game where you must defeat the dragon that prevents people from leaving their town. Features turn-based combat, weapon upgrades, and strategic resource management.

## 🎮 Game Features

- **Turn-based Combat**: Fight monsters with strategic attack and dodge options
- **Weapon Progression**: Upgrade from stick → dagger → claw hammer → sword  
- **Resource Management**: Balance health, gold, and experience points
- **Monster Variety**: Battle slimes, beasts, and the final dragon boss
- **Shop System**: Buy health potions and weapon upgrades
- **Easter Egg**: Hidden number guessing mini-game
- **Responsive Design**: Optimized for mobile and desktop play

## 🚀 Quick Start

1. **Download** or clone this repository
2. **Open** `index.html` in any modern web browser
3. **Play** immediately - no installation required!

## 📁 Project Structure

```
rpg-cd/
├── index.html              # Game UI and layout
├── script.js               # Game logic and API  
├── README.md               # This file
├── API_DOCUMENTATION.md    # Complete API reference
└── QUICK_REFERENCE.md      # Developer quick guide
```

## 🎯 How to Play

1. **Start** in the town square
2. **Visit the cave** to fight monsters and gain experience
3. **Shop** for health potions (10 gold) and weapon upgrades (30 gold)
4. **Progress** through slime → beast → dragon
5. **Win** by defeating the final dragon boss!

### Controls
- Use the **three action buttons** to navigate and make choices
- **Attack** or **Dodge** during combat
- **Buy/Sell** items in the shop
- **Explore** different locations

## 🛠 Technical Details

### Technologies Used
- **HTML5** - Game structure and UI
- **CSS3** - Responsive design with Grid/Flexbox
- **Vanilla JavaScript (ES6+)** - Game logic and interactions
- **Google Fonts** - Typography (Cinzel, Lato)

### Browser Requirements
- Modern browser with ES6+ support
- JavaScript enabled
- Minimum screen width: 320px
- Works on mobile, tablet, and desktop

### Performance
- **Lightweight**: <30KB total file size
- **Fast loading**: No external dependencies except fonts
- **Smooth animations**: CSS-based visual effects
- **Responsive**: Mobile-first design

## 📚 Documentation

### For Players
- **Getting Started**: Open `index.html` and start playing
- **Game Mechanics**: Explained through in-game text and tooltips

### For Developers
- **[Complete API Documentation](API_DOCUMENTATION.md)** - Detailed method reference
- **[Quick Reference Guide](QUICK_REFERENCE.md)** - Common usage patterns
- **Source Code**: Well-commented JavaScript in `script.js`

### Key APIs
```javascript
// Game initialization
new Game();

// Navigation
game.goTown(), game.goStore(), game.goCave()

// Combat  
game.attack(), game.dodge()

// Shopping
game.buyHealthAction(), game.buyWeapon()

// Game state
game.restart(), game.player.health, game.player.gold
```

## 🎨 Game Design

### Visual Style
- **Medieval fantasy theme** with warm color palette
- **Parchment-style UI** with elegant typography
- **Smooth animations** for damage, gold, and XP gains
- **Responsive layout** adapting to screen size

### Game Balance
- **Progressive difficulty**: Monsters get stronger as game advances
- **Resource scarcity**: Gold management creates strategic decisions  
- **Risk/reward**: Higher-level monsters give better rewards
- **Multiple strategies**: Combat vs. shopping balance

## 🔧 Customization

### Easy Modifications
Edit `script.js` to customize:

```javascript
// Game balance
gameConfig: {
  healthCost: 10,        // Gold per health potion
  weaponCost: 30,        // Gold per weapon upgrade  
  sellWeaponValue: 15,   // Gold from selling weapons
  // ... more options
}

// Weapons and monsters
weapons: [/* custom weapons */]
monsters: [/* custom monsters */]
```

### Adding Features
- **New locations**: Add to `locations` object
- **New monsters**: Extend `monsters` array
- **New mechanics**: Add methods to `Game` class
- **UI changes**: Modify HTML structure and CSS

## 🐛 Troubleshooting

### Common Issues
- **Game not loading**: Check JavaScript console for errors
- **Buttons not working**: Ensure JavaScript is enabled
- **Layout broken**: Check minimum screen width (320px)
- **Performance issues**: Try refreshing or clearing browser cache

### Browser Compatibility
- ✅ Chrome 60+
- ✅ Firefox 55+  
- ✅ Safari 12+
- ✅ Edge 79+
- ❌ Internet Explorer (not supported)

## 📈 Game Statistics

### Progression System
- **4 weapon tiers**: 5 → 30 → 50 → 100 power
- **3 monster types**: 15 → 60 → 300 health
- **Dynamic difficulty**: Monster damage scales with player XP

### Economy
- **Starting resources**: 100 health, 50 gold, 0 XP
- **Health potions**: 10 gold for 10 health
- **Weapon upgrades**: 30 gold each
- **Monster rewards**: Level × 6.7 gold + Level XP

## 🎯 Future Enhancements

Potential improvements for developers:
- **Save/Load system** using localStorage
- **Multiple character classes** with different abilities
- **Achievement system** for completed challenges
- **Sound effects** and background music
- **Multiplayer mode** with shared leaderboards

## 📄 License

This project is open source and available under the MIT License. Feel free to modify, distribute, and use for educational purposes.

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Made with ❤️ for learning game development with vanilla JavaScript**