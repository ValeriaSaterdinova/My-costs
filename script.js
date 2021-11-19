let allBuys = [];
let valueInput = '';
let input = null;
let valueInput1 = '';
let input1 = null;

window.onload =  init = () => {
  input = document.getElementById('expenses');
  input.addEventListener('change', updateValue);
  input1 = document.getElementById('expenses1');
  input1.addEventListener('change', updateValue1);
  render();
}

const onClickButton = () => {
  allBuys.push({
    text: valueInput,
    date: currentDate,
    price: valueInput1
  }); 
  valueInput = '';
  input.value = '';
  valueInput1 = '';
  input1.value = '';
  render();
}

const updateValue = (event) => {
  valueInput = event.target.value;
}

const updateValue1 = (event) => {
  valueInput1 = +event.target.value;
}

let now = new Date();
let currentDate = (now.getDate() + "." + now.getMonth() + "." + now.getFullYear());

const FullSummary = () => {
  let sum = 0
  for (const buy of allBuys) {
    sum += buy.price
  };
  const summa = document.getElementById('sum');
  summa.innerText = sum;
};

const render = () => {
  let element = 0;
  const content = document.getElementById('content-page');
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  allBuys.map((item, index) => {
    FullSummary();
    const { text, price, date } = item;
    const container = document.createElement('div');
    container.id = `buy-${index}`;
    container.className = 'buy-container';
    const par = document.createElement('p');
    par.innerText = `${index+1})`;
    container.appendChild(par);
    const place = document.createElement('p');
    place.innerText = text;
    container.appendChild(place);
    const when = document.createElement('p');
    when.innerText = date;
    container.appendChild(when);
    content.appendChild(container);
    const total = document.createElement('p');
    total.innerText = price;
    container.appendChild(total);
    const imageEdit = document.createElement('img');
    imageEdit.src = "edit.svg";
    container.appendChild(imageEdit);
    const imageDelete = document.createElement('img');
    imageDelete.src = "delete.svg";
    container.appendChild(imageDelete);
    content.appendChild(container);
  });
}

