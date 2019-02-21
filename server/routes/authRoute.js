const passport = require('passport');

module.exports = (app) => {
    // GoogleStrategy knows strategy 'google' and will use the 'GoogleStrategy'
    app.get('/auth/google', passport.authenticate('google', {
        // 'scope' is a list of the user information pieces that can be asked for
        scope: ['profile', 'email']
    }))

    // a 'code' will be passed back together
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })
}

// **********************************
// app.get('/', (req, res) => {
//     res.send({ hi: 'there' });
// });
// **********************************
// explanation
// app: the Express app to register the route handler with
// get(): watch for incoming requests with this method (OTHER METHODS: post, put, delete, patch)
// '/': watch for request trying to access '/'
// req: object representing the imcoming request
// res: object representing the outgoing response
// res.send(): here, immediately close the request send some JSON back to who ever made this request
// the arrow function is called automatically by Express anytime some requests come to this route
// ****************************************

