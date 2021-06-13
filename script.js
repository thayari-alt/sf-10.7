class Calculator {
  constructor() {
    this.lastOperand = 0;
    this.currentOperation = null;
    this.currentOperand = null;
    this.history = '';
    this.result = null;

    this.inputWindow = document.querySelector('#inputWindow');
    this.btnClr = document.querySelector('#btn_clr');
    this.btnResult = document.querySelector('#btn_result');
    this.btnPlus = document.querySelector('#btn_plus');
    this.btnMinus = document.querySelector('#btn_minus');
    this.btnMult = document.querySelector('#btn_mult');
    this.btnPoint = document.querySelector('#btn_point');
    this.btnDiv = document.querySelector('#btn_div');
    this.btnSqrt = document.querySelector('#btn_sqrt');
    this.historyEl = document.querySelector('.history');
  }

  assignEventListeners() {
    for (let i = 0; i < 10; i += 1) {
      document.querySelector(`#btn_${i}`).addEventListener('click', () => {
        if (this.result) {
          this.clear();
        }
        this.inputWindow.value += i;
      });
    }

    this.btnClr.addEventListener('click', this.clear.bind(this));

    this.btnResult.addEventListener('click', () => this.calculate(this.currentOperation));

    this.btnPoint.addEventListener('click', () => {
      if (this.inputWindow.value.indexOf('.') === -1) {
        this.inputWindow.value += '.';
      }
    });

    this.operationHandler(this.btnPlus, this.btnMinus, this.btnMult, this.btnDiv, this.btnSqrt);
  }

  // совершает арифметическое действие в зависимости от операции
  calculate(operation) {
    if (operation !== '√') {
      this.currentOperand = parseFloat(this.inputWindow.value);
    }
    switch (operation) {
      case '+':
        this.result = this.lastOperand + this.currentOperand;
        break;
      case '–':
        this.result = this.lastOperand - this.currentOperand;
        break;
      case '×':
        this.result = this.lastOperand * this.currentOperand;
        break;
      case '/':
        this.result = this.lastOperand / this.currentOperand;
        break;
      case '√':
        this.result = Math.sqrt(this.lastOperand);
        break;
      default:
        break;
    }
    // добавить в историю второй операнд
    this.history += ` ${this.currentOperand ? this.currentOperand : ''}`;
    this.showHistory(this.history);
    this.inputWindow.value = Number(this.result.toPrecision(12));
  }

  // выводит значение в поле истории
  showHistory(value) {
    this.historyEl.textContent = value;
  }

  // присваивает event listeners кнопкам операций
  operationHandler(...args) {
    args.forEach((element) => {
      element.addEventListener('click', this.operationEvent.bind(this));
    });
  }

  operationEvent(event) {
    const operation = event.target.textContent;

    // если минус набран первым перец цифрами
    if (operation === '–' && this.inputWindow.value === '') {
      this.inputWindow.value += '-';
    } else if (this.inputWindow.value !== '' && !this.result) {
      this.lastOperand = parseFloat(this.inputWindow.value);
      this.history = `${this.inputWindow.value} ${operation}`;

      if (operation === '√') { // корень из набранного числа - посчитать сразу
        this.calculate(operation);
      } else { // другая операция - добавить в историю
        this.currentOperation = operation;
        this.showHistory(this.history);
        this.inputWindow.value = '';
      }
    }
  }

  clear() {
    this.lastOperand = 0;
    this.currentOperation = null;
    this.currentOperand = null;
    this.result = null;
    this.inputWindow.value = '';
    this.inputWindow.placeholder = 0;
    this.history = '';
    this.showHistory('');
  }

  init() {
    this.clear();
    this.assignEventListeners();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const calculator = new Calculator();
  calculator.init();
});
