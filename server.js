const axios = require("axios");
const fs = require("fs");

const ACCESS_TOKEN = "w6bwmA9WjHhkTOEIm0z7GhzTKBLEGE68Ros58/BABx2wy9Fr2GloQjoK97+bhLGcqGchunW+qbglxz9AkF9jxZMdjSLD4FeEnLy8NO7mPiJTUoyhoBkK7n9upzvQS5HJvugcn8OIRe8/wrbjbiwsLAdB04t89/1O/w1cDnyilFU=";

/////////////////////////////////////////////////////////
// โหลดงาน
/////////////////////////////////////////////////////////
function loadTasks() {
  const raw = fs.readFileSync("tasks.json");
  return JSON.parse(raw);
}

/////////////////////////////////////////////////////////
// บันทึกงาน
/////////////////////////////////////////////////////////
function saveTasks(tasks) {
  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
}

/////////////////////////////////////////////////////////
// ส่งข้อความ
/////////////////////////////////////////////////////////
async function broadcast(text) {
  try {
    await axios.post(
      "https://api.line.me/v2/bot/message/broadcast",
      {
        messages: [{ type: "text", text }]
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ ส่ง:", text);
  } catch (error) {
    console.log("❌ ส่งไม่สำเร็จ:", error.response?.data || error.message);
  }
}

/////////////////////////////////////////////////////////
// เช็คทุก 1 นาที
/////////////////////////////////////////////////////////
setInterval(() => {
  const now = new Date();
  const tasks = loadTasks();

  tasks.forEach((task) => {
    const due = new Date(task.dueDate); // ⭐ แก้ตรงนี้
    const notify = new Date(due.getTime() - 24 * 60 * 60 * 1000);

    if (!task.notified && now >= notify) {
      broadcast(`📢 พรุ่งนี้ต้องส่ง: ${task.title}`);
      task.notified = true;
    }
  });

  saveTasks(tasks);
}, 60000);

console.log("🚀 ระบบแจ้งเตือนเริ่มทำงาน...");
