const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '02f3f0582edf5033f484cf0282745cbb';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
    let step = req.body.step;
    console.log(step);
    let url = '';
    if (step === 'first') {
        console.log('in first')
        url = 'https://http-hunt.thoughtworks-labs.net/challenge'
    }
    var option = {
        url:  url,
        headers: {
            'userId': 'Jz5uXVHLH',
            "Content-Type": "application/json"
        }
    };
    request(option, callback);
    function callback(error, response, body) {
        console.log("calling");

        if(error){
            console.log("error reported");

            res.render('index', {
                statement: null,
                instructions: null,
                sampleInput: null,
                sampleOutput: null,
                error: 'Error, please try again'});
        } else {
            console.log("parsing");

                let info = JSON.parse(body)
                let statement = info.statement;
                let instructions = info.instructions;
                let sampleInput = info.sampleInput;
                let sampleOutput = info.sampleOutput;
                console.log(sampleInput.input);
                console.log(sampleOutput);

                res.render('index', {
                    statement: statement,
                    instructions: instructions,
                    sampleInput: sampleInput.input,
                    sampleOutput: sampleOutput,
                    error: null});

        }
    }
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})