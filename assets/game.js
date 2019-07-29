
// a function that runs as soon as the document is "ready"
$(document).ready(function() {
  // set a variable named animals that contains an array of various animal strings
  var animals = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "teacup pig", "serval", "salamander", "frog"
  ];
  // a function named populateButtons that takes in arguments of arrayToUse, classToAdd, and areaToAddTo
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    // using jQuery empty the areaToAddTo variable
    $(areaToAddTo).empty();
    // create a for loop that iterates around the arrayToUse array
    for (var i = 0; i < arrayToUse.length; i++) {
      // define a variable "a" that, using jQuery adds a button tag to the html
      var a = $("<button>");
      // add a class to the variable "a" called "classToAdd"
      a.addClass(classToAdd);
      // add a data-type attribute called arrayToUse at an index [i]
      a.attr("data-type", arrayToUse[i]);
      // add text to the variable "a" with the index of arrayToUse
      a.text(arrayToUse[i]);
      // using jQuery, append the variable "a" to the areaToAddTo variable
      $(areaToAddTo).append(a);
    }

  }
  // using jQuery, add an event listener on the document that looks for a click on the class of "animal-button and then runs a function"
  $(document).on("click", ".animal-button", function() {
    // using jQuery, empty the div with an id of animals
    $("#animals").empty();
    // remove the active class from the current animal button
    $(".animal-button").removeClass("active");
    // add the active class to the button the animal button that was clicked
    $(this).addClass("active");

    // grab the data-type attribute of the button clicked and store it in a variable called type to use for an ajax call
    var type = $(this).attr("data-type");
    // the api URL replacing the search term with whatever the data-type of the button clicked is
    // that URL saved in a variable
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    // ajax call with key value pairs
    $.ajax({
      // key value pair with the url set equal to the variable of the queryURL
      url: queryURL,
      // key value pair with the ajax GET method to retrieve data from the api
      method: "GET"
    })
      // the .then() promise to run the callback function upon completion of the parent function. in this case the ajax call
      .then(function(response) {
        // store the data from the response object from the ajax call in a variable called results
        var results = response.data;

        // create a for loop that iterates through the results array and for each of the iterations, do the following:
        for (var i = 0; i < results.length; i++) {
          // create a variable called animalDiv that will create a new div with an "animal-item" class
          var animalDiv = $("<div class=\"animal-item\">");

          // create a variable called rating that is set equal to the rating data from each of the objects returned from the call
          var rating = results[i].rating;

          // create a variable called "p" that creates a new paragraph tag with text stating that the rating is stored in the rating variable
          var p = $("<p>").text("Rating: " + rating);

          // 
          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var animalImage = $("<img>");
          animalImage.attr("src", still);
          animalImage.attr("data-still", still);
          animalImage.attr("data-animate", animated);
          animalImage.attr("data-state", "still");
          animalImage.addClass("animal-image");

          animalDiv.append(p);
          animalDiv.append(animalImage);

          $("#animals").append(animalDiv);
        }
      });
  });

  $(document).on("click", ".animal-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("input").eq(0).val();

    if (newAnimal.length > 2) {
      animals.push(newAnimal);
    }

    populateButtons(animals, "animal-button", "#animal-buttons");

  });

  populateButtons(animals, "animal-button", "#animal-buttons");
});
