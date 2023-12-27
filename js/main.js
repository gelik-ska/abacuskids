$(document).ready(function () {
  $(function () {
    var mixer = mixitup(".directions__list");

    $(".directions__filter-btn").on("click", function () {
      $(".directions__filter-btn").removeClass(
        "directions__filter-btn--active"
      );
      $(this).addClass("directions__filter-btn--active");
    });
  });

  $(".team__slider").slick({
    arrows: false,
    slidesToShow: 4,
    infinite: true,
    draggable: false,
    waitForAnimate: false,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          draggable: true,
        },
      },
    ],
  });

  $(".team__slider-prev").on("click", function (e) {
    e.preventDefault();
    $(".team__slider").slick("slickPrev");
  });
  $(".team__slider-next").on("click", function (e) {
    e.preventDefault();
    $(".team__slider").slick("slickNext");
  });

  $(".testimonials__slider").slick({
    arrows: false,
    dots: true,
    appendDots: $(".testimonials__dots"),
    waitForAnimate: false,
    // responsive:
    //   [
    //     {
    //       breakpoint: 700,
    //       settings: {

    //       },
    //     },
    //   ]
  });
  $(".testimonials__prev").on("click", function (e) {
    e.preventDefault();
    $(".testimonials__slider").slick("slickPrev");
  });
  $(".testimonials__next").on("click", function (e) {
    e.preventDefault();
    $(".testimonials__slider").slick("slickNext");
  });

  $(".program__acc-link").on("click", function (e) {
    e.preventDefault();
    if ($(this).hasClass("program__acc-link--active")) {
      $(this).removeClass("program__acc-link--active");
      $(this).children(".program__acc-text").slideUp();
    } else {
      $(".program__acc-link").removeClass("program__acc-link--active");
      $(".program__acc-text").slideUp();
      $(this).addClass("program__acc-link--active");
      $(this).children(".program__acc-text").slideDown();
    }
  });

  $(".header__nav-list a, .header__top-btn, .footer__go-top").on(
    "click",
    function (e) {
      e.preventDefault();
      var id = $(this).attr("href"),
        top = $(id).offset().top;
      $("body,html").animate({ scrollTop: top }, 800);
    }
  );

  setInterval(() => {
    if (
      $(window).scrollTop() > 0 &&
      $(".header__top").hasClass("header__top--open") === false
    ) {
      $(".burger").addClass("burger--follow");
    } else {
      $(".burger").removeClass("burger--follow");
    }
  }, 0);
  $(".burger, .overlay, .header__top a").on("click", function (e) {
    e.preventDefault();
    $(".header__top").toggleClass("header__top--open");
    $(".overlay").toggleClass("overlay--show");
  });

  $(".footer__top-title--slide").on("click", function () {
    $(this).next().slideToggle();
  });

  /*!***************************************************
   * google-translate.js v1.0.6
   * https://Get-Web.Site/
   * author: Vitalii P.
   *****************************************************/

  /* Вы можете перенести данный конфиг в head своего сайта, чтобы динамически конфигурировать значения при помощи данных из CMS */
  /* You can transfer this config to the head of your site to dynamically configure values using data from the CMS */

  const googleTranslateConfig = {
    /* Original language */
    lang: "ru",

    /* Если хотите подписаться на событие "FinishTranslate" (Момент когда скрипт закончил перевод), расскоментируйте и добавьте любое проверочное слово на оригинальном языке */
    /* If you want to subscribe to the "FinishTranslate" event (The moment when the script finished translating), uncomment and add any test word in the original language */
    // testWord: "Язык",

    /* The language we translate into on the first visit*/
    /* Язык, на который переводим при первом посещении */
    // langFirstVisit: 'en',

    /* Если скрипт не работает или работает неправильно, раскомментируйте и укажите основной домен в свойстве domain */
    /* If the script does not work or does not work correctly, uncomment and specify the main domain in the domain property */
    // domain: "Get-Web.Site",
  };

  $(function () {
    /* Подключаем виджет google translate */
    /* Connecting the google translate widget */
    let script = document.createElement("script");
    script.src = `https://translate.google.com/translate_a/element.js?cb=TranslateWidgetIsLoaded`;
    document.getElementsByTagName("head")[0].appendChild(script);
  });

  function TranslateWidgetIsLoaded() {
    TranslateInit(googleTranslateConfig);
  }

  function TranslateInit(config) {
    if (config.langFirstVisit && !$.cookie("googtrans")) {
      /* Если установлен язык перевода для первого посещения и куки не назначены */
      /* If the translation language is installed for the first visit and cookies are not assigned */
      TranslateCookieHandler("/auto/" + config.langFirstVisit);
    }

    let code = TranslateGetCode(config);

    TranslateHtmlHandler(code);

    if (code == config.lang) {
      /* Если язык по умолчанию, совпадает с языком на который переводим, то очищаем куки */
      /* If the default language is the same as the language we are translating into, then we clear the cookies */
      TranslateCookieHandler(null, config.domain);
    }

    if (config.testWord)
      TranslateMutationObserver(config.testWord, code == config.lang);

    /* Инициализируем виджет с языком по умолчанию */
    /* Initialize the widget with the default language */
    new google.translate.TranslateElement({
      pageLanguage: config.lang,
      multilanguagePage: true, // Your page contains content in more than one languages
    });
  }

  /* Вешаем событие  клик на флаги */
  /* Assigning a handler to the flags */
  $("[data-google-lang]").click(function () {
    TranslateCookieHandler(
      "/auto/" + $(this).attr("data-google-lang"),
      config.domain
    );

    /* Перезагружаем страницу */
    /* Reloading the page */
    window.location.reload();
  });

  function TranslateGetCode(config) {
    /* Если куки нет, то передаем дефолтный язык */
    /* If there are no cookies, then we pass the default language */
    let lang =
      $.cookie("googtrans") != undefined && $.cookie("googtrans") != "null"
        ? $.cookie("googtrans")
        : config.lang;
    return lang.match(/(?!^\/)[^\/]*$/gm)[0];
  }

  function TranslateCookieHandler(val, domain) {
    /* Записываем куки /язык_который_переводим/язык_на_который_переводим */
    /* Writing down cookies /language_for_translation/the_language_we_are_translating_into */
    $.cookie("googtrans", val, {
      domain: document.domain,
      path: "/",
    });
    $.cookie("googtrans", val, {
      domain: "." + document.domain,
      path: "/",
    });

    if (domain == "undefined") return;
    /* записываем куки для домена, если он назначен в конфиге */
    /* Writing down cookies for the domain, if it is assigned in the config */
    $.cookie("googtrans", val, {
      domain: domain,
      path: "/",
    });

    $.cookie("googtrans", val, {
      domain: "." + domain,
      path: "/",
    });
  }

  function TranslateHtmlHandler(code) {
    /* Получаем язык на который переводим и производим необходимые манипуляции с DOM */
    /* We get the language to which we translate and produce the necessary manipulations with DOM */
    $('[data-google-lang="' + code + '"]').addClass("language__img_active");
  }

  function TranslateMutationObserver(word, isOrigin) {
    if (isOrigin) {
      document.dispatchEvent(new CustomEvent("FinishTranslate"));
    } else {
      /* Создаем скрытый блок в который добавляем тестовое слово на оригинальном языке. Это позволит нам отследить момент когда сайт будет переведен и вызвать событие "FinishTranslate"  */
      /* Creating a hidden block in which we add a test word in the original language. This will allow us to track the moment when the site is translated and trigger the "FinishTranslate" event  */

      let div = document.createElement("div");
      div.id = "googleTranslateTestWord";
      div.innerHTML = word;
      div.style.display = "none";
      document.body.prepend(div);

      let observer = new MutationObserver(() => {
        document.dispatchEvent(new CustomEvent("FinishTranslate"));
        observer.disconnect();
      });

      observer.observe(div, {
        childList: false,
        subtree: true,
        characterDataOldValue: true,
      });
    }
  }

  //------------------whatsapp переадресация//-----------------------
  // Получение ссылки по id
var whatsappLink = document.getElementById('whatsappLink');

// Добавление обработчика события click
whatsappLink.addEventListener('click', function() {
    // Получение значения атрибута href
    var hrefValue = this.getAttribute('href');

    // Открытие ссылки в новом окне или в том же окне
    window.open(hrefValue, '_blank'); // '_blank' открывает в новом окне
});


});
