// Make a get request to our api route that will return every book
$.get("/api/all", function(data) {
  // For each recipe that our server sends us back
  for (var i = 0; i < data.length; i++) {
    // Create a parent div to hold recipe data
    var wellSection = $("<div>");
    
    wellSection.addClass("well");
    // Add an id to the well to mark which well it is
    wellSection.attr("id", "recipe-well-" + i);
    $("#well-section").append(wellSection);

    $("#recipe-well-" + i).append("<h2 id='recipe_name'>" + (i + 1) + ": " + " " + data[i].name + "</h2>");
    $("#recipe-well-" + i).append("<h3 id='recipe_ingr'>Ingredients: " + data[i].ingredients + "</h4>");
    $("#recipe-well-" + i).append("<h3 id='recipe_cat'>Category: " + data[i].category + "</h4>");
    $("#recipe-well-" + i).append("<h3 id='recipe_cont'>Content: " + data[i].content + "</h4>");
    $("#recipe-well-" + i).append("<button class='delete' data-id='" + data[i].id + "'>DELETE</button>");
  }

  $(".delete").click(function() {
    $.ajax({
      method: "DELETE",
      url: "/api/recipes/" + $(this).attr("data-id")
    })
    .then(function() {
      console.log("Deleted Successfully!");
    });
    $(this).closest("div").remove();
  });

});