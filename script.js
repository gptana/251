const registerModal = document.getElementById('registerModal');
const loginModal = document.getElementById('loginModal');

// เปิด modal
function openRegisterModal() {
  registerModal.style.display = 'block';
}
function openLoginModal() {
  loginModal.style.display = 'block';
}

// ปิด modal
function closeRegisterModal() {
  registerModal.style.display = 'none';
}
function closeLoginModal() {
  loginModal.style.display = 'none';
}

// ปิด modal เมื่อคลิกนอกกล่อง
window.onclick = function (event) {
  if (event.target === registerModal) {
    closeRegisterModal();
  }
  if (event.target === loginModal) {
    closeLoginModal();
  }
};

// ส่งข้อมูลสมัครสมาชิกไปยัง Google Apps Script
document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const username = document.getElementById('regUsername').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value.trim();

  if (!username || !email || !password) {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
    return;
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbyU8yDHkEH8Yd1GS_XfOaQLhvE2zFANv1h-guEuGf-iphnnRhLR2w36GbDww62iJ7Sg6A/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        action: "register", 
        username, 
        email, 
        password 
      })
    });

    const data = await response.json();
    if (data.status === "success") {
      alert("สมัครสมาชิกสำเร็จ!");
      closeRegisterModal();
    } else {
      alert("เกิดข้อผิดพลาด: " + data.message);
    }
  } catch (error) {
    alert("เกิดข้อผิดพลาดในการสมัครสมาชิก");
    console.error("Error:", error);
  }
});

// ตรวจสอบข้อมูลเข้าสู่ระบบ
document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const loginUsername = document.getElementById('loginUsername').value.trim();
  const loginEmail = document.getElementById('loginEmail').value.trim();
  const loginPassword = document.getElementById('loginPassword').value.trim();

  if (!loginUsername || !loginEmail || !loginPassword) {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
    return;
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbyU8yDHkEH8Yd1GS_XfOaQLhvE2zFANv1h-guEuGf-iphnnRhLR2w36GbDww62iJ7Sg6A/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        action: "login", 
        username: loginUsername, 
        email: loginEmail, 
        password: loginPassword 
      })
    });

    const data = await response.json();
    if (data.status === "success") {
      alert("เข้าสู่ระบบสำเร็จ!");
      closeLoginModal();
    } else {
      alert("เกิดข้อผิดพลาด: " + data.message);
    }
  } catch (error) {
    alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    console.error("Error:", error);
  }
});
