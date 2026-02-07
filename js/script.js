let inputBox = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let expression = '';
let operators = ['+', '-', '*', '/', '%'];

buttons.forEach(button => {
    button.addEventListener('click', () => {
        let value = button.innerText;

        // Clear all
        if (value === 'AC') {
            expression = '';
            inputBox.value = '0';
            return;
        }

        // Delete last character
        if (value === 'DEL') {
            expression = expression.slice(0, -1);
            inputBox.value = expression || '0';
            return;
        }

        // Calculate result
        if (value === '=') {
            try {
                let result = eval(
                    expression.replace(/%/g, '/100')
                );
                expression = result.toString();
                inputBox.value = expression;
            } catch {
                inputBox.value = 'Error';
                expression = '';
            }
            return;
        }

        // Prevent consecutive operators
        let lastChar = expression.slice(-1);
        if (
            operators.includes(value) &&
            operators.includes(lastChar)
        ) {
            return;
        }

        // Prevent multiple decimals in one number
        if (value === '.') {
            let lastNumber = expression
                .split(/[\+\-\*\/%]/)
                .pop();

            if (lastNumber.includes('.')) return;
        }

        // Append value
        expression += value;
        inputBox.value = expression;
    });
});
