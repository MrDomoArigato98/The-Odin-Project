class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }
  push(todo) {
    this.todos.push(todo);
  }

  deleteTodo(index) {
    this.todos.splice(index, 1);
  }
}

export { Project };
