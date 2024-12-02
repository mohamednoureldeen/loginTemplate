// signup
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let cpasswordInput = document.getElementById("cpassword");
let signupBtn = document.getElementById("signup");

// signin
let signInEmail = document.getElementById("signInEmail");
let signInPassword = document.getElementById("signInPassword");
let signInBtn = document.getElementById("signInBtn");

let users = []
users = JSON.parse(localStorage.getItem("users")) || [];


document.querySelector(".signin").style.display = "block";
document.querySelector(".signup").style.display = "none";


document.getElementById("showSignup").addEventListener("click", function() {
    document.querySelector(".signin").style.display = "none";
    document.querySelector(".signup").style.display = "block";
    document.getElementById("showSignup").style.display = "none";
    document.getElementById("showSignin").style.display = "inline";
});

document.getElementById("showSignin").addEventListener("click", function() {
    document.querySelector(".signup").style.display = "none";
    document.querySelector(".signin").style.display = "block";
    document.getElementById("showSignin").style.display = "none";
    document.getElementById("showSignup").style.display = "inline";
});


function signup() {
    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");
    let rePasswordError = document.getElementById("rePasswordError");
    let successMessage = document.getElementById("successMessage");

    let hasError = false;

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    let passwordPattern = /^\d{6,}$/; 

    
    if (!nameInput.value) {
        nameError.innerText = "Please enter your name.";
        hasError = true;
    } else {
        nameError.innerText = "";
    }


    if (!emailInput.value) {
        emailError.innerText = "Please enter your email.";
        hasError = true;
    } else if (!emailPattern.test(emailInput.value)) {
        emailError.innerText = "Please enter a valid email address.";
        hasError = true;
       emailInput.classList.add("is-invalid");
    } else {
        emailError.innerText = "";
    }

    
    if (!passwordInput.value) {
        passwordError.innerText = "Please enter your password.";
        hasError = true;
    } else if (!passwordPattern.test(passwordInput.value)) {
        passwordError.innerText = "Password must contain only numbers and be at least 6 digits long.";
        hasError = true;
    } else {
        passwordError.innerText = "";
    }

    if (!cpasswordInput.value) {
        rePasswordError.innerText = "Please enter your confirm password.";
        hasError = true;
    } else if (passwordInput.value !== cpasswordInput.value) {
        rePasswordError.innerText = "Passwords do not match.";
        hasError = true;
    } else {
        rePasswordError.innerText = "";
    }

    if (hasError) {
        return;
    }

    let existingUser = users.find(user => user.email === emailInput.value);
    if (existingUser) {
        emailError.innerText = "Email already exists!";
        return;
    }


    let user = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    successMessage.innerText = "Registration successful!";
    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    cpasswordInput.value = "";

    document.querySelector(".signup").style.display = "none";
    document.querySelector(".signin").style.display = "block";
    document.getElementById("showSignup").style.display = "inline";
    document.getElementById("showSignin").style.display = "none";
}
signupBtn.addEventListener("click", signup);


function signIn() {
    let signInEmailValue = signInEmail.value;
    let signInPasswordValue = signInPassword.value;

    let signInEmailError = document.getElementById("signInEmailError");
    let signInPasswordError = document.getElementById("signInPasswordError");
    
    signInEmailError.innerText = "";
    signInPasswordError.innerText = "";

    let hasError = false;

    if (!signInEmailValue) {
        signInEmailError.innerText = "Please enter your email.";
        hasError = true;
    }

    if (!signInPasswordValue) {
        signInPasswordError.innerText = "Please enter your password.";
        hasError = true;
    }

    if (hasError) {
        return;
    }

    let user = users.find(user => user.email === signInEmailValue && user.password === signInPasswordValue);

    if (user) {
        localStorage.setItem('currentUser', user.name);
        window.location.href = "user.html";
    } else {
        alert("Invalid email or password.");
    }
}
signInBtn.addEventListener("click", signIn);



