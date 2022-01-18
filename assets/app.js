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

//add extract local storage
const extractionsRaw = localStorage.getItem("transactions");

if (extractionsRaw != null) {
  var transactions = JSON.parse(extractionsRaw);
} else {
  var transactions = [];
}

//Get Input Value - send to transactions

function getInputValue(e) {
  e.preventDefault();

  console.log(transactions);

  transactions.push({
    mercadoria: e.target.elements["name"].value,
    valor: e.target.elements["number"].value,
    tipo: e.target.elements['type'].value
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));
  drawTransaction();
}



//Draw Transactions
function drawTransaction() {
  currentLines = [...document.querySelectorAll(".spacebetween")];
  currentLines.forEach((element) => {
    element.remove();
  });

  for (mercadoria in transactions) {
    if (transactions === []) {
      document.querySelector(".extract-section").innerHTML += `
       <div class="spacebetween">
        <div class="merch-name">
          <span id="merch">Nenhuma transacao cadastrada</span>
        </div>
    `;
    } else {
      document.querySelector(".extract-section").innerHTML += `
  <div>
   <div class="spacebetween">
        <div class="merch-name">
          <span>${ 
            transactions[mercadoria].tipo == 'buy' ?  '<span>-</span>' : '<span>+</span>'
    }</span >
          <span id="merch">${transactions[mercadoria].mercadoria}</span>
        </div>
        <span id="value">${transactions[mercadoria].valor}</span>
      </div>
        </div>
  
  `;
    }


  }
}

function deleteValue(p) {
  transactions.splice(p);
  drawTransaction();
  document.querySelector(".extract-section").innerHTML += `
       <div class="spacebetween">
        <div class="merch-name">
         
          <span id="merch">Nenhuma transacao cadastrada</span>
        </div>
    `;
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

drawTransaction();

//form test validation

function formValidation(e) {
  e.preventDefault();

  if (e.target.value.length == 0) {
    e.target.value += "R$ ";
  }

  if (e.target.value.length == 6) {
    e.target.value += ",";
  }

  if (/[0-9 ,.]/g.test(e.key)) {
    e.target.value += e.key;
  }
}
