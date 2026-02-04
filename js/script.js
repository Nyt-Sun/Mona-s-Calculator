let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        let value = e.target.innerHTML;

        // NOTE: eval() is used here for simplicity.
        // In production apps, a safer parsing approach should be used.

        if (value === '=') {
            try {
                string = eval(string.replace(/%/g, "/100"));
                input.value = string;
            } catch {
                input.value = 'Error';
                string = '';
            }
        } else if (value === 'AC') {
            string = "";
            input.value = "0";
        } else if (value === 'DEL') {
            string = string.slice(0, -1);
            input.value = string || '0';
        } else {
            string += value;
            input.value = string;
        }
    });
});

