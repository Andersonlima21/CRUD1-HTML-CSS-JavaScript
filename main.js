const openModal = () => document.getElementById('modal')
    .classList.add('active')
/* Adiciona classe active ao meu modal quando o OpenModal for chamad */o

const closeModal = () => {
    clearFields() //limpa os campos quando for solicitado o closeModal
    document.getElementById('modal').classList.remove('active')}
/* Limpa os campos do Modal e depois fecha o modal */

const getLocalStorage = () => JSON.parse(localStorage.getItem("db_client")) ?? [] 
/*Pega oq tem no (LocalStorage) e transforma em JSON e armazena em uma variavel db_client --- No final insere a validação ?? Se o codigo não for valido (Nulo - Foi no LocalStorage e não achou infos), eu retorno um array vazio */

const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient)) 
/* seta os itens, e JSON vai transformar o meu db_client string ao enviar ao LocalStorage ---  //Criando um Local Storage, lembrando que temos a Key > Value */

/* Delete */
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1) /*splice vai pegar a partir do index recebido e apapar 1 (Caso eu mudasse o valor para 2 por exemplo, seria deletado a partir do index, mais 1)*/
    setLocalStorage(dbClient)} /* Mandando o banco novo já com o regisro deletado*/

/*Update */
const updateCliente = (index, client) => {
    const dbClient = readClient() /* dbCliente vai ler o readClient */
    dbClient[index] = client /* o index pego pelo dbClient, vai receber client, que será os dados atualizados */
    setLocalStorage(dbClient)} /* Enviando ao dbClient novamente */

/*Read */
const readClient = () => getLocalStorage()
/* readClient vai retornar o getLocalStorage quando for chamado */ 

/*Create */
const createClient = (client) => {
    const dbClient = getLocalStorage() /* Trazer clientes */
    dbClient.push(client) 
    /*o push irá empurrar mais um (cliente) dentro do array */
    setLocalStorage(dbClient)} /* Enviar clientes, informando a chave dbClient */

const isValidFields = () => {
    return document.getElementById("form").reportValidity()}
/* Valida se todos os campos seguem as regras definidas no HTML (neste caso o Required) */

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")} /* o forEach aqui fará uma validação campo por campo e ai eu passo o valor nulo (="")*/
/*vai igualar os campos igual a vazio*/

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value,
            /* Pegando os valores dos campos */
        }
/*se a regra reportValidity for comprida, o JSON acima será criado, com os dados inseridos no form modal*/

        const index = document.getElementById("nome").dataset.index
        if (index == "new") {
            createClient(client) //cria novo cliente e envia para o LocalStorage
            updateTable()
            closeModal()
        }else {
            updateCliente(index, client)
            updateTable()
            closeModal()
        }
        /* Metodo para diferenciar se meu botão de salvar em Criar novo cliente, ou editar novo cliente */
    }
}
const createRow = (client, index) => {
    const newRow = document.createElement('tr') 
    newRow.innerHTML = 
    /* Criando uma nova tr */
    `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}">Excluir</button>
        </td>
    `
    document.querySelector("#tableClient>tbody").appendChild(newRow) /* Inserindo newRow no tbody que está dentro do id TableClient, e agora minhas linhas fazem parte do HTML*/
    /*inserindo as informações acima preenchidas no tbody */
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))}
    /*vou pegar as tr, e em rows o ForEach irá passar por cada um dos elementos. Pega o pai (parentNode) e (removeChield) row */

const updateTable = () => {/*Quando updateTable for acionado */
    const dbClient = readClient() /*vai ler o que tem no LocalStorage */
    clearTable()
    dbClient.forEach(createRow) /*vai trazer o array com os JSON e vai enviar para o createRow -- E também estou capturando o indice, pois passei o index em creatRow para saber qual indice de cada row, para ajudar na construção dos meus botões (Edit/Delete, pois cada um terá seu indice) */
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById("nome").dataset.index = client.index
}

const editClient = (index) => { /* Recebendo o indice do elemento que quero alterar */
    const client = readClient()[index] /* Quando eu clicar em edit, ele vai ler readClient e vai me mostrar os dados no modal */
    client.index = index
    fillFields(client) /*vai preencher os campos com os dados obtidos acima no fillFields */
    openModal() /* Abrindo o modal ao acionar o botão de editar */
}

const editDelete = (event) => { //Tudo que não for botão, esse if não irá rodar
    if (event.target.type == 'button') { /* informando o target button */
        const [action, index] = event.target.id.split('-') /* Aqui vou definir as posições em ação e indice */
        if (action == 'edit') { /* Se minha action for igual a edit, então eu  */
            editClient(index)
        } else {
            deleteClient(index) /* Se minha ação não for edit, então só poderá ser o botão delete, */
            updateTable()
        }
    }
}
updateTable() /* Toda vez que o código for lido, a função updateTable será chamada (vai ler o que tem no LocalStorage, irá trazer um array com JSON e enviar ao createRow) */

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)
/*Botão cadastrar cliente espera o evento de click para executar o openModal */

document.getElementById('modalClose')
    .addEventListener('click', closeModal)
/*modalClose é o meu botão "X" para fechar a janela, aqui o botão irá esperar o click para executar a função do closeModal */

document.getElementById("salvar")
    .addEventListener('click', saveClient)
/*interação com o botão salvar do modal*/

document.querySelector('#tableClient>tbody')
    .addEventListener("click", editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)
