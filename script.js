const date = document.querySelector('.header__date');
const incomeName = document.querySelector('.income__name-input');
const incomeAmount = document.querySelector('.income__amount-input');
const incomeButton = document.querySelector('.income__button');
const expenseName = document.querySelector('.expense__name-input');
const expenseAmount = document.querySelector('.expense__amount-input');
const expenseButton = document.querySelector('.expense__button');
const budget = document.querySelector('#total__budget');
const expense = document.querySelector('#total__expense');
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
let budgetTotal = 0;
let expenseTotal = 0;
let balanceTotal = 0;


// ADD ITEM
function addIncome(e) {
    e.preventDefault();

    const name = incomeName.value;
    const amount = incomeAmount.value;
    const date = inputDate;

    if(name && amount) {
        items.push({
            name,
            amount,
            date,
            type: 'income'
        });

        budgetTotal += parseInt(amount);

        updateTotals();
        updateTable(name, amount, 'income');
    }
    
    incomeName.value = '';
    incomeAmount.value = '';
    incomeName.focus();
}

function addExpense(e) {
    e.preventDefault();

    const name = expenseName.value;
    const amount = expenseAmount.value;

    if(name && amount) {
        items.push({
            name,
            amount,
            date,
            type: 'expense'
        });

        expenseTotal += parseInt(amount);

        updateTotals();
        updateTable(name, amount, 'expense');
    }
    
    expenseName.value = '';
    expenseAmount.value = '';
    expenseName.focus();
}


function updateTotals() {
    balanceTotal = budgetTotal - expenseTotal;
    
    budget.textContent = `¥${budgetTotal.toLocaleString()}`;
    expense.textContent = `¥${expenseTotal.toLocaleString()}`;
    balance.textContent = `¥${balanceTotal.toLocaleString()}`;

}

function updateTable(name, amount, type) {
    
    let newRow = document.createElement('tr');
    newRow.innerHTML = `
        <tr>
            <td>${inputDate}</td>
            <td>${name.toUpperCase()}</td>
            <td>¥${parseInt(amount).toLocaleString()}</td>
        </tr>
    `;

    if (type === 'income') newRow.style.backgroundColor = 'lightgreen';
    if (type === 'expense') newRow.style.backgroundColor = 'salmon';

    body.appendChild(newRow);
}

// EVENT LISTENERS
incomeButton.addEventListener('click', addIncome);
expenseButton.addEventListener('click', addExpense);