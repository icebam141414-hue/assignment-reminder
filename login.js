document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("ยังไม่มีผู้ใช้นี้ กรุณาสมัครสมาชิก");
    return;
  }

  if (username === user.username && password === user.password) {
    localStorage.setItem("isLogin", "true");
    window.location.href = "dashboard2.html";
  } else {
    alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
  }
});
