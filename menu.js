const map = document.querySelector('.map img')

function changeMap() {
  const url = prompt('Digite o link do mapa:')

  if (url.trim() === '') {
    alert('Erro ao trocar o mapa')
  } else {
    map.src = `url('${url}') no-repeat`
  }
}
