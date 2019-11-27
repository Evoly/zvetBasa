export const headerComponent = () => {
  if ($(window).width() > 767) {
    $('.js-dropdown').hover(function(){
      $(this).children('[data-toggle="dropdown"]').click();
  }, function(){
      $(this).children('[data-toggle="dropdown"]').click();
  });
};

  $(window).resize(function() {
  if ($(window).width() > 767) {
    $('.js-dropdown').hover(function(){
      $(this).children('[data-toggle="dropdown"]').click();
  }, function(){
      $(this).children('[data-toggle="dropdown"]').click();
  });
  }
});

};
