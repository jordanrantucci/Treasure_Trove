$(document).ready(function(){
    
    let loadImage = $("<img>")
    loadImage.attr("src", "assets/images/treasuresack.png")
    $(".image-container").append(loadImage)
})

let savedTreasureArray= []

for(i=0;i<localStorage.getItem("Number of Treasures");i++){
//get local storage upon page load and enter into saved treasure locations div
    let pastLocationDiv = $("<div>")
    pastLocationDiv.attr("class", "pastLocationDiv")
    pastLocationDiv.text("Treasure Title: "+localStorage.getItem("Title"+(i+1))+", Treasure Description: "+localStorage.getItem("Description"+(i+1))+", Latitude: "+localStorage.getItem("Latitude"+(i+1))+", Longitude: "+localStorage.getItem("Longitude"+(i+1))+", Address: " + localStorage.getItem("Address"+(i+1)))
    $("#pastLocationsDivOnly").append(pastLocationDiv)
}


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

    
    function GetMap(){

        
        //create map
        let map = new Microsoft.Maps.Map('#myMap', {
            credentials: 'Ak7rhv8TWx72_u6d8FHAVdPA01BfBGAr_JYJux65cv8uHVpMCUSGhlLsce-tKdnd',
            center: new Microsoft.Maps.Location($("#latitude").val(), $("#longitude").val())
        });
        console.log($("#latitude").val(),$("#longitude").val())

        let center = map.getCenter();

        let bingAPIurl= "https://dev.virtualearth.net/REST/v1/Locations/"+$("#latitude").val().toString()+","+$("#longitude").val().toString()+"?o=json&key=Ak7rhv8TWx72_u6d8FHAVdPA01BfBGAr_JYJux65cv8uHVpMCUSGhlLsce-tKdnd"
                
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
        });
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
        };

        for (i=0; i<savedTreasureArray.length; i++){
            //Set local storage to save treasure info
            localStorage.setItem("Title"+savedTreasureArray.length, pin.metadata.title)
            localStorage.setItem("Description"+savedTreasureArray.length, pin.metadata.description)
            localStorage.setItem("Latitude"+savedTreasureArray.length, $("#latitude").val())
            localStorage.setItem("Longitude"+savedTreasureArray.length, $("#longitude").val())
            localStorage.setItem("Number of Treasures", savedTreasureArray.length)
        }
        
        //Add a click event handler to the pushpin.
        Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);

        //Add pushpin to the map.
        map.entities.push(pin);

        Microsoft.Maps.Events.addHandler(pin, 'drag', function (e) { 
            locate('pushpinDrag', e)
        })

        //show location of pin
        function locate(id, event) {
            $('#pinLocation').text(event.target.getLocation())
        }
      
        
    }

    function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
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

$("#locateTreasure").on("click", locateTreasure)
$("#clearLocations").on("click", clearBtnClk)


$("#treasure-btn").on("click", function() {
    $(".image-container").empty()
    var unsplashURL = "https://api.unsplash.com/search/photos?query=treasure&per_page=50&client_id=R2a__tWdYYp-v6teauC_XnmRvIFWApfcH2KipS4BRY8";

    $.ajax({
        url: unsplashURL,
        method: "GET"
    })

    .then(function(response) {
        
        var randomNumber = Math.floor(Math.random() * 30) + 1;
    console.log(randomNumber);
        $("#treasure").remove()
        // for( i=0; i < response.results.length; i++){
        var imageUrl = response.results[randomNumber].urls.small;
        var treasureImage = $("<img>");
        treasureImage.attr("id", "treasure")
        treasureImage.attr("src", imageUrl);
        treasureImage.attr("alt", "treasure image");
        $("#images").prepend(treasureImage);

     
    });
    
})

// $(document).ready(function() {
    
//     let apiKey = config.key
//     let apiKey2 = config2.key
//     let ipapiURL = "https://ipapi.co/8.8.8.8/json/"
//     let unsplashURL = " https://api.flickr.com/services/rest/?method=flickr.photos.getWithGeoData&api_key="+apiKey2+"&per_page=10&format=json&nojsoncallback=1"
    

    // $.ajax({
    //     url: ipapiURL,
    //     method: "GET"
    // }).then(function(response){
    //     let userLocation = response.latitude+"~"+response.longitude
    //     $.ajax({
    //         url: unsplashURL,
    //         method: "GET"
    //     }).then(function(response2){
    //         //variables from Flickr
    //         let pointLatitude = //response2.something //nick
    //         let pointLongitude = //response2.something //nick
    //         let picTitle = "Treasure" //response2.something //nick again
    //         //let refURL = response2.something //and again
    //         let photoURL = //response2.something//last one
            
    //         // Copyright 2018 Google LLC.
    //         // SPDX-License-Identifier: Apache-2.0

    //         const express = require('express');
    //         const app = express();

            // // No CORS Headder set
            // app.get('/', function(request, response) {
            // response.sendFile(__dirname + '/message.json');
            // });

            // // CORS header `Access-Control-Allow-Origin` set to accept all
            // app.get('/allow-cors', function(request, response) {
            // response.set('Access-Control-Allow-Origin', '*');
            // response.sendFile(__dirname + '/message.json');
            // });

            // // listen for requests :)
            // const listener = app.listen(process.env.PORT, function() {
            // console.log('Your app is listening on port ' + listener.address().port);
            // });
            
            // let bingMapURL = "https://bing.com/maps/default.aspx?cp="+userLocation+"&style=h"+"&sp=point."+pointLatitude+"_"+pointLongitude+"_"+picTitle+"_"+photoURL
            //Bing Maps API call
            // $.ajax({
            //     url: bingMapURL,
            //     method: "GET"
            // }).then(function(response3){
                // let mapDiv = $("#myMap")

                // function GetMap() {
                //     var map = new Microsoft.Maps.Map('#myMap', {
                //         credentials: apiKey,
                //         center: new Microsoft.Maps.Location(pointLatitude, pointLongitude)
                //     });
            
                //     var center = map.getCenter();
            
                //     //Create custom Pushpin
                //     var pin = new Microsoft.Maps.Pushpin(center, {
                //         title: picTitle,
                //         subTitle: 'City Center',
                //         text: '1'
                //     });
                                        
                //     //Add the pushpin to the map
                //     map.entities.push(pin)

                //     $("#myMap").append(map)
                // var map = new Microsoft.Maps.Map('#myMap', {
                //     credentials: 'Ak7rhv8TWx72_u6d8FHAVdPA01BfBGAr_JYJux65cv8uHVpMCUSGhlLsce-tKdnd',
                //     center: new Microsoft.Maps.Location(51.50632, -0.12714),
                //     mapTypeId: Microsoft.Maps.MapTypeId.aerial,
                //     zoom: 10
                // });
                
            // })
        // })
    // })
//})