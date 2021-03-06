"use strict";
// 按键映射
const keymap = {
  ArrowUp: () => player.move(Orientation.UP),
  ArrowDown: () => player.move(Orientation.DOWN),
  ArrowLeft: () => player.move(Orientation.LEFT),
  ArrowRight: () => player.move(Orientation.RIGHT),
  KeyZ: () => player.changeMode(),
  KeyX: () => player.changeInstrument(),
  Space: () => scene.interact(),
  Enter: () => Storyboard.hide(),
}
for (let i = 1; i <= 7; i++) {
  keymap[`Digit${i}`] = () => player.play(`low${i}`)
}
'QWERTYU'.split('').forEach((k, i) => {
  keymap[`Key${k}`] = () => player.play(`mid${i + 1}`)
})
'I'.split('').forEach((k, i) => {
  keymap[`Key${k}`] = () => player.play(`tall${i + 1}`)
})
document.onkeydown = (event) => {
  if (keymap.hasOwnProperty(event.code) === false ||
    player === null || scene === null)
    return
  if (event.code === 'Enter' ||
    Storyboard.isVisible === false) {
    keymap[event.code]()
  }
}