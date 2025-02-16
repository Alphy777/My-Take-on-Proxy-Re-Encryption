document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const logoutBtn = document.getElementById("logout-btn");

    // ✅ Handle Sign-up
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

            try {
                let response = await fetch("http://127.0.0.1:5000/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password })
                });

                let result = await response.json();
                if (result.status) {
                    alert("Registration successful! Please log in.");
                    signupForm.reset(); // ✅ Clear the signup form
                } else {
                    alert(result.error);
                }
            } catch (error) {
                console.error("Signup error:", error);
                alert("An error occurred. Please try again.");
            }
        });
    }

    // ✅ Handle Login
    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            let username = document.getElementById("login_username").value.trim();
            let password = document.getElementById("login_password").value.trim();

            if (!username || !password) {
                alert("Please enter both username and password.");
                return;
            }

            try {
                let response = await fetch("http://127.0.0.1:5000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password })
                });

                let result = await response.json();
                if (result.status === "success") {
                    localStorage.setItem("username", username);
                    localStorage.setItem("privateKey", result.private_key); // ✅ Store private key for decryption
                    window.location.href = "message.html"; // ✅ Redirect to chat
                } else {
                    alert(result.error);
                }
            } catch (error) {
                console.error("Login error:", error);
                alert("An error occurred. Please try again.");
            }
        });
    }

    // ✅ Handle Logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            let username = localStorage.getItem("username");

            fetch("http://127.0.0.1:5000/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.status);
                localStorage.removeItem("username");
                localStorage.removeItem("privateKey");
                window.location.href = "login.html"; // ✅ Redirect to login
            })
            .catch(err => console.error("Logout error:", err));
        });
    }
});
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload
    
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json()) 
    .then(data => {
        if (data.message) {
            alert("Login successful");
        } else {
            alert("Login failed: " + data.error);
        }
    })
    .catch(error => console.error("Login error:", error));
});