$(document).ready(function(){
    
    let loadImage = $("<img>")
    loadImage.attr("src", "assets/images/treasuresack.png")
    $(".image-container").append(loadImage)
})

let savedTreasureArray= []

//get local storage upon page load and enter into saved treasure locations div
for(i=0;i<localStorage.getItem("Number of Treasures");i++){
    let pastLocationDiv = $("<div>")
    pastLocationDiv.attr("class", "pastLocationDiv")
    pastLocationDiv.text("Treasure Title: "+localStorage.getItem("Title"+(i+1))+", Treasure Description: "+localStorage.getItem("Description"+(i+1))+", Latitude: "+localStorage.getItem("Latitude"+(i+1))+", Longitude: "+localStorage.getItem("Longitude"+(i+1))+", Address: " + localStorage.getItem("Address"+(i+1)))
    $("#pastLocationsDivOnly").append(pastLocationDiv)
}

//these functions clear all of the textboxes when the user clicks them so they can enter their info instantly
function clearTitle(){
    $("#treasureTitle").val(" ")
}
function clearDescription(){
    $("#treasureDescription").val(" ")
}
function clearLong(){
    $("#longitude").val(" ")
}
function clearLat(){
    $("#latitude").val(" ")
}


$("#treasureTitle").on("click", clearTitle)
$("#treasureDescription").on("click", clearDescription)
$("#longitude").on("click", clearLong)
$("#latitude").on("click", clearLat)


function locateTreasure(){
    //push treasure to array
    savedTreasureArray.push("a")

    //this function creates the map plus its features
    function GetMap(){

        
        //create map
        let map = new Microsoft.Maps.Map('#myMap', {
            credentials: 'Ak7rhv8TWx72_u6d8FHAVdPA01BfBGAr_JYJux65cv8uHVpMCUSGhlLsce-tKdnd',
            center: new Microsoft.Maps.Location($("#latitude").val(), $("#longitude").val())
        });
        console.log($("#latitude").val(),$("#longitude").val())

        let center = map.getCenter()

        let bingAPIurl= "https://dev.virtualearth.net/REST/v1/Locations/"+$("#latitude").val().toString()+","+$("#longitude").val().toString()+"?o=json&key=Ak7rhv8TWx72_u6d8FHAVdPA01BfBGAr_JYJux65cv8uHVpMCUSGhlLsce-tKdnd"
             
        //call an ajax request for the Bing REST API
        $.ajax({
            url: bingAPIurl,
            method: "GET"
        })
    
        .then(function(response2) {
            //display past treasure locations
            console.log(response2.resourceSets[0].resources[0].address.formattedAddress)
            let pastLocationDiv = $("<div>")
            pastLocationDiv.attr("class", "pastLocationDiv")
            pastLocationDiv.text("Treasure Title: "+$("#treasureTitle").val()+", Treasure Description: "+$("#treasureDescription").val()+", Latitude: "+$("#latitude").val()+", Longitude: "+$("#longitude").val()+", Address: " + (response2.resourceSets[0].resources[0].address.formattedAddress))
            $("#pastLocationsDivOnly").append(pastLocationDiv)
            //set local storage for the address retrieved from the ajax request
            localStorage.setItem("Address"+savedTreasureArray.length, response2.resourceSets[0].resources[0].address.formattedAddress)
        })


        //Create an infobox at the center of the map but don't show it.
        infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
            visible: false
        })
        //Assign the infobox to a map instance.
        infobox.setMap(map);


       
        //Create custom Pushpin
        let pin = new Microsoft.Maps.Pushpin(center, {
            icon: './assets/images/x.png',
            anchor: new Microsoft.Maps.Point(20, 20),           
            draggable: true 
        })
    
        //Store some metadata with the pushpin.
        pin.metadata = {
            title: $("#treasureTitle").val(),
            description: $("#treasureDescription").val()
        }

        //Set local storage to save treasure info
        for (i=0; i<savedTreasureArray.length; i++){
            localStorage.setItem("Title"+savedTreasureArray.length, pin.metadata.title)
            localStorage.setItem("Description"+savedTreasureArray.length, pin.metadata.description)
            localStorage.setItem("Latitude"+savedTreasureArray.length, $("#latitude").val())
            localStorage.setItem("Longitude"+savedTreasureArray.length, $("#longitude").val())
            localStorage.setItem("Number of Treasures", savedTreasureArray.length)
        }
        
        //Add a click event handler to the pushpin.
        Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked)

        //Add pushpin to the map.
        map.entities.push(pin)

        Microsoft.Maps.Events.addHandler(pin, 'drag', function (e) { 
            locate('pushpinDrag', e)
        })

        //show current location of pin
        function locate(id, event) {
            $('#pinLocation').text(event.target.getLocation())
        }
      
        
    }

    //creating pushpin functionality
    function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            })
        }
    }
    

    GetMap()
}



//create function for clear button
function clearBtnClk(){
    if(confirm("Are you sure you want to clear all pins?")){
        localStorage.clear()
        $("#pastLocationsDivOnly").empty()
    }
    else {
    }

}

//call functionality on click for the "Locate Treasure" and "Clear Locations" buttons
$("#locateTreasure").on("click", locateTreasure)
$("#clearLocations").on("click", clearBtnClk)

// click function for treasure button
$("#treasure-btn").on("click", function() {
        //clears content before loading results
        $(".image-container").empty()
        // defining endpoint for api call
        var unsplashURL = "https://api.unsplash.com/search/photos?query=treasure&per_page=30&client_id=R2a__tWdYYp-v6teauC_XnmRvIFWApfcH2KipS4BRY8";
        // api call using ajax
        $.ajax({
            url: unsplashURL,
            method: "GET"
        })
    
        .then(function(response) {
            // random number between 1-30
            var randomNumber = Math.floor(Math.random() * 30) + 1;
            //  removing initial treasure image 
            $("#treasure").remove()
            // url call returning small image based off of random number 
            var imageUrl = response.results[randomNumber].urls.small
            // preparing image
            var treasureImage = $("<img>");
            treasureImage.attr("id", "treasure")
            treasureImage.attr("src", imageUrl)
            treasureImage.attr("alt", "treasure image")
            //  displaying image
            $("#images").prepend(treasureImage)
    
         
        });
        
    })