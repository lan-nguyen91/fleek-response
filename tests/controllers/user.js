'use strict';
module.exports.get = function* (){
  var ctx   = this;
  //ctx.fleek.response['default']();
  ctx.fleek.response['200']({
    username : "Hart",
    phone    : "123456"
  });
}


