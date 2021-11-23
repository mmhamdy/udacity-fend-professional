// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
// Callback to debug
const server = app.listen(port, () => console.log(`Server running on localhost: ${port}; press Ctrl-C to terminate.`))

// Initialize all route with a callback function
app.get('/all',  (req, res) => {
    res.send(projectData)
});

// Post Route
app.post('/addEntry', addEntry);

function addEntry(req, res) {
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.content = req.body.content;

    res.send(projectData);
    console.log(projectData)
};