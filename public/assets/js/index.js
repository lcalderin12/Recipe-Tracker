// Search for recipe based on name
$("#search-btn").on("click", function(event) {
  event.preventDefault();
// Save recipe they searched for
  var recipeSearch= $("#recipe-search").val().trim();
// AJAX get request to our api, including the user's recipe in the url
  $.get("/api/recipes/" + recipeSearch, function(data) {
    console.log(data);
// Call our renderBooks function to add our recipes to the page
    renderRecipes(data);
  });
});

// When user hits the author-search-btn
$("ingredient-search-btn").on("click", function(event) {
  event.preventDefault();
// Save the author they typed into the author-search input
  var ingredientSearch = $("#ingredient-search").val().trim();
// Make an AJAX get request to our api, including the user's author in the url
  $.get("/api/recipes/ingredients/" + ingredientSearch, function(data) {
    console.log(data);
// Call our renderBooks function to add our books to the page
    renderRecipes(data);
    });
});

// When user hits the genre-search-btn
$("#category-search-btn").on("click", function(event) {
  event.preventDefault();
// Save the book they typed into the genre-search input
  var categorySearch = $("#category-search").val().trim();
// Make an AJAX get request to our api, including the user's genre in the url
  $.get("/api/recipes/category/" + categorySearch, function(data) {
      console.log(data);
      renderRecipes(data);
    });
});

function renderRecipes(data) {
  if (data.length !== 0) {

    $("#searchedResult").empty();
    $("#searchedResult").show();

    for (var i = 0; i < data.length; i++) {
    var div = $("<div>");
    // var newSection = $("<div>");
    // newSection.addClass("new");
    // newSection.attr("id", "recipe-new-" + i);
    // $("#stats").append(newSection);

        div.append("<h2 id='recipe_name'>" + data[i].name + "</h2>");
        div.append("<p id='recipe_ingr'>Ingredients: " + data[i].ingredients + "</p>");
        div.append("<p id='recipe_cat'>Category: " + data[i].category + "</p>");
        div.append("<p id='recipe_cont'>Content: " + data[i].content + "</p>");
        div.append("<button class='delete' data-id='" + data[i].id + "'>DELETE</button>");
         $("#searchedResult").append(div);
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

    // $(".delete").click(function(event) {
    //   event.preventDefault();
    //   $.ajax({
    //     method: "DELETE",
    //     url: "/api/recipes/delete/" + $(this).attr("data-id")
    //   })
    //     // On success, run the following code
    //     .then(function() {
    //       console.log("Deleted Successfully!");
    //     });

    //   $(this).closest("div").remove();

    // });

  }
}