class Zombie {
  constructor(id) {
    this.id = id
    this.height = Math.floor(Math.random() * 100) + 150
    this.width = this.height / 312 * 2000 / 10
    this.speed = Math.floor(Math.random() * 4) + 5
    this.positionBottom = Math.floor(Math.random() * 100)
    // this.positionLeft = map.offsetWidth
    this.stage = 0
    this.dv = document.createElement("div")
    this.configureZombie()
    console.log(this.width)
  }

  configureZombie() {
    this.dv.className = "zombie"
    this.dv.style.height = this.height + "px"
    this.dv.style.width = this.width + "px"
    this.dv.style.bottom = this.positionBottom + "px"
    // this.dv.style.left = this.positionLeft + "px"
  }

  putZombieOnMap() {
    map.appendChild(this.dv)
    this.move()
  }

  removeZombieFromMap() {
    clearInterval(this.positionInterval)
    clearInterval(this.backgroundInterval)
    this.dv.remove()
    game.zombies = game.zombies.filter((zombie) => {return zombie.id != this.id})
  }

  move() {
    this.backgroundInterval = setInterval(() => {
      this.dv.style.backgroundPositionX = -this.stage * this.width + "px"
      this.stage++
      this.stage %= 10
    }, 60)
    this.positionInterval = setInterval(() => {
      this.positionLeft -= this.speed
      this.dv.style.left = this.positionLeft + "px"
      if(this.positionLeft < -this.width) {
        this.removeZombieFromMap()
        game.zombiePassed()
      }
    }, 20)
  }
}

const body = document.querySelector("body")
const map = document.querySelector("#map")
const gun = document.querySelector("#gun")
const lifes = document.querySelector("#lifes")
const score = document.querySelector("#score")
const gameStatus = document.querySelector("#status")
const player = document.querySelector("#player")
const yourScore = document.querySelector("#yourScore")
const highlights = document.querySelector("#highlights")
const reload = document.querySelector("#reload")

let game = {
  player: "",
  zombies: [],
  zombiesSpawned: 0,
  lifes: 3,
  score: 0,
  gameEnded: false,
  gunSpread: 25,
  pointsToAdd: 12,
  pointsToSubstract: 6,
  scoreLen: 5,
  wait: 200,
  getName: function() {
    game.player = prompt("Your name: ")
    if(this.player == "" || this.player == null)
      this.getName()
    else {
      player.innerText = "Player: " + this.player
      this.start()
    }
  },
  start: function() {
    this.updateScore()
    this.createLifes()
    this.setGun()
    this.createZombie(0)
  },
  createLifes: function() {
    for(let i = 0; i < this.lifes; i++) {
      let img = new Image()
      img.className = "life"
      img.src = "images/life.png"
      img.alt = "life"
      lifes.appendChild(img)
    }
  },
  setGun: function() {
    map.addEventListener("mousemove", this.gunMove)
    map.addEventListener("click", this.gunShoot)
  },
  createZombie: function(time) {
    let zombie = new Zombie(this.zombiesSpawned)
    let number = Math.floor(Math.random() * 1000) + this.wait
    game.timeout = setTimeout(() => {
      zombie.positionLeft = map.offsetWidth
      zombie.dv.style.left = zombie.positionLeft + "px"
      this.zombies.push(zombie)
      zombie.putZombieOnMap(map)
      this.zombiesSpawned++
      if(this.lifes > 0 && !this.gameEnded)
        this.createZombie(number)
    }, time)
  },
  gunMove: function(e) {
    gun.style.left = e.clientX - game.gunSpread + "px"
    gun.style.top = e.clientY - game.gunSpread + "px"
  },
  gunShoot: function(e) {
    const x = e.clientX
    const y = map.offsetHeight - e.clientY
    game.findShootedZombie(x, y)
  },
  findShootedZombie: function(x, y) {
    let shootedZombie = null
    for(const zombie of game.zombies) {
      if(x >= zombie.positionLeft && x <= zombie.positionLeft + zombie.width) {
        if(y >= zombie.positionBottom && y <= zombie.positionBottom + zombie.height)
          shootedZombie = zombie
      }
    }
    if(shootedZombie != null) {
      shootedZombie.removeZombieFromMap()
      game.score += game.pointsToAdd
    }
    else
      game.score = Math.max(this.score - this.pointsToSubstract, 0)
    this.updateScore()
  },
  updateScore: function() {
    let text = this.score.toString()
    for(let i = 5 - text.length; i > 0; i--)
      text = "0" + text
    score.innerText = text
  },
  zombiePassed: async function() {
    game.lifes--
    this.deleteLife()
    if(game.lifes == 0) {
      game.gameEnded = true
      clearInterval(this.timeout)
      map.removeEventListener("mousemove", game.gunMove)
      map.removeEventListener("click", game.gunShoot)
      yourScore.innerText = "Score: " + this.score
      gameStatus.style.display = "flex"
      let data = await this.getHighest()
      let date = new Date()
      let obj = {
        name: this.player,
        score: this.score,
        date: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      }
      data.scores.push(obj)
      data.scores.sort((a, b) => b.score - a.score)
      if(data.scores.length > 7)
        data.scores = data.scores.slice(0, 7)
      this.createHighlights(data.scores)
      await this.putHighest(data)
    }
  },
  deleteLife: function() {
    let dvs = document.querySelectorAll(".life")
    if(dvs.length > 0)
      dvs[dvs.length - 1].remove()
  },
  createHighlights: function(data) {
    highlights.innerHTML = ""
    for(const player of data) {
      let bigDv = document.createElement("div")
      bigDv.className = "player"
      let smallDv = document.createElement("div")
      smallDv.innerText = player.name
      bigDv.appendChild(smallDv)
      smallDv = document.createElement("div")
      smallDv.innerText = player.score
      bigDv.appendChild(smallDv)
      smallDv = document.createElement("div")
      smallDv.innerText = player.date
      bigDv.appendChild(smallDv)
      highlights.appendChild(bigDv)
    }
  },
  clearGame: function() {
    for(const zombie of game.zombies) {
      zombie.removeZombieFromMap()
    }
    game.player = ""
    game.zombies = []
    game.zombiesSpawned = 0
    game.lifes = 3
    game.score = 0
    game.gameEnded = false
    setTimeout(() => {
      gameStatus.style.display = "none"
      game.getName()
    }, 20)
  },
  deleteContextMenu: function(e) {
    e.preventDefault()
  },
  getHighest: async function() {
    try {
      const res = await fetch("https://jsonblob.com/api/jsonBlob/914301632825802752")
      if(res.status !== 200)
        return Promise.reject('Zapytanie się nie powiodło')
      const data_1 = await res.json()
      return data_1
    } catch(res_1) {
      return errorCaught(res_1)
    }

    function errorCaught(res) {
      console.log(res)
    }
  },
  putHighest: async function(data) {
    const params = {
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data),
      method: "PUT"
    }
    try {
      const res = await fetch("https://jsonblob.com/api/jsonBlob/914301632825802752", params)
      if(res.status !== 200)
        return Promise.reject('Zapytanie się nie powiodło')
      return "added"
    } catch(res_1) {
      return errorCaught(res_1)
    }

    function errorCaught(res) {
      console.log(res)
    }
  }
}

reload.addEventListener("click", game.clearGame)

setTimeout(() => {
  game.getName()
}, 200)

body.addEventListener("contextmenu", game.deleteContextMenu)