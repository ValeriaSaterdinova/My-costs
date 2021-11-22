let allBuys = [];
let placeName = '';
let placeNameInput = null;
let placeValue = '';
let placeValueInput = null;

window.onload = init = () => {
  placeNameInput = document.getElementById('expenses');
  placeNameInput.addEventListener('change', updateName);
  placeValueInput = document.getElementById('expenses1');
  placeValueInput.addEventListener('change', updateValue);
  render();
}

const onClickButton = () => {
  allBuys.push({
    text: placeName,
    date: currentDate,
    price: placeValue
  });
  placeName = '';
  placeNameInput.value = '';
  placeValue = '';
  placeValueInput.value = '';
  render();
}

const updateName = (event) => {
  placeName = event.target.value;
}

const updateValue = (event) => {
  placeValue = +event.target.value;
}

let now = new Date();
let currentDate = (now.getDate() + "." + now.getMonth() + "." + now.getFullYear());

const fullSummary = () => {
  let sum = 0;
  for (const buy of allBuys) {
    sum += buy.price
  };
  const summa = document.getElementById('sum');
  summa.innerText = sum;
};

const render = () => {
  const content = document.getElementById('content-page');
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  };
  allBuys.map((item, index) => {
    fullSummary();
    const { text, price, date } = item;
    const container = document.createElement('div');
    container.id = `buy-${index}`;
    container.className = 'buy-container';
    const par = document.createElement('p');
    par.innerText = `${index + 1})`;
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
    imageEdit.onclick = () => {
      const inputBuyName = document.createElement('input');
      inputBuyName.type = 'text';
      inputBuyName.value = place.innerText;
      container.replaceChild(inputBuyName, place);
      const inputBuyValue = document.createElement('input');
      inputBuyValue.type = 'number';
      inputBuyValue.value = total.innerText;
      container.replaceChild(inputBuyValue, total);
      const inputBuyDate = document.createElement('input');
      inputBuyDate.type = 'date';
      inputBuyDate.value = when.innerText
      container.replaceChild(inputBuyDate, when);
      imageEdit.onclick = () => {
        item.text = inputBuyName.value;
        item.price = +inputBuyValue.value;
        item.date = (inputBuyDate.value).split("-").reverse().join('.');
        render();
      };  
      imageDelete.onclick = () => {
        render();
      };
    };
    const imageDelete = document.createElement('img');
    imageDelete.src = "delete.svg";
    imageDelete.onclick = () => {
      deleteBuy(index);
    };
    container.appendChild(imageDelete);
    content.appendChild(container);
  });
};

const deleteBuy = (index) => {
  allBuys = allBuys.filter((item, index1) => (index1 !== index));
  render();
};