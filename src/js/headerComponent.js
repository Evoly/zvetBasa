export const headerComponent = () => {
  $('.js-dropdown').hover(function(){
    $(this).children('[data-toggle="dropdown"]').click();
}, function(){
    $(this).children('[data-toggle="dropdown"]').click();
});
};
