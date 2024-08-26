var loginBtn = document.getElementById("loginbtn");
var registerBtn = document.getElementById("registerbtn");
var loginForm = document.getElementById("login");
var registrationForm = document.getElementById("registration1");

function login() {
    loginForm.style.left = "5px";
    registrationForm.style.right = "-520px";
    loginBtn.classList.add("whitebtn");
    registerBtn.classList.remove("whitebtn");
}

function register() {
    loginForm.style.left = "-510px";
    registrationForm.style.right = "5px";
    registerBtn.classList.add("whitebtn");
    loginBtn.classList.remove("whitebtn");
}
