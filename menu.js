const map = document.querySelector('.map img')

function changeMap() {
  const url = prompt('Digite o link do mapa:')

  if (url.trim() === '') {
    alert('Erro ao trocar o mapa')
  } else {
    if(url === "ordem"){
      map.src = "./img/maps/ordem.webp"
    } else {
      fetch(url).then(function(data){
        return data.blob()
      }).then(function (result){
        const imgURL = URL.createObjectURL(result)
        map.src = imgURL
      }).catch(function (e){
        alert("Erro ao acessar a imagem")
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

  // tokensPos = []
  moveElements()
}

function removeToken(){
  forEach_I = 1

  if(!selectedToken){
    alert("Selecione um token para excluir")
  } else {
    const token = document.querySelector(`.move-wrapper[data-id="${selectedToken}"]`)
    token.remove()
    selectedToken = null
    moveElements()
  }

}