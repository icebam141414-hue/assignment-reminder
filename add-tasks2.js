// เช็กว่าไฟล์ JS ถูกโหลดจริง
console.log("✅ add-tasks2.js loaded");

// รอให้ DOM โหลดเสร็จก่อน
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addTaskForm");

  if (!form) {
    console.error("❌ ไม่พบฟอร์ม addTaskForm");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const subject = document.getElementById("subject").value.trim();
    const task = document.getElementById("task").value.trim();
    const time = document.getElementById("time").value;

    if (!subject || !task || !time) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    // ดึงงานเก่ามา (ถ้าไม่มีจะเป็น [])
    let tasks = [];
    try {
      tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    } catch (err) {
      console.error("❌ อ่าน tasks ไม่ได้", err);
      tasks = [];
    }

    // เพิ่มงานใหม่
    const newTask = {
      subject,
      task,
      time,
      createdAt: Date.now()
    };

    tasks.push(newTask);

    // บันทึกกลับเข้า localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    console.log("📦 tasks ล่าสุด:", tasks);

    alert("บันทึกงานเรียบร้อย ✅");

    // ล้างฟอร์ม
    form.reset();
  });
});
