const map = document.querySelector('.map img')

function changeMap(url = null) {
  if (!url) {
    const url = prompt('Digite o link do mapa:')
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
        alert('Erro ao acessar a imagem')
      })
  } else {
    alert('Erro ao trocar o mapa')
  }
}

tokensDiv = document.querySelector('.tokens')

function addToken() {
  const file = prompt('Digite o caminho da Imagem')
  $('.tokens').append(`
    <div class="move-wrapper">
        <img src="./assets/img/tokens/${file}.png" class="token" />
    </div>
  `)
  $('.move-wrapper').each((index, val) => {
    $(val).unbind()
    $(val).draggable()
    $(val).click(() => {
      $('.move-wrapper').removeClass('selected')
      $(val).addClass('selected')
    })
  })
}

let squareId = 0
function createHide() {
  $('.squares').append(`<div class="square" data-id="${squareId}"></div>`)
  $('.square').draggable().resizable({
    resize: handleSquare
  })

  const lastSquare = $('.square:last-child')
  tabletopInfos.map.hideSquares.push({
    id: squareId,
    size: {
      width: $(lastSquare).css('width'),
      height: $(lastSquare).css('height')
    },
    position: {
      top: $(lastSquare).css('top'),
      left: $(lastSquare).css('left')
    }
  })

  squareId++
}

function handleSquare(event, ui) {
  if (event.type === 'resize') {
    tabletopInfos.map.hideSquares.forEach(square => {
      if (square.id == event.target.dataset.id) {
        square.size = ui.size
        square.position = ui.position
      }
    })
  }
  if (event.type === 'drag') {
    tabletopInfos.map.hideSquares.forEach(square => {
      if (square.id == event.target.dataset.id) {
        square.size = ui.size
        square.position = ui.position
      }
    })
  }
}

function changeTokenSize() {
  const size = $('#token-size').val()

  if ($('.move-wrapper.selected').length) {
    $('.move-wrapper.selected img').height(size)
    $('.move-wrapper.selected').removeClass('selected')
  } else {
    $('.move-wrapper img').height(size)
  }
}

function lockAndUnlockMap(btn) {
  if ($(btn).text() === 'Desbloquear mapa') {
    $(btn).text('Bloquear mapa')

    $('.map').draggable()
    $('.map').draggable('enable')
  } else {
    $(btn).text('Desbloquear mapa')
    $('.map').draggable('disable')
  }
}

let isTokensFloating = false
function floatToken(btn) {
  if ($(btn).text() === 'Flutuar tokens') {
    isTokensFloating = true
    $(btn).text('Parar de flutuar tokens')

    $('.map').on('dragstop', function (event, ui) {
      const topDif = ui.position.top - ui.originalPosition.top
      const leftDif = ui.position.left - ui.originalPosition.left

      if ($(ui.helper).hasClass('map')) {
        $('.move-wrapper').each((index, val) => {
          const tokenTop = $(val).css('top').slice(0, -2)
          const tokenLeft = $(val).css('left').slice(0, -2)

          $(val).css('top', `${tokenTop - topDif}px`)
          $(val).css('left', `${tokenLeft - leftDif}px`)
        })
      }
    })
  } else {
    $(btn).text('Flutuar tokens')
    isTokensFloating = false
  }
}

let currentZoom = 1
function changeZoom() {
  const zoomValue = $('#zoom').val()

  $('.move-wrapper img').each((index, val) => {
    const height = $(val).css('height').slice(0, -2)

    $(val).css('height', `${(height / currentZoom) * zoomValue}`)
  })

  $('.map .content').css('transform', `scale(${zoomValue})`)
  currentZoom = zoomValue
}

$(document).on('input', '#light', function () {
  $('#light + p').html($(this).val() + '%')
  $('.map').css('filter', `brightness(${$(this).val() / 100})`)
})

$(document).on('input', '#fog', function () {
  $('#fog + p').html($(this).val() + '%')
  $('.map .fog').css('opacity', `${$(this).val() / 100}`)
})

function invertToken() {
  $('.move-wrapper.selected').toggleClass('invert').removeClass('selected')
}

// function lightOnOff(token){
//   const mapSrc = $(".map .map-img img").attr("src")
//   const mapWidth = $(".map .map-img img").css("width")
//   const mapHeight = $(".map .map-img img").css("height")
//   const tokenMap = `<img class="token-map" src="${mapSrc}" width="${mapWidth}" height="${mapHeight}" />`

//   if(token === "all"){

//     allTokensLight
//       ? $(".move-wrapper .token-map").remove()
//       : $(".move-wrapper").append(tokenMap)

//   }

// }
