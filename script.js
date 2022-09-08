// let tokensPos = []
let alreadyMove = false

let forEach_I = 1

moveElements()
function moveElements() {
  const moveWrapper = document.querySelectorAll('.move-wrapper')
  moveWrapper.forEach(el => {
    el.dataset.id = forEach_I

    function onDrag({ movementX, movementY }) {
      let getStyle = window.getComputedStyle(el)
      let leftVal = parseInt(getStyle.left)
      let topVal = parseInt(getStyle.top)
      el.style.left = `${leftVal + movementX}px`
      el.style.top = `${topVal + movementY}px`
    }

    function onDragMobile(event) {
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
      isSelected = false
      document.body.removeEventListener('touchmove', onDragMobile)
    }

    forEach_I++
  })
}

forEach_I = 1

tokensDiv = document.querySelector('.tokens')

function addToken() {
  const file = prompt('Digite o caminho da Imagem')

  forEach_I = 1

  tokensDiv.innerHTML += `
    <div class="move-wrapper">
      <div class="move">
        <img src="./img/tokens/${file}.png" class="token" />
      </div>
    </div>
  `

  // tokensPos = []
  moveElements()
}
