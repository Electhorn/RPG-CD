export function formatString(str, ...args) {
  return str.replace(/{(\d+)}/g, (match, number) =>
    typeof args[number] !== "undefined" ? args[number] : match
  );
}

export function flashDamage(element) {
  element.classList.add("damage-taken");
  setTimeout(() => element.classList.remove("damage-taken"), 500);
}

export function flashStat(element, className) {
  element.parentElement.classList.add(className);
  setTimeout(() => element.parentElement.classList.remove(className), 600);
}
