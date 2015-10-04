var _  = require("lodash");

function validateBody(defaultBody, responseBody){
  var result = {}

  //check the default schema and the responseBody is different
  //if there is different then remove the extra key-pair value 
  //response body must follow swagger schema
  _.each(responseBody, function(value, key){
    if(key == "status") return;
    if(typeof defaultBody[key] === "undefined"){
      delete responseBody[key];
    }
    else
      result[key] = value;
  })

   _.each(defaultBody, function(value, key){
    if(!result[key]) result[key] = value;
  })

  return result;
}

var socketResponse = function(swagger){
  var responsesHandler = {};
  _.each(swagger.sanitizedRoutes, function(routeObj) {
    var path = routeObj.path;
    var detailResponses = routeObj.details.responses;
    var response = {};
    _.each(detailResponses, function(description, statusCode){
      if(statusCode === 'default'){
       response['default'] = function(){
          response['body'] = description.description;
        }
      }
      //for 200, 400, 404, etc
      else{
        response[statusCode] = function(responseBody){
          if(responseBody){
            response['body']   = validateBody(description.schema, responseBody);
          }else{
            response['body']   = description.schema;
          }
          response.body.status = parseInt(statusCode);
        }
      }
    });
    responsesHandler[path] = {
      response : response
    }
  })
  return responsesHandler;
}

module.exports = socketResponse;

