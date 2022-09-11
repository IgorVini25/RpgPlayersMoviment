// let tokensPos = []
let alreadyMove = false

let forEach_I = 1
let selectedToken = null

moveElements()
function moveElements() {
  const moveWrapper = document.querySelectorAll('.move-wrapper')
  moveWrapper.forEach(el => {
    el.dataset.id = forEach_I

    el.addEventListener('dblclick', () => {
      if (selectedToken) {
        document
          .querySelector(`.move-wrapper[data-id="${selectedToken}"]`)
          .classList.remove('selected')
      }
      if (el.dataset.id !== selectedToken) {
        selectedToken = el.dataset.id
        el.classList.add('selected')
      } else {
        selectedToken = null
        el.classList.remove('selected')
      }
    })

    let timer
    addTokenSelectionMobile()
    function addTokenSelectionMobile() {
      el.addEventListener('touchstart', e => {
        console.log('comeco')
        timer = setTimeout(() => {
          if (selectedToken) {
            document
              .querySelector(`.move-wrapper[data-id="${selectedToken}"]`)
              .classList.remove('selected')
          }
          if (el.dataset.id !== selectedToken) {
            selectedToken = el.dataset.id
            el.classList.add('selected')
          } else {
            selectedToken = null
            el.classList.remove('selected')
          }
        }, 500)
      })
      el.addEventListener('touchend', e => {
        console.log('cabo')
        if (timer) {
          clearTimeout(timer)
        }
      })
    }

    function onDrag({ movementX, movementY }) {
      let getStyle = window.getComputedStyle(el)
      let leftVal = parseInt(getStyle.left)
      let topVal = parseInt(getStyle.top)
      el.style.left = `${leftVal + movementX}px`
      el.style.top = `${topVal + movementY}px`
    }

    function onDragMobile(event) {
      el.removeEventListener('touchstart', () => {})
      el.removeEventListener('touchend', () => {})
      let touchLocation = event.targetTouches[0]

      el.style.left = `${touchLocation.pageX}px`
      el.style.top = `${touchLocation.pageY}px`
    }

    var isSelected = false

    el.addEventListener('click', () => {
      isSelected = !isSelected
      if (isSelected) {
        el.classList.add('active')
        document.body.addEventListener('mousemove', onDrag)
        document.body.addEventListener('touchmove', onDragMobile)
        document.body.addEventListener('touchend', stopMoveMobile)
      } else {
        stopMove()
      }
    })

    function stopMove() {
      isSelected = false
      el.classList.remove('active')
      document.body.removeEventListener('mousemove', onDrag)
    }

    function stopMoveMobile() {
      addTokenSelectionMobile()
      isSelected = false
      document.body.removeEventListener('touchmove', onDragMobile)
    }

    forEach_I++
  })
}

forEach_I = 1
