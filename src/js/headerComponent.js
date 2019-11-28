export const headerComponent = () => {
  if ($(window).width() > 767) {
    const window_width = $(window).width();
    console.log('window_width', window_width);
    $('.js-dropdown').hover(function(){
      $(this).children('[data-toggle="dropdown"]').click();
  }, function(){
      $(this).children('[data-toggle="dropdown"]').click();
  });
};

  $(window).resize(function() {
    const window_width = $(window).width();
    console.log('window_width-resize', window_width);
  if ($(window).width() > 767) {
    $('.js-dropdown').hover(function(){
      $(this).children('[data-toggle="dropdown"]').click();
  }, function(){
      $(this).children('[data-toggle="dropdown"]').click();
  });
  }
});

$('.navbar-collapse').on('click', function() {
  $(document).mouseup(function(e) {
    const container = $(".navbar__nav");
    if (e.target != container[0] && container.has(e.target).length === 0) {
      $('.navbar-collapse').collapse('hide')
    }
  });
});

//search

$('.js-search').on('click', function(e) {
    const el = $(this);
    el.addClass('is-hidden');
    const form = $(this).parent('.search-form');
    form.addClass('is-show');

  if(form.closest('.navbar__nav')) {
    const widthBlock = form.closest('.navbar__nav').outerWidth() - form.parent().next().outerWidth()
    form.width(widthBlock);
  }
  $('.js-closeInput').on('click', function() {
      form.removeClass('is-show');
      form.width('');
      el.removeClass('is-hidden');
  });
});

// menu mobile



$('#navbar').on('shown.bs.collapse', function () {
  setTimeout(() => { $('body').addClass('modal-show');}, 500);
});

$('#navbar').on('hide.bs.collapse', function () {
  $('body').removeClass('modal-show');
});

//fixed navbar
const top = $('.js-fixedMenu').offset().top;
const translate = `translateY(${-top}px)`;
let scroll = $(window).scrollTop();
if (scroll > top) {
  setTimeout(() => { $(".js-fixedMenu").addClass("fixed") }, 2000);
}

$(window).scroll(function() {
   scroll = $(window).scrollTop();
  if (scroll >= top) {
    $(".js-fixedMenu").addClass("fixed");
  } else {
    $(".js-fixedMenu").removeClass("fixed");
  }
});






// function() {
//   $('#nd_title-search-form-res').removeClass('pointer');
//   $(".nd_searchButton-fake-open-form").addClass("hide_this");
//   $(".nd_searchButton").removeClass("hide_this");
//   $(".nd_searchButton").addClass("active");
//
//   $(".nd_searchButton_close_button").removeClass("hide_this");
//   $(".nd_searchButton_close_button").addClass("active");
//
//   var need_width = $(".nd_catalog_menu_cont").width();
//   if (!$(".nd_top-header-block-res").is(':hidden')) {
//     need_width = $(".nd_top-header-block-res").outerWidth();
//   }
//   $("#nd_title-search-input-res").show();
//   $("#nd_title-search-input-res").width(need_width);
//   $("#nd_title-search-input-res").css({
//     "padding-left": "21px"
//   });
//
// }

};
