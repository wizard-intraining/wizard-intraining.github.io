"use strict";
// 玩家类定义
class Player {
  constructor() {
    this.x = 1
    this.y = 1
    ui.elements.player.style.top = `0px`
    ui.elements.player.style.left = `0px`
    this.mode = OperationMode.MOVE
    this.noteList = []
    this.instrumentIndex = 0
    ui.elements.player.style.backgroundImage = `url('./src/pics/player-walking.gif')`
  }

  checkNoteList() {
    console.log('请在 leveln.js 中定义演奏结果检查方法')
  }

  endMove(orientation) {
    console.log('请在 leveln.js 中定义移动结束后的检查')
  }

  changeInstrument() {
    this.instrumentIndex =
      (this.instrumentIndex + 1) % Hint.instrumentList.length
    console.log(`current instrument: ${Hint.instrumentList[this.instrumentIndex]}`)
  }

  play(noteNoInstrument) {
    const note = Hint[
      Hint.instrumentList[this.instrumentIndex]
    ][noteNoInstrument]
    note.play()
    this.noteList.push(note)
  }

  changeMode() {
    switch (this.mode) {
      case OperationMode.MOVE:
        this.mode = OperationMode.PLAY
        ui.elements.player.style.backgroundImage = `url('./src/pics/player-playing.gif')`
        // 开始演奏，清空列表
        this.noteList = []
        break
      case OperationMode.PLAY:
        this.mode = OperationMode.MOVE
        ui.elements.player.style.backgroundImage = `url('./src/pics/player-walking.gif')`
        // 演奏结束，检查
        this.checkNoteList()
        break
      default:
        break
    }
    console.log(`current operation mode: ${this.mode}`)
  }

  move(orientation) {
    if (this.mode === OperationMode.MOVE) {
      let nextLocation = this.getNextLocation(orientation)
      if (scene.canStay(nextLocation)) {
        this.moveTo(nextLocation)
      }
      // 不管能不能走过去，都要提示下一个位置有什么
      scene.hintToPlayer(nextLocation)
      this.endMove(orientation)
      console.log(`x ${this.x} y ${this.y}`)
    }
  }

  moveTo(location) {
    this.x = location.x
    this.y = location.y
    ui.elements.player.style.top = `${(this.y - 1) * 50}px`
    ui.elements.player.style.left = `${(this.x - 1) * 50}px`
  }

  /**
   * 根据方向获取下一个位置
   * @param {Orientation} orientation 方向
   */
  getNextLocation(orientation) {
    let nextLocation = { x: this.x, y: this.y }
    switch (orientation) {
      case Orientation.UP:
        nextLocation.y -= 1
        break;
      case Orientation.DOWN:
        nextLocation.y += 1
        break;
      case Orientation.LEFT:
        nextLocation.x -= 1
        break;
      case Orientation.RIGHT:
        nextLocation.x += 1
        break;
      default:
        break;
    }
    return nextLocation
  }
}