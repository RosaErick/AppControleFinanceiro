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

//increase or decrease total value
function totalSum() {
  total = transactions.reduce((acc, next) => 
    next.tipo === 'sell' ? acc + parseFloat(next.valor) : acc - parseFloat(next.valor) , 
    0)
  
 
  document.getElementById("totalValues").innerHTML = `R$ ${total}`;

  if (total > 0) {
    document.getElementById("totalValues").innerHTML += `<br><span>[LUCRO]</span>`;
  }

    if (total < 0) {
    document.getElementById("totalValues").innerHTML += `<br><span>[PREJUÍZO]</span>`;
  }
  // let total = 0;
  // for (i in transactions) {
  //   console.log({valor: parseFloat(transactions[i].valor)})
  //   if (transactions[i].tipo == "sell") {
  //     console.log(transactions[i].valor);
  //     total += parseFloat(transactions[i].valor);
  //     document.getElementById("totalValues").innerHTML = `R$ ${String(total)}`;
  //   }
  //   if (transactions[i].tipo == "buy") {
  //     total -= parseFloat(transactions[i].valor);
  //     console.log({total})
  //     document.getElementById("totalValues").innerHTML = `R$ ${String(total)}`;
  //   }
  // console.log({total});
  // }
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
  totalSum();
}

//Draw Transactions in HTML
function drawTransaction() {
  removeElem = [...document.querySelectorAll(".spacebetween")];
  removeElem.forEach((element) => {
    element.remove();
  });

  if (!transactions.length) {
    document.querySelector(".transactions").innerHTML = `
      <div class="spacebetween">
      <div class="merch-name">
        <span id="merch">Nenhuma transação cadastrada.</span>
      </div>
  `;
  }

  for (m in transactions) {
    document.querySelector(".transactions").innerHTML += `
    <div>
      <div class="spacebetween">
        <div class="merch-name">
          <span>${
            transactions[m].tipo == "buy"
              ? "<span>-</span>"
              : "<span>+</span>"
          }</span >
          <span id="merch">${transactions[m].mercadoria}</span>
        </div>
        <span id="value"> R$ ${transactions[m].valor}</span>
      </div>
    </div>
  `;
  }
}

// clear data
function deleteValue(p) {
  transactions.splice(p);
  document.getElementById("totalValues").innerHTML = `R$ `;
  drawTransaction();
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

drawTransaction();

//form test validation

function formValidation(e) {
  e.preventDefault();

  e.target.value;
  

  if (/[0-9 ,.]/g.test(e.key)) {
    e.target.value += e.key.replace(",", ".");
  }
}

//sum total value
/*
function totalValue() {
  let totalItems = '';

  for (i in transactions) {
    totalItems += transactions[i].valor;
    console.log(totalItems);
    let newTotal = [...totalItems.replace(/[a-z,A-Z$]/g, "")]
  
    let sum = 0
    for (b in newTotal) {

      sum += parseInt(newTotal[b]);
      console.log(sum)
    }

  }
}
  */
/*
    for (let i = 0; i < newTotal.length; i++) {
   
      sum += newTotal[i];
      console.log(sum);
      console.log(typeof sum);
    }
  
  }
}
  */

/*
//get object value with OnChange
function increaseTotalValue(e) {
  console.log(this.value);
let totalSum = 0
  for (let item of this.value) {
 
    totalSum += parseInt(item.innerHTML.replace(/[a-z A-Z$]/g, "").split(" ").reduce((totalSum, newTotal) => totalSum + newTotal, 0));
   
  
    console.log(totalSum);
    console.log(typeof totalSum)
    console.log(transactions)
  }
  document.getElementById('totalValues').innerHTML = `R$ ${totalSum}`;
}

*/
