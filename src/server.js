/*jshint esversion: 6 */ 
const fs = require('fs');
const path = require('path');
const http = require('http');
const app = require('connect')();
const jsyaml = require('js-yaml');
const restify = require('restify');
const SwaggerRestify = require('swagger-restify-mw');
const swaggerTools = require('swagger-tools');
const db = require('./config/database');
const vars = require('./config/vars');

db.connect();

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'/api/swagger/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './api/controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  
    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());
  
    // Validate Swagger requests
    app.use(middleware.swaggerValidator());
  
    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));
  
    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());
  
    // Start the server
    http.createServer(app).listen(vars.port, function () {
      console.log(`%c 
      _   _ _____ __  __ ____
     | | | |_   _|  \\/  / ___|  ___ _ ____   _____ _ __
     | |_| | | | | |\\/| \\___ \\ / _ \\ '__\\ \\ / / _ \\ '__|
     |  _  | | | | |  | |___) |  __/ |   \\ V /  __/ |
     |_| |_| |_| |_|  |_|____/ \\___|_|    \\_/ \\___|_|`);      
      console.log('Your server is listening on port %d (http://localhost:%d)', vars.port, vars.port);
      console.log('Swagger-ui is available on http://localhost:%d/docs', vars.port);
    });
  
});

// const appConfig = {
//   name: 'HTM Medical Service',
//   hostname: 'localhost',
// };

// const app = restify.createServer(appConfig);

// module.exports = app;

// const config = {
//   appRoot: __dirname,
// };

// SwaggerRestify.create(config, (err, swaggerRestify) => {
//   if (err) {
//     throw err;
//   }
//   swaggerRestify.register(app);
//   // Serve the Swagger documents and Swagger UI
//   app.use(middleware.swaggerUi());
//   app.listen(vars.port);  
//   console.log(`%c 
//    _   _ _____ __  __ ____
//   | | | |_   _|  \\/  / ___|  ___ _ ____   _____ _ __
//   | |_| | | | | |\\/| \\___ \\ / _ \\ '__\\ \\ / / _ \\ '__|
//   |  _  | | | | |  | |___) |  __/ |   \\ V /  __/ |
//   |_| |_| |_| |_|  |_|____/ \\___|_|    \\_/ \\___|_|`);
//   console.log('%s listening to %s/api', app.name, app.url);
// });
