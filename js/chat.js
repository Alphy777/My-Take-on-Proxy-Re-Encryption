document.addEventListener("DOMContentLoaded", function() {
    const username = localStorage.getItem("username");

    // ✅ Display username in the profile section
    if (username) {
        document.getElementById("username").innerText = username;
    } else {
        document.getElementById("username").innerText = "Guest";
    }

    // ✅ Logout functionality
    document.getElementById("logout-btn").addEventListener("click", function () {
        localStorage.removeItem("username");
        window.location.href = "login.html"; // Redirect to login page
    });
});
