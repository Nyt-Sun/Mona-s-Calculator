// =======================
// MONA Calculator JS
// =======================

// Calculator logic
let inputBox = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let expression = '';
const operators = ['+', '-', '*', '/', '%'];

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.innerText;

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
        const result = eval(expression.replace(/%/g, '/100'));
        expression = result.toString();
        inputBox.value = expression;
      } catch {
        inputBox.value = 'Error';
        expression = '';
      }
      return;
    }

    // Prevent consecutive operators
    const lastChar = expression.slice(-1);
    if (operators.includes(value) && operators.includes(lastChar)) return;

    // Prevent multiple decimals in one number
    if (value === '.') {
      const lastNumber = expression.split(/[\+\-\*\/%]/).pop();
      if (lastNumber.includes('.')) return;
    }

    // Append value
    expression += value;
    inputBox.value = expression;
  });
});

// =======================
// PWA Install Prompt Logic
// =======================
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Prevent Chrome default prompt
  deferredPrompt = e;

  // Only create the button if it doesn't exist yet
  if (document.getElementById('installBtn')) return;

  const installBtn = document.createElement('button');
  installBtn.id = 'installBtn';
  installBtn.innerText = 'Install App';
  installBtn.style.position = 'fixed';
  installBtn.style.bottom = '20px';
  installBtn.style.right = '20px';
  installBtn.style.padding = '12px 20px';
  installBtn.style.fontSize = '18px';
  installBtn.style.backgroundColor = '#fb7c14';
  installBtn.style.color = 'white';
  installBtn.style.border = 'none';
  installBtn.style.borderRadius = '12px';
  installBtn.style.cursor = 'pointer';
  installBtn.style.zIndex = '999';
  document.body.appendChild(installBtn);

  installBtn.addEventListener('click', async () => {
    installBtn.style.display = 'none';
    deferredPrompt.prompt(); // Show native install prompt
    const choiceResult = await deferredPrompt.userChoice;
    console.log('User choice:', choiceResult.outcome);
    deferredPrompt = null;
  });
});

// Hide install button if app is already installed
window.addEventListener('appinstalled', () => {
  const btn = document.getElementById('installBtn');
  if (btn) btn.style.display = 'none';
  console.log('Mona Calculator installed!');
});
