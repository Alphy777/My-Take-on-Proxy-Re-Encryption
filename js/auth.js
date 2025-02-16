document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    // Handle Sign-up
    signupForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        let username = document.getElementById("signup_username").value;
        let password = document.getElementById("signup_password").value;
        let confirmPassword = document.getElementById("signup_password_re").value;

        // ✅ Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        let response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        let result = await response.json();
        if (result.status) {
            alert("Registration successful! Please log in.");
            // ✅ Clear the signup form
            document.getElementById("signup_username").value = "";
            document.getElementById("signup_password").value = "";
            document.getElementById("signup_password_re").value = "";
        } else {
            alert(result.error);
        }
    });

    // Handle Login
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        let username = document.getElementById("login_username").value;
        let password = document.getElementById("login_password").value;

        let response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        let result = await response.json();
        if (result.status) {
            alert("Login successful!");
            localStorage.setItem("username", username);
            window.location.href = "message.html"; // ✅ Redirect to chat
        } else {
            alert(result.error);
        }
    });
});
