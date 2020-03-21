var heroes = ["Black Widow", "Peggy Carter", "Captain Marvel", "Hawkeye", "Captain America"];

function showButtons()
{   //alert("inside showButtons")
    for (var i = 0; i < heroes.length; i++) 
    {
       var newButton = $("<button>");
       newButton.addClass("Buttons");
       newButton.attr("data-name", heroes[i]);
       newButton.text(heroes[i]);
       $(".submit").append(newButton);
    } 
} 

showButtons();
// on-click function here-after you create the buttons
$(document).on("click", ".Buttons", showHeroes);
$(document).on("click", ".gifs", moveImages);

function moveImages () {
    var x = $(this);//.attr("data-state"));
    alert (x);
   if ($(this).attr("data-state") == "still") {
       $(this).html("<img src='" + $(this).attr("data-animate") + "'>");
       $(this).attr("data-state", "animate");
   } else {
       $(this).html("<img src='" + $(this).attr("data-still") + "'>");
       $(this).attr("data-state", "still");
   }
};

function showHeroes () 
{   alert("inside showHeroes");
    var heroes = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + heroes + " no api key for you :P";
    
    $.ajax({
            url: queryURL, 
            method: "GET" 
           }
          )
    .done(function(response) 
    {
       // console.log(response);
        $(".gifs").empty();
        for (var i = 0; i < response.data.length; i++) 
        {
            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv");
            gifDiv.html("<p>Rating: " + response.data[i].rating.toUpperCase() + "</p>");
            var gifImage = $("<img src='" + response.data[i].images.fixed_height_still.url + "'>"); 
            gifImage.addClass("gif");
            var imageDiv = $("<div>");
            imageDiv.attr("data-state", "still");
            imageDiv.attr("data-name", heroes);
            imageDiv.attr("data-still", response.data[i].images.fixed_height_still.url);
            imageDiv.attr("data-animate", response.data[i].images.fixed_height.url);
    
            $(imageDiv).append(gifImage);
            $(imageDiv).append(gifDiv);
            $(".gifs").append(imageDiv); 

        }
    }    );        
};