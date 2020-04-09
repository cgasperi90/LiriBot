//This is my require variable for the dotenv file.
require("dotenv").config();

//Here are my variables for the two packages that are required for my app to run.
var keys = require("./keys.js");
var axios = require("axios");

//Here is my spotiy key and secret key,
//which are stored in a different js file so they are securely stored.
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//Here are my variables for my commands for liri and to join the 3rd index together.
var command = process.argv[2];

//This is my function that gets the songs from spotify when the user searches.
function getSongs() {

    var song = process.argv.slice(3).join(" ");

    if (song === "") {
        song = "thesign";
    } else {

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
    }
    var songArr = data.tracks.items;
        
        //This for loop, loops through the array of songs that come up with every search.
        //The loop then pulls out the song name, album name, the artist's name, and the spotify link.
        for (var i = 0; i < songArr.length; i++) {
            
            console.log("Artist: " + songArr[i].artists[0].name + 
            "\nSong: " + songArr[i].name + 
            "\nAlbum: " + songArr[i].album.name + 
            "\nLink: " + songArr[i].external_urls.spotify);
            console.log("------------------------------------------");
        }
  });
}
}
//Function so thaat LIRI will get the movies when the user types in command.
function getMovies() {
    var movieSearch = process.argv.slice(3).join(" ");
    var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieSearch;
    axios
    .get(queryURL)
    .then(function(response) {
        //Function for Response of movies.
        //console.log(response);
        var searchRes = response.data;
        console.log("Movie Title: " + searchRes.Title + 
        "\nReleased In: " + searchRes.Year + 
        "\nIMDB Rating: " + searchRes.imdbRating + 
        "\nRotten Tomatoes Rating: " + searchRes.Ratings[1].Value + 
        "\nCountry where movie was produced: " + searchRes.Country + 
        "\nLanguage: " + searchRes.Language + 
        "\nPlot: " + searchRes.Plot + 
        "\nActors: " + searchRes.Actors);
        console.log("------------------------------------------");
    })
    //Function for ERRORS
    .catch(function(error) {
        if (error.response) {
            console.log(error.response.data);
            console.log("------------------------------------------");
        }
    })
}

//Here is the switch case that runs the getsongs() function when the user types in the commands.
switch (command) {
    case "spotify-this-song":
        getSongs();
        break;
    
    case "movie-this":
        getMovies();
        break;
}

