let balloonState = 40
const maxi = 200
const mini = 40
const step = (maxi - mini) / 10
let clickedCtrl = false
let arrowClicked = false
let time = null
document.addEventListener("keydown", checkKeyDown)
document.addEventListener("keyup", checkKeyUp)
document.addEventListener("keydown", preventMovement)
const body = document.querySelector("body")
const emoji = document.querySelector("#emoji")
const balloon = document.querySelector("#balloon")
balloon.addEventListener("contextmenu", balloonContextMenu)


function preventMovement(e) {
  e = e || window.event
  if(e.keyCode == 38 || e.keyCode == 40) {
    e.preventDefault()
  }
}

function checkKeyDown(e) {
  e = e || window.event
  if(e.keyCode == 38 && !arrowClicked) {
    if(time != null) {
      clearTimeout(time)
      time = null
      let dv = document.querySelector(".show")
      dv.remove()
    }
    arrowClicked = true
    let nextStep = balloonState + step
    if(nextStep < maxi) {
      emoji.style.fontSize = nextStep + "px"
      balloonState = nextStep
    }
    else {
      emoji.style.fontSize = nextStep + "px"
      balloonState = nextStep
      emoji.innerHTML = "💥"
      document.removeEventListener("keydown", checkKeyDown)
    }
  }
  else if(e.keyCode == 40 && !arrowClicked) {
    if(time != null) {
      clearTimeout(time)
      time = null
      let dv = document.querySelector(".show")
      dv.remove()
    }
    arrowClicked = true
    let nextStep = balloonState - step
    if(nextStep >= mini) {
      emoji.style.fontSize = nextStep + "px"
      balloonState = nextStep
    }
  }
  else if(e.keyCode == 17) {
    clickedCtrl = true
  }
}

function checkKeyUp(e) {
  e = e || window.event
  if(e.keyCode == 17) {
    clickedCtrl = false
  }
  if(e.keyCode == 38 || e.keyCode == 40) {
    arrowClicked = false
  }
}

function balloonContextMenu(e) {
  e.preventDefault()
  if(clickedCtrl) {
    let dv = document.querySelector(".show")
    if(dv != null)
      dv.remove()
    dv = document.createElement("div")
    dv.className = "show"
    dv.addEventListener("contextmenu", balloonContextMenu)
    dv.innerText = (balloonState - mini) / (maxi - mini) * 100 + "%"
    dv.style.left = e.clientX + "px"
    dv.style.top = e.pageY + "px"
    body.appendChild(dv)
    time = setTimeout(() => {
      dv.remove()
      time = null
    }, 3000)
  }
}