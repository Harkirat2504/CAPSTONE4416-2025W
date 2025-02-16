// netlify/functions/weather.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const API_KEY = process.env.OPENWEATHERMAP_API_KEY; // This is set in Netlify's dashboard
    const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=London,ON,CA&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(weatherAPI);
        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: 'Error fetching weather data' }),
            };
        }
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
