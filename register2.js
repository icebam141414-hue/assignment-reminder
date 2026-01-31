document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // ตรวจสอบกรอกครบ
  if (!username || !email || !password) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  // สร้าง object ผู้ใช้
  const user = {
    username: username,
    email: email,
    password: password,
    lineConnected: false   // ไว้ใช้ต่อ LINE Notify
  };

  // บันทึกลง localStorage
  localStorage.setItem("user", JSON.stringify(user));

  alert("สมัครสมาชิกสำเร็จ 🎉");
  
  // ไปหน้า login
  window.location.href = "login2.html";
});
