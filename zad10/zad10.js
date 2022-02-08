// URUCHAMIAMY 3 TERMINALE
// json-server --watch -p 3000 productsA.json
// json-server --watch -p 3001 productsB.json
// json-server --watch -p 3002 productsC.json

const left = document.querySelector("#choose")
const right = document.querySelector("#selected")

let data = []
let chosen = []

function createView() {
  console.log(data)
  for(const [categoryIndex, category] of data.entries()) {
    let mainDv = document.createElement("div")
    mainDv.className = "category"
    let middleDv = document.createElement("div")
    middleDv.className = "categoryInfo"
    let smallDv = document.createElement("div")
    smallDv.className = "toRoll"
    // smallDv.onclick = function() {roll(this, categoryIndex)}
    smallDv.dv = smallDv
    smallDv.categoryIndex = categoryIndex
    let inside = document.createElement("div")
    inside.innerHTML = "&#62;"
    smallDv.toRotate = inside
    smallDv.appendChild(inside)
    smallDv.addEventListener("click", roll)
    // smallDv.removeEventListener("click", roll)
    middleDv.appendChild(smallDv)
    smallDv = document.createElement("div")
    smallDv.className = "categoryInput"
    inside = document.createElement("div")
    inside.className = "middleState"
    inside.innerText = "-"
    inside.onclick = function() {middleStateClick(this, category.name, categoryIndex)}
    smallDv.appendChild(inside)
    let checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("name", "category")
    checkbox.onchange = function() {changeAllCheckboxes(category.name, categoryIndex)}
    smallDv.appendChild(checkbox)
    middleDv.appendChild(smallDv)
    smallDv = document.createElement("div")
    smallDv.innerText = category.name
    middleDv.appendChild(smallDv)
    mainDv.appendChild(middleDv)
    left.appendChild(mainDv)
    let bigDv = document.createElement("div")
    bigDv.className = "productList"
    for(const [productIndex, product] of category.products.entries()) {
      smallDv = document.createElement("div")
      smallDv.className = "product"
      checkbox = document.createElement("input")
      checkbox.className = "count"
      checkbox.setAttribute("type", "checkbox")
      checkbox.setAttribute("name", `${category.name}`)
      checkbox.onchange = function() {changeProductStatus(this, category.name, categoryIndex, productIndex)}
      smallDv.appendChild(checkbox)
      let text = document.createElement("div")
      text.innerText = product.name
      smallDv.appendChild(text)
      bigDv.appendChild(smallDv)
    }
    mainDv.appendChild(bigDv)
  }
}

function middleStateClick(dv, categoryName, categoryIndex) {
  console.log(dv, categoryName, categoryIndex)
  changeAllCheckboxes(categoryName, categoryIndex)
}

function changeAllCheckboxes(categoryName, categoryIndex) {
  const allCheckboxes = document.querySelectorAll(`input[name=${categoryName}]`)
  const allMiddleStates = document.querySelectorAll(".middleState")
  allMiddleStates[categoryIndex].style.display = "none"
  if(data[categoryIndex].state != 2) {
    for(const checkbox of allCheckboxes) {
      checkbox.checked = true
    }
    data[categoryIndex].state = 2
    for(const product of data[categoryIndex].products) {
      product.state = 1
    }
    const allCategoryCheckboxes = document.querySelectorAll("input[name=category]")
    allCategoryCheckboxes[categoryIndex].checked = true
  }
  else {
    for(const checkbox of allCheckboxes) {
      checkbox.checked = false
    }
    data[categoryIndex].state = 0
    for(const product of data[categoryIndex].products) {
      product.state = 0
    }
  }
  updateChosen()
}

function updateChosen() {
  chosen = []
  for(const category of data) {
    for(const product of category.products) {
      if(product.state == 1) {
        chosen.push(product.name)
      }
    }
  }
  right.innerHTML = ""
  for(const productName of chosen) {
    let dv = document.createElement("div")
    dv.innerText = productName
    right.appendChild(dv)
  }
}

function changeProductStatus(changedCheckbox, checkboxName, categoryIndex, productIndex) {
  if(changedCheckbox.checked)
    data[categoryIndex].products[productIndex].state = 1
  else
    data[categoryIndex].products[productIndex].state = 0
  changeCategoryStatus(checkboxName, categoryIndex)
  updateChosen()
}

function changeCategoryStatus(checkboxName, categoryIndex) {
  const allCheckboxes = document.querySelectorAll(`input[name=${checkboxName}]`)
  let countTrue = 0
  for(const checkbox of allCheckboxes) {
    if(checkbox.checked)
      countTrue++
  }
  const allMiddleStates = document.querySelectorAll(".middleState")
  const allCategoryCheckboxes = document.querySelectorAll("input[name=category]")
  if(countTrue == 0) {
    data[categoryIndex].state = 0
    allMiddleStates[categoryIndex].style.display = "none"
    // allCategoryCheckboxes[categoryIndex].indeterminate = false
    allCategoryCheckboxes[categoryIndex].checked = false
  }
  else if(countTrue < data[categoryIndex].products.length) {
    data[categoryIndex].state = 1
    allMiddleStates[categoryIndex].style.display = "flex"
    // allCategoryCheckboxes[categoryIndex].indeterminate = true
    allCategoryCheckboxes[categoryIndex].checked = false
  }
  else {
    data[categoryIndex].state = 2
    allMiddleStates[categoryIndex].style.display = "none"
    // allCategoryCheckboxes[categoryIndex].indeterminate = false
    allCategoryCheckboxes[categoryIndex].checked = true
  }
}

function roll(e) {
  let dv = e.currentTarget.dv
  let categoryIndex = e.currentTarget.categoryIndex
  let productList = dv.parentNode.parentNode.querySelector(".productList")
  if(!data[categoryIndex].rolled) {
    e.currentTarget.toRotate.style.transform = "rotate(90deg)"
    productList.style.display = "flex"
  }
  else {
    e.currentTarget.toRotate.style.transform = "rotate(0deg)"
    productList.style.display = "none"
  }
  data[categoryIndex].rolled = !data[categoryIndex].rolled
}

async function getAllData() {
  let resData = await getData(3000, "productsA")
  if(resData != undefined)
    parseData(resData)
  resData = await getData(3001, "productsB")
  if(resData != undefined)
    parseData(resData)
  resData = await getData(3002, "productsC")
  if(resData != undefined)
    parseData(resData)
}

function parseData(res) {
  for(const category of res) {
    Object.keys(category).forEach((key) => {
      let values = category[key]
      let exist = false
      for(const cat of data) {
        if(cat.name == key) {
          exist = true
          break
        }
      }
      if(!exist) {
        data.push({
          name: key,
          products: []
        })
      }
      let index = data.findIndex(element => element.name == key)
      for(const newProduct of values) {
        exist = false
        for(const product of data[index].products) {
          if(product.name == newProduct.name) {
            exist = true
            break
          }
        }
        if(!exist)
          data[index].products.push(newProduct)
      }
    })
  }
}

function getData(port, name) {
  return fetch(`http://localhost:${port}/${name}`)
    .then(res => {
      if(res.status !== 200)
        return Promise.reject('Zapytanie się nie powiodło')
      return res.json()
    })
    .then(res => {
      return res
    })
    .catch(errorCaught)
}

function errorCaught(res) {
  console.log(res)
}

getAllData().then(function() {
  data.map(category => {
    category.rolled = false
    category.state = 0
    category.products.map((product) => {
      product.state = 0
    })
    return category
  })
  createView()
})
