const map = document.querySelector('.map img');

function changeMap(url = null) {
  if(!url){
  const url = prompt('Digite o link do mapa:');
  } // definir mapa por codigo caso precise.
  if (url.trim() !== '') {
      fetch(url)
        .then(function (data) {
          return data.blob()
        })
        .then(function (result) {
          const imgURL = URL.createObjectURL(result)
          map.src = imgURL
        })
        .catch(function (e) {
          alert('Erro ao acessar a imagem');
        })
  } else {
    alert('Erro ao trocar o mapa');
  }
}

tokensDiv = document.querySelector('.tokens')

function addToken() {
  const file = prompt('Digite o caminho da Imagem')

  $(".tokens").append(`
    <div class="move-wrapper">
      <div class="move">
        <img src="./img/tokens/${file}.png" class="token" />
      </div>
    </div>
  `);
  //moveElements()
}

function removeToken() {// fix
    $(`.move-wrapper.selected`).remove()
    selectedToken = null;
}

function changeTokenSize() {
  const size = document.querySelector('#token-size').value + 'px'
  if (!selectedToken) {
    const tokens = $('.move-wrapper .move img')
    $.each(tokens, (index, val) => {
      $(val).height(size)
    })
  } else {
    $(`.move-wrapper[data-id="${selectedToken}"] .move img`).height(size)

    $(`.move-wrapper[data-id="${selectedToken}"]`).removeClass('selected')
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

function moveMap(direction, multi = 1) {
  const tokens = document.querySelectorAll('.move-wrapper')

  const tokensPosition = []

  tokens.forEach(token => {
    const tokenTop = token.style.top.slice(0, -2) || '50%'
    const tokenLeft = token.style.left.slice(0, -2) || '50%'

    tokensPosition.push({
      el: token,
      top: tokenTop,
      left: tokenLeft
    })
  })

  moveTokensByMapMove(direction, multi, tokensPosition)

  const getStyle = window.getComputedStyle(map)
  mapLeft = getStyle.left.slice(0, -2)
  mapTop = getStyle.top.slice(0, -2)

  if (direction === 'left') {
    map.style.left = Number(mapLeft) + 10 * multi + 'px'
    mapLeft += 10 * multi
  }

  if (direction === 'top') {
    map.style.top = Number(mapTop) + 10 * multi + 'px'
    mapTop += 10 * multi
  }

  if (direction === 'bottom') {
    map.style.top = Number(mapTop) - 10 * multi + 'px'
    mapTop -= 10 * multi
  }

  if (direction === 'right') {
    map.style.left = Number(mapLeft) - 10 * multi + 'px'
    mapLeft -= 10 * multi
  }
}

function moveTokensByMapMove(direction, multi, tokens) {
  tokens.forEach(token => {
    if (direction === 'left') {
      token.el.style.left = Number(token.left) + 10 * multi + 'px'
    }

    if (direction === 'top') {
      token.el.style.top = Number(token.top) + 10 * multi + 'px'
    }

    if (direction === 'bottom') {
      token.el.style.top = Number(token.top) - 10 * multi + 'px'
    }

    if (direction === 'right') {
      token.el.style.left = Number(token.left) - 10 * multi + 'px'
    }
  })
}

const zoomValue = document.querySelector('#zoom')
const mapDivContent = document.querySelector('.map .content')
function changeZoom() {
  // let zoomDiference

  if (widthAuto) {
    // if(zoomValue.value > Number(window.getComputedStyle(mapDivContent).height.slice(0, -2) / 100)){
    //   zoomValue.value == '1'
    //     ? zoomDiference = zoomValue.value - Number(window.getComputedStyle(mapDivContent).height.slice(0, -2) / 100)
    //     : zoomDiference = '/'
    // } else {
    //   zoomValue.value == '1'
    //     ? zoomDiference = zoomValue.value + Number(window.getComputedStyle(mapDivContent).height.slice(0, -2) / 100)
    //     : zoomDiference = '*'
    // }
    mapDivContent.style.height = zoomValue.value * 100 + '%'
  } else {
    mapDivContent.style.width = zoomValue.value * 100 + '%'
  }
  mapDivContent.style.top = 0
  mapDivContent.style.left = 0

  // const tokens = document.querySelectorAll(".move-wrapper")

  // tokens.forEach(token => {

  // })
}

let allTokensLight = true
function handleTokenLight() {
  if (!selectedToken) {
    const tokens = document.querySelectorAll('.move-wrapper')
    tokens.forEach(token => {
      allTokensLight
        ? token.classList.remove('light')
        : token.classList.add('light')
    }, (allTokensLight = !allTokensLight))
  } else {
    const tokenLight = document.querySelector(
      `.move-wrapper[data-id="${selectedToken}"]`
    )

    tokenLight.classList.toggle('light')
    tokenLight.classList.remove('selected')
    selectedToken = null
  }
}
