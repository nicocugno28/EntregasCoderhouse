class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.numberButtons = document.querySelectorAll('.number');
        this.operatorButtons = document.querySelectorAll('.operator');
        this.clearButton = document.getElementById('clear');
        this.equalsButton = document.getElementById('equals');
        this.lastCalculation = localStorage.getItem('lastCalculation') || '';
        this.attachEventListeners();
    }

    attachEventListeners() {
        this.numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.appendToDisplay(button.textContent);
            });
        });

        this.operatorButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.appendToDisplay(button.textContent);
            });
        });

        this.clearButton.addEventListener('click', () => {
            this.clearDisplay();
        });

        this.equalsButton.addEventListener('click', () => {
            this.calculate();
        });

        window.addEventListener('load', () => {
            this.display.value = this.lastCalculation;
        });
    }

    appendToDisplay(value) {
        // Verificar si el valor es un número o un operador válido
        if (/^\d$/.test(value) || /^[\+\-\*\/]$/.test(value)) {
            display.value += value;
        }
    }
    clearDisplay() {
        this.display.value = '';
    }

    calculate() {
        const expression = this.display.value.trim();
        let result;

        if (!expression) {
            this.display.value = 'Error: expresión no válida';
            return;
        }

        try {
            result = eval(expression);

            if (isNaN(result)) {
                this.display.value = 'Error: expresión no válida';
                return;
            }

            this.display.value = result;
            localStorage.setItem('lastCalculation', expression + '=' + result);
        } catch (error) {
            this.display.value = 'Error: expresión no válida';
        }
    }
}

const calculator = new Calculator();