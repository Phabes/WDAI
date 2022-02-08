const add = document.querySelector("#addObj")
const rem = document.querySelector("#remObj")
add.addEventListener("click", addObj)
rem.addEventListener("click", remObj)

function addObj() {
  let cont = document.getElementById("list")
  let dv = document.createElement("div")
  let index = cont.children.length
  dv.innerText = "item " + (index + 1)
  cont.appendChild(dv)
}

function remObj() {
  let cont = document.getElementById("list")
  let child = document.querySelector("#list>div")
  if(child != null)
    cont.removeChild(child)
}