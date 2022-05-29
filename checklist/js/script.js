// Banco de dados em Localhost (a fazer)
let banco = [
    {'objeto': 'Exemplo de ítem não feito', 'status': ''},
    {'objeto': 'Exemplo de ítem feito', 'status': 'checked'}
];

const getBanco = () => JSON.parse(localStorage.getItem('itens')) ?? []; // ?? significa se o .getItem('itens') estiver nulo, passa para o proximo. Objeto JSON está transformando o objeto em string

// Adicionar ítens
//argumento indice indicará a posição do texto dentro do array
const criaItem = (texto, status, indice) => {
    const item = document.createElement('label');
//    const lixeira = document.createElement('i');
    item.classList.add('objeto');
    item.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}>
        <div>${texto}</div>
        <input type="button" value="Excluir" data-indice=${indice}>
    `
    document.getElementById("itens").appendChild(item);
}



// Laço de repetição para ir removendo sempre o últmo filho (<div id="Itens">). Irá remover sempre a última div.
const removeTexto = () => {
    const itens = document.getElementById('itens');
    while  (itens.firstChild) {
        itens.removeChild(itens.lastChild);
    }
}

// Irá renderizar a tela pela variável banco.
const atualizar = () => {
    //criaItem("testando");
    //banco.forEach(criaItem);
    removeTexto();
    banco.forEach( (item, indice) => criaItem (item.objeto, item.status, indice)); //forEach para ler o banco.
}

const addItem = (evento) => {
    const tecla = evento.key;
    const txt = evento.target.value; // Retornará valor digitado
    console.log(tecla); //"Captura" a tecla pressionada.    
    if(tecla === 'Enter') {
        banco.push({'objeto': txt, 'status': ''})
        atualizar();
        evento.target.value = ''; //Ao enviar o texto, o evento retornará o valor vazio.
    }
}

const removeItem = (indice) => {
    banco.splice(indice, 1); //Splice é um recorte uma remoção de array, no caso o selecionado (clicado)
    atualizar();
}

const atualizarItem = (indice) => {
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';//Esse ternário representa se o status estiver vazio, marque-o ? (então) ao cliclar cheque-o. : (se não [já está marcado, no caso]), deixe vazio.
    atualizar();
}

const clickedItem = (evento) => {
    const elemento = evento.target;
        console.log(elemento); //Onde está sendo clicado.
        if(elemento.type === 'button') {
            const indice = elemento.dataset.indice; //pegando o elemento atual. Dataset é a propriedade usada para pegar o valor em "data-indice"
        removeItem(indice);
    }else if(elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

document.getElementById('novoItem').addEventListener('keypress',addItem);
document.getElementById('itens').addEventListener('click', clickedItem);

atualizar();