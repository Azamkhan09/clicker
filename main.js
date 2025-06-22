const counterEl = document.querySelector('.fun');
const buttons = document.querySelectorAll('.level-up .plus');
const rebirthBtn = document.querySelector('.new-live button:first-child');
const rebirthCounterBtn = document.querySelector('.new-live button:last-child');

let score = 0;          // текущее количество очков
let rebirths = 0;       // количество перерождений
let clickPower = 1;     // сила клика — сколько очков добавляется за один клик
let multiplier = 1;     // множитель (для кнопок х2, х10 и т.д.)

// Обновление отображения счётчика и перерождений
function updateDisplay() {
  counterEl.textContent = `Счетчик: ${score.toLocaleString()}`;
  rebirthCounterBtn.textContent = `Счетчик перерождений: ${rebirths}`;
}

// Функция для извлечения чисел из текста кнопки
function extractNumbers(text) {
  text = text.replace(/\s/g, ''); // убрать пробелы

  // Найдём число после + (для инкремента)
  const incrementMatch = text.match(/\+(\d+)/);
  const increment = incrementMatch ? parseInt(incrementMatch[1]) : null;

  // Найдём множитель после х или x
  const multiplierMatch = text.match(/[хx](\d+)/i);
  const multiplierValue = multiplierMatch ? parseInt(multiplierMatch[1]) : null;

  // Найдём стоимость (число после "стоимость")
  const costMatch = text.match(/стоимость([\d.,]+)/i);
  const cost = costMatch ? parseInt(costMatch[1].replace(/[.,]/g, '')) : null;

  return { increment, multiplierValue, cost };
}

// Обработка клика на кнопках улучшений
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const { increment, multiplierValue, cost } = extractNumbers(btn.textContent);

    if (cost === null) {
      alert('Не удалось определить стоимость!');
      return;
    }

    if (score < cost) {
      alert(`Недостаточно очков! Нужно ${cost} очков.`);
      return;
    }

    // Списываем стоимость
    score -= cost;

    if (multiplierValue !== null) {
      // Увеличиваем множитель
      multiplier *= multiplierValue;
    } else if (increment !== null) {
      // Увеличиваем силу клика
      clickPower += increment;
    } else {
      alert('Не удалось распознать действие кнопки!');
      return;
    }

    updateDisplay();
  });
});

// Обработка перерождения
rebirthBtn.addEventListener('click', () => {
  if (score >= 100000000 ) {
    score = 0;
    clickPower = 2;
    multiplier = 1;
    rebirths++;
    updateDisplay();
    alert('Перерождение прошло успешно! Множитель и сила клика сброшены.');
  } else {
    alert('Недостаточно очков для перерождения (нужно 100 000 000).');
  }
});

// Увеличение очков при клике по экрану (кроме кнопок)
document.addEventListener('click', (event) => {
  if (event.target.tagName !== 'BUTTON') {
    score += clickPower * multiplier;
    updateDisplay();
  }
});

// Инициализация
updateDisplay();

// Установить cookie "token" с жизнью 30 днЁй
setCookie('token', 'abc123', { 'max-age': 60 * 60 * 24 * 30 });

// Получить cookie "token"
console.log(getCookie('token')); // "abc123"

// Удалить cookie "token"
deleteCookie('token');
