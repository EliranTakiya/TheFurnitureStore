if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("loggedIn");

    window.location.href = "login.html";

});