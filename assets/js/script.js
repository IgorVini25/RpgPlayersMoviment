// let tokensPos = []

let selectedToken = null
$('.move-wrapper').each((index, val) => {
  console.log(index);
  $(val).draggable();
  $(val).dblclick(() => {
    console.log(selectedToken, index)
    $(".move-wrapper").removeClass('selected')
    if (index !== selectedToken) {
      selectedToken = index;
      $(val).addClass('selected');
    } else {
      selectedToken = null
      $(val).removeClass('selected')
    }
  })
}
)

