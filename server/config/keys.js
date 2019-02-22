// keys.js - figure out what set of credentials to return

if (process.env.NODE_ENV === 'production') {
    console.log('production');
    // production mode - return the prod set of keys
    module.exports = require('./prod');
} else {
    // development mode - return the dev set of keys
    module.exports = require('./dev');
}
