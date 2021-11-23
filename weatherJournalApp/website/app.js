/* Global Variables */
// Personal API Key for OpenWeatherMap API (metric units)
const apiKey = '&appid=210e9f18fc1274ea7061940497aa1360&units=metric';
// Base URL for the API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) +'/'+ d.getDate() +'/'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    getData(baseURL, zipCode, apiKey)
        .then((data) => {
            postData('/addEntry', {date: newDate, temp: data.main.temp, content: content});
        }).then( () => {
            updateUI();
        });
};

/* Function to GET Web API Data*/
const getData = async (baseURL, zipCode, apiKey) => {

    const res = await fetch(baseURL + zipCode + apiKey);
    try {
        const data = await res.json();
        return data;

    } catch(error) {
        console.log('error', error);
    }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {

    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(data)
    });

    try {
        const newData = await res.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    }
};

/* Function to GET Project Data */
const updateUI = async () => {
    const req = await fetch('/all');
    try {
        const allData = await req.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;

    } catch(error) {
        console.log('error', error);
    }
};
