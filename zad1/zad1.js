const change = document.querySelector("#change")
change.addEventListener("click", buttonClicked)

function buttonClicked() {
  let name = prompt("PODAJ IMIĘ:")
  let container = document.getElementById("place");
  container.innerHTML = name;
}