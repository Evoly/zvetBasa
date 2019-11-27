(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  var _isMobile_ = /Android|webOS|iPhone|iPod|iPad|BlackBerry/.test(navigator.userAgent) && !window.MSStream;

  var _fancyboxSettings = {
    default: {
      src: '#fancybox_default',
      type: 'inline',
      opts: {
        touch: false,
        // Убираем закрытие смахиванием
        afterShow: function afterShow() {
          $('.body_global').addClass('-scroll_off-');
        },
        beforeClose: function beforeClose() {
          $('.body_global').removeClass('-scroll_off-'); // Чтобы не дергался контент при открытии/закрытии попапа
          // на десктопе для фиксед элементов

          if (!_isMobile_) {
            $('.body_global').removeClass('compensate-for-scrollbar');
          }
        }
      }
    }
  };
  /**
   * @extends [data-popup] - ID попапа
   * @extends [data-popup-setting] - Настройки попапа. Не обязательно, тогда
   * применятся дефолтные настройки (_fancyboxSettings.default)
   */

  var fancyboxDefault = function fancyboxDefault(_this) {
    var _btn = $(_this);

    var fancyboxSrc = _btn.data('popup');

    var currentSetting = _btn.data('popup-setting') || 'default';
    var fancyboxSettings = _fancyboxSettings[currentSetting];

    if (!fancyboxSettings) {
      fancyboxSettings = _fancyboxSettings.default;
      console.error('Нет таких настроек для попа. Проверьте значение [data-popup-setting]. Были применены настройки "default"');
    }

    fancyboxSettings.src = fancyboxSrc;
    $.fancybox.open(fancyboxSettings);
  };
  /**
   * Попап вывода сообщения пользователю с выбором действия
   * @param {Object} _message Объект с ключями { title, text, extendClass }
   * @param {Function} _successFunc Callback подтверждения
   * @param {Function} _rejectFunc Callback отмены
   */

  var fancyboxMessage = function fancyboxMessage() {
    var _message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      title: 'Default title',
      text: 'Lorem ipsum dolor.',
      extendClass: undefined
    };

    var _successFunc = arguments.length > 1 ? arguments[1] : undefined;

    var _rejectFunc = arguments.length > 2 ? arguments[2] : undefined;

    var fancyboxSettings = {
      src: '#fancybox_message',
      type: 'inline',
      opts: {
        touch: false,
        // Убираем закрытие смахиванием
        afterShow: function afterShow() {
          $('.body_global').addClass('-scroll_off-');
        },
        beforeShow: function beforeShow() {
          var title = _message.title,
              text = _message.text,
              extendClass = _message.extendClass;

          if (extendClass) {
            $('#fancybox_message').addClass(extendClass);
          }

          if (_successFunc) {
            $('#fancybox_message').addClass('-success-');
            $('#fancybox_message-success').on('click', function () {
              _successFunc();
            });
          }

          if (_rejectFunc) {
            $('#fancybox_message').addClass('-reject-');
            $('#fancybox_message-reject').on('click', function () {
              _rejectFunc();
            });
          }

          $('#fancybox_message-title').text(title);
          $('#fancybox_message-text').text(text);
        },
        beforeClose: function beforeClose() {
          $('.body_global').removeClass('-scroll_off-'); // Чтобы не дергался контент при открытии/закрытии попапа
          // на десктопе для фиксед элементов

          if (!_isMobile_) {
            $('.body_global').removeClass('compensate-for-scrollbar');
          }
        },
        afterClose: function afterClose() {
          var extendClass = _message.extendClass;
          $('#fancybox_message').removeClass(extendClass);
          $('#fancybox_message').removeClass('-reject- -success-');
          $('#fancybox_message-success').unbind();
          $('#fancybox_message-reject').unbind();
        }
      }
    };
    $.fancybox.open(fancyboxSettings);
  };

  /**
   * InputMask плагин
   */

  /* RegExp */
  var regexNumberOnly = /\d+/g;
  /**
   * @description Вырезает все символы кроме цифр и возвращает последние
   * <phoneLength - 1> цифр
   * @param {String} inputValue Значение инпута
   * @param {Number} phoneLength Кол-во цифр необходимых для вставки.
   * Зависит от маски
   * @default phoneLength 10
   */

  var filterPhoneNumber = function filterPhoneNumber(inputValue) {
    var phoneLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    var numbers = inputValue.trim().match(regexNumberOnly).join('');
    var startIndex = numbers.length - phoneLength;
    var value = numbers.slice(startIndex, numbers.length);
    return value;
  };

  var inputmaskPhone = function inputmaskPhone() {
    var _inputmaskList = $('[type="tel"]');

    if (_inputmaskList.length) {
      _inputmaskList.each(function () {
        var _inputmask = $(this);

        _inputmask.inputmask({
          mask: "+7 (999) 999-99-99",
          onBeforeMask: function onBeforeMask(initialValue) {
            if (initialValue.length < 10) return;
            return filterPhoneNumber(initialValue);
          },
          onBeforePaste: function onBeforePaste(pastedValue) {
            if (pastedValue.length < 10) return;
            return filterPhoneNumber(pastedValue);
          }
        });
      });

      console.info('inputMask: [type="tel"] - runned');
    }
  };

  var selectizeDefault = function selectizeDefault() {
    var _selectizeList = $('.js-selectize');

    if (_selectizeList.length) {
      _selectizeList.each(function () {
        var _selectize = $(this);

        if (_selectize.hasClass('selectized')) {
          _selectize.destroy();
        }

        _selectize.selectize();
      });

      console.info('selectize: .js-selectize - перезапущен');
    }
  };

  /* Настройки для каруселей */
  var _slickSettings = {
    default: {
      centerMode: true,
      infinite: false,
      fade: true,
      adaptiveHeight: true
    },
    mainPage: {
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: false,
      arrows: true,
      responsive: [{
        breakpoint: 992,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 460,
        settings: {
          slidesToShow: 1
        }
      }, {
        breakpoint: 0,
        settings: {
          slidesToShow: 1
        }
      }]
    },
    banner: {
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      arrows: true
    }
  };
  /**
   * Универсальные настройки для slick
   * Всегда должен быть wrapper и в нем сама карусель
   * @extends [data-slick-nav] - class/id смежной карусели
   * @extends [data-autoplay-speed] - частота смена слайда (ms)
   * @extends [data-slick] - key настроек карусели
   * @extends .js-slick-prev - init стрелки назад, должен быть во wrapper
   * @extends .js-slick-next - init стрелки вперед, должен быть во wrapper
   * @extends .slick_init - скрывает карусель пока не загружен javascript
   * @example <div class="js-slick slick_init" data-slick="default" data-slick-nav=".some-slick" data-autoplay-speed="5000"></div>
   */

  var slickDefault = function slickDefault() {
    var _slickList = $('.js-slick');

    if (_slickList.length) {
      _slickList.each(function () {
        var _slickItem = $(this);

        if (_slickItem.hasClass('slick-initialized')) {
          _slickItem.slick('unslick');
        }

        var _wrap = _slickItem.parent();

        var _settingKey = _slickItem.data('slick') || "about";

        var _settings = _slickSettings[_settingKey];
        var autoplaySpeed = _slickItem.data('autoplay-speed') || false;
        var asNavFor = _slickItem.data('slick-nav') || false;

        var prevArrow = _wrap.find('.js-slick-prev');

        var nextArrow = _wrap.find('.js-slick-next');

        if (!_settings) {
          console.error("Неверно указан [data-slick]");
        }

        if (autoplaySpeed) {
          _settings.autoplay = true;
          _settings.autoplaySpeed = autoplaySpeed;
        }

        if (asNavFor) {
          _settings.asNavFor = $(asNavFor);
        }

        if (prevArrow.length || nextArrow.length) {
          _settings.prevArrow = prevArrow || false;
          _settings.nextArrow = nextArrow || false;
        } else {
          _settings.arrows = false;
        }

        $(_slickList).on('init', function (event, slick) {
          $('.js-slickNav').removeClass('is-hidden');
        });

        _slickItem.slick(_settings);
      });

      console.info('SlickCarousel: .js-slick - runned');
      $('.main-slider .js-slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var slide = $(this).find("[data-slick-index=".concat(nextSlide, "]"));
        $(slide).find('.js-count').text("".concat(nextSlide + 1));
      });
    }
  };

  var tooltipDefault = function tooltipDefault() {
    var _tooltipList = $('[data-toggle="tooltip_default"]');

    var template = '<div class="tooltip tooltip_default" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>';

    if (_tooltipList.lenght) {
      _tooltipList.each(function () {
        var _tooltip = $(this);

        _tooltip.tooltip({
          trigger: "hover",
          template: template
        });
      });

      console.info('Tooltip: [data-toggle="tooltip_default"] - runned');
    }
  };

  var headerComponent = function headerComponent() {
    if ($(window).width() > 767) {
      var window_width = $(window).width();
      console.log('window_width', window_width);
      $('.js-dropdown').hover(function () {
        $(this).children('[data-toggle="dropdown"]').click();
      }, function () {
        $(this).children('[data-toggle="dropdown"]').click();
      });
    }
    $(window).resize(function () {
      var window_width = $(window).width();
      console.log('window_width-resize', window_width);

      if ($(window).width() > 767) {
        $('.js-dropdown').hover(function () {
          $(this).children('[data-toggle="dropdown"]').click();
        }, function () {
          $(this).children('[data-toggle="dropdown"]').click();
        });
      }
    });
    $('.navbar-collapse').on('click', function () {
      $(document).mouseup(function (e) {
        var container = $(".navbar__nav");

        if (e.target != container[0] && container.has(e.target).length === 0) {
          $('.navbar-collapse').collapse('hide');
        }
      });
    });
  };

  var mainPage = function mainPage() {
    var screenWidth = $(window).width();
    /* Resize компонента */

    $(window).resize(function () {
      if (screenWidth == $(window).width()) return;
      screenWidth = $(window).width(); // ToDo...
    });
    /* Scroll компонента */

    $(window).scroll(function () {});
    $('.js-playVideo').on('click', function () {
      $(this).addClass('hidden');
      $(this).next('.video__content').children('video')[0].play();
    });
  };

  var demoFunc = function demoFunc() {
    // ToDo...
    console.info('demoFunc Inject');
  };

  window.elijah = {
    _fancyboxSettings: _fancyboxSettings,
    fancyboxDefault: fancyboxDefault,
    // запуск через вызов функции
    fancyboxMessage: fancyboxMessage,
    // запуск через вызов функции
    inputmaskPhone: inputmaskPhone,
    selectizeDefault: selectizeDefault,
    slickDefault: slickDefault,
    tooltipDefault: tooltipDefault,
    headerComponent: headerComponent,
    mainPage: mainPage,
    //removeIf(production)
    demoFunc: demoFunc //endRemoveIf(production)

  };

  function initFunc() {
    $(document).ready(function () {
      /* Скрипты необходимые только на конкретной странице */
      mainPage();
      /* Компоненты */

      headerComponent();
      /* Плагины */

      inputmaskPhone();
      selectizeDefault();
      slickDefault();
      tooltipDefault(); //removeIf(production)

      /* То что должно быть вырезано на проде. Начало */

      demoFunc();
      /* То что должно быть вырезано на проде. Конец */
      //endRemoveIf(production)
    });
  }

  try {
    if (window.frameCacheVars !== undefined) {
      BX.addCustomEvent("onFrameDataReceived", function () {
        initFunc();
      });
    } else {
      BX.ready(function () {
        initFunc();
      });
    }
  } catch (e) {
    initFunc();
  }

})));
