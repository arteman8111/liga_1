import { iosVhFix } from './utils/ios-vh-fix';
import { initModals } from './modules/modals/init-modals';
import { Form } from './modules/form-validate/form';
import { initPhoneInput } from './modules/form-validate/init-phone-input';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// about
const popup = document.querySelector('.popup');
const about = document.querySelector('.about');

const aboutDescription = document.createElement('p');
const aboutCloseButton = document.createElement('button');

function getDescription() {
  aboutDescription.textContent = 'Smart Device - это команда профессионалов. Через нас прошло более 1 000 000 клиентов, 70% из которых продолжают сотрудничество по сей день. На данный момент насчитывается более 14 офисов по всей стране и 20 городов присутствия. Мы стремимся к постоянному развитию и повышению уровня качества продукции, производимой внутри компании. Использование инновационных технологий помогает экономить деньги и время наших клиентов';
  aboutDescription.classList.add('about__subdescription');
  aboutCloseButton.textContent = 'Свернуть';
  aboutCloseButton.classList.add('about__button');
  about.insertAdjacentElement('beforeend', aboutDescription);
  about.insertAdjacentElement('beforeend', aboutCloseButton);
  popup.classList.add('visually-hidden');
}

function closeDescription() {
  aboutDescription.remove();
  aboutCloseButton.remove();
  popup.classList.remove('visually-hidden');
  aboutCloseButton.removeEventListener('click', getDescription);
}

popup.addEventListener('click', getDescription);
aboutCloseButton.addEventListener('click', closeDescription);

// accordion

const boxes = Array.from(document.querySelectorAll('.footer__container')); // считываем все элементы аккордеона в массив

boxes.forEach((box) => {
  box.addEventListener('click', boxHandler); // при нажатии на бокс вызываем ф-ию boxHanlder
});

function boxHandler(e) {
  e.preventDefault(); // сбрасываем стандартное поведение
  let currentBox = e.target.closest('.footer__container'); // определяем текущий бокс
  let currentContent = e.target.nextElementSibling; // находим скрытый контент
  currentBox.classList.toggle('active'); // присваиваем ему активный класс
  if (currentBox.classList.contains('active')) {
    // если класс активный ..
    currentContent.style.maxHeight = currentContent.scrollHeight + 'px'; // открываем контент
  } else {
    // в противном случае
    currentContent.style.maxHeight = 0; // скрываем контент
  }
}

// smooth scroll
const smoothLink = document.querySelector('.base__button');
smoothLink.addEventListener('click', function () {
  const id = smoothLink.getAttribute('href');

  window.querySelector(id).scroll({
    behavior: 'smooth',
  });
});

// focus on modal input first

document.addEventListener('DOMContentLoaded', function () {
  let $btn = document.querySelector('.navigation__button');
  let $input = document.querySelector('.modal__input');
  $btn.addEventListener('click', function () {
    setTimeout(function () {
      $input.focus();
    }, 100);
  });
});

// input tel validate

let modalInpPhone = document.querySelector('.modal__label-phone');
let formInpPhone = document.querySelector('.form__label-phone')
initPhoneInput(modalInpPhone);
initPhoneInput(formInpPhone);
// Проверяем фокус
// inp.addEventListener('focus', () => {
//   // Если там ничего нет или есть, но левое
//   if (!/^\+\d*$/.test(inp.value)) {
//     inp.value = '+7(';
//   }
// });

// inp.addEventListener('keypress', (evt) => {
//   // Отменяем ввод не цифр
//   if (!/\d/.test(evt.key)) {
//     evt.preventDefault();
//   }
// });


