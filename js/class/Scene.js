"use strict";
// 
class Scene {
  constructor() {
    this.width = 24
    this.height = 12
    for (let i = 0; i <= this.width + 1; i++) {
      this[i] = Array.from({ length: this.height + 2 }, () => null)
    }
  }
  canStay(location) {
    const element = scene[location.x][location.y]
    return element === null || element.canStay === undefined ||
      element.canStay
  }
  hintToPlayer(location) {
    const element = scene[location.x][location.y]
    if (element !== null && element.hint !== undefined) {
      element.hint.play()
    }
  }
  interact() {
    const element = scene[player.x][player.y]
    if (element !== null && element.interact !== undefined) {
      element.interact()
    }
  }
}