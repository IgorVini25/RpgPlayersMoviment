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

let mapAlreadyMove = false 
let mapLeft = 0
let mapTop = 0
function moveMap(direction, multi = 1) {
  if(!mapAlreadyMove){
    map.classList.remove("before-move")
    mapAlreadyMove = !mapAlreadyMove
  }

  if(direction === 'left'){
    map.style.left = mapLeft - (10 * multi) + "px"
    mapLeft -= (10 * multi) 
  }
  
  if(direction === 'top'){
    map.style.top = mapTop - (10 * multi) + "px"
    mapTop -= (10 * multi) 
  }

  if(direction === 'bottom'){
    map.style.top = mapTop + (10 * multi) + "px"
    mapTop += (10 * multi) 
  
  }

  if(direction === 'right'){
    map.style.left = mapLeft + (10 * multi) + "px"
    mapLeft += (10 * multi) 
  }

}

const zoomValue = document.querySelector('#zoom')
function changeZoom() {
  if (widthAuto) {
    map.style.height = zoomValue.value + '%'
  } else {
    map.style.width = zoomValue.value + '%'
  }
}
