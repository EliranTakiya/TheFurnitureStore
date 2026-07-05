const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {

        localStorage.setItem("loggedIn", "true");

        // redirect after login
        window.location.href = "dashboard.html"; 
        // or "products.html"
    } else {
        document.getElementById("errorMessage").innerText = "Invalid login";
    }
});

