const element = document.getElementById("add")
const listen = document.getElementById("listen")
const dontListen = document.getElementById("dontListen")
const show = document.getElementById("show")

element.addEventListener("click", add)
listen.addEventListener("click", start)
dontListen.addEventListener("click", stop)

let score = 0

function add() {
  show.innerText = ++score
}

function start() {
  element.addEventListener("click", add)
}

function stop() {
  score = -1
  add()
  element.removeEventListener("click", add)
}
