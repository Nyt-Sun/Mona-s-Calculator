// =======================
// MONA Calculator JS
// =======================

// --- Calculator logic ---
const inputBox = document.getElementById('inputBox');
const buttons = document.querySelectorAll('button');

let expression = '';
const operators = ['+', '-', '*', '/', '%'];

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.innerText;

    if (value === 'AC') {
      expression = '';
      inputBox.value = '0';
      return;
    }

    if (value === 'DEL') {
      expression = expression.slice(0, -1);
      inputBox.value = expression || '0';
      return;
    }

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

    const lastChar = expression.slice(-1);
    if (operators.includes(value) && operators.includes(lastChar)) return;

    if (value === '.') {
      const lastNumber = expression.split(/[\+\-\*\/%]/).pop();
      if (lastNumber.includes('.')) return;
    }

    expression += value;
    inputBox.value = expression;
  });
});

// =======================
// PWA Install Prompt Logic
// =======================
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

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
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    console.log('User choice:', choiceResult.outcome);
    deferredPrompt = null;
  });
});

window.addEventListener('appinstalled', () => {
  const btn = document.getElementById('installBtn');
  if (btn) btn.style.display = 'none';
  console.log('Mona Calculator installed!');
});
