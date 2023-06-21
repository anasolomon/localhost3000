const express = require("express");
const https = require('https');

const app = express();


app.get("/", function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Chicago&units=metric&appid=635823c4bbb4444c36f1aee94f5a7e75";
    https.get(url, function(response){

        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            console.log(temp);
            console.log(description);

            res.write("<h1>The temperature is " + temp + " degrees Celcius.</h1>");
            res.write("<p> The weather is currently " +description + "</p>");
            res.write("<img src='https://openweathermap.org/img/wn/" + icon +"@2x.png'>");
        });
    });
});


app.listen(3000 , function() {
    console.log("Server started on port 3000");
});

