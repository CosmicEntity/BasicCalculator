const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

// calculate result of first and second values based on operator
const calculate = {
    '/': (firstNumber,secondNumber)=> firstNumber/secondNumber,

    '*': (firstNumber,secondNumber)=> firstNumber*secondNumber,

    '-': (firstNumber,secondNumber)=> firstNumber-secondNumber,

    '+': (firstNumber,secondNumber)=> firstNumber+secondNumber,

    '=': (firstNumber,secondNumber)=> secondNumber,
}

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;


// Enter Operands
function sendNumberValue(number){
    if(awaitingNextValue){
        calculatorDisplay.textContent = number;
        awaitingNextValue=false;
    }else{
        // If current display value is 0 -> replace it otherwise add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === "0" ? number : displayValue + number;
    }
}

// Reset Display
function resetAll(){
    firstValue = 0;
    operatorValue = "";
    awaitingNextValue = false;
    calculatorDisplay.textContent = "0";
}

// Add Decimal
function addDecimal(){
    if(awaitingNextValue) return;
    // If no decimal -> add one
    if(!calculatorDisplay.textContent.includes(".")){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}


// Use Operator
function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if(operatorValue && awaitingNextValue) {
       operatorValue=operator;
        return;
    }
    // Assign firstValue if no first value
    if(!firstValue){
        firstValue = currentValue;
    }else{
        const calculation = calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue=calculation;
    }
    // get second value and assign operator
    awaitingNextValue = true;
    operatorValue=operator;
}


// Add Event Listener for numbers, operators and decimal
inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener("click",() => sendNumberValue(inputBtn.value));
    }else if(inputBtn.classList.contains("operator")){
        inputBtn.addEventListener("click",() => useOperator(inputBtn.value));

    }else if(inputBtn.classList.contains("decimal")){
        inputBtn.addEventListener("click",() => addDecimal());

    }
});

// Event Listener to clear result
clearBtn.addEventListener("click",resetAll);

