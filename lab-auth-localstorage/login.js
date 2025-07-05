// Get references to the input fields from the login form
const inputUsernameLogin = document.querySelector(".input-login-username");
const inputPasswordLogin = document.querySelector(".input-login-password");

// Function to handle login
function login(event) {
  event.preventDefault();

  // Validate if either username or password is empty
  if (inputUsernameLogin.value === "" || inputPasswordLogin.value === "") {
    alert("Please enter both username and password!");
  } else {
    // Retrieve the existing users array from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Initialize a flag to track whether the login is successful
    let loginSuccess = false;

    // Loop through the users array to check if the entered credentials are correct
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].email === inputUsernameLogin.value &&
        users[i].password === inputPasswordLogin.value
      ) {
        loginSuccess = true;
        break; // Exit the loop if a match is found
      }
    }

    // If login is successful, redirect to the home page or dashboard
    if (loginSuccess) {
      alert("Login successful!");
      window.location.href = "./welcome.html"; // Redirect to a homepage or dashboard
    } else {
      // If the user does not exist or credentials are incorrect, show an error message
      alert("Invalid email or password. Please try again.");
    }
  }
}
