const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
    console.log("ENV KEY:", API_KEY ? "LOADED" : "MISSING");

    const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=London,ON,CA&appid=${API_KEY}&units=metric`;
    console.log("Fetching:", weatherAPI);

    try {
        const response = await fetch(weatherAPI);
        if (!response.ok) {
            console.error("Response Error:", response.status, response.statusText);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: 'Error fetching data' }),
            };
        }
        const data = await response.json();
        console.log("Data fetched:", data);
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error("Catch Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
