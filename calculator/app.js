const initApp = () => {

    const currentValueElement = document.querySelector('.current-value');
    const previousValueElement = document.querySelector('.previous-value');
    let itemArray = [];
    let equationArray = [];
    let newNumberFlag = false;

    const inputButtons = document.querySelectorAll('.number');
    inputButtons.forEach(button => {
        button.addEventListener('click', (e) => {

            const newInput = button.textContent;
            if (newNumberFlag) {
                currentValueElement.value = newInput === '.' ? '0.' : newInput;
                newNumberFlag = false;
            } else if (currentValueElement.value.includes('.') && newInput === '.') {
                return;
            } else {
                currentValueElement.value =
                    currentValueElement.value == 0 && currentValueElement.value.length == 1 && newInput !== '.' ? newInput : `${currentValueElement.value}${newInput}`;
            }
        });
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
            let currentVal = parseFloat(currentValueElement.value);

            //has number been selected? 
            if (!itemArray.length && currentVal == 0) return;

            //begin new equation
            if (!itemArray.length) {
                itemArray.push(currentVal, newOperator);
                previousValueElement.textContent = `${currentVal}${newOperator}`;
                return newNumberFlag = true;
            }

            //complete equation    
            if (itemArray.length) {
                itemArray.push(currentVal);

                const equationObject = {
                    firstNum: parseFloat(itemArray[0]),
                    secondNum: parseFloat(currentVal),
                    operator: itemArray[1],
                }
                equationArray.push(equationObject);

                const equationString =
                    `${equationObject['firstNum']}
                ${equationObject['operator']}
                ${equationObject['secondNum']}`

                const newValue = calculate(equationString, currentValueElement);

                previousValueElement.textContent =
                    `${newValue} ${newOperator}`;

                //start new equation
                itemArray = [newValue, newOperator];
                newNumberFlag = true;
                console.log(equationArray);
            }
        });
    });
    const equalsButton = document.querySelector('.equals');
    equalsButton.addEventListener('click', () => {
        const currentVal = currentValueElement.value;
        let equationObj;

        // pressing equals repeatedly
        if (!itemArray.length && equationArray.length) {
            const lastEquation = equationArray[equationArray.length - 1];
            equationObj = {
                firstNum: parseFloat(currentVal),
                secondNum: lastEquation.secondNum,
                operator: lastEquation.operator,
            }
        } else if (!itemArray.length) {
            return currentVal;
        } else {
            itemArray.push(currentVal);
            equationObj = {
                firstNum: parseFloat(itemArray[0]),
                secondNum: parseFloat(currentVal),
                operator: itemArray[1],
            }
        }

        equationArray.push(equationObj)
        const equationString = `${equationObj['firstNum']} ${equationObj['operator']} ${equationObj['secondNum']}`;

        calculate(equationString, currentValueElement);

        previousValueElement.textContent = `${equationString} = `;
        newNumberFlag = true;
        itemArray = [];
        console.log(equationArray);
    });

    const clearButtons = document.querySelectorAll('.clear, .clear-entry');
    clearButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            currentValueElement.value = '0';
            previousValueElement.textContent = '';
            if (e.target.classList.contains('clear')) {
                itemArray = [];
                equationArray = [];
            }

            console.log(currentValueElement.value);
            console.log(`prev value ${previousValueElement.textContent}`);
        });
    });
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