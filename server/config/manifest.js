var Confidence = require('confidence'),
    Config = require('./config')
    ;

var criteria = {
    env: process.env.NODE_ENV
};


var manifest = {
    $meta: 'This file defines the service.',
    server: Config.get('/server'),
    connections: [{
        port: Config.get('/port')
    }],
    plugins: {
        'inert': {},
        'vision': {},
        'hapi-swagger': Config.get('/swaggerOptions'),
        'hapi-auth-jwt2': {},
        './auth': {
          key: Config.get('/jwtAuth/key'),
          verifyOptions: Config.get('/jwtAuth/verifyOptions')
        }
    }
};


var store = new Confidence.Store(manifest);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
