const inputNovaTarefa = document.querySelector('.inputNovaTarefa');
const addTarefa = document.querySelector('.addTarefa');
const tarefas = document.querySelector('.tarefas');


function criaLista(){
    const li = document.createElement('li');
    return li;
}

inputNovaTarefa.addEventListener('keypress', function(e){
    if (e.keyCode===13){
        if (!inputNovaTarefa.value) return;
        criaTarefa(inputNovaTarefa.value);
    }
    
});

function limpaInput(){
    inputNovaTarefa.value ='';
    inputNovaTarefa.focus();
}

function criaTarefa(txtInput){
    const li = criaLista();
    li.innerHTML= txtInput;
    tarefas.appendChild(li);
    limpaInput();
    apagaTarefa(li);
    saveTarefa();
}

addTarefa.addEventListener('click', function(){
    if (!inputNovaTarefa.value) return;
    criaTarefa(inputNovaTarefa.value);
});

function apagaTarefa(li){
    li.innerText += '  ';
    const apagar = document.createElement('button');
    apagar.innerText='Apagar'
    li.appendChild(apagar);
    //apagar.classList.add('apagar')
    apagar.setAttribute('class', 'apagar');
}

document.addEventListener('click', function(e){
    const elemento = e.target;
    if (elemento.classList.contains('apagar')){
        elemento.parentElement.remove();
        saveTarefa();
    }
});

function saveTarefa(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas= [];

    for (let i of liTarefas){
       let tarefatexto = i.innerText;
       tarefatexto = tarefatexto.replace('Apagar', '').trim();
       listaDeTarefas.push(tarefatexto);
    }
    const tarefaJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefaJSON);
}

function addTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas= JSON.parse(tarefas);

    for(let t of listaDeTarefas){
        criaTarefa(t);
    }
}
addTarefasSalvas();