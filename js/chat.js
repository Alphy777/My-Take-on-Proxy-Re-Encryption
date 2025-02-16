document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username");
    const usersList = document.getElementById("active-users");

    // ✅ Display the logged-in user's name
    if (username) {
        document.getElementById("username").innerText = username;
    } else {
        document.getElementById("username").innerText = "Guest";
    }

    // ✅ Function to fetch and display only active users
    function fetchActiveUsers() {
        fetch("http://127.0.0.1:5000/active-users")
            .then(response => response.json())
            .then(users => {
                usersList.innerHTML = ""; // Clear previous list

                users.forEach(user => {
                    if (user !== username) { // ✅ Don't show yourself
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

    // ✅ Fetch active users initially
    fetchActiveUsers();

    // ✅ Refresh the active users list every 2 seconds
    setInterval(fetchActiveUsers, 2000);

    // ✅ Function to start a chat with a selected user
    function startChat(user) {
        alert(`Starting secure chat with ${user}`);
        // Later, we can implement chat functionality here
    }
});
