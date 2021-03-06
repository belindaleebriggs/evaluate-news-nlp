// Change when moving to environments (8080 dev, 8081 prod)
const port = 8081;

/* Express to run server and routes */
const express = require('express');
const app = express(); // start up an instance

/* Dependencies */
// Use env file for api key
const dotenv = require('dotenv');
dotenv.config();

// Tells what data type we mostly will work with
const bodyParser = require ('body-parser')
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// let browser and server talk without any security interuptions
const cors = require('cors')
app.use(cors());

// lets server run fetch requests
const fetch = require('node-fetch');

/* Initialize main project folder */
app.use(express.static('dist'))

/* Create local server */
var path = require('path');
const server = app.listen(port, listening);  
function listening() {
    console.log(`Server running`);
    console.log(`listening on localhost: ${port}!`);
}

console.log(__dirname)

/* ROUTES */
app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})



console.log('Server index.js running before getSentiment post route setup')
// Route used by formHandler to access call to Sentiment API via SentimentAPI.js

let baseURL = 'https://api.meaningcloud.com/sentiment-2.1';
let apiKey = '?key=' + process.env.API_KEY;

app.post('/getSentiment', function(req, res) {
     // get data from form
  console.log('getSentiment in server/index.js was reached.')
  try { 
      getSentiment(baseURL, req.body.formText, apiKey)
      .then(function(data) {

        // Add data to data object in server.js via POST request
        const dataObject = {
            positivity: data.score_tag,
            truth_or_opinion: data.subjectivity,
            }
        console.log(`Positivity Score : ${dataObject.positivity}`);
        console.log(`Subjectivity Score : ${dataObject.truth_or_opinion}`);
        console.log(dataObject)
        res.send(dataObject)
        })
    } catch (error) {
        console.log('error ', error);
        //appropriately handle error
      } 
    }
)

// FUNCTIONS CALLED TO FULFILL formHandler sentimentAPI request
// function to make API call to Meaningcloud's Sentiment API
async function getSentiment(baseURL, url, key) {
    console.log('getSentiment is running')
    const outputFormat = '&of=json';
    const urlToEvaluate = '&url=' + url;
    const model = '&model=example-model';
    const language = '&lang=en';
    const apiUrl = baseURL + key + outputFormat + urlToEvaluate + model + language;
    console.log(apiUrl);
    const res = await fetch(apiUrl);
    try {
      const data = await res.json();
      return data;
    } catch (error) {
      console.log('error ', error);
      //appropriately handle error
    }
  }

  // END FUNCTIONS CALLED TO FULFILL formHandler sentimentAPI request
