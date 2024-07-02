const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { companyName, ownerName, rollNo, ownerEmail, accessCode } = req.body;

    try {
        const response = await axios.post('http://20.244.56.144/test/register', {
            companyName,
            ownerName,
            rollNo,
            ownerEmail,
            accessCode
        });

        res.status(response.status).send(response.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});

app.post('/auth', async (req, res) => {
    const { companyName, clientID, clientSecret, ownerName, ownerEmail, rollNo } = req.body;

    if (!companyName || !clientID || !clientSecret || !ownerName || !ownerEmail || !rollNo) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    try {
        console.log('Sending request to external API with data:', req.body);

        const response = await axios.post('http://20.244.56.144/test/auth', {
            companyName,
            clientID,
            clientSecret,
            ownerName,
            ownerEmail,
            rollNo
        });

        console.log('Received response from external API:', response.data);
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error occurred:', error);
        
        if (error.response) {
            console.error('External API responded with:', error.response.data);
            res.status(error.response.status).send(error.response.data);
        } else {
            console.error('Internal server error:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});