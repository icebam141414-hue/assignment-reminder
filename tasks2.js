document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("taskList");

  function getTasks() {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
  }

  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function getTaskStatus(dueTime) {
    const now = new Date();
    const due = new Date(dueTime);
    const diffDays = (due - now) / (1000 * 60 * 60 * 24);

    if (diffDays <= 1) return "task-red";
    if (diffDays <= 7) return "task-yellow";
    return "task-green";
  }

  function renderTasks() {
    const tasks = getTasks();
    taskList.innerHTML = "";

    if (tasks.length === 0) {
      taskList.innerHTML = "<p>📭 ยังไม่มีงาน</p>";
      return;
    }

    tasks.forEach((task, index) => {
      const div = document.createElement("div");

      const statusClass = getTaskStatus(task.time);
      div.className = `task-card ${statusClass}`;

      div.innerHTML = `
        <div class="task-info">
          <strong>${task.subject}</strong>
          <p>${task.task}</p>
          <p>⏰ ${new Date(task.time).toLocaleString()}</p>
        </div>

        <div class="task-actions">
          ${
            task.completed
              ? `<span class="done-label">ส่งแล้ว ✅</span>`
              : `<button class="done-btn" onclick="completeTask(${index})">
                   ส่งงานแล้ว
                 </button>`
          }
          <button class="edit-btn" onclick="editTask(${index})">แก้ไข</button>
          <button class="delete-btn" onclick="deleteTask(${index})">ลบ</button>
        </div>
      `;

      taskList.appendChild(div);
    });
  }

  window.completeTask = function (index) {
    const tasks = getTasks();
    tasks[index].completed = true;
    saveTasks(tasks);
    renderTasks();
  };

  window.deleteTask = function (index) {
    const tasks = getTasks();
    if (!confirm("ต้องการลบงานนี้ใช่ไหม?")) return;

    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
  };

  window.editTask = function (index) {
    const tasks = getTasks();
    const task = tasks[index];

    const newSubject = prompt("แก้ไขชื่อวิชา", task.subject);
    if (newSubject === null) return;

    const newTask = prompt("แก้ไขชื่องาน", task.task);
    if (newTask === null) return;

    task.subject = newSubject;
    task.task = newTask;

    saveTasks(tasks);
    renderTasks();
  };

  renderTasks();
});
