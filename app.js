let notesArray = [];
let count = localStorage.length;

const load = () => {
    notesArray = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const noteData = localStorage.getItem(key);
        const [text, category, date] = noteData.split("|"); 
        notesArray.push({ key, text, category, date });
    }
};

const add = () => {
    const input = document.querySelector("#noteInput");
    const categorySelect = document.querySelector("#categorySelect");
    const noteText = input.value;
    const category = categorySelect.value;

    if (noteText) {
        const note = `${noteText}|${category}|${moment().format('YYYY-MM-DD HH:mm:ss')}`;
        localStorage.setItem(count, note); 
        count++;
        input.value = "";
        load(); 
        display();
        Swal.fire('Success', 'Note added successfully!', 'success');
    } else {
        Swal.fire('Error', 'Please enter a note.', 'error');
    }
};

const display = () => {
    const notesList = document.querySelector("#notesList");
    notesList.innerHTML = "";
    load(); 

    for (let i = 0; i < notesArray.length; i++) {
        const note = notesArray[i]; 
        notesList.innerHTML += `
            <li class="bg-white p-4 mb-2 rounded-md shadow flex justify-between items-center">
                <div>
                    <span class="block font-bold">${note.category}</span>
                    <span class="noteText block">${note.text}</span>
                    <small class="text-gray-500">${note.date}</small>
                </div>
                <div>
                    <button class="editButton bg-yellow-500 text-white px-2 py-1 rounded mr-2" onclick="edit(${note.key})">Edit</button>
                    <button class="deleteButton bg-red-500 text-white px-2 py-1 rounded" onclick="del(${note.key})">Delete</button>
                </div>
            </li>
        `;
    }
};

const del = (key) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "It will be deleted.!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem(key);
            load(); 
            display();
            Swal.fire('Deleted', 'Your note has been deleted.', 'success');
        }
    });
};

const edit = (key) => {
    const current = localStorage.getItem(key);
    const [currentText, currentCategory] = current.split("|"); 
    Swal.fire({
        title: 'Edit Note',
        input: 'text',
        inputValue: currentText,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            const updatedNote = `${result.value}|${currentCategory}|${moment().format('YYYY-MM-DD HH:mm:ss')}`;
            localStorage.setItem(key, updatedNote);
            load(); 
            display();
            Swal.fire('Updated!', 'Your note has been updated.', 'success');
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    load(); 
    display();
});
