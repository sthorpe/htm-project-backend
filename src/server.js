/*jshint esversion: 6 */ 

const restify = require('restify');
const SwaggerRestify = require('swagger-restify-mw');
//const db = require('./config/database');
const vars = require('./config/vars');

//db.connect();

const appConfig = {
  name: 'HTM Medical Service',
  hostname: 'localhost',
};

const app = restify.createServer(appConfig);

module.exports = app;

const config = {
  appRoot: __dirname,
};

SwaggerRestify.create(config, (err, swaggerRestify) => {
  if (err) {
    throw err;
  }
  swaggerRestify.register(app);
  app.listen(vars.port);
  console.log('%s listening to %s/api', app.name, app.url);
});
