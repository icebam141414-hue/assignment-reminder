document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !email || !password) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  const user = {
    username,
    email,
    password,
    lineConnected: false
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("สมัครสมาชิกสำเร็จ 🎉");
  window.location.href = "login2.html";
});
