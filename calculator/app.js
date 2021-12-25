const initApp = () => {

    const currentValueElement = document.querySelector('.current-value');
    const previousValueElement = document.querySelector('.previous-value');
    let itemArray = [];
    let equationArray = [];
    let newNumberFlag = false;

    const inputButtons = document.querySelectorAll('.number');
    inputButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const newInput = e.target.textContent;
            if (newNumberFlag) {
                currentValueElement.value = newInput;
                newNumberFlag = false;
            } else {
                currentValueElement.value =
                    currentValueElement.value == 0 ? newInput : `${currentValueElement.value}${newInput}`;
            }
        })
    });
    const clearButtons = document.querySelectorAll('.clear, .clear-entry');
    clearButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            currentValueElement.value = 0;
            if (e.target.classList.contains('clear')) {
                previousValueElement.textContent = '';
                itemArray = [];
            }
        })
    });

    const opButtons = document.querySelectorAll('.operator');
    opButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            //equals sign has been selected 
            if (newNumberFlag) {
                previousValueElement.textContent = '';
                itemArray = [];
            }
            const newOperator = e.target.textContent;
            //is a number been selected? 
            if (!itemArray.length && currentValueElement.value == 0) return;

            //begin new equation
            if (!itemArray.length) {
                itemArray.push(currentValueElement.value, newOperator);
                previousValueElement.textContent = `${currentValueElement.value}${newOperator}`;
                return newNumberFlag = true;
            }
            if (itemArray.length) {
                itemArray.push(currentValueElement.value);

                const equationObject = {
                    number1: parseFloat(itemArray[0]),
                    number2: parseFloat(currentValueElement.value),
                    operator: itemArray[1],
                }

                const equationString =
                    `${equationObject[number1]}
                ${equationObject[operator]}
                ${equationObject[number2]}`

                const newValue = calculate(equationString, currentValueElement.value);

                previousValueElement.textContent = `${newValue}${newOperator}`;

                //start new equation
                itemArray = [newValue, newOperator];
                newNumberFlag = true;
                console.log(equationArray);
            }
        });
    })
    const deleteButton = document.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
        currentValueElement.value = currentValueElement.value.slice(0, -1);
    });

    const signChange = document.querySelector('.sign-change');
    signChange.addEventListener('click', () => {
        currentValueElement.value = parseFloat(currentValueElement.value) * -1;

    });
}


document.addEventListener('DOMContentLoaded', initApp);

const calculate = (equation, currentValueElement) => {
    const regex = /(^[*/=])|(\s)/g;
    equation.replace(regex, '');
    const divByZero = /(\/0)/.test(equation);
    if (divByZero) return currentValueElement.value = 0;
    return currentValueElement.value = eval(equation);
}