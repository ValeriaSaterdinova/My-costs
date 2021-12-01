let allBuys = [];
let placeName = '';
let placeNameInput = null;
let placeValue = '';
let placeValueInput = null;

window.onload = init = async () => {
  placeNameInput = document.getElementById('expenses');
  placeNameInput.addEventListener('change', updateName);
  placeValueInput = document.getElementById('expenses1');
  placeValueInput.addEventListener('change', updateValue);
  const resp = await fetch('http://localhost:8000/allBuys', {
    method: 'GET'
  });
  const result = await resp.json();
  allBuys = result.data;
  render();
}

const onClickButton = async () => {
  if (placeName && placeValue) {
    const resp = await fetch('http://localhost:8000/createBuys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        text: placeName,
        date: currentDate,
        price: placeValue
      })
    });
    const result = await resp.json();
    allBuys.push(result.data);
    placeName = '';
    placeNameInput.value = '';
    placeValue = '';
    placeValueInput.value = '';
    render();
  } else {
    alert("Please, add text and summa!")
  }
};

const updateName = (event) => {
  placeName = event.target.value;
}

const updateValue = (event) => {
  placeValue = +event.target.value;
}

const now = new Date();
const currentDate = (now.getDate() + "." + (now.getMonth() + 1) + "." + now.getFullYear());

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
    place.ondblclick = () => {
      const inputNewBuyName = document.createElement('input');
      inputNewBuyName.type = 'text';
      inputNewBuyName.value = text;
      containerBuy.replaceChild(inputNewBuyName, place);
      inputNewBuyName.focus();
      inputNewBuyName.onblur = async () => {
        allBuys[index].text = inputNewBuyName.value;
        const resp = await fetch('http://localhost:8000/updateBuy', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(allBuys[index])
        });
        render();
      }
    }
    containerBuy.appendChild(place);
    containerAllBuy.appendChild(containerBuy)
    const containerPriceDate = document.createElement('div');
    containerPriceDate.className = 'price-date-img';
    const container1 = document.createElement('div');
    container1.className = 'when-how-buy';
    const when = document.createElement('p');
    when.innerText = date;
    container1.appendChild(when);
    when.ondblclick = () => {
      const inputNewBuyDate = document.createElement('input');
      inputNewBuyDate.type = 'date';
      inputNewBuyDate.value = convertDate(date);
      container1.replaceChild(inputNewBuyDate, when);
      inputNewBuyDate.focus();
      inputNewBuyDate.onblur = async () => {
        allBuys[index].date = (inputNewBuyDate.value).split("-").reverse().join('.');
        const resp = await fetch('http://localhost:8000/updateBuy', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(allBuys[index])
        });
        render();
      }
    }
    containerPriceDate.appendChild(container1);
    const total = document.createElement('p');
    total.innerText = price;
    container1.appendChild(total);
    total.ondblclick = () => {
      const inputNewBuyValue = document.createElement('input');
      inputNewBuyValue.type = 'number';
      inputNewBuyValue.value = price;
      container1.replaceChild(inputNewBuyValue, total);
      inputNewBuyValue.focus();
      inputNewBuyValue.onblur = async () => {
        allBuys[index].price = +inputNewBuyValue.value
        const resp = await fetch('http://localhost:8000/updateBuy', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(allBuys[index])
        });
        render();
      }
    }
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
      inputBuyDate.value = convertDate(date);
      container1.replaceChild(inputBuyDate, when);
      imageEdit.onclick = async () => {
        if (inputBuyDate.value && inputBuyName.value && inputBuyValue.value) {
          allBuys[index].text = inputBuyName.value;
          allBuys[index].price = +inputBuyValue.value;
          allBuys[index].date = (inputBuyDate.value).split("-").reverse().join('.');
          const resp = await fetch('http://localhost:8000/updateBuy', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(allBuys[index])
          });
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

const deleteBuy = async (index) => {
  const id = allBuys[index]._id
  const resp = await fetch(`http://localhost:8000/deleteBuy?_id=${id}`, {
    method: 'DELETE'
  });

  allBuys = allBuys.filter((item, index1) => (index1 !== index));
  render();
};

const convertDate = (date) => {
  const dateArr = date.split('.');
  if ((+dateArr[0]) < 9 && dateArr[0].length === 1)
    dateArr[0] = `0${dateArr[0]}`;
  return dateArr.reverse().join('-')
}