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

//increase or decrease total value
let transactions = [];

function totalSum() {
  total = transactions.reduce(
    (acc, next) =>
      next.tipo === "sell"
        ? acc + parseFloat(next.valor)
        : acc - parseFloat(next.valor),
    0
  );

  document.getElementById("totalValues").innerHTML = `R$ ${total}`;

  if (total > 0) {
    document.getElementById(
      "totalValues"
    ).innerHTML += `<br><span>[LUCRO]</span>`;
  }

  if (total < 0) {
    document.getElementById(
      "totalValues"
    ).innerHTML += `<br><span>[PREJUÍZO]</span>`;
  }
}

//Get Input Value - send to transactions in localStorage

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
            transactions[m].tipo == "buy" ? "<span>-</span>" : "<span>+</span>"
          }</span >
          <span id="merch">${transactions[m].mercadoria}</span>
        </div>
        <span id="value"> R$ ${transactions[m].valor}</span>
      </div>
    </div>
  `;
  }
}
drawTransaction();
// clear data
function deleteValue(p) {
  let confirmDelete = confirm("Tem certeza que deseja limpar todos os dados?");

  if (confirmDelete) {
    transactions.splice(p);
    document.getElementById("totalValues").innerHTML = `R$ `;
    drawTransaction();
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }
}

//form test validation

function formValidation(e) {
  e.preventDefault();

  // only numbers validation
  if (/[0-9,.]/g.test(e.key)) {
    e.target.value += e.key.replace(",", ".");
  }

  //format Value
  let format = e.target.value;

  format = format + "";
  format = parseInt(format.replace(/[\D]+/g, ""));
  format = format + "";
  format = format.replace(/([0-9]{2})$/g, ",$1");

  if (format.length > 6) {
    format.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }

  e.target.value = format;
  if (format == "NaN") e.target.value = "";
}
