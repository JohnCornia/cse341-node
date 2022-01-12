const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
    console.log(
        'Something to the console'
    );
    next();
});

app.use('/', (req, res, next) => {
    res.send('<h1>Response to the Server</h1>');
});

app.listen(3000);