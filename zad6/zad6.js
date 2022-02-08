const userName = document.querySelector("#userName")
const phone = document.querySelector("#phone")
const list = document.querySelector("#list")
const addBt = document.querySelector("#add")

addBt.addEventListener("click", add)

let phonePattern = /^\d{9}$/
let namePattern = /^[A-Z][a-z]+$/

function add() {
  let validation = checkInputs()
  if(validation.action) {
    let bigDv = document.createElement("div")
    bigDv.className = "user"
    let userInfoDv = document.createElement("div")
    userInfoDv.className = "userInfo"
    let nameDv = document.createElement("div")
    nameDv.className = "userName"
    nameDv.innerText = userName.value
    userInfoDv.appendChild(nameDv)
    let telDv = document.createElement("div")
    telDv.innerText = phone.value
    userInfoDv.appendChild(telDv)
    bigDv.appendChild(userInfoDv)
    let btDv = document.createElement("div")
    btDv.className = "deleteButton"
    let delButton = document.createElement("button")
    delButton.onclick = () => deleteInfo(bigDv)
    let trashIcon = document.createElement("img")
    trashIcon.setAttribute("src", "images/trash.png")
    trashIcon.setAttribute("alt", "trash")
    delButton.appendChild(trashIcon)
    btDv.appendChild(delButton)
    bigDv.appendChild(btDv)
    list.prepend(bigDv)
    userName.value = ""
    phone.value = ""
  }
  else {
    if(validation.field == "name")
      userName.focus()
    else
      phone.focus()
    alert(validation.message)
  }
}

function deleteInfo(bigDv) {
  bigDv.remove()
}

function checkInputs() {
  // return {
  //   action: true,
  //   field: "",
  //   message: ""
  // }
  if(!checkName())
    return {
      action: false,
      field: "name",
      message: "Imię musi się zaczynać z dużej litery, posiadać co najmniej 2 litery i składać się jedynie z liter"
    }
  if(!checkPhone())
    return {
      action: false,
      field: "phone",
      message: "Telefon musi składać sie z dziewięciu cyfr"
    }
  return {
    action: true,
    field: "",
    message: ""
  }
}

function checkPhone() {
  // return true
  return phone.value.match(phonePattern)
}

function checkName() {
  // return true
  return userName.value.match(namePattern)
}

// function prevent(e) {
//   e = e || window.event
//   if(e.preventDefault) {
//     e.preventDefault()
//   } else {
//     e.returnValue = false
//   }
// }