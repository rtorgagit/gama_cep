const searchButton = document.querySelector('#form-cep > button')
const trashButton = document.querySelector('#btn-clean')
const input = document.querySelector('#cep')
const tbody = document.querySelector('#enderecos-tbody')
const messageCleanScreen = document.querySelector('#start-wrapper')

const addCepInfo = conteudo => {
  return tbody.innerHTML += `<tr>
      <td>${conteudo.cep}</td>
      <td>${conteudo.logradouro}</td>
      <td>${conteudo.bairro}</td>
      <td>${conteudo.localidade}/${conteudo.uf}</td>
    </tr>`
}

const showMessageCleanScreen = showMsg => {
  if(showMsg){
    messageCleanScreen.classList.remove('d-none')  
  } else {
    messageCleanScreen.classList.add('d-none')
  }
}

function retornoAPI(conteudo) {
  if (!("erro" in conteudo)) {
    addCepInfo(conteudo)
    showMessageCleanScreen(false)
  }
  else {
      input.value = ''
      alert("CEP não encontrado.");
  }
}

const searchCepAPI = event => {
  event.preventDefault();
  const cep = input.value 
  
  var validacep = /^[0-9]{8}$/;

  if(validacep.test(cep)) {
    var script = document.createElement('script');
    script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=retornoAPI';
    document.body.appendChild(script);
  }  else {
    alert("Formato de CEP inválido.");
  }
}

const clearScreen = event => {
  event.preventDefault();
  tbody.innerHTML = ''
  showMessageCleanScreen(true);
}

trashButton.addEventListener('click', clearScreen)

searchButton.addEventListener('click', searchCepAPI)


