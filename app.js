/*Määritellään muuttujia ja hakemistopolku html ja javascript-tiedostoille*/
var express = require('express');
var app = express();
var path = require("path");
app.use(express.static(__dirname + '/public'));
var conn = require("connect");
var bodyParser = require("body-parser");
app.use(bodyParser());

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'test1234',
  database : 'urlshort'
});

connection.connect(function(err) {
  // connected! (unless `err` is set)
  console.log("Connection succee");
});


console.log("Toimii");



/*Funktio hakee kaikki tiedot tyontekija-taulusta ja palauttaa taulukon*/
app.post('/testi', function(req, res) {
	console.log("Serverillä oikeassa funktiossa");
	

	var strQuery = 'select * from url where id = 1 ';
	var sendThis;

	connection.query( strQuery, function(err, rows, resp){
  		console.log( rows );
  		console.log("connectionion sisällä");
  		sendThis = rows //JSON.stringify(rows);
  		res.send(sendThis);
  	});
});

app.post('/testi2', function(req, res) {
	console.log("Serverillä toisessa funktiossa");
	var longUrl = req.body.longurl;
	var shorterurl = longUrl.substring(0,15);
	var paate = Math.floor((Math.random() * 99) + 1).toString().toString();
	console.log(longUrl);
	var post= {pitkaurl: longUrl, lyhyturl:paate};
	//var strQuery ="INSERT INTO url (pitkaurl,lyhyturl) VALUES ('pitka','lyhyt')";
	//connection.query(strQuery);
	connection.query("insert into url (pitkaurl,lyhyturl) values('"+longUrl+"','"+shorterurl+paate+"')");
	console.log("mentiin koodin ohi");
	
});





/*Määritellään, palvelimen asetuksia*/
var server = app.listen(7000, '127.0.0.1'); 