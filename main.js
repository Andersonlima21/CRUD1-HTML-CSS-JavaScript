//Adiciona classe active ao meu modal quando o OpenModal for chamado
const openModal = () => document.getElementById('modal')
    .classList.add('active')

//Retira a classe active quando o closeModal for chamado
const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

//Botão cadastrar cliente espera o evento de click para executar o openModal
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

//modalClose é o meu botão "X" para fechar a janela, aqui o botão irá esperar o click para executar a função do closeModal
document.getElementById('modalClose')
    .addEventListener('click', closeModal)