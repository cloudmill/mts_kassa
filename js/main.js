$(document).ready(function () {
  calc();
  text_left();
  slider();
  custom();
  popups();
  forms();
})
var calc = function () {
  var slider_calc;
  var init = function () {
    slider_calc = $('.main__calc__inpt').slider()
      .on('slide', calculate)
      .data('slider');
  }
  var calculate = function () {
    var val_calc = slider_calc.getValue()
    $('.main__calc__count__kass').text(val_calc);
    $('.main__calc__value .value').text((val_calc * 40000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    if (val_calc % 10 == 1 && parseInt(val_calc / 10) != 1) {
      $('.word_kass').text('касса')
    } else if (val_calc % 10 == 5 || val_calc % 10 == 6 || val_calc % 10 == 7 || val_calc % 10 == 8 || val_calc % 10 == 9 || val_calc % 10 == 0 || parseInt(val_calc / 10) == 1) {
      $('.word_kass').text('касс')
    } else {
      $('.word_kass').text('кассы')
    }
  }
  init();
}
var text_left = function () {
  var items = $('.left__text');
  for (var i = 0; i < items.length; i++) {
    items.eq(i).css('left', -$('.main').offset().left + "px")
    items.eq(i).css('margin-top', items.eq(i).width() / 2 + "px")
  }
}
var slider = function () {
  $('.main__slider__track').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    infinite: true,
    dots: true,
    arrows: false,
  })
  $('.main__slider__count__next').click(function () {
    $('.main__slider__track').slick('next')
  })
  $('.main__slider__count__num').text($('.main__slider__track').slideCount)
  $('.main__slider__track').on('beforeChange', function (event, slick, a, nextSlide) {
    $('.main__slider__count__current').text("0" + (nextSlide + 1))
  })
  ///////
  var init_slider_mobile = function () {
    if ($(window).width() <= 1024) {
      $('.main__banner__list').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        infinite: true,
        dots: true,
        arrows: false,
      })
    } else {
      if ($('.main__banner__list').slick())
        $('.main__banner__list').slick('unslick')
    }
  }
  init_slider_mobile()


}
var animate_open_close = function (args) {
  var item = args['item'] ? args['item'] : $('body'),
    close = args['close'] ? args['close'] : false,
    callback = args['callback'] ? args['callback'] : function () { };

  var time = 300;
  if (close || item.hasClass('active')) {
    item.removeClass('open')
    setTimeout(function () {
      item.removeClass('active')
    }, time);
  } else {
    item.addClass('active')
    setTimeout(function () {
      item.addClass('open')
    }, 0);
  }


  if (callback) {
    setTimeout(function () {
      callback();
    }, time);
  }
}
var click_t = false;
var custom = function () {
  $('.header__burger__but').click(function () {
    if (!click_t) {
      click_t = true;
      $('body').toggleClass('scroll');
      $(this).toggleClass('active');

      animate_open_close({
        'item': $('.header__burger__body'),
        'callback': function () {
          click_t = false;
        }
      });
    }
  })
}
var popups = function () {
  $('.js-popup').click(function (e) {
    e.preventDefault();
    $('.popup__item').removeClass('active')

    if (!$('.popup__wrapper').hasClass('active'))
      animate_open_close({
        item: $('.popup__wrapper')
      })
    $('#' + $(this).attr('href')).addClass('active')
  })
  $(document).on('click', function (e) {
    if (!$('.js-popup:hover').length > 0 &&
      !$('.popup__item:hover').length > 0) {
      animate_open_close({
        item: $('.popup__wrapper'),
        close: true
      })
      $('.popup__item').removeClass('active')
    }
  })
}
var forms = function () {
  $('[name=phone').mask("+7 (999) 99-99-999");

  $(document).on('submit', '#mess form', function (e) {
    e.preventDefault();
    var error = 0;
    var name = $(this).find('[name=name]')
    var phone = $(this).find('[name=name]')
    var pp = $(this).find('[name=pp]:checked')
    $(this).find('input').removeClass('error')
    if (!pp.length) {
      error++;
      pp.addClass("error");
    }
    if (name.val() == "") {
      error++;
      name.addClass("error");
    }
    if (phone.val() == "") {
      error++;
      name.addClass("error");
    }
    if (error > 0) {
      return false
    }
  })
  $(document).on('submit', '#loggin form', function (e) {
    e.preventDefault();
    var error = 0;
    var mail = $(this).find('[name=mail]')
    var pass = $(this).find('[name=pass]')
    $(this).find('input').removeClass('error')
    if (mail.val() == "" || !mail_right(mail.val())) {
      error++;
      mail.addClass("error");
    }
    if (pass.val() == "") {
      error++;
      pass.addClass("error");
    }
    if (error > 0) {
      return false
    }
  })
  $(document).on('submit', '#register_low form', function (e) {
    e.preventDefault();
    var error = 0;
    var name = $(this).find('[name=name]')
    var lastname = $(this).find('[name=lastname]')
    var secondname = $(this).find('[name=secondname]')
    var mail = $(this).find('[name=mail]')
    var phone = $(this).find('[name=name]')
    var name_org = $(this).find('[name=name_org]')
    var inn = $(this).find('[name=inn]')
    var pass = $(this).find('[name=pass]')
    var pass_conflirm = $(this).find('[name=pass_conflirm]')

    var pp = $(this).find('[name=pp]:checked')
    $(this).find('input').removeClass('error')
    if (!pp.length) {
      error++;
      pp.addClass("error");
    }
    if (mail.val() == "" || !mail_right(mail.val())) {
      error++;
      mail.addClass("error");
    }
    if (name.val() == "") {
      error++;
      name.addClass("error");
    }
    if (pass.val() == "") {
      error++;
      pass.addClass("error");
    }
    if (pass_conflirm.val() == "" || pass_conflirm != pass) {
      error++;
      pass_conflirm.addClass("error");
    }
    if (phone.val() == "") {
      error++;
      phone.addClass("error");
    }
    if (lastname.val() == "") {
      error++;
      lastname.addClass("error");
    }
    if (secondname.val() == "") {
      error++;
      secondname.addClass("error");
    }
    if (name_org.val() == "") {
      error++;
      name_org.addClass("error");
    }
    if (inn.val() == "") {
      error++;
      inn.addClass("error");
    }
    if (error > 0) {
      return false
    }
  })
  function mail_right(email) {
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email).toLowerCase());
  }
}