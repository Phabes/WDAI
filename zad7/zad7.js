let cities = []
const show = document.querySelector("#show")

// fetch("./data/cities.json")
// fetch("http://localhost:3000/cities")
//   .then((response) => response.json())
//   .then(response =>
//     console.log(response)
//   )
//   .catch((err) => {
//     console.log("error", err)
//   })
fetch("http://localhost:3000/cities")
  .then((response) => {
    // response jest instancją interfejsu Response
    if(response.status !== 200) {
      return Promise.reject('Zapytanie się nie powiodło')
    }
    // zwracamy obiekt typu Promise zwracający dane w postaci JSON
    return response.json()
  }
  )
  .then(doTasks)
  .catch(errorCaught)

function errorCaught(res) {
  console.log(res)
}

function doTasks(res) {
  cities = res
  console.log(cities)
}

function taskA() {
  show.innerHTML = ""
  let malopolskaCities = cities.filter((city) => city.province == "małopolskie")
  malopolskaCities = malopolskaCities.map((city) => city.name)
  for(let city of malopolskaCities)
    show.appendChild(createDivWithText(city))
}

function taskB() {
  show.innerHTML = ""
  let aCities = cities.map((city) => city.name)
  let regEx = /.*?[a].*?[a].*?/
  aCities = aCities.filter((city) => regEx.test(city))
  for(let city of aCities)
    show.appendChild(createDivWithText(city))
}

function taskC() {
  show.innerHTML = ""
  let densCities = cities.map((city) => ({name: city.name, density: city.dentensity}))
  densCities.sort((a, b) => b.density - a.density)
  show.appendChild(createDivWithText(densCities[4].name))
}

function taskD() {
  show.innerHTML = ""
  let bigCities = cities.map((city) => ({name: city.name, people: city.people}))
  for(let city of bigCities) {
    if(city.people > 100000)
      city.name = city.name + " CITY"
  }
  for(let city of bigCities)
    show.appendChild(createDivWithText(city.name))
}

function taskE() {
  show.innerHTML = ""
  let bigCities = cities.map((city) => ({name: city.name, people: city.people}))
  let countBigger = 0
  for(const city of bigCities) {
    if(city.people > 80000)
      countBigger++
  }
  let countSmaller = bigCities.length - countBigger
  show.appendChild(createDivWithText(countSmaller > countBigger ? "WIĘCEJ PONIŻEJ: " + countSmaller : "WIĘCEJ POWYŻEJ: " + countBigger))
}

function taskF() {
  show.innerHTML = ""
  let pTownships = cities.filter((city) => city.township[0] == "P")
  let suma = 0
  for(const city of pTownships) {
    suma += city.area
  }
  let avg = suma / pTownships.length
  let rnd = Math.round(avg * 100) / 100
  show.appendChild(createDivWithText(rnd))
}

function createDivWithText(text) {
  let dv = document.createElement("div")
  dv.innerText = text
  return dv
}