var httpResponse = require('./http_response');
var socketResponse = require('./socket_response');

var response = function(type){
  if(type === "http"){
    return httpResponse;
  }
  else if(type == "socket"){
    return socketResponse;
  }
  else{
    console.log("no response type is being passed in. http will be return");
    return httpResponse;
  }
}

module.exports = response;
