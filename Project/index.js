const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`IP Address: ${ip}`);
    console.log(`User Agent: ${req.headers['user-agent']}`);
    console.log(`Referrer: ${req.headers.referer}`);
    console.log(`Request URL: ${req.url}`);
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
