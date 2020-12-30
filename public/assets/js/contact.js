
// // When user clicks email-btn
$("#email-btn").on("click", function (event) {
  event.preventDefault();

  // Make a newRecipe object
  var newEmailObject = {
    name: $("#contactName").val().trim(),
    contactInfo: $("#contactInfo").val().trim(),
    category: $("#category").val().trim(),
    content: $("#content").val().trim()
  };

  // Send an AJAX POST-request with jQuery
  $.post("/api/contact", newEmailObject)
    // On success, run the following code
    .then(function (data) {
      window.location.replace("/all");
      //  main().catch(console.error);
      console.log(data);
    });

  // Empty each input box by replacing the value with an empty string
  $("#contactName").val("");
  $("#contactInfo").val("");
  $("#category").val("");
  $("#content").val("");

});
