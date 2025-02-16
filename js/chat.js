document.addEventListener("DOMContentLoaded", function() {
    const username = localStorage.getItem("username");

      // ✅ Display logged-in username
      if (username) {
        document.getElementById("username").innerText = username;
    } else {
        document.getElementById("username").innerText = "Guest";
    }

    // ✅ Fetch active users and display them in contacts list
    fetch("http://127.0.0.1:5000/active-users")
        .then(response => response.json())
        .then(users => {
            const usersList = document.getElementById("active-users");
            usersList.innerHTML = ""; // Clear previous users

            users.forEach(user => {
                if (user !== username) { // Don't show yourself
                    let li = document.createElement("li");
                    li.innerText = user;
                    li.classList.add("user-item");
                    li.onclick = () => startChat(user);
                    usersList.appendChild(li);
                }
            });
        })
        .catch(err => console.error("Error loading active users:", err));

    // ✅ Logout functionality
    document.getElementById("logout-btn").addEventListener("click", function () {
        localStorage.removeItem("username");
        window.location.href = "login.html"; // Redirect to login page
    });

});
// ✅ Function to start a chat with a selected user
function startChat(user) {
    alert(`Starting secure chat with ${user}`);
}