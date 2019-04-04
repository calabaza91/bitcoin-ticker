
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  // console.log(req.body.crypto);
  request("https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD", function(err, res, body){

    //Select all data from API with parse
    var data = JSON.parse(body);
    //Select most recent price
    var price = data.last;

    console.log(price);

  });

});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
