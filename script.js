const inputField = document.querySelector(".input-field textarea");
const todoLists = document.querySelector(".todoLists");
const pendingNum = document.querySelector(".pending-num");
const clearButton = document.querySelector(".clear-button");

document.addEventListener("DOMContentLoaded", () => {
  function allTasks() {
    const tasks = document.querySelectorAll(".pending");
    pendingNum.textContent = tasks.length === 0 ? "no" : tasks.length;

    const allLists = document.querySelectorAll(".list");
    if (allLists.length > 0) {
      todoLists.style.marginTop = "20px";
      clearButton.style.pointerEvents = "auto";
    } else {
      todoLists.style.marginTop = "0px";
      clearButton.style.pointerEvents = "none";
    }
  }

  inputField.addEventListener("keyup", (e) => {
    const inputVal = inputField.value.trim();
    if (e.key === "Enter" && inputVal.length > 0) {
      const liTag = document.createElement("li");
      liTag.className = "list pending";
      liTag.innerHTML = `
        <input type="checkbox" />
        <span class="task">${inputVal}</span>
        <i class="uil uil-trash"></i>
      `;
      liTag.addEventListener("click", handleStatus);
      liTag.querySelector(".uil-trash").addEventListener("click", deleteTask);

      todoLists.appendChild(liTag);
      inputField.value = "";
      allTasks();
    }
  });

  function handleStatus(e) {
    const checkbox = e.target.querySelector("input") || e.target;
    checkbox.checked = !checkbox.checked;
    e.currentTarget.classList.toggle("pending");
    allTasks();
  }

  function deleteTask(e) {
    e.stopPropagation();
    e.currentTarget.parentElement.remove();
    allTasks();
  }

  clearButton.addEventListener("click", () => {
    todoLists.innerHTML = "";
    allTasks();
  });
});
