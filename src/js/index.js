// YANDEX MAP
// Дождёмся загрузки API и готовности DOM.
function loadYandexMap() {
  let mapOnload = new CustomEvent("maponload");
  document.dispatchEvent(mapOnload);
}

window.loadYandexMap = loadYandexMap;
if (document.getElementById("map")) {
  document.addEventListener("maponload", ymaps.ready(init));
}

function init() {
  // Создание экземпляра карты и его привязка к контейнеру с
  // заданным id ("map").
  let myMap = new ymaps.Map('map', {
    // При инициализации карты обязательно нужно указать
    // её центр и коэффициент масштабирования.
    center: [59.917677564212326,30.35171099999994],
    zoom: 17
  });


  let placemark = new ymaps.Placemark([59.917677564212326,30.35171099999994], {
    // baloonContentHeader: 'Хедер балуна',
    // ballonContentBody: 'Боди балуна',
    // ballonContentFooter: 'Подвал',

    
  balloonContent: "<div class='map h6'>Школа испанского языка Лавита в Петербурге!<br><span  class='map text-md'>Лиговский пр. 133 Е<br>Телефоны:<br>+7(812) 123-45-67<br>+7 (911) 123-45-67<br>E-mail:<br>lavita_school@gmail.com</span></div>"
    
  }, {
    iconLayout: "default#image",
    iconImageHref: "../img/school.png", // Ссылка на изображение 
    iconImageSize: [48, 48], // Размер изображения 
    iconImageOffset: [-3, -42] // Положение изображения   

  });


  myMap.geoObjects.add(placemark);
  myMap.controls.remove('geolocationControl'); // удаляем геолокацию
  myMap.controls.remove('trafficControl'); // удаляем контроль трафика
  myMap.controls.remove('searchControl'); // удаляем поиск
  myMap.controls.remove('typeSelector'); // удаляем тип
  myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
  myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
  myMap.controls.remove('rulerControl'); 
  // myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

}


import 'swiper/css/bundle';
// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';
import Choices from 'choices.js';


// init Swiper:
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  parallax: true,
  speed: 1000,
  // keyboard: {
  //     enabled: true,
  // },

  // If we need pagination
  // pagination: {
  //   el: '.swiper-pagination',
  // },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
});

// Index price табы
let tab = function () {
  let tabNav = document.querySelectorAll('.tabs-nav__item'),
    tabContent = document.querySelectorAll('.tab'),
    tabName;
  tabNav.forEach(item => {
    item.addEventListener('click', selectTabNav)
  })
  function selectTabNav() {
    tabNav.forEach(item => {
      item.classList.remove('is-active');
    });
    this.classList.add('is-active');
    tabName = this.getAttribute('data-tab-name');
    selectTabContent(tabName);
  }
  function selectTabContent(tabName) {
    tabContent.forEach(item => {
      item.classList.contains(tabName) ? item.classList.add('is-active') : item.classList.remove('is-active');
    })
  }
};

tab();

// MODAL-WINDOW! ///////////////////////////
// открыть модальное окно
document.getElementById('open-modal-btn').addEventListener("click", function () {
  document.getElementById("my-modal").classList.add("open");
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
})

// закрыть модальное окно
document.getElementById('close-my-modal-btn').addEventListener("click", function () {
  document.getElementById("my-modal").classList.remove("open");
  document.documentElement.style.overflow = "auto";
  document.body.style.overflow = "auto";
})

//закрыть модальное окно при нажатии Esc
window.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    document.getElementById("my-modal").classList.remove("open")
  }
});

//закрыть модальное окно при крике вне его
document.querySelector("#my-modal .modal__box").addEventListener('click', event => {
  event._isClickWithInModal = true
});

document.querySelector("#my-modal").addEventListener('click', event => {
  if (event._isClickWithInModal) return;
  event.currentTarget.classList.remove('open');

});


// SELECTOR
const defaultSelect = () => {
  const element = document.querySelector('.select-one');
  const choices = new Choices(element, {
    searchEnabled: false, placeholder: true
  });
  // Отключаем первый элемент в select
  // (function () {
  //   document.getElementById("#first").text = "";
  // })()

};
defaultSelect();


"use strict"
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);


    let formData = new FormData(form);
    formData.append('image', formImage.files[0]);

    if (error === 0) {
      form.classList.add('_sending');

      // let response = await fetch("sendmail.php", {
      //   method: 'POST',
      //   body: formData
      // });
      let response = {
        "ok": true
      }

      if (response.ok) {
        // let result = await response.json();
        // alert(result.message);
        formPreview.innerHTML = '';
        form.reset();
        form.classList.remove('_sending');
      } else {
        alert("Ошибка");
        form.classList.remove('_sending');
      }

    } else {
      alert('Заполните обязательное поле');
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);
      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
        formAddError(input);
        error++;
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }

      // if (input.value === '') {
      //   formAddError(input);
      //   error++;
      // }
    }
    return error;
  }
  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }
  //Функия теста email
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
  //Получаем инпут в file в переменную
  const formImage = document.getElementById('formImage');
  //Получаем див для превью в переменную
  const formPreview = document.getElementById('formPreview');
  //Слушаем изменения инпуте file
  formImage.addEventListener('change', () => {
    uploadFile(formImage.files[0]);
  });

  function uploadFile(file) {
    // Проверяем тип файла
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      alert('Разрешены только изображения.');
      formImage.value = '';
      return;
    }
    // Проверим размер файла (<2 mb)
    if (file.size > 2 * 1024 * 1024) {
      alert('Файл должен быть менее 2 МБ.');
      return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
    };
    reader.onerror = function (e) {
      alert('Ошибка');
    };
    reader.readAsDataURL(file);
  }
});
