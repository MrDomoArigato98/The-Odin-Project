
let firstInput = null;
let secondInput = null;
let firstOperator = null;
let secondOperator = null;
let displayValue = 0;
let result = null;
let isPressed = false;
let buttonsArray = document.querySelectorAll("button")



//add = () =>{}

function operate(num1,num2, operator){
    num1 = Number(num1)
    num2 = Number(num2)
    switch (operator) {
        case '+':
            return num1+num2
            break;
        case '*':
            return num1*num2
            break;
        case '-':
            return num1-num2
            break;
        case '/':
            if(num2==0){
                return "wtf"
                break;
            }else{
                return (num1/num2)
                break;
            }
        }
}


function setInput(number){
    if(firstOperator===null){
        if(displayValue===0 || displayValue ==='0'){
            displayValue = number;
        }else if(displayValue == firstInput){
            displayValue = number
        }else{
            displayValue+=number
        }
    }else {
        if(displayValue===firstInput){
            displayValue = number
        }else{
            displayValue+=number
        }
    }
}

function setOperator(operator){
    if(firstOperator!=null && secondOperator === null){
        secondOperator = operator
        secondInput = displayValue
        result = operate(firstInput,secondInput,firstOperator)
        displayValue = result
        firstInput = displayValue
        result = null
    }else if(firstInput = null && secondOperator != null){

    
        secondInput = displayValue
        result = operate(firstInput,secondInput,firstOperator)
        secondOperator = operator
        displayValue = result
        firstInput = displayValue
        result = null

    }else {
        firstOperator = operator
        firstInput = displayValue
    }
}

function setEquals(){
     if(firstOperator === null) {
        displayValue = displayValue;
    } else if(secondOperator != null) {
        secondInput = displayValue;
        result = operate(firstInput,secondInput, secondOperator);
        if(result === 'wtf') {
            displayValue = 'wtf';
        } else {
            displayValue = result
            firstInput = displayValue;
            secondInput = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        secondInput = displayValue;
        result = operate(firstInput, secondInput, firstOperator);
        if(result === 'wtf') {
            displayValue = 'wtf';
        } else {
            displayValue = result
            firstInput = displayValue;
            secondInput = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

function setDecimal(decimal){
    if(displayValue == firstInput || displayValue == secondInput){
        displayValue = '0';
        displayValue += decimal;
    }else if(!displayValue.includes(decimal)){
        displayValue+=decimal
    }
}
function setDisplay(){
    const display = document.querySelector("#display")
    display.textContent = displayValue;

    if(display.textContent.length > 9) {
        console.log("beep")
        display.textContent = display.textContent.substring(0, 9);
    }
}
setDisplay();

buttonsArray.forEach(function(elem){
    elem.addEventListener("click", function(){
        if(elem.classList.contains('number')){
            setInput(elem.value)
            setDisplay();
        }

        if(elem.id == "equals"){
            setEquals()
            setDisplay()
        }

        if(elem.id == "plus"){
            setOperator("+")
            setDisplay()
        }

        if(elem.id == "minus"){
            setOperator("-")
            setDisplay()
        }

        if(elem.id == "multiply"){
            setOperator("*")
            setDisplay()
        }
        
        if(elem.id == "divide"){
            setOperator("/")
            setDisplay()
        }

        if(elem.id == "del"){
            clearDisplay()
            setDisplay()
        }

        if(elem.id == "decimal"){
            setDecimal('.')
            setDisplay()
        }

        if(elem.id == "clear"){
            allClear()
            setDisplay()
        }
    })
})



function allClear(){
    firstInput = null
    secondInput = null
    firstOperator = null;
    secondOperator = null;
    result = null;
    displayValue = 0
}

function clearDisplay(){
    display.textContent=0
    displayValue = 0
}