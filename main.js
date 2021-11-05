//Adiciona classe active ao meu modal quando o OpenModal for chamado
const openModal = () => document.getElementById('modal')
    .classList.add('active')

//Retira a classe active quando o closeModal for chamado
const closeModal = () => document.getElementById('modal')
    .classList.remove('active')


const tempClient = {
    nome: "Anderson2",
    email: "anderson@anderson",
    celular: "11222223333",
    cidade: "são paulo"
}

const getLocalStorage = () => JSON.parse(localStorage.getItem("db_client")) ?? [] //Pega oq tem no Banco de dados (LocalStorage) e transforma em JSON e armazena em uma variavel db_client --- No final inseri a validação ??, o codigo não for valido, eu retorno um array vazio
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient)) //seta os itens, e JSON vai transformar o meu db_client string ao eniar ao LocalStorage ---  //Criando um Local Storage, lembrando que temos a Key > Value

//Delete
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index,1)
    setLocalStorage(dbClient)
}

//Update
const updateCliente = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

//Read
const readClient = () => getLocalStorage()

//Create
const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push (client) //o push irá empurrar mais um (cliente) dentro do array
    setLocalStorage(dbClient)

}



//Botão cadastrar cliente espera o evento de click para executar o openModal
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

//modalClose é o meu botão "X" para fechar a janela, aqui o botão irá esperar o click para executar a função do closeModal
document.getElementById('modalClose')
    .addEventListener('click', closeModal)