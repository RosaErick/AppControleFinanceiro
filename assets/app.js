// Hamburguer Menu
const hamburguer = document.getElementById("hamburguer");
const asideBar = document.getElementById("nav");
const x = document.getElementById("close");

x.addEventListener("click", () => {
  asideBar.classList.remove("show");
});

hamburguer.addEventListener("click", () => {
  asideBar.classList.toggle("show");
});

let transactions = [];

//add extract local storage
const extractionsRaw = localStorage.getItem("transactions");
if (extractionsRaw) {
  transactions = JSON.parse(extractionsRaw);
}

//Get Input Value - send to transactions

function getInputValue(e) {
  e.preventDefault();

  transactions.push({
    mercadoria: e.target.elements["name"].value,
    valor: e.target.elements["number"].value,
    tipo: e.target.elements["type"].value,
  });

  console.log(transactions);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  drawTransaction();
  totalValue();
}

//Draw Transactions
function drawTransaction() {
  currentLines = [...document.querySelectorAll(".spacebetween")];
  currentLines.forEach((element) => {
    element.remove();
  });

  if (!transactions.length) {
    document.querySelector(".transactions").innerHTML = `
      <div class="spacebetween">
      <div class="merch-name">
        <span id="merch">Nenhuma transacao cadastrada</span>
      </div>
  `;
  } 

  for (let mercadoria in transactions) {
    document.querySelector(".transactions").innerHTML += `
    <div>
      <div class="spacebetween">
        <div class="merch-name">
          <span>${
            transactions[mercadoria].tipo == "buy"
              ? "<span>-</span>"
              : "<span>+</span>"
            }</span >
          <span id="merch">${transactions[mercadoria].mercadoria}</span>
        </div>
        <span id="value"> R$ ${transactions[mercadoria].valor}</span>
      </div>
    </div>
  `;
    }
}

// clean data
function deleteValue(p) {
  transactions.splice(p);
  drawTransaction();
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

drawTransaction();

//form test validation

function formValidation(e) {
  e.preventDefault();

  if (/[0-9 ,.]/g.test(e.key)) {
    e.target.value += e.key;
  }
}

//sum total value
/*
function totalValue() {
  let totalItems = [];
  for (itemValue in transactions) {
    totalItems += transactions[itemValue].valor;

    let newTotal = totalItems.replace(/[a-z,A-Z$]/g, "").split(" ");
    let sum = "";

    for (let i = 0; i < newTotal.length; i++) {
      sum += newTotal[i];
      console.log(sum);
      console.log(typeof sum);
    }
  }
}

totalValue();
*/