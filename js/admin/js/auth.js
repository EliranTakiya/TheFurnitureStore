const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "admin123") {

        localStorage.setItem("loggedIn", "true");

        window.location.href = "dashboard.html";

    } else {

        errorMessage.textContent = "Invalid username or password.";

    }

});