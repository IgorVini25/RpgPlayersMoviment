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

function createHide() {
  $('.squares').append(`<div class="square"></div>`)
  $('.square').draggable().resizable()
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

const zoomValue = document.querySelector('#zoom')
const mapDivContent = document.querySelector('.map .content')
function changeZoom() {
  mapDivContent.style.width = zoomValue.value * 100 + '%'
}

// let allTokensLight = false
// function handleTokenLight() {
//   if(selectedToken === null){
//       lightOnOff("all")
//       allTokensLight = !allTokensLight

//   } else {
//     $(".move-wrapper.selected").toggleClass("light").removeClass("selected");
//     selectedToken = null;
//   }
//   $(".move-wrapper.light").length === $(".move-wrapper").length
//     ? allTokensLight = true
//     : allTokensLight = false
// }

$(document).on('input', '#light', function () {
  $('#light + p').html($(this).val() + '%')
  $('.map .map-img img').css('filter', `brightness(${$(this).val() / 100})`)
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
