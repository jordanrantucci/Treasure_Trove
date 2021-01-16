

    $("#treasure-btn").on("click", function() {
        var apiKey2 = config2.key
        var unsplashURL = "https://api.unsplash.com/search/photos?query=treasure&per_page=50&client_id="+apiKey2;
    
        $.ajax({
            url: unsplashURL,
            method: "GET"
        })
    
        .then(function(response) {
            
            var randomNumber = Math.floor(Math.random() * 30) + 1;
        console.log(randomNumber);
            $("#treasure").remove()
            
            var imageUrl = response.results[randomNumber].urls.small;
            var treasureImage = $("<img>");
            treasureImage.attr("id", "treasure")
            treasureImage.attr("src", imageUrl);
            treasureImage.attr("alt", "treasure image");
            $("#images").prepend(treasureImage);
    
         
        });
        
    })



