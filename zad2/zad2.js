const change = document.querySelector("#change")
change.addEventListener("click", buttonClicked)

function buttonClicked() {
  let colors = ["red", "blue"]
  let countImages = 2;
  let currIMG = document.querySelector("img")
  let currSrc = currIMG.getAttribute("src")
  let number = parseInt(currSrc.substring(11, currSrc.length - 4))
  let index = (number + 1) % countImages
  currIMG.setAttribute("src", "images/gory" + index + ".jpg")
  currIMG.className = colors[index % colors.length]
}