/*Määritellään muuttujia ja hakemistopolku html ja javascript-tiedostoille*/
var express = require('express');
var app = express();
var path = require("path");
var functio = require("./public/script.js");
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
	var urlstart = "127.0.0.1:7000/";
	var paate = Math.floor((Math.random() * 99) + 1).toString().toString();
	var shorturl = urlstart+paate;
	console.log(longUrl);
	//var post= {pitkaurl: longUrl, lyhyturl:paate};
	//var strQuery ="INSERT INTO url (pitkaurl,lyhyturl) VALUES ('pitka','lyhyt')";
	//connection.query(strQuery);
	connection.query("insert into url (pitkaurl,lyhyturl) values('"+longUrl+"','"+shorturl+"')");
	console.log("mentiin koodin ohi");
	res.send(shorturl);
	
});




app.post('/testi3', function(req,res,next){
  console.log("haepitka-funktiossa");
  var link = req.body.shorturl; 
  console.log(link); // tuohon laitat req.body.kentännimi (esim <input name="longurl" </input>)
  var Query = "SELECT pitkaurl FROM url WHERE lyhyturl LIKE '"+link+"'"; // meillä databasessa siis 2 ominaisuutta pitkä ja lyhyt url
  var sendThis;
  
  connection.query( Query, function(err, rows, fields){  
    console.log("mentiin queryn sisälle");
    if(err){
   
      console.log("No links were found!");
    }else
    {
      console.log(JSON.stringify(rows));
      for (i in rows)
      {var linkki =rows[i].pitkaurl}
      console.log(linkki); // käydään haettu url läpi
      res.redirect(301,linkki);         // yhdistetään sinne
      }
 
  });
});


app.get('/:uid', functio.ohjaasivulle);


/*Määritellään, palvelimen asetuksia*/
app.listen(7000,'127.0.0.1'); 