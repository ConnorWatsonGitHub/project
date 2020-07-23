//All Functions Are at the top ----------------------------------------------------------------|

//function to sumbit the task -----------------------------------------------------------------|
//***Update for Phase 2, added passing the textbox input value as an arg***
function taskSubmit(newTaskText) {

    //checking if textbox is empty
    if (newTaskText !== '') {
        promtMsg.textContent = "";
        try {
            //validating the text entered
            if (newTaskText.includes("|")) {
                throw "Please do not include the '|' Character in task";
            }

            //keeping track of the total tasks for the progress bar
            totalTasks++;
            //progress Bar moves
            move();

            //assigning unordered list element as a DOM object
            let unorderedListElement = document.querySelector('ul');
            //assigning new elements as DOM objects
            let newTaskListElement = document.createElement('li');
            let newCheckboxElement = document.createElement('input');
            let newButtonElement = document.createElement('button');


            //assigning properties to the input DOM object
            newCheckboxElement.type = 'checkbox';
            newCheckboxElement.className = 'form-check-input';
            //assigning properties to the button
            newButtonElement.innerHTML = 'Delete';
            newButtonElement.className = "btn btn-dark";

            //appending the new list element to the onordered list
            unorderedListElement.appendChild(newTaskListElement);
            //appeneding the new checkbox to the list element
            newTaskListElement.appendChild(newCheckboxElement);

            //appending the text from the textboxelement to the li element (phase 2 update instead of grabbing the text here the text will be an arg for the function)
            newTaskListElement.appendChild(document.createTextNode(' ' + newTaskText));
            newTaskListElement.appendChild(newButtonElement);


            //clearing text from textbox after being entered
            textBoxInput.value = '';

            //adding event listeners to new elements
            newCheckboxElement.addEventListener('change', function () {
                //line through the list element it's text accociated with it
                moveSelectedElements(newCheckboxElement);
            });

            newButtonElement.addEventListener('click', function () {
                deleteSelectedElements(newButtonElement);
            });
        } catch (error) {
            //setting the text in the P element with id error to display the error that occurs
            promtMsg.className = "error";
            promtMsg.textContent = "An Error Occured While Adding Task: " + error;
        }
    }

}

//Deleting the selected element function ------------------------------------------------------------------|

function deleteSelectedElements(selectedElement) {
    //will clear the promt if it is present
    promtMsg.textContent = "";
    //keeping track of total tasks for the progress bar
    totalTasks--;
    if (selectedElement.parentElement.style.color === 'green') {
        completedTasks--;
    }
    //progress bar moves
    move();

    selectedListElement = selectedElement.parentElement;
    selectedListElement.remove();
}

//moving the selected variables to the bottom, changing colors, playing audio, crossing out function -----|
// *** Phase 2 update: move completed tasks to a different UL element
//      this allows new tasks to be added without going under the completed tasks
//      and only uncompleted tasks will be saved. ***
function moveSelectedElements(selectedElement) {
    //will clear the promt if it is present
    promtMsg.textContent = "";
    //keeping track of completed tasks for the progress bar
    completedTasks++;
    //progress bar moves
    move();
    //playing audio when selected (audio clip created using MIDI controllers in reaper)
    document.getElementById("audio").play();
    //grabing the completed list element DOM
    let unorderedListElement = document.getElementById("completedTasks");
    //disabling the checkbox element
    selectedElement.disabled = true;

    //setting the new parameters for the list element
    selectedListElement = selectedElement.parentElement;
    selectedListElement.style.color = 'green';
    selectedListElement.style.textDecoration = 'line-through';

    //appending to the completed list
    unorderedListElement.appendChild(selectedListElement);

}

//Progress Bar move function ------------------------------------------------------------------------------|
function move() {

    //grabbing the "complete" bar element
    barElement = document.getElementById('myBar');
    //calculating the precentage complete
    percentageComplete = Math.floor((completedTasks / totalTasks) * 100);
    //setting the new width and label on the progress bar
    barElement.style.width = percentageComplete + "%";
    if (percentageComplete === 100) {
        barElement.innerHTML = 'All Tasks Complete';
    } else if (!isNaN(percentageComplete)) {
        barElement.innerHTML = percentageComplete + "%";
    }

}
//this function will check local storage for tasks then add them to the task list.
function tasksFromLocalStorage() {
    //checking and displaying any tasks saved in the local storage
    let savedTasksString = window.localStorage.getItem("tasks");
    //checking if the savedTasksString is null (would occur if no tasks saved)
    if (savedTasksString != null) {
        //sperating the string into an array
        let savedTasksArray = savedTasksString.split("|");
        //walking through the array and adding each task (first and last entry will not be added as they are empty strings)
        for (var i = 0; i < savedTasksArray.length; i++) {
            taskSubmit(savedTasksArray[i]);
        }
    }
}

//End of functions-----------------------------------------------------------------------------------------|

//variables to keep track of completed and total tasks for progress bar
let completedTasks = 0;
let totalTasks = 0;
let percentageComplete = 0;


//targeted elements to rechieve event handlers 
let button = document.getElementById('submit');
let textBoxInput = document.getElementById('newTask');
let promtMsg = document.getElementById("promt");

//setting focus on the textbox when loading page
textBoxInput.focus();
//clearing anytext previously in text box when refreshing
textBoxInput.value = '';

//event Listeners ***Update for Phase 2, added passing the textbox input value as an arg***
button.addEventListener('click', function (event) {
    taskSubmit(textBoxInput.value);
});
textBoxInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        taskSubmit(textBoxInput.value);
    }
});


//Making sure the page has loaded before checking the local storage for tasks 
let body = document.querySelector("body");
body.addEventListener("load", tasksFromLocalStorage());