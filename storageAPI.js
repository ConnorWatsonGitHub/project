function saveTasks() {
    try {
        //clearing the storeage before saving new set of tasks
        window.localStorage.clear();
        //initializing the text that will be saved in the local storage
        let textToSave = "";
        //the DOM element that holds the tasks 
        let taskList = document.querySelector("ul");
        //for each task add the name of the task to the textToSave
        for (let node of taskList.childNodes) {
            //all tasks will be seperated by a delimiter of the '|' character
            textToSave = textToSave + node.textContent.trim().slice(0, -6) + "|";
        }
        //save the Tasks
        window.localStorage.setItem("tasks", textToSave);
        //promting the user that the tasks saved successfully
        promtMsg.className = "success";
        promtMsg.textContent = "Uncompleted Tasks Successfully Saved to Local Storage";

    } catch (error) {
        //setting the text in the P element with id error to display the error that occurs
        promtMsg.className = "error";
        promtMsg.textContent = "An Error Occured While Saving Tasks to Local Storage: " + error;
    }
}

//save the DOM object for the savebtn element
let saveBtn = document.getElementById("save");
//setting an event listener for the savebtn
saveBtn.addEventListener("click", saveTasks);