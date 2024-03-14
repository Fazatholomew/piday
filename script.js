// script.js
var pi = '';
const allInputs = document.getElementsByTagName('input');
fetch('1-100000000.txt')
  .then(response => response.text())
  .then(text => {
    pi = text;
    document.getElementById('loading').classList.add('invisible-element');
    document.getElementById('container').classList.remove('invisible-element');
    allInputs[0].focus();
  })
  .catch(error => console.error('Error loading the text file:', error));
document.addEventListener('DOMContentLoaded', () => {
  const piContainer = document.getElementById('piBackground');
  let index = 0;

  function typePi() {
    if (index < pi.length) {
      piContainer.textContent += pi[index];
      index++;
    }
  }

  // Set the typing speed here (in milliseconds)
  setInterval(typePi, 10);
  const inputs = document.getElementById("inputs");
  allInputs[0].focus();

  inputs.addEventListener("input", function (e) {
    const target = e.target;
    const val = target.value;

    if (isNaN(val)) {
      target.value = "";
      return;
    }

    if (val != "") {
      const next = target.nextElementSibling;
      if (next) {
        next.focus();
      }
    }
  });

  inputs.addEventListener("keyup", function (e) {
    const target = e.target;
    const key = e.key.toLowerCase();

    if (key === "backspace" || key === "delete") {
      target.value = "";
      const prev = target.previousElementSibling;
      if (prev) {
        prev.focus();
        prev.value = "";
      }
      return;
    }

    if (key === 'enter') {
      const digits = Array.from(allInputs).map((input) => input.value);
      showResult(digits.join(''))
    }
  });
});

const showResult = (number) => {
  const container = document.getElementById('resultContainer');
  container.classList.remove('invisible-element');
  container.innerHTML = '<h1>Searching...</h1>';
  while (pi.length < 10);
  const digits = findDigits(number);
  container.innerHTML = digits ? `<h3>is</h3>
        <h1>The <span style="color: orange;">${digits.split(' ')[0]}</span>${digits.split(' ')[1]}</h1>
        <h3>digits of pi.</h3>` : `<h1>Congratulation!</h1><h1>The first 100 milions digits of pi don't contain your number.</h1>`;
}

const findDigits = (number) => {
  const index = pi.indexOf(`${number}`);
  return index > -1 ? `${index} ${getExtension(index)}` : null;
};

const getExtension = (number) => {
  const stringNumber = `${number}`;
  let extention = 'th';
  if (stringNumber.slice(-1)[0] === '1') {
    extention = 'st';
  }

  if (stringNumber.slice(-1)[0] === '2') {
    extention = 'nd';
  }

  if (stringNumber.slice(-1)[0] === '3') {
    extention = 'rd';
  }

  if (stringNumber.length > 2) {
    const last2 = parseInt(stringNumber.slice(-2));
    if (last2 > 3 && last2 < 21) {
      extention = 'th';
    }
  }

  return extention;
}
