var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'test1234',
  database : 'urlshort'
});

 function myFunction() {
    document.getElementById("demo").innerHTML = "Paragraph changed.";
}


    function my() {
    console.log("Mentiin oikean funktion sisälle");
    $.post('/testi', function(data){
    var vastaus = data;
    console.log(data);
    document.getElementById("demo").innerHTML = vastaus[0];    
    });
}

function mysecond() {
    console.log("Mentiin toisen funktion sisälle");
    $.post('/testi2', function(data){
    var vastaus = data;
    console.log(data);
    document.getElementById("demo").innerHTML = vastaus[0];    
    });
}

exports.ohjaasivulle = function(req,res,next){
  console.log("uudelleenohjaus-funktiossa");
  var req = req.params.uid; 
  var link = "127.0.0.1:7000/"+ req;
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
      {var linkki =rows[i].pitkaurl} // käydään haettu url läpi
      res.redirect(301,linkki);         // yhdistetään sinne
      }
 
  });
} 