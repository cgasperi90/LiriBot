//This is my require variable for the dotenv file.
require("dotenv").config();

//Here are my variables for the two packages that are required for my app to run.
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

//Here is my spotiy key and secret key,
//which are stored in a different js file so they are securely stored.
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//Here are my variables for my commands for liri and to join the 3rd index together.
var command = process.argv[2];
var song = process.argv.slice(3).join(" ");

var getArtistsNames = function(artist) {
    return artist.name;
}

//This is my function that gets the songs from spotify when the user searches.
function getSongs() {

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
    }
    var songArr = data.tracks.items;
        
        //This for loop, loops through the array of songs that come up with every search.
        //The loop then pulls out the song name, album name, the artist's name, and the spotify link.
        for (var i = 0; i < songArr.length; i++) {
            
            console.log(i);
            console.log("Artist: " + songArr[i].artists.map(getArtistsNames) + 
            "\nSong: " + songArr[i].name + 
            "\nAlbum: " + songArr[i].album.name + 
            "\nLink: " + songArr[i].external_urls.spotify);
            console.log("------------------------------------------");
        }
  });
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

function getBands() {
    var bandSearch = process.argv.slice(3).join(" ");
    var queryURL = "https://rest.bandsintown.com/artists/" + bandSearch + "/events?app_id=codingbootcamp";

    axios
    .get(queryURL)
    .then(function(response) {
        //console.log(response);
        var searchRes = response.data;

        if (searchRes == 0) {
            console.log("Sorry. No events.");
        } else {
            for (var i = 0; i < searchRes.length; i++) {
            console.log("Name of Venue: " + searchRes[i].venue.name + "\nVenue Location: " + searchRes[i].venue.location + "\nDate: " + moment(searchRes[i].datetime).format("MMMM Do, YYYY hh:mm A"));
            console.log("------------------------------------------");
            }
        }
    })
    .catch(function(error) {
        if (error.response) {
            console.log(error.response.data);
            console.log("------------------------------------------");
        }
    })
}

//Here we have a function that reads a txt file to receive instructions.
function randomTextRead() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
        command = dataArr[0];
        song = dataArr[1];
        getSongs();
        console.log("------------------------------------------");
        

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
    
    case "concert-this":
        getBands();
        break;

    case "do-what-it-says":
        randomTextRead();
        break;

    default:
        console.log("LIRI does not know that one.");
        console.log("------------------------------------------");
}

