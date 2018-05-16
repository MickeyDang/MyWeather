
var express = require('express');
var app = express();
var request = require('request');

const API_PATH = 'http://api.openweathermap.org/data/2.5/forecast?';
const API_KEY = '7e1665a2a363e2034e7320737091aa62';

app.use(express.static("public"));
app.use(express.static("assets"));

app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    
    var query = req.query.cityQuery;

    if (query != "" && query != null) {

        var url = API_PATH + "q=" + query + '&APPID=' + API_KEY;

        request(url, (error, response, body) => {
        
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                
                var cityInfo = {};

                cityInfo.name = data["city"]["name"];
                cityInfo.conditionMain = data["list"][0]["weather"][0]["main"];
                cityInfo.conditionDescription = data["list"][0]["weather"][0]["description"];
                cityInfo.conditionTemp = data["list"][0]["main"]["temp"];

                res.render('home', {cityInfo : cityInfo});
        
            }  else {
                var errorInfo = {
                    name : "City Not Found",
                    conditionMain : "Unknown",
                    conditionDescription : "",
                    conditionTemp : ""
                }
                res.render('home', {cityInfo : errorInfo});
            }
        
        });
    } else {
        res.render('home', {cityInfo : {}});
    }
});


app.get('*', (req, res) => {
    res.send('PAGE NOT FOUND');
});

//3000 is localhost:[port number]
app.listen(3000, function() {
    console.log('server has started!');
});

