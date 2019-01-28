// commonJS modules for nodeJS
const express = require('express');

const app = express(); // generate a running Express application

//app: the Express app to register the route handler with
//get(): watch for incoming requests with this method (OTHER METHODS: post, put, delete, patch)
//'/': watch for request trying to access '/'
//req: object representing the imcoming request
//res: object representing the imcoming request
//res.send(): here, immediately close the request send some JSON back to who ever made this request
//the arrow function is called automatically by Express anytime some requests come to this route
app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

// if no environment variable (development environment), use default port 5000
// in production environment, use the dynamic port injected
const PORT = process.env.PORT || 5000;
app.listen(5000);


