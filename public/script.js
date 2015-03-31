var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'test1234',
  database : 'urlshort'
});


exports.ohjaasivulle = function(req,res,next){  //funktio joka exportataan muiden tiedostojen käytettäväksi
  console.log("uudelleenohjaus-funktiossa");
  var req = req.params.uid;  //Otetaan muuttujaan talteen serverin get kutsussa oleva uid
  var link = "127.0.0.1:7000/"+ req;  //Tehdään muuttujaan lyhyttä urlia vastaava merkkijono antamalla alku kovakoodattuna ja loppu otetaan uid:sta
  console.log(link); 
  var Query = "SELECT pitkaurl FROM url WHERE lyhyturl LIKE '"+link+"'"; //Tehdään kyselyä varten muuttuja joka sisältää kyselyn
  var sendThis;
  
  connection.query( Query, function(err, rows, fields){  //Suoritetaan kysely
    console.log("mentiin queryn sisälle");
    if(err){
   
      console.log("No links were found!");
    }else
    {
      console.log(JSON.stringify(rows));
      for (i in rows) //Käydään läpi kaikki kyselyn tulokset silmukassa
      {var linkki =rows[i].pitkaurl}  //Tallennetaan muuttujaan kyselyn tuloksen tämän hetkisen kierroksen alkio
      res.redirect(301,linkki);      //ohjataan linkki-muuttujaan tallennettuun pitkään urliin 
      }
 
  });
} 