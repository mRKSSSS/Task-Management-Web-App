/* Project variables */
let arrTasks = {};
arrTasks.id = [];
arrTasks.title = [];
arrTasks.desc = [];
let countTasks = 0;

/* Create new task event */
document.getElementById("create").onclick = createTask;

/* Clear all tasks event */
document.getElementById("clearAll").onclick = deleteAllTasks;

/* Show tasks on first load*/
window.onload = LoadLocalStorage();

function createTask(){
    let titleTask = document.getElementById("title").value;
    let descTask = document.getElementById("desc").value;
    arrTasks.id.push(countTasks);
    arrTasks.title.push(titleTask);
    arrTasks.desc.push(descTask);       
    countTasks++;
    localStorage.setItem("arrTasks", JSON.stringify(arrTasks));
    showTasks();
}

function showTasks(){
    document.getElementById("taskList").innerHTML = '';
    for(let i=0; i<arrTasks.id.length; i++){
        document.getElementById("taskList").innerHTML += 
        `<div id="listItem" class="list-item">
         <h3>${arrTasks.title[i]}</h3> 
         <p>${arrTasks.desc[i]}</p>
         <button 
         onclick="deleteTask(${arrTasks.id[i]})">
         Delete</button>
         </div>`;
    }
}

function deleteAllTasks(){
    document.getElementById("taskList").innerHTML = '';
    arrTasks.id = [];
    arrTasks.title = [];
    arrTasks.desc = [];
    countTasks = 0;
    localStorage.clear();
}

function deleteTask(idTask){
    arrTasks.id.splice(idTask, 1);
    arrTasks.title.splice(idTask, 1);
    arrTasks.desc.splice(idTask, 1);
    countTasks--;
    reorganizeIds();
    localStorage.setItem("arrTasks", JSON.stringify(arrTasks));
    showTasks();
}

function reorganizeIds(){
    for(let i=0; i<countTasks; i++){
        arrTasks.id[i] = i;
    }
}

function LoadLocalStorage(){
    arrTasks = JSON.parse(localStorage.getItem("arrTasks"));
    if(arrTasks != null){
        countTasks = arrTasks.id.length;
    }else{
        arrTasks = {};
        arrTasks.id = [];
        arrTasks.title = [];
        arrTasks.desc = [];
        countTasks = 0;
    }
    showTasks();
}