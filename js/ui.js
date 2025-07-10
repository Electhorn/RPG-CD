export function updateStatsUI(player, xpText, healthText, goldText) {
  xpText.innerText = player.xp;
  healthText.innerText = player.health;
  goldText.innerText = player.gold;
}

export function updateInventoryUI(player, inventoryDiv) {
  inventoryDiv.innerHTML = "<h4>Inventario</h4>";
  if (player.inventory.length === 0) {
    const emptyText = document.createElement("div");
    emptyText.innerText = "(Vacío)";
    inventoryDiv.appendChild(emptyText);
  } else {
    player.inventory.forEach((weapon) => {
      const weaponEl = document.createElement("div");
      weaponEl.innerText = weapon.name;
      inventoryDiv.appendChild(weaponEl);
    });
  }
}
