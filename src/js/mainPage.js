export const mainPage = () => {
  let screenWidth = $(window).width()

  /* Resize компонента */
  $(window).resize(() => {
    if (screenWidth == $(window).width()) return

    screenWidth = $(window).width()

    // ToDo...
  })

  /* Scroll компонента */
  $(window).scroll(() => {

  })

  $('.js-playVideo').on('click', function (){
    $(this).addClass('hidden');
    $(this).next('.video__content').children('video')[0].play();
  });

};
