var heroes = ["Black Widow", "Peggy Carter", "Captain Marvel", "Hawkeye", "Captain America"];

function showButtons() {
    $(".submit").empty();
    for (var i = 0; i < heroes.length; i++) 
    {
       var newButton = $("<button>");
       newButton.addClass("Buttons");
       newButton.attr("data-name", heroes[i]);
       newButton.text(heroes[i]);
       $(".submit").append(newButton);
    } 
}; 

function addHeroes () {
    event.preventDefault();
    heroes.push(newHero.value);
    showButtons();
    newHero.value = " ";

};


showButtons();
// on-click function here-after you create the buttons
$(document).on("click", ".Buttons", showHeroes);
$(document).on("click", ".play", moveImages);
$(document).on("click", ".Bttn", addHeroes);

function moveImages () {
    console.log(this);
   if ($(this).attr("data-state") == "still") {
       $(this).html("<img src='" + $(this).attr("data-animate") + "'>");
       $(this).attr("data-state", "animate");
   } else {
       $(this).html("<img src='" + $(this).attr("data-still") + "'>");
       $(this).attr("data-state", "still");
   }
};

function showHeroes () 
{   var heroes = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + heroes + " ";
    
    $.ajax({
            url: queryURL, 
            method: "GET" 
           }
          )
    .done(function(response) 
    {
    console.log(response);
        $(".gifs").empty();
        for (var i = 0; i < response.data.length; i++) 
        {
            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv");
           
            
            var gifImage = $("<img src='" + response.data[i].images.fixed_height_still.url + "'>"); 
            gifImage.addClass("gif");
            
            var imageDiv = $("<div>");
            imageDiv.addClass("play");
            imageDiv.attr("data-state", "still");
            imageDiv.attr("data-name", heroes);
            imageDiv.attr("data-still", response.data[i].images.fixed_height_still.url);
            imageDiv.attr("data-animate", response.data[i].images.fixed_height.url);
    
            var ratingDiv = $("<div>");
            ratingDiv.addClass("gifDiv");
            ratingDiv.html("<p>Rating: " + response.data[i].rating.toUpperCase() + "</p>");
            
            $(imageDiv).append(gifImage);
            $(gifDiv).append(imageDiv);
            $(gifDiv).append(ratingDiv);
            $(".gifs").append(gifDiv); 

        }
    }    );        
};