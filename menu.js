const map = document.querySelector('.map')

function changeMap() {
  const url = prompt('Digite o link do mapa:')

  if (url.trim() === '') {
    alert('Erro ao trocar o mapa')
  } else {
    map.style.background = `url('${url}') no-repeat`
  }
}
