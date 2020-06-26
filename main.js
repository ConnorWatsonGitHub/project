//All Functions Are at the top ----------------------------------------------------------------|

//function to sumbit the task -----------------------------------------------------------------|

function taskSubmit() {

    //checking if textbox is empty
    if (textBoxInput.value !== '') {

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
        //assigning the text box as a DOM Object
        let textBoxElement = document.getElementById('newTask');


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

        //appending the text from the textboxelement to the li element
        newTaskListElement.appendChild(document.createTextNode(' ' + textBoxElement.value));
        newTaskListElement.appendChild(newButtonElement);


        //clearing text from textbox after being entered
        textBoxInput.value = '';

        //adding event listeners to new elements
        newCheckboxElement.addEventListener('change', function () {
            //add something here to make it look nicer
            //line through the list element it's text accociated with it
            moveSelectedElements(newCheckboxElement);
        });

        newButtonElement.addEventListener('click', function () {
            deleteSelectedElements(newButtonElement);
        });
    }

}

//Deleting the selected element function ------------------------------------------------------------------|

function deleteSelectedElements(selectedElement) {
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

function moveSelectedElements(selectedElement) {
    //keeping track of completed tasks for the progress bar
    completedTasks++;
    //progress bar moves
    move();
    //playing audio when selected (audio clip created using MIDI controllers in reaper)
    document.getElementById("audio").play();
    //grabing the completed list element DOM
    let unorderedListElement = document.querySelector('ul');
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

//End of functions-----------------------------------------------------------------------------------------|


//variables to keep track of completed and total tasks for progress bar
let completedTasks = 0;
let totalTasks = 0;
let percentageComplete = 0;




//targeted elements to rechieve event handlers 
let button = document.getElementById('submit');
let textBoxInput = document.getElementById('newTask');

//setting focus on the textbox when loading page
textBoxInput.focus();
//clearing anytext previously in text box when refreshing
textBoxInput.value = '';

//event Listeners 
button.addEventListener('click', taskSubmit);
textBoxInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        taskSubmit();
    }
});