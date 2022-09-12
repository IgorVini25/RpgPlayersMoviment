const map = document.querySelector('.map img')

function changeMap() {
  const url = prompt('Digite o link do mapa:')

  if (url.trim() === '') {
    alert('Erro ao trocar o mapa')
  } else {
    if (url === 'ordem') {
      map.src = './img/maps/ordem.webp'
    } else {
      fetch(url)
        .then(function (data) {
          return data.blob()
        })
        .then(function (result) {
          const imgURL = URL.createObjectURL(result)
          map.src = imgURL
        })
        .catch(function (e) {
          alert('Erro ao acessar a imagem')
        })
    }
  }
}

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

  moveElements()
}

function removeToken() {
  if (!selectedToken) {
    alert('Selecione um token para excluir')
  } else {
    const token = document.querySelector(
      `.move-wrapper[data-id="${selectedToken}"]`
    )
    token.remove()
    selectedToken = null
  }
}

function changeTokenSize() {
  const size = document.querySelector('#token-size').value + 'px'
  if (!selectedToken) {
    const tokens = document.querySelectorAll('.move-wrapper .move img')
    tokens.forEach(token => {
      token.style.height = size
    })
  } else {
    const token = document.querySelector(
      `.move-wrapper[data-id="${selectedToken}"] .move img`
    )
    token.style.height = size

    document
      .querySelector(`.move-wrapper[data-id="${selectedToken}"]`)
      .classList.remove('selected')
    selectedToken = null
  }
}

let widthAuto = false
function onInput(type) {
  const width = document.querySelector('#width')
  const height = document.querySelector('#height')
  const map = document.querySelector('.map')
  if (type === 'width-height') {
    if (width.checked && !height.checked) {
      map.classList.add('width-auto')
      widthAuto = true
    } else {
      map.classList.remove('width-auto')
      widthAuto = false
    }
  }
}

const mapMoveBtn = document.querySelector('#map-move')
const mapImg = document.querySelector('.map img.map-move')
let mapImgClick
function moveMap() {
  if (mapMoveBtn.checked) {
    mapImg.removeEventListener('click', mapImgClick)
    function onMove({ movementX, movementY }) {
      let getStyle = window.getComputedStyle(mapImg)
      let leftVal = parseInt(getStyle.left)
      let topVal = parseInt(getStyle.top)
      mapImg.style.left = `${leftVal + movementX}px`
      mapImg.style.top = `${topVal + movementY}px`
    }

    function onMoveMobile(event) {
      let touchLocation = event.targetTouches[0]

      mapImg.style.left = `${touchLocation.pageX}px`
      mapImg.style.top = `${touchLocation.pageY}px`
    }

    var isSelected = false

    mapImgClick = () => {
      isSelected = !isSelected
      if (isSelected) {
        mapImg.classList.add('active')
        document.body.addEventListener('mousemove', onMove)
        document.body.addEventListener('touchmove', onMoveMobile)
        document.body.addEventListener('touchend', stopMoveMobile)
      } else {
        stopMove()
      }
    }

    mapImg.addEventListener('click', mapImgClick)

    function stopMove() {
      isSelected = false
      mapImg.classList.remove('active')
      document.body.removeEventListener('mousemove', onMove)
    }

    function stopMoveMobile() {
      isSelected = false
      document.body.removeEventListener('touchmove', onMoveMobile)
    }
  } else {
    console.log('a')
    mapImg.removeEventListener('click', mapImgClick)
  }
}

const zoomValue = document.querySelector('#zoom')
function changeZoom() {
  if (widthAuto) {
    mapImg.style.height = zoomValue.value + '%'
  } else {
    mapImg.style.width = zoomValue.value + '%'
  }
}
