var httpResponse = require('./http_response');
var socketResponse = require('./socket_response');

var response = function(type){
  if(type === "http"){
    return httpRespnse;
  }
  else if(type == "socket"){
    return socketResponse;
  }
  else{
    throw new Error("no specific type of response found!");
  }
}

module.exports = response;
