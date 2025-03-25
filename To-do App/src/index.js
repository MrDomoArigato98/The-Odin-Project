import "./reset.css";
import "./style.css";
import gitImg from "./assets/git.png";
import { format } from "date-fns";
import { Todo, createTodo } from "./todo";
import { store } from "./storage";
import { Project } from "./projects";

const date = new Date();
const stPattysDay = new Date("2020/03/17");

const displayNavigation = (function () {
  const projectsList = []; // This will contain the list of Project objects. Each Project object has a list of todo objects inside of it
  const addTodoDiv = document.getElementById("add-todo");
  const addTodoButtons = addTodoDiv.querySelectorAll("button");
  let defaultProject;
  let currentProject;
  const projectsLocalStorage = store.loadProjects();

  //Working with local storage should probably go at the top
  if (projectsLocalStorage[0] != null) {
    projectsLocalStorage.forEach((project, index) => {
      const storedProject = new Project(project.name);
      console.log("Loading " + project.name + " project from local storage");
      projectsList.push(storedProject);

      if (project.todos) {
        project.todos.forEach((todo) => {
          storedProject.push(todo);
        });
      }
      currentProject = storedProject;
    });
  } else {
    currentProject = new Project("default");
    projectsList.push(currentProject);
  }
  console.log(currentProject);

  const projectsListElement = document.getElementById("projects-list");

  console.log(projectsListElement);
  console.log(projectsList.name);

  const displayProjects = (projectsList) => {
    while (projectsListElement.firstChild) {
      projectsListElement.firstChild.remove();
    }
    projectsList.forEach((project) => {
      const listItem = document.createElement("li");
      const button = document.createElement("button");

      button.setAttribute("id", project.name);
      button.textContent = "# " + project.name;
      listItem.appendChild(button);

      projectsListElement.appendChild(listItem);
    });
  };

  const displayTodos = (project) => {
    //This should take in a project object, loop over the todos and create each of the elements
    const template = document.querySelector("#todo-template");
    const parent = document.querySelector(".todos-display");
    while (parent.firstChild) {
      parent.firstChild.remove();
    }
    project.todos.forEach((todo, index) => {
      const clone = template.content.cloneNode(true);
      clone.querySelector(".todo-title").textContent = todo.title;
      clone.querySelector(".due-date").textContent = todo.dueDate;
      clone.querySelector(".todo-description").textContent = todo.description;
      clone.querySelector(".todo").setAttribute(project.name, index);

      if (todo.priority == "Low") {
        clone.querySelector(".todo").classList.add("low");
      }
      if (todo.priority == "Medium") {
        // clone.classList.add("medium");
        clone.querySelector(".todo").classList.add("medium");
      }
      if (todo.priority == "High") {
        // clone.classList.add("medium");
        clone.querySelector(".todo").classList.add("high");
      }
      parent.appendChild(clone);
    });
    store.saveProject(project);

    projectsList.forEach((proj) => {
      store.saveProject(proj);
    });
  };

  const switchProject = (project) => {
    //This should swap out what the current project is on the page and display its todos
    currentProject = project;
    const title = document.getElementById("project");
    title.textContent = project.name;
    console.log(project);
  };

  // Buttons on each of the specific todo items. Uses event delegation
  const todoButtons = () => {
    const div = document.querySelector(".todos-display");
    console.log(div);
    div.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        console.log(event.target.classList);
        if (event.target.classList.contains("delete-todo")) {
          const todo = event.target.closest(".todo");
          let index = todo.getAttribute(currentProject.name);
          currentProject.deleteTodo(index);
          event.target.closest(".todo").remove();
          store.deleteProject(currentProject);
          store.saveProject(currentProject);
        } else if (event.target.classList.contains("view-todo")) {
          const todo = event.target.closest(".todo");
          const desc = todo.querySelector(".todo-description");
          desc.classList.toggle("hidden");
        }
        if (event.target.classList.contains("edit-todo")) {
          const dialog = document.getElementById("dialog");

          const todo = event.target.closest(".todo");
          let index = todo.getAttribute(currentProject.name);
          const projTodo = currentProject.todos[index];
          console.log(projTodo.title);

          dialog.querySelector("#edit-title").value = projTodo.title;
          const editTitle = dialog.querySelector("#edit-title");

          dialog.querySelector("#edit-description").value =
            projTodo.description;
          const editDesc = dialog.querySelector("#edit-description");

          dialog.querySelector("#edit-due-date").value = projTodo.dueDate;
          const editDueDate = dialog.querySelector("#edit-due-date");

          dialog.querySelector("#edit-priority-select").value =
            projTodo.priority;
          const editPrio = dialog.querySelector("#edit-priority-select");

          dialog.show();
          dialog.focus();

          const edit = document.getElementById("edit-btn");
          edit.addEventListener("click", function () {
            const title = dialog.querySelector("#edit-title").value;
            const description = dialog.querySelector("#edit-description").value;
            const dueDate = dialog.querySelector("#edit-due-date").value;
            const priority = dialog.querySelector(
              "#edit-priority-select"
            ).value;

            if (title && dueDate && priority) {
              // console.log(title, description, dueDate, priority)
              // const a = createTodo(title, description, dueDate, priority)
              // currentProject.push(a)
              // console.log(currentProject)
              projTodo.title = title;
              projTodo.description = description;
              projTodo.dueDate = dueDate;
              projTodo.priority = priority;
              store.deleteProject(currentProject);
              store.saveProject(currentProject);
              displayTodos(currentProject);
              console.log(projTodo);
              dialog.close();
            }
          });
          console.log(editTitle);
        }
      }
    });
  };
  //These are the buttons on the "Got More todo?" card
  addTodoButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (button.id == "cancel-btn") {
        console.log("cancel");
        resetInput();
      }
      if (button.id == "add-btn") {
        getInput();
        displayTodos(currentProject);
      }
    });
  });

  const projectButtons = () => {
    const div = document.querySelector(".left-nav");
    console.log(div);
    div.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        if (event.target.id == "add-projects") {
          const inputField = document.createElement("input");
          inputField.classList.add("project-input");
          const ul = document.getElementById("projects-list");
          ul.appendChild(inputField);

          inputField.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              if (inputField.value) {
                const projectName = inputField.value;
                if (
                  projectsList.some((project) => project.name == projectName)
                ) {
                  console.log("already exists");
                } else {
                  const newProject = new Project(projectName);
                  projectsList.push(newProject);
                  console.log(projectsList);
                  displayProjects(projectsList);
                  store.saveProject(newProject);
                }
              }
            }
          });
        } else {
          console.log("clicking ID: " + event.target.id);
          const project = projectsList.find(
            (proj) => proj.name == event.target.id
          );
          console.log(project);
          if (project) {
            switchProject(project);
            displayTodos(project);
          }
        }
      }
    });
  };

  const getInput = () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due-date").value;
    const priority = document.getElementById("priority-select").value;

    if (title && dueDate && priority) {
      console.log(title, description, dueDate, priority);
      const a = createTodo(title, description, dueDate, priority);
      currentProject.push(a);
      console.log(currentProject);
    }
  };

  const resetInput = () => {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("due-date").value = "";
    document.getElementById("priority-select").value = "";
  };

  switchProject(currentProject);
  displayTodos(currentProject);
  todoButtons();
  projectButtons();
  displayProjects(projectsList);
})();
