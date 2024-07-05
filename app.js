const inputBill = document.querySelector('#bill');
const inputNumberOfPeople = document.querySelector('#people');

const splitTipAmount = document.querySelector('.total__tip');
const splitTotalAmount = document.querySelector('.total__amount');

const tipButtons = document.querySelectorAll('.pct_btn');
const customButton = document.querySelector('.custom');
const resetButton = document.querySelector('.reset_btn');

const errorMsg = document.querySelector('.error__msg');

resetButton.disabled = true;


function calculate(tipValue) {
    const userBill = parseFloat(inputBill.value) || 0;
    const numberOfPeople = parseInt(inputNumberOfPeople.value) || 0;

    if (userBill > 0 && numberOfPeople > 0) {
        const tip = tipValue / 100;
        const totalTip = userBill * tip;
        const totalBill = userBill + totalTip;
        const perPersonTip = totalTip / numberOfPeople;
        const perPersonTotal = totalBill / numberOfPeople;

        splitTipAmount.textContent = perPersonTip.toFixed(2);
        splitTotalAmount.textContent = perPersonTotal.toFixed(2);
        resetButton.disabled = false;
        resetButton.classList.add('active');
        errorMsg.style.display = 'none';
        inputNumberOfPeople.classList.remove('error-border');
        inputBill.classList.remove('error-border');
    } else {
        inputNumberOfPeople.classList.add('error-border');
        inputBill.classList.add('error-border');
        errorMsg.style.display = 'block';
    }
}

function handleTipButtonClick(e) {
    const selectedButton = e.target;
    const tipValue = parseFloat(selectedButton.value);

    tipButtons.forEach(buttons => buttons.classList.remove('select'));
    selectedButton.classList.add('select');
    customButton.value = null;
    calculate(tipValue);
}

function handleCustomTipInput() {
    const customTipValue = parseFloat(customButton.value) || 0;
    tipButtons.forEach(button => button.classList.remove('select'));
    calculate(customTipValue);
}

function handleInput() {
    tipButtons.forEach(button => button.classList.remove('select'));
}

function resetCalculation() {
    inputNumberOfPeople.value = '';
    inputBill.value = '';
    customButton.value = null;
    splitTipAmount.textContent = '0.00';
    splitTotalAmount.textContent = '0.00';
    tipButtons.forEach(button => button.classList.remove('select'));
    resetButton.classList.remove('active');
    resetButton.disabled = true;
}

tipButtons.forEach(button => {
    button.addEventListener('click', handleTipButtonClick);
})

customButton.addEventListener('click', handleCustomTipInput);
inputNumberOfPeople.addEventListener('click', handleInput);
inputBill.addEventListener('click', handleInput);
resetButton.addEventListener('click', resetCalculation);