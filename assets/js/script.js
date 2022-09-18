let selectedToken = null
$('.move-wrapper').each((index, val) => {
  $(val).draggable();
  $(val).dblclick(() => {
    $(".move-wrapper").removeClass('selected')
    if (index !== selectedToken) {
      selectedToken = index;
      $(val).addClass('selected');
    } else {
      selectedToken = null
      $(val).removeClass('selected')
    }
  })
})