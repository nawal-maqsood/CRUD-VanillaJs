let count = localStorage.length; 

function add() {
    const input = document.getElementById("noteInput");
    const note = input.value; 

    if (note) { 
        localStorage.setItem(count, note); 
        count++; 
        input.value = ""; 
        display(); 
    }
}

function display() {
    const notes = document.getElementById("notesList");
    notes.innerHTML = ""; 

    for (let i = 0; i < localStorage.length; i++) { 
        const key = localStorage.key(i); 
        const text = localStorage.getItem(key); 
        notes.innerHTML += `
            <li>
                <span class="noteText">${text}</span>
                <button class="editButton" onclick="edit('${key}')">Edit</button>
                <button class="deleteButton" onclick="del('${key}')">Delete</button>
            </li>
        `; 
    }
}

function del(i) {
    alert("Do you want to delete?")
    localStorage.removeItem(i); 
    display(); 
}

function edit(i) {
    const current = localStorage.getItem(i); 
    const note = prompt("Edit your note:", current); 
    localStorage.setItem(i, note); 
    display(); 
}


document.addEventListener("DOMContentLoaded", function() {
    noteCount = localStorage.length; 
    displayNotes(); 
});
