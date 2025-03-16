const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config'); // Importera konfigurationen

const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


// Serve static files (HTML, CSS, JS, images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Set up route to handle index.html (this is automatic with Express, but you can be explicit if needed)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API-rutt för att hantera medlemskap
app.post('/api/confirm_membership', async (req, res) => {
    const { request } = req.body;

    // Kontrollera om vi har alla nödvändiga fält
    if (!request) {
        console.error('Request body is missing');
        return res.status(400).json({ error: 'Missing request body' });
    }

    const { action, firstname, lastname, socialsecuritynumber } = request;

    if (!action || (!firstname && !lastname && !socialsecuritynumber)) {
        console.error('Missing required fields in request:', request);
        return res.status(400).json({ error: 'Missing required fields in request' });
    }

    // Bygg upp det externa API-anropet
    const externalApiUrl = 'https://ebas.sverok.se/apis/confirm_membership.json';  // API-URL

    const apiRequestPayload = {
        request: {
            action,
            association_number: config.associationNumber, // Använd föreningsnumret från config
            api_key: config.apiKey, // Använd API-nyckeln från config
            year_id: config.yearId, // Använd år från config
            firstname,
            lastname,
            socialsecuritynumber,
            email: "",  // Fyll i om det behövs
            phone1: "",  // Fyll i om det behövs
            member_nick: null,
            discord_user_id: null
        }
    };

    try {

        // Skicka förfrågan till externa API:et
        const response = await fetch(externalApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(apiRequestPayload),
        });

        const responseData = await response.json();

        // Kontrollera om API:et returnerade ett fel
        if (responseData.response?.request_result?.error) {
            console.error('External API returned an error:', responseData.response.request_result.error);
            return res.status(400).json({ error: responseData.response.request_result.error });
        }

        // Skicka tillbaka svaret till frontend
        res.json(responseData);
    } catch (error) {
        console.error('Error contacting external API:', error);
        res.status(500).json({ error: 'Failed to contact external API' });
    }
});

// Starta servern
app.listen(port, () => {
    console.log(`Servern körs på http://localhost:${port}`);
});