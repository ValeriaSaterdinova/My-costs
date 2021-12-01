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
  if (placeName && placeValue) {
    allBuys.push({
      text: placeName,
      date: currentDate,
      price: placeValue
    });
    placeName = '';
    placeNameInput.value = '';
    placeValue = '';
    placeValueInput.value = '';
    render()
  } else {
    alert("Please, add text and summa!")
  }
}

const updateName = (event) => {
  placeName = event.target.value;
}

const updateValue = (event) => {
  placeValue = +event.target.value;
}

const now = new Date();
const currentDate = (now.getDate() + "." + now.getMonth() + "." + now.getFullYear());

const fullSummary = () => {
  const summa = document.getElementById('sum');
  summa.innerText = Object.values(allBuys).reduce((t, { price }) => t + (+price), 0);
};

const render = () => {
  const content = document.getElementById('content-page');
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  };
  fullSummary();
  allBuys.map((item, index) => {
    const containerAllBuy = document.createElement('div');
    containerAllBuy.className = 'all-container';
    const { text, price, date } = item;
    const containerBuy = document.createElement('div');
    containerBuy.id = `buy-${index}`;
    containerBuy.className = 'buy-container';
    const par = document.createElement('p');
    par.innerText = `${index + 1})`;
    containerBuy.appendChild(par);
    const place = document.createElement('p');
    place.innerText = text;
    containerBuy.appendChild(place);
    containerAllBuy.appendChild(containerBuy)
    const containerPriceDate = document.createElement('div');
    containerPriceDate.className = 'price-date-img';
    const container1 = document.createElement('div');
    container1.className = 'when-how-buy';
    const when = document.createElement('p');
    when.innerText = date;
    container1.appendChild(when);
    containerPriceDate.appendChild(container1);
    const total = document.createElement('p');
    total.innerText = price;
    container1.appendChild(total);
    const containerFunctional = document.createElement('div');
    containerFunctional.className = 'edit-delete';
    const imageEdit = document.createElement('img');
    imageEdit.src = "edit.svg";
    containerFunctional.appendChild(imageEdit);
    imageEdit.onclick = () => {
      const inputBuyName = document.createElement('input');
      inputBuyName.type = 'text';
      inputBuyName.value = text;
      containerBuy.replaceChild(inputBuyName, place);
      const inputBuyValue = document.createElement('input');
      inputBuyValue.type = 'number';
      inputBuyValue.value = price;
      container1.replaceChild(inputBuyValue, total);
      const inputBuyDate = document.createElement('input');
      inputBuyDate.type = 'date';
      inputBuyDate.value = (date).split(".").reverse().join('-');
      container1.replaceChild(inputBuyDate, when);
      imageEdit.onclick = () => {
        if (inputBuyDate.value && inputBuyName.value && inputBuyValue.value) {
          item.text = inputBuyName.value;
          item.price = +inputBuyValue.value;
          item.date = (inputBuyDate.value).split("-").reverse().join('.');
          render();
        } else {
          alert("Please, add data!")
        }
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
    containerFunctional.appendChild(imageDelete);
    containerPriceDate.appendChild(containerFunctional);
    containerAllBuy.appendChild(containerPriceDate)
    content.appendChild(containerAllBuy)
  });
};

const deleteBuy = (index) => {
  allBuys = allBuys.filter((item, index1) => (index1 !== index));
  render();
};