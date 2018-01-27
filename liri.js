require("dotenv").config();
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var operation = process.argv[2];
var searched = process.argv[3];

switch(operation){
	case "my-tweets":
		showTweet();
		break;
	case "spotify-this-song":
		showSong();
		break;
	case "movie-this":
		showMovie();
		break;
	//case "do-what-it-says":

}

function showTweet(){
	client.get('/statuses/user_timeline',{count:20},function(error,tweet,response){
		if(!error){
			tweet.forEach(function(element){
				console.log(element.text);
			})
		}
	});
}

function showSong(){
	spotify.search({type:'track',query:searched},function(error,data){
	if(!error)
		console.log("Artist: "+data.tracks.items[0].artists[0].name+
					"\nSong's name: "+searched+
					"\nPreview link from Spotify: "+data.tracks.href+
					"\nAlbum: "+data.tracks.items[0].album.name);
	});
}

function showMovie(){
	var queryURL = "https://www.omdbapi.com/?t=" + searched + "&y=&plot=short&apikey=trilogy";
	request(queryURL,function(error,response,body){
		console.log('Title: '+JSON.parse(body).Title+
					'\nYear: '+JSON.parse(body).Year+
					'\nIMDB Rate: '+JSON.parse(body).imdbRating+
					'\nRotten Tomatoes Rate: '+JSON.parse(body).tomatoRating+
					'\nCountry produced: '+JSON.parse(body).Country+
					'\nLanguage: '+JSON.parse(body).Language+
					'\nPlot: '+JSON.parse(body).Plot+
					'\nActor: '+JSON.parse(body).Actors);
	});
}