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

function onInput(type) {
  const width = document.querySelector('#width')
  const height = document.querySelector('#height')
  const map = document.querySelector('.map img')
  if (type === 'width-height') {
    if (width.checked && !height.checked) {
      map.classList.add('width-auto')
    } else {
      map.classList.remove('width-auto')
    }
  }
}
