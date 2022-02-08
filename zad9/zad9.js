const all = document.querySelector("#all")
const leftSlide = document.querySelector("#left")
const rightSlide = document.querySelector("#right")
const randomDv = document.querySelector("#random")
// leftSlide.addEventListener("click", slideLeft)
// rightSlide.addEventListener("click", slideRight)
// randomDv.addEventListener("click", slideRandom)
addListeners()

let currentPos = 0
let step = 480
all.style.left = "0px"
let people = []
let currentPerson = null
let currentPersonIndex = null
// let enableRandom = true

fetch("http://localhost:3000/people")
  .then(res => {
    if(res.status !== 200)
      return Promise.reject('Zapytanie się nie powiodło')
    return res.json()
  })
  .then(data => {
    people = data
    currentPerson = createCard(people[0])
    currentPersonIndex = 0
    all.appendChild(currentPerson)
  })
  .catch(errorCaught)

function errorCaught(res) {
  console.log(res)
}

function addListeners() {
  leftSlide.addEventListener("click", slideLeft)
  rightSlide.addEventListener("click", slideRight)
  randomDv.addEventListener("click", slideRandom)
}

function removeListeners() {
  leftSlide.removeEventListener("click", slideLeft)
  rightSlide.removeEventListener("click", slideRight)
  randomDv.removeEventListener("click", slideRandom)
}

function createCard(person, left) {
  let bigDv = document.createElement("div")
  bigDv.className = "person"
  bigDv.style.left = `${left}px`
  bigDv.style.top = "0"
  let smallDv = document.createElement("div")
  smallDv.className = "icon"
  let img = new Image()
  img.src = `images/${person.image}`
  img.alt = "icon"
  smallDv.appendChild(img)
  let before = document.createElement("div")
  before.className = "beforeIMG"
  img = new Image()
  img.src = `images/quote.png`
  img.alt = "quote"
  before.append(img)
  smallDv.append(before)
  bigDv.appendChild(smallDv)
  smallDv = document.createElement("div")
  smallDv.className = "name"
  smallDv.innerText = person.name
  bigDv.appendChild(smallDv)
  smallDv = document.createElement("div")
  smallDv.className = "job"
  smallDv.innerText = person.job
  bigDv.appendChild(smallDv)
  smallDv = document.createElement("div")
  smallDv.className = "description"
  smallDv.innerText = person.description
  bigDv.appendChild(smallDv)
  return bigDv
}

function deletePerson(dv) {
  setTimeout(() => {
    dv.remove()
    addListeners()
  }, 1000)
}

function deletePersonIfNeeded(position) {
  let createdPeople = document.querySelectorAll(".person")
  for(const person of createdPeople) {
    if(person.style.left == position + "px") {
      person.remove()
    }
  }
}

function slideLeft() {
  removeListeners()
  deletePersonIfNeeded(currentPos - step)
  if(currentPersonIndex == 0)
    currentPersonIndex = people.length
  currentPersonIndex = (currentPersonIndex - 1) % people.length
  let card = createCard(people[currentPersonIndex], currentPos - step)
  deletePerson(currentPerson)
  currentPerson = card
  all.appendChild(card)
  const newPosition = currentPos - step
  all.style.left = `${-newPosition}px`
  currentPos = newPosition
}

function slideRight() {
  removeListeners()
  deletePersonIfNeeded(currentPos + step)
  currentPersonIndex = (currentPersonIndex + 1) % people.length
  let card = createCard(people[currentPersonIndex], currentPos + step)
  deletePerson(currentPerson)
  currentPerson = card
  all.appendChild(card)
  const newPosition = currentPos + step
  all.style.left = `${-newPosition}px`
  currentPos = newPosition
}

function slideRandom() {
  let number = Math.floor(Math.random() * people.length)
  if(number + 1 == currentPersonIndex || (number == people.length - 1 && currentPersonIndex == 0))
    number += 1
  number %= people.length
  currentPersonIndex = number
  slideRight()
}