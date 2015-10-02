var _  = require("lodash");

var response = function*(next){

  var ctx = this;

  function validateBody(defaultBody, responseBody){
    var result = {}

    //check the default schema and the responseBody is different
    //if there is different then remove the extra key-pair value 
    //response body must follow swagger schema
    _.each(responseBody, function(value, key){
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

  try{
    var detailResponses = ctx.fleek.routeConfig.details.responses;
    ctx.fleek.response = {};

    //for each response element, attached a method
    _.each(detailResponses, function(description, statusCode){
      if(statusCode === 'default'){
        ctx.fleek.response['default'] = function(){
          ctx.body = description.description;
        }
      }
      //for 200, 400, 404, etc
      else{
        ctx.fleek.response[statusCode] = function(responseBody){
          ctx.status = parseInt(statusCode);
          if(responseBody){
            ctx.body   = validateBody(description.schema, responseBody);
          }else{
            ctx.body   = description.schema; 
          }
        }
      }
    });
  }catch(e){
    //for some reason fleek object never get bind to the ctx
    console.log(e);
  }

  //populate body with schema object
  try{
    yield next;
  }catch (e){
    console.log(e);
  }
}


module.exports = response;
