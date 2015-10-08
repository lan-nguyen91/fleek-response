var _  = require("lodash");

var response = function*(next){

  var ctx = this;

  function filterRecursive(defaultRes, actualRes){
    for(var key in actualRes){
      //if exist after merge but not in schema, remove it
      if(typeof defaultRes[key] == "undefined"){
          delete actualRes[key]
      }
      //if nested object let traverse it
      if(typeof actualRes[key] === 'object'){
        filterRecursive(actualRes[key], defaultRes[key]);
      }
    }
    return actualRes;
  }

  function validateBody(defaultBody, responseBody){
    var mergeResult = _.merge(_.clone(defaultBody,true), responseBody);
    var filterredResult = filterRecursive(defaultBody, mergeResult);

    return filterredResult;
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

