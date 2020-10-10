const date = document.querySelector('.header__date');
const expenseName = document.querySelector('.expense__name-input');
const expenseAmount = document.querySelector('.expense__amount-input');
const expenseButton = document.querySelector('.expense__button');
const balance = document.querySelector('#total__balance');
const table = document.querySelector('.value__table');
const body = document.querySelector('.value__body');

// GET CURRENT DATE
let objToday = new Date();
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let curMonth = months[objToday.getMonth()];
let curYear = objToday.getFullYear();
let month = `${curMonth} ${curYear}`;
let inputDate = (objToday.getMonth() + 1) + "/" + objToday.getDate();

date.textContent = month;

// CONSTRUCTOR
let items = [];
let expenseTotal = 0;

// ADD ITEM
function addExpense(e) {
    e.preventDefault();

    const name = expenseName.value;
    const amount = expenseAmount.value;
    const id = Date.parse(new Date());

    if(name && amount) {
        items.push({
            name,
            amount,
            date: inputDate,
            id
        });

        
        updateTable(name, amount, inputDate, id);
    }

    updateTotal(amount);

    localStorage.setItem('expense', JSON.stringify(items));
    
    expenseName.value = '';
    expenseAmount.value = '';
    expenseName.focus();
}

function updateTotal(amount) {
    expenseTotal += parseInt(amount);
    balance.textContent = `¥${expenseTotal.toLocaleString()}`;
}

function updateTable(name, amount, date, id) {
    
    let newRow = document.createElement('tr');
    newRow.innerHTML = `
        <tr>
            <td>${date}</td>
            <td>${name}</td>
            <td>¥${parseInt(amount).toLocaleString()}</td>
        </tr>
    `;

    newRow.style.backgroundColor = 'salmon';
    newRow.id = id;

    body.appendChild(newRow);
}

function deleteItem(e) {
    const id = parseInt(e.target.parentNode.id);
    const element = document.getElementById(id);
    const index = items.findIndex(item => item.id === id)
    const amount = parseInt(items[index].amount);

    items.splice(index, 1);
    expenseTotal -= amount;
    balance.textContent = `¥${expenseTotal.toLocaleString()}`;
    element.parentNode.removeChild(element);

    let stored = JSON.parse(localStorage.getItem('expense'));
    stored.splice(index, 1);
    localStorage.setItem('expense', JSON.stringify(stored));
}

// EVENT LISTENERS
expenseButton.addEventListener('click', addExpense);
body.addEventListener('dblclick', deleteItem)

// LOCAL STORAGE
const data = JSON.parse(localStorage.getItem('expense'));
if (data) {
    data.forEach((expense) => {
        items.push(expense);
        updateTable(expense.name, expense.amount, expense.date, expense.id);
        updateTotal(expense.amount);
    });
}