const hamburguer = document.getElementById("hamburguer");
const asideBar = document.getElementById("aside");
const x = document.getElementById("close");

x.addEventListener("click", () => {
  asideBar.classList.remove("show");
});

hamburguer.addEventListener("click", () => {
  asideBar.classList.toggle("show");
});

function getInputValue() {
  let merchName = document.getElementById("name").value;
  let merchValue = document.getElementById("number").value;

  if (merchName === "") {
    document.getElementById("merch").innerHTML = "Nenhuma transação cadastrada";
    document.getElementById("value").innerHTML = "R$ " + merchValue;
  } else if (merchValue === "") {
    document.getElementById("value").innerHTML = "Nenhum valor cadastrado";
    document.getElementById("merch").innerHTML = merchName;
  } else {
    document.getElementById("merch").innerHTML = merchName;
    document.getElementById("value").innerHTML = "R$ " + merchValue;
  }
}
