document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username");
    const userElement = document.getElementById("username");
    const usersList = document.getElementById("active-users");

    // ✅ Display logged-in username
    if (username && userElement) {
        userElement.innerText = username;
    } else {
        if (userElement) userElement.innerText = "Guest";
    }

    // ✅ Function to fetch and display active users
    function fetchActiveUsers() {
        fetch("http://127.0.0.1:5000/active-users")
            .then(response => response.json())
            .then(users => {
                if (!usersList) return;

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
    }

        // ✅ Logout functionality
        document.getElementById("logout-btn").addEventListener("click", function () {
            localStorage.removeItem("username");
            window.location.href = "login.html"; // Redirect to login page
        });
    

    // ✅ Fetch active users every 5 seconds
    fetchActiveUsers();
    setInterval(fetchActiveUsers, 5000); // Refresh users every 5s

    // ✅ Function to start a chat with a selected user
    function startChat(user) {
        alert(`Starting secure chat with ${user}`);
        // Here, we can later implement chat functionality
    }

});
