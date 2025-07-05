// Get references to the input fields from the signup form
const inputUsernameRegister = document.querySelector(".input-signup-username");
const inputPasswordRegister = document.querySelector(".input-signup-password");

// Function to handle signup and save user data into localStorage
function signup(event) {
    event.preventDefault();

  // Validate if either username or password is empty
  if (
    inputUsernameRegister.value === "" ||
    inputPasswordRegister.value === ""
  ) {
    alert("Please enter username or password!");
  } else {
    // Initialize a user object with username (email) and password attributes
    const user = {
      email: inputUsernameRegister.value, // using 'email' to match the login form logic
      password: inputPasswordRegister.value,
    };

    // Retrieve the existing user array from localStorage or initialize an empty array if no data exists
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the user already exists in the users array based on the email
    let userExists = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === user.email) {
        userExists = true;
        break; // Exit the loop if a match is found
      }
    }

    // If the user already exists, alert the user and prevent further signup
    if (userExists) {
      alert("This account already exists. Please choose another email.");
    } else {
      // Add the new user to the users array
      users.push(user);

      // Convert the updated users array to a JSON string
      let json = JSON.stringify(users);

      // Save the updated array back to localStorage
      localStorage.setItem("users", json);

      alert("Signup successful!");

      // Redirect to login page after successful registration
      window.location.href = "./login.html";
    }
  }
}
