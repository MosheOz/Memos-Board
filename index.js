//creating the memo and and store it into local storage
function createMyMemo() {
    var textareaBox = document.getElementById("textareaBox");
    var dateBox = document.getElementById("dateBox");
    var timeBox = document.getElementById("timeBox");
    var newMemo = document.getElementById("newMemo");

    var textarea = textareaBox.value;
    var date = dateBox.value;
    var time = timeBox.value;
    var id = setId();

    textareaBox.value ="";
    dateBox.value="";

    textareaBox.style.borderColor = "";
    dateBox.style.borderColor = "";

    if (textarea == "") {
        alert("Memo Task Are Empty!");
        textareaBox.style.borderColor = "red";
        return;
    }

    if (date == "") {
        alert("The Date Is Missing!");
        dateBox.style.borderColor = "red";
        return;
    }

    var createMemo = document.createElement("div");
    var createTrashIconContainer = document.createElement("div");
    var trashIcon = document.createElement("span");
    var createText = document.createElement("div");
    var createDateAndTime = document.createElement("div");

    createMemo.id = "displayMemo";
    createTrashIconContainer.id = "createTrashIconContainer";
    trashIcon.className = "fa fa-times";
    trashIcon.id = "trash";
    trashIcon.onclick = function () {
        createMemo.remove();
        popIt(id);
    };
   
    createText.id = "displayText";
    createDateAndTime.id = "displayDateAndTime";

    newMemo.appendChild(createMemo);
    createMemo.appendChild(createTrashIconContainer);
    createTrashIconContainer.appendChild(trashIcon);
    createMemo.appendChild(createText);
    createMemo.appendChild(createDateAndTime);

    createText.innerText = textarea;
    createDateAndTime.innerText = date + "\n" + time;

    
    setJsonString(id, textarea, date, time);
    
}

//inserting new object (note) to the local storage
function setJsonString(id, textarea, date, time) {

    var note = {
        id: id,
        textarea: textarea,
        date: date,
        time: time,
    };

    var jsonString = localStorage.getItem("notes");
    var allMemoArray = JSON.parse(jsonString);
   
    if (allMemoArray === null)
    {
        allMemoArray=[];
    }
    allMemoArray.push(note);

    var jsonString = JSON.stringify(allMemoArray);
    localStorage.setItem("notes", jsonString);
  };

//loading the data from local storage  
function loadMemos() {

    var jsonString = localStorage.getItem("notes");
    var allMemoArray = JSON.parse(jsonString);
   
    if (allMemoArray !== null) {
        for (var i = 0; i < allMemoArray.length; i++) {
            getMemos(allMemoArray[i].id , allMemoArray[i].textarea, allMemoArray[i].date, allMemoArray[i].time);
        }
    }
}

//loadMemos() function calls this function, this function represent the data 
function getMemos(id, textarea, date, time) {
    var createMemo = document.createElement("div");
    var createTrashIconContainer = document.createElement("div");
    var trashIcon = document.createElement("span");
    var createText = document.createElement("div");
    var createDateAndTime = document.createElement("div");

    createMemo.id = "displayMemo";
    createTrashIconContainer.id = "createTrashIconContainer";
    trashIcon.className = "fa fa-times";
    trashIcon.id = "trash";
    trashIcon.onclick = function () {
        createMemo.remove();
        popIt(id);
    };
  
    createText.id = "displayText";
    createDateAndTime.id = "displayDateAndTime";

    newMemo.appendChild(createMemo);
    createMemo.appendChild(createTrashIconContainer);
    createTrashIconContainer.appendChild(trashIcon);
    createMemo.appendChild(createText);
    createMemo.appendChild(createDateAndTime);

    createText.innerText = textarea;
    createDateAndTime.innerText = date + "\n" + time;
}

//deleting specific memo by id 
function popIt(id) {

    var jsonString = localStorage.getItem("notes");
    var allMemoArray = JSON.parse(jsonString);

    for (var i = 0; i < allMemoArray.length; i++) {
       
        if (allMemoArray[i].id === id) {
            allMemoArray.splice(i, 1);
            }
    }
    localStorage.setItem('notes', JSON.stringify(allMemoArray));
}

//sets id for each object (for deleting specific object)
function setId() {

    var jsonString = localStorage.getItem("notes");
    var allMemoArray = JSON.parse(jsonString);
    
    var newId = Math.floor((Math.random() * 1000) + 1);

    if (allMemoArray === null) {
       return 1; 
    }

    while (!CheckIdisUnique(allMemoArray,newId)) {
        newId = Math.floor((Math.random() * 1000) + 1);
    }

    return newId;
   
}

 
//checks if id is Unique for each object
function CheckIdisUnique(arr,id){

    for (var i = 0; i < arr.length; i++) {
        
        if (arr[i].id === id) {
            return false;
            }
    }
    return true;
}
