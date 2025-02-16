document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ auth.js loaded"); // Debugging to check if auth.js is running
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const logoutBtn = document.getElementById("logout-btn");

    // ✅ Handle Signup
    if (signupForm) {
        signupForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            let username = document.getElementById("signup_username").value.trim();
            let password = document.getElementById("signup_password").value.trim();
            let confirmPassword = document.getElementById("signup_password_re").value.trim();

            if (!username || !password || !confirmPassword) {
                alert("All fields are required.");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            let response = await fetch("http://127.0.0.1:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            let result = await response.json();
            alert(result.status || result.error);
        });
    }

    // ✅ Handle Login
    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            let username = document.getElementById("login_username").value.trim();
            let password = document.getElementById("login_password").value.trim();

            let response = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            let result = await response.json();
            if (result.status === "Login successful") {
                localStorage.setItem("username", result.username);  // ✅ Store username from API
                window.location.href = "message.html"; // ✅ Redirect to chat
            } else {
                alert(result.error);
            }
        });
    }

    // ✅ Handle Logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            console.log("🔄 Logout button clicked");

            let username = localStorage.getItem("username");

            if (!username) {
                alert("You're not logged in!");
                return;
            }

            fetch("http://127.0.0.1:5000/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username })
            })
            .then(response => response.json())
            .then(data => {
                console.log("✅ Logout response:", data);
                localStorage.removeItem("username"); // ✅ Only remove the logged-out user's session
                window.location.href = "login.html"; // ✅ Redirect to login page
            })
            .catch(err => console.error("❌ Logout error:", err));
        });
    }
});
