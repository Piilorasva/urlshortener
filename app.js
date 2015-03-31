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



app.post('/testi2', function(req, res) { //tähän tullaan ensimmäisestä formista index.html:stä
	console.log("Serverillä toisessa funktiossa");
	var longUrl = req.body.longurl; //Otetaan muuttujaan talteen html:ään syötetty pitkä url
	var urlstart = "127.0.0.1:7000/";
	var paate = Math.floor((Math.random() * 1000) + 1).toString().toString();
	var shorturl = urlstart+paate; //Muodostetaan lyhyt url kahdesta edellisestä muuttujasta
	console.log(longUrl);
	connection.query("insert into url (pitkaurl,lyhyturl) values('"+longUrl+"','"+shorturl+"')"); //Tehdään kysely tietokantaan
	console.log("mentiin koodin ohi");
	res.send(shorturl); //näytetään lyhyt url näytöllä käyttäjälle
	
});




app.post('/testi3', function(req,res,next){ //Tähän tullaan toisesta formista index.html:stä
  var link = req.body.shorturl; //Tallennetaan lyhyt linkki muuttujaan html:stä
  console.log(link);
  var Query = "SELECT pitkaurl FROM url WHERE lyhyturl LIKE '"+link+"'";  //Tehdään kysely jolla haetaan pitkä url tietokannasta
  var sendThis;
  
  connection.query( Query, function(err, rows, fields){  //Toteutetaan kysely
    console.log("mentiin queryn sisälle");
    if(err){
   
      console.log("No links were found!");
    }else
    {
      console.log(JSON.stringify(rows));
      for (i in rows)  //Käydään läpi kyselyn tulokset
      {var linkki =rows[i].pitkaurl} //Tallennetaan muuttujaan kyselystä saatu rivi
      console.log(linkki); 
      res.redirect(301,linkki);         //ohjataan muuttujaan tallennettuun pitkään urliin
      }
 
  });
});


app.get('/:uid', functio.ohjaasivulle); // käyttäjän syöttäessä selaimen osoitekenttään lyhyen urlin mennään tähän ja kutsutaan script.js-tiedosto
//ssa olevaa funktiota joka sitten ohjaa käyttäjän oikealle sivulle.



app.listen(7000,'127.0.0.1'); 