const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var option = {
    url:  'https://http-hunt.thoughtworks-labs.net/challenge',
    headers: {
        'userId': 'Jz5uXVHLH',
        "Content-Type": "application/json"
    }
};


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
})
app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    request(url, function (err, response, body) {

        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    });
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    request(url, function (err, response, body) {

        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    });
})

app.listen(3001, function () {
    console.log("app is listening on port 3001");

})
function callback(error, response, body) {
    var info = JSON.parse(body)
    debugger;
    console.log(info.sampleInput);

}

request(option, callback);