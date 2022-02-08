const big = document.querySelector(".big")
const medium = document.querySelector(".medium")
const small = document.querySelector(".small")
const show = document.querySelector("#show")
const change = document.querySelector("#change")
const resetBt = document.querySelector("#reset")
const body = document.querySelector("body")

body.addEventListener("mousedown", clearAll)
change.addEventListener("click", changeStatus)
resetBt.addEventListener("click", reset)
big.addEventListener("click", bigClicked)
medium.addEventListener("click", mediumClicked)
small.addEventListener("click", smallClicked)

let score = 0
let start = true
let dvToHide = document.querySelectorAll(".hide")

function clearAll() {
  dvToHide.forEach(dv => {
    dv.style.display = "none"
  })
}

function bigClicked() {
  showAlert("szary", 1)
  dvToHide[2].style.display = "block"
  add(1)
}

function mediumClicked() {
  showAlert("czerwony", 2)
  dvToHide[1].style.display = "block"
  add(2)
}

function smallClicked() {
  showAlert("żółty", 5)
  dvToHide[0].style.display = "block"
  add(5)
}

function showAlert(color, number) {
  console.log("Nacisnąłeś " + color + " o wartości: " + number)
}

function add(number) {
  score += number
  if(score >= 30) {
    medium.removeEventListener("click", mediumClicked)
    medium.classList.add("off")
    if(score >= 50) {
      small.removeEventListener("click", smallClicked)
      small.classList.add("off")
      if(score >= 60) {
        big.removeEventListener("click", bigClicked)
        big.classList.add("off")
      }
    }
  }
  updateView()
}

function updateView() {
  show.innerText = score
}

function reset() {
  big.classList.remove("off")
  medium.classList.remove("off")
  small.classList.remove("off")
  big.addEventListener("click", bigClicked)
  medium.addEventListener("click", mediumClicked)
  small.addEventListener("click", smallClicked)
  score = 0
  updateView()
  start = false
  changeStatus()
}

function changeStatus() {
  if(start) {
    change.innerText = "START"
    // small.addEventListener("click", (e) => {e.stopPropagation()})
    big.addEventListener("click", addStopPropagation)
    medium.addEventListener("click", addStopPropagation)
    small.addEventListener("click", addStopPropagation)
  }
  else {
    change.innerText = "STOP"
    // small.removeEventListener("click", (e) => {e.stopPropagation()})
    big.removeEventListener("click", addStopPropagation)
    medium.removeEventListener("click", addStopPropagation)
    small.removeEventListener("click", addStopPropagation)
  }
  start = !start
}

function addStopPropagation(e) {
  e.stopPropagation()
}