//Bitcoin converter
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
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  var amount = req.body.amount;

  //Options object for request module
  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };


  request(options, function(error, response, body){

    //Select all data from API with parse
    var data = JSON.parse(body);
    //Select most recent price
    var price = data.price;
    console.log(price);
    var currentDate = data.time;

    //Writes response
    res.write(`<p>The current date is ${currentDate}</p>`);
    res.write(`<h1>${amount} ${crypto} is currently worth ${price} ${fiat}.</h1>`);

    //Sends response (like pressing send when writing an email)
    res.send();

  });

});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
