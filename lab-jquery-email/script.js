$(document).ready(function () {
    // Function to update the email count
    function updateCount() {
      const count = $("#emailList li").length;
      $("#emailCount").text(count);
    }
  
    // Function to validate email using regex
    function isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }

    // Add email on form submit
    $("#emailForm").on("submit", function (event) {
      event.preventDefault();
  
      const email = $("#email").val().trim();
  
      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }
  
      $("#emailList").append("<li>" + email + "</li>");
      $("#email").val("");
      updateCount();
    });
  
    // Clear all emails when "Remove All" button is clicked
    $("#clearAll").on("click", function () {
      $("#emailList").empty();
      updateCount();
    });
  });
