var httpResponse   = require('./http_response');
var socketResponse = require('./socket_response');
var parser         = require('fleek-parser');
var _              = require('lodash');
var configHelpers  = require('./configHelpers');
var helpers        = require('./helpers');

var pathSplit = module.parent.filename.split('/');
pathSplit.pop();
const relPath = pathSplit.join('/');

var response = function(app, config){

  // if no app is passed in, just return the middleware
  var shouldBindApp = true;
  if(!app || !config){
    config = {};
    shouldBindApp = false;
  } 
  else if (!_.isFunction(app.use)) {
    config = app || {};
    shouldBindApp = false;
  }

  // docs

  const docs = configHelpers.parseSwaggerDocs(relPath, config.swagger);

  // make sure the docs are valid
  if (!docs) { throw new Error('No swagger documentation file recovered. Check the configuration'); }

  // parser
  var swagger = parser.parse(docs);
  if (!swagger) { throw new Error('Fail to parser swagger documentation'); }

  var routeMap = swagger.routeValidationMap;
  var tracePath = helpers.templateTracer(routeMap);

  var middleWare;
  if(config.type === "http"){
    middleWare = httpResponse(tracePath);
  }
  else{
    middleWare = httpResponse(tracePath);
  }
  // else if(config.type == "socket"){
  //   middleWare = socketResponse(routeMap);
  // }
  // else{
  //   console.log("no response type is being passed in. http will be return");
  //   middleWare = httpResponse;
  // }

  if (shouldBindApp) {
    app.use(middleWare);
  } else {
    return middleWare;
  }
}

module.exports = response;
