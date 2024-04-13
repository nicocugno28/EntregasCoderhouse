//creamos la clase calcladora
class Calculator {
    constructor() {
        this.display = document.getElementById('display');//esta seria la pantalla que va a ir modificandose
        this.numberButtons = document.querySelectorAll('.number');//estos serian los botones de numeros que usaremos
        this.operatorButtons = document.querySelectorAll('.operator');
        this.clearButton = document.getElementById('clear');
        this.equalsButton = document.getElementById('equals');//este nos permitira calcular las operaciones por medio de eventos
        this.lastCalculation = localStorage.getItem('lastCalculation') || '';//esto nos permitira guardar en el local storage la ultima operacion del usuario
        this.attachEventListeners();//metodo que escucha el boton y lo agrega a la pantalla
    }

    attachEventListeners() {
        this.numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.appendToDisplay(button.textContent);
            });
        });

        //por cada boton que escuche, lo agregara a la pantalla
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

    //metodo que verifica si es un numero u operador y lo imprime en pantalla
    appendToDisplay(value) {
        // Verificar si el valor es un número o un operador válido
        if (/^\d$/.test(value) || /^[\+\-\*\/]$/.test(value)) {
            display.value += value;
        }
    }
    //funcion que limpia la pantalla
    clearDisplay() {
        this.display.value = '';
    }

    calculate() {
        const expression = this.display.value.trim();//.trim() nos elimina los espacios en blanco de la pantalla para evitar errores de undefined
        let result;
        //aca manejamos apenas los errores por las dudas la expresion nos de null o NaN
        if (!expression) {
            this.display.value = 'Error: expresión no válida';
            return;
        }

        try {
            result = eval(expression);//eval() evalua la expresion y devuelve su valor

            if (isNaN(result)) {
                this.display.value = 'Error: expresión no válida';
                return;
            }
            this.display.value = result;//se muestra el resultado en la pantalla
            localStorage.setItem('lastCalculation', expression + '=' + result);//guarda el ultimo valor en el local storage
        } catch (error) {
            this.display.value = 'Error: expresión no válida';
        }
    }
}

const calculator = new Calculator();
