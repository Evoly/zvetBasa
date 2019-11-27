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

// $('.navbar-collapse').on('click', function() {
//   $(document).mouseup(function(e) {
//     const container = $(".navbar__nav");
//     if (e.target != container[0] && container.has(e.target).length === 0) {
//       $('.navbar-collapse').collapse('hide')
//     }
//   });
// });

};
