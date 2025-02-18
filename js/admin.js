// document.addEventListener("DOMContentLoaded", function () {
//     console.log("✅ Admin panel loaded");

//     // ✅ Fetch and display registered users
//     function loadUsers() {
//         fetch("http://127.0.0.1:5001/admin/users")
//             .then(response => response.json())
//             .then(users => {
//                 const usersList = document.getElementById("registered-users");
//                 usersList.innerHTML = ""; // Clear previous list

//                 users.forEach(user => {
//                     let li = document.createElement("li");
//                     li.innerText = user;
//                     li.classList.add("user-item");

//                     // ✅ Remove User Button
//                     let removeBtn = document.createElement("button");
//                     removeBtn.innerText = "Remove";
//                     removeBtn.classList.add("remove-btn");
//                     removeBtn.onclick = () => removeUser(user);

//                     li.appendChild(removeBtn);
//                     usersList.appendChild(li);
//                 });
//             })
//             .catch(err => console.error("❌ Error loading users:", err));
//     }

//     // ✅ Add a new user (Admin action)
//     document.getElementById("add-user-btn").addEventListener("click", function () {
//         let username = document.getElementById("new-username").value.trim();
//         let password = document.getElementById("new-password").value.trim();

//         if (!username || !password) {
//             alert("Both fields are required.");
//             return;
//         }

//         fetch("http://127.0.0.1:5001/admin/add-user", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ username, password })
//         })
//         .then(response => response.json())
//         .then(data => {
//             alert(data.status || data.error);
//             loadUsers();  // Refresh user list
//         })
//         .catch(err => console.error("❌ Error adding user:", err));
//     });

//     // ✅ Remove a user
//     function removeUser(username) {
//         if (!confirm(`Are you sure you want to remove ${username}?`)) return;

//         fetch("http://127.0.0.1:5001/admin/remove-user", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ username })
//         })
//         .then(response => response.json())
//         .then(data => {
//             alert(data.status || data.error);
//             loadUsers();  // Refresh user list
//         })
//         .catch(err => console.error("❌ Error removing user:", err));
//     }

//     // ✅ Load users on page load
//     loadUsers();
// });
