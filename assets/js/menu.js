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
      if (index !== selectedToken) {
        selectedToken = index
        $(val).addClass('selected')
      } else {
        selectedToken = null
      }
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

let widthAuto = false

$('#width').on('click', () => {
  $('.map').toggleClass('width-auto')
})

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
