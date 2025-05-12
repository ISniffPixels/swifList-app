import './style.css';

"use strict";

class TodoApp {
  constructor() {
    this.input = document.querySelector("input");
    this.submitBtn = document.querySelector(".subBtn");
    this.clearBtn = document.querySelector(".clearBtn");
    this.container = document.querySelector(".container");

    // CHECKS LOCAL STORAGE FOR STORED DATA
    this.storedNotes = localStorage.getItem("savedNotes")
      ? JSON.parse(localStorage.getItem("savedNotes"))
      : [];

    this.storedNotes.forEach((note) => {
      this.createTodoNote(note);
    });

    this.submitBtn.addEventListener("click", () => this.addTodoNote());
    document.addEventListener("keypress", (e) => {
      e.key === "Enter" && this.addTodoNote();
    });
  }

  // CREATES AN LI ELEMENT THAT WILL SERVE AS A NOTE
  createTodoNote(note) {
    const text = document.createElement("p");
    const todoNote = document.createElement("div");
    const checkNote = document.createElement("div");
    const deleteNote = document.createElement("div");

    text.textContent = note;
    deleteNote.textContent = "❌";
    checkNote.textContent = "✅";

    deleteNote.classList.add("deleteNote");
    checkNote.classList.add("checkNote");
    todoNote.classList.add("todoNote");

    this.container.appendChild(todoNote);
    todoNote.appendChild(deleteNote);
    todoNote.appendChild(checkNote);
    todoNote.appendChild(text);

    // HIGHLIGHTS ACCOMPLISHED TASKS
    checkNote.addEventListener("click", () => {
      todoNote.classList.toggle("todoNote--greenBG");
      text.style.textDecoration = todoNote.classList.contains(
        "todoNote--greenBG"
      )
        ? "line-through"
        : "none";
      localStorage.setItem("savedNotes", JSON.stringify(this.storedNotes));
    });

    // DELETES TASKS
    deleteNote.addEventListener("click", () => {
      this.container.removeChild(todoNote);
      this.storedNotes = this.storedNotes.filter((n) => n !== note);
      localStorage.setItem("savedNotes", JSON.stringify(this.storedNotes));
    });

    // CLEARS LOCALSTORAGE OF ALL DATA
    this.clearBtn.addEventListener("click", () => {
      this.container.innerHTML = "";
      localStorage.clear();
      this.storedNotes = [];
    });
  }

  // ADDS A NOTE, AND UPDATES THE LOCALSTORAGE API
  addTodoNote() {
    if (!this.input.value) return;
    this.createTodoNote(this.input.value);
    this.storedNotes.push(this.input.value);
    localStorage.setItem("savedNotes", JSON.stringify(this.storedNotes));
    this.input.value = "";
  }
}

const todoList = new TodoApp();
