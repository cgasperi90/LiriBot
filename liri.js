require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");

var Spotify = require('node-spotify-api');


var song = process.argv.slice(3).join(" ");
var command = process.argv[2];

// spotify
//   .search({ type: 'artist', query: song })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

function getSongs() {

    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
    }
        console.log("============================================");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Link: " + data.tracks.items[0].external_urls.spotify);
        console.log("============================================");
  });

}

switch (command) {
    case "spotify-this-song":
        getSongs();
        break;
    
}

// function runThis(argOne, argTwo) {
//     pick(argOne, argTwo);
// }

// runThis(process.argv[2], song);
