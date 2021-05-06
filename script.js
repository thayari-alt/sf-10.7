let lastOperand = 0;
let currentOperation = null;
let currentOperand = null;
let history = '';
let result = null;

const inputWindow = document.querySelector('#inputWindow');
const btnClr = document.querySelector('#btn_clr');
const btnResult = document.querySelector('#btn_result');
const btnPlus = document.querySelector('#btn_plus');
const btnMinus = document.querySelector('#btn_minus');
const btnMult = document.querySelector('#btn_mult');
const btnPoint = document.querySelector('#btn_point');
const btnDiv = document.querySelector('#btn_div');
const btnSqrt = document.querySelector('#btn_sqrt');
const historyEl = document.querySelector('.history')

for (let i = 0; i < 10; i++) {
	document.querySelector(`#btn_${i}`).addEventListener('click', () => {
		if (result) {
			clear();
		}
		inputWindow.value += i
	});
}

btnClr.addEventListener('click', clear);
btnResult.addEventListener('click', () => calculate(currentOperation));

btnPoint.addEventListener('click', () => {
	if (inputWindow.value.indexOf('.') == -1) {
		inputWindow.value += '.';
	}
});

operationHandler(btnPlus, btnMinus, btnMult, btnDiv, btnSqrt);

function calculate(operation) {
	if (operation != '√') {
		currentOperand = parseFloat(inputWindow.value);
	}
	switch (operation) {
		case '+':
			result = lastOperand + currentOperand;
			break;
		case '–':
			result = lastOperand - currentOperand;
			break;
		case '×':
			result = lastOperand * currentOperand;
			break;
		case '/':
			result = lastOperand / currentOperand;
			break;
		case '√':
			result = Math.sqrt(lastOperand);
			break;
		default:
			break;
	}
	history += ` ${currentOperand ? currentOperand : ''}`;
	showHistory(history);
	inputWindow.value = Number(result.toPrecision(12));
}

function showHistory(value) {
	historyEl.textContent = value;
}

function operationHandler() {
	Array.from(arguments).forEach(element => {
		element.addEventListener('click', (event) => {
			let operation = event.target.textContent;
			if (operation == '–' && inputWindow.value == '') {
				inputWindow.value += '-';
			} else if (operation == '√' && inputWindow.value != '' && !result) {
				lastOperand = parseFloat(inputWindow.value);
				history = inputWindow.value + ' ' + operation;
				calculate(operation);
			} else if (inputWindow.value != '' && !result) {
				currentOperation = operation;
				lastOperand = parseFloat(inputWindow.value);
				history = inputWindow.value + ' ' + operation;
				showHistory(history);
				inputWindow.value = '';
			}
		});
	});
} 

function clear() {
	lastOperand = 0;
	currentOperation = null;
	currentOperand = null
	result = null;
	inputWindow.value = '';
	inputWindow.placeholder = 0;
	history = '';
	showHistory('');
};

clear();