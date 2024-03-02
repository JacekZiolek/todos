const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

const generateTemplate = (todo) => {
  const li = document.createElement("li");
  li.classList.add(
    "flex",
    "justify-between",
    "items-center",
    "py-4",
    "px-8",
    "mb-4",
    "rounded-2xl",
  );
  const span = document.createElement("span");
  span.innerText = todo;
  const i = document.createElement("i");
  i.classList.add("far", "fa-trash-alt", "delete");
  li.appendChild(span);
  li.appendChild(i);
  list.appendChild(li);
};
addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const todo = addForm.add.value.trim();
  if (todo.length) {
    generateTemplate(todo);
    addForm.reset();
  }
});

list.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    event.target.parentElement.remove();
  }
});

const filterTodos = (searchInput) => {
  Array.from(list.children).forEach((todo) => {
    const todoToLower = todo.textContent.toLowerCase();
    const termToLower = searchInput.toLowerCase();
    !todoToLower.includes(termToLower)
      ? todo.classList.add("hidden")
      : todo.classList.remove("hidden");
  });
};
const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};
const debouncedFilterTodos = debounce(filterTodos);
search.addEventListener("keyup", () => {
  const searchInput = search.value.trim().toLowerCase();
  debouncedFilterTodos(searchInput);
});
