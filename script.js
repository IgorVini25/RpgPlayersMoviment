// let tokensPos = []
let alreadyMove = false

let forEach_I = 0
let selectedToken = null

moveElements()
function moveElements() {
  const moveWrapper = $('.move-wrapper')
  $.each(
    moveWrapper,
    (index, val) => {
      val.dataset.id = forEach_I
      $(`.move-wrapper[data-id="${val.dataset.id}"]`).draggable({
        refreshPositions: true,
        containment: 'parent'
      })

      $(val).dblclick(() => {
        if (selectedToken) {
          $(`.move-wrapper[data-id="${selectedToken}"]`).removeClass('selected')
        }
        if (val.dataset.id !== selectedToken) {
          selectedToken = val.dataset.id
          $(val).addClass('selected')
        } else {
          selectedToken = null
          $(val).removeClass('selected')
        }
      })

      forEach_I++
    },
    (forEach_I = 0)
  )
}
