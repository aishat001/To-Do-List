//elements
const clear = document.querySelector(".clear");
const add = document.querySelector(".add");

const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST, id;
//getting items from local storage 
let data = localStorage.getItem("TODO");
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

//load lists to the user interface 
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}
//refreshing the storage
    clear.addEventListener("click", function () {
        localStorage.clear();
        location.reload();
    });

//todays date
    const today = new Date();
    const options = {weekday: 'long', month: 'short', day: 'numeric'};

    dateElement.innerHTML = today.toLocaleDateString("en-US", options);
//variables

function addToDo(toDo, id, done, trash) {
    if(trash) { return; }
    const DONE= done ? CHECK : UNCHECK;
    const LINE= done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}"> ${toDo} </p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>`;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

//using the enter key
    document.addEventListener("keyup", function(event) {
        if(event.keyCode == 13) {
            const toDo = input.value;
                //if input is not empty
            if(toDo) {
                addToDo(toDo);

                LIST.push({
                    name : toDo,
                    id : id,
                    done : false,
                    trash :false
                });
            //adding lists to Local-storage
            localStorage.setItem('TODO', JSON.stringify(LIST)); 
             id++;
            }
            input.value = "";
        }
    });

//using fa-plus icon 
add.addEventListener("click", function(event) {
    if(input.length > 3) {
        addToDo(toDo);
    }
});


//complete toDO
    function completeToDo(element) {
        element.classList.toggle(CHECK);
        element.classList.toggle(UNCHECK);
        element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

        LIST[element.id].done = LIST[element.id].done ? false : true;
    }
//remove ToDO
    function removeToDo(element) {
        element.parentNode.parentNode.removeChild(element.parentNode);

        LIST[element.id].trash = LIST[element.id].trash ? false : true;
    }
list.addEventListener("click", function(event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob == "complete") {
        completeToDo(element);
    }   else if(elementJob == "delete") {
        removeToDo(element);
    };
    //adding lists to Local-storage
    localStorage.setItem('TODO', JSON.stringify(LIST));
    });










