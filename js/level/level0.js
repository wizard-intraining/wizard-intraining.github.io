"use strict";
player = new Player()
scene = new Scene()
// wall
{
  const wall = {
    hint: Hint.NORMALBUMP,
    canStay: false,
  }
  for (let i = 0; i <= scene.width + 1; i++) {
    scene[i][5] = wall // 上边
    scene[i][8] = wall // 下边
  }
  for (let i = 5; i <= 8; i++) {
    scene[0][i] = wall // 左边
    scene[scene.width + 1][i] = wall //右边
  }
  for (let i = 8; i <= scene.width + 1; i++) {
    scene[i][6] = wall // 过了门之后不需要上下左右
  }
}
// door
{
  const door = {
    hint: Hint.DOORBUMP,
    canStay: false
  }
  scene[8][7] = door
  scene.doorOpen = function () {
    door.hint = undefined
    door.canStay = true
    Hint.DOOROPEN.play()
  }
}
// paper
{
  const [paperX, paperY] = [15, 7]
  const getPaper = (center) => {
    return {
      hint: center ? Hint.PAPER : Hint.PAPERWEAK,
      canStay: true,
      interact: center ? function () {
        [Hint.piano.low1,
        Hint.piano.low3,
        Hint.piano.low5,
        Hint.piano.mid1,].forEach((h, i) => {
          setTimeout(() => h.play(), 800 * i)
        })
      } : undefined,
    }
  }
  scene[paperX][paperY] = getPaper(true)
  scene[paperX - 1][paperY] = getPaper(false)
  scene[paperX + 1][paperY] = getPaper(false)
}
// player
{
  player.moveTo({ x: 1, y: 6 })
  player.checkNoteList = function () {
    if (this.x + 1 === 8 && this.y === 7) {
      if (this.noteList.length > 0)
        scene.doorOpen()
    }
  }
  let lastX = player.x
  let lastY = player.y
  player.endMove = function (orientation) {
    if (this.x < lastX) {
      Storyboard.show({
        title: '我……在做什么？',
        content: '试着向右移动找到出口 >>> <br> <br>按回车继续 '
      })
    } else {
      if (this.x <= 2)
        Storyboard.show({
          title: '似乎有什么很重要的事……',
          content:'<br> <br>按回车继续'
        })
      else if (this.x <= 3)
        Storyboard.show({
          title: '很重要的……人？',
          content:'<br> <br>按回车继续'
        })
      else if (this.x <= 4)
        Storyboard.show({
          title: '不行，不行，什么都想不起来了……',
        })
      else if (this.x <= 7) {
        if (this.y == 7 &&
          this.x === lastX && this.y === lastY &&
          orientation === Orientation.RIGHT)
          Storyboard.show({
            title: '我有把琴？也许可以弹弹看？',
            content: 'z: 切换演奏模式/行走模式<br>x: 切换乐器<br>1234567qwertyui：演奏从C4到C6的15个音高<br> <br>按回车继续',
          })
      }
      else if (this.x === 14 || this.x === 16)
        Storyboard.show({
          title: '有奇怪的声音',
          content: '<br> <br>按回车继续',
        })
      else if (this.x === 15)
        Storyboard.show({
          title: '奇怪的声音变大了……',
          content: 'Space: 与当前物体交互<br> <br>按回车继续',
        })
    }
    lastX = this.x
    lastY = this.y
    if (this.x === scene.width)
      Level.win()
  }
}
Storyboard.show({
  pic: './src/pics/storyImage/0.gif',
  title: '我……是谁？',
  content: 'Up Down Left Right: 移动 <br> <br>按回车继续'
})
