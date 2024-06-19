const allNotes = JSON.parse(localStorage.getItem("notes")) || [];

const createForm = document.querySelector(".add-note-form");

// Create note when submit button is clicked on form
createForm.submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // check if title or text is empty
  if (createForm.title.value === "" || createForm.text.value === "") {
    // Display the warning for 1 second
    document.querySelector(".warning").classList.toggle("hide");
    setTimeout(() => {
      document.querySelector(".warning").classList.toggle("hide");
    }, 1000);
  } else if (createForm.title.value.length > 25) {
    alert("Title should be less than 25 characters");
  } else if (createForm.text.value.length > 565) {
    alert("Text should be less than 565 characters");
  } else if (e.target.innerHTML.trim() === "Add note") {
    const date = new Date();
    const month = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "Novemember",
      "December",
    ];

    // creating the note object
    const noteObject = {
      id: Math.floor(Math.random() * 100000),
      title: createForm.title.value,
      text: createForm.text.value,
      date: `created: ${date.getDate()} ${
        month[date.getMonth()]
      }, ${date.getFullYear()}`,
    };

    // push the note object to the notes array
    allNotes.push(noteObject);
    localStorage.setItem("notes", JSON.stringify(allNotes));
    notes.displayNotes();

    createForm.title.value = "";
    createForm.text.value = "";
  } else if (e.target.innerHTML.trim() === "Edit note") {
    // check if the operation to perform is edit
    // get note to currently update
    let noteToUpdate = allNotes.filter((note) => {
      return note.id === Number(e.target.dataset.noteid);
    });

    noteToUpdate = noteToUpdate[0];
    // date object and month
    const date = new Date();
    const month = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "Novemember",
      "December",
    ];

    // change the values of the notes
    noteToUpdate.title = createForm.title.value;
    noteToUpdate.text = createForm.text.value;
    noteToUpdate.date = `updated: ${date.getDate()} ${
      month[date.getMonth()]
    }, ${date.getFullYear()}`;

    // save new edited notes to local storage
    localStorage.setItem("notes", JSON.stringify(allNotes));
    notes.displayNotes();

    // Reset the form
    createForm.submitBtn.innerHTML = "Add note";
    createForm.title.value = "";
    createForm.text.value = "";
  }
});
// when clicked on form reset button
createForm.reset.addEventListener("click", () => {
  createForm.submitBtn.innerHTML = "Add note";
});
// class of Note to handle all our notes methods such as displaying notes, updating and deleting
class Note {
  constructor(allNotes) {
    this.allNotes = allNotes;
  }

  // Function to display notes
  displayNotes(allNotes = this.allNotes) {
    // check if notes wrapper is empty
    String(allNotes) == String([])
      ? document.querySelector(".notes-wrapper").innerHTML
      : console.log("no");

    let notesHTML = [];
    allNotes.map((note) => {
      notesHTML.push(
        `<div class="note">
          <div class="heading">
            <h1 class="note-heading"> ${note.title} </h1>
            <p class="note-time">${note.date}</p>
          </div>
          <p class="note-text">
            ${note.text.slice(0, 110)}....
          </p>
          <div class="functions">
            <img
              src="./assets/icons/read.png"
              data-noteid="${note.id}"
              onClick="notes.previewNote(allNotes,Number(this.dataset.noteid))"
              alt="read"
              id="read-btn"
            />
            <img
              src="./assets/icons/edit.png"
              data-noteid="${note.id}"
              onClick="notes.updateNote(allNotes,Number(this.dataset.noteid))"
              alt="edit"
              id="edit-btn"
            />
            <img
              src="./assets/icons/delete.png"
              data-noteid="${note.id}"
              onClick="notes.deleteNote(allNotes, Number(this.dataset.noteid))"
              alt="delete"
              id="delete-note"
            />
          </div>
        </div>`
      );
    });
    document.querySelector(".notes-wrapper").innerHTML = notesHTML.join("");
  }

  // Function to update notes
  updateNote(allNotes = this.allNotes, id) {
    let noteToEdit = allNotes.filter((note) => {
      return note.id === id;
    });
    noteToEdit = noteToEdit[0]; //This is the note to edit

    createForm.title.value = noteToEdit.title;
    createForm.text.value = noteToEdit.text;

    createForm.submitBtn.innerHTML = "Edit note";
    createForm.submitBtn.dataset.noteid = noteToEdit.id;
  }

  // Function to delete notes
  deleteNote(allNotes, id) {
    let newNotes = allNotes.filter((note) => {
      return note.id != id;
    });
    // set new items to local storage
    localStorage.setItem("notes", JSON.stringify(newNotes));
    // refresh page after deleting
    window.location.reload();
    this.displayNotes(allNotes);
  }

  // function to preview notes
  previewNote(allNotes, id) {
    const noteToPreview = allNotes.filter((note) => {
      return note.id === id;
    });
    document.querySelector(".inst-wrapper").classList.add("hide");
    document.getElementById("preview-heading").innerHTML =
      noteToPreview[0].title;
    document.getElementById("preview-date").innerHTML = noteToPreview[0].date;
    document.getElementById("preview-text").innerHTML = noteToPreview[0].text;
  }
}

// calling the instance of the class Note to create a new object
const notes = new Note(allNotes);

// Display all notes
notes.displayNotes();

// toggle dialog function
document.getElementById("toggle-dialog").addEventListener("click", () => {
  document.getElementById("dialog").classList.toggle("hide");
});
