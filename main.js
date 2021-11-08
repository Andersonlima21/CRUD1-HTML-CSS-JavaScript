//Adiciona classe active ao meu modal quando o OpenModal for chamado
const openModal = () => document.getElementById('modal')
    .classList.add('active')

//Limpa os campos do Modal e depois fecha o modal
const closeModal = () => {
    clearFields() //limpa os campos
    document.getElementById('modal').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem("db_client")) ?? [] //Pega oq tem no Banco de dados (LocalStorage) e transforma em JSON e armazena em uma variavel db_client --- No final inseri a validação ??, o codigo não for valido, eu retorno um array vazio
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient)) //seta os itens, e JSON vai transformar o meu db_client string ao eniar ao LocalStorage ---  //Criando um Local Storage, lembrando que temos a Key > Value

//Delete
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
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
    dbClient.push(client) //o push irá empurrar mais um (cliente) dentro do array
    setLocalStorage(dbClient)
}

const isValidFields = () => {
    return document.getElementById("form").reportValidity() //Irá verificar se todas as regras foram seguidas
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "") // vai igualar os campos igual a vazio
}

const saveClient = () => {//se a regra anterior do reportValidity for comprida, o JSON abaixo será criado a partir dos dados inseridos no form
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value,
        }
        const index = document.getElementById("nome").dataset.index
        if (index == "new") {
            createClient(client) //cria novo cliente e envia para o LocalStorage
            updateTable()
            closeModal()
        } else {
            updateCliente(index, client)
            updateTable()
            closeModal()
        }

    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}">Excluir</button>
        </td>
    `
    document.querySelector("#tableClient>tbody").appendChild(newRow)//inserindo as informações acima preenchidas no tbody
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {//Quando updateTable for acionado
    const dbClient = readClient() //vai ler o que tem no LocalStorage
    clearTable()
    dbClient.forEach(createRow) //vai trazer o array com os JSON e vai enviar para o createRow

}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById("nome").dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client) //vai preencher os campos com os dados obtidos acima no fillFields
    openModal()
}

const editDelete = (event) => { //Tudo que não for botão, esse if não irá rodar
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')
        if (action == 'edit') {
            editClient(index)
        } else {
            deleteClient(index)
            updateTable()

        }
    }
}
updateTable()

//Botão cadastrar cliente espera o evento de click para executar o openModal
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

//modalClose é o meu botão "X" para fechar a janela, aqui o botão irá esperar o click para executar a função do closeModal
document.getElementById('modalClose')
    .addEventListener('click', closeModal)

//interação com o botão salvar do modal 
document.getElementById("salvar")
    .addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody')
    .addEventListener("click", editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)
