var api         = require('supertest');
var koa         = require("koa");
var fleekRouter = require("fleek-router");
var should      = require('chai').should;
var expect      = require('chai').expect;
var fleekParser = require("fleek-parser");

var swagger     = fleekParser.parse("./swagger.json");

var app = koa();
fleekRouter(app,{
  controllers : "./controllers",
  swagger : './swagger.json'
})




describe('response with default parameters', function(){
  it('should return default schema when the controller does not pass any arguments', function(done){
    var path = "/pets";
    var method = 'get';
    var controller = "pets"
    var data = swagger.controllers[controller][path][method].responses['200'];
    api(app.callback()).get("/api" + path).end(function(err, res){
       expect(res.body).to.deep.equal(data.schema);
       done();
    });
  })

   it('should overwrite default schema when the controller does pass an argument', function(done){
    var path = "/user";
    var method = 'get';
    var controller = "user"
    var data = swagger.controllers[controller][path][method].responses['200'];
    api(app.callback()).get("/api" + path).end(function(err, res){
      var controllerExpectedResponse = {
        username : "Hart",
        phone    : "123456"
      }
       expect(res.body).to.not.deep.equal(data.schema);
       expect(res.body).to.deep.equal(controllerExpectedResponse);
       done();
    });
  })

   it('should remove unecessary response', function(done){
    var path = "/employee";
    var method = 'get';
    var controller = "employee"
    var data = swagger.controllers[controller][path][method].responses['200'];
    api(app.callback()).get("/api" + path).end(function(err, res){
      var controllerExpectedResponse = {
        username : "Hart",
        phone    : "123456"
      }
       expect(res.body).to.not.deep.equal(data.schema);
       expect(res.body).to.deep.equal(controllerExpectedResponse);
       done();
    });
  })

   it('should write default response if controller does not supply enough information', function(done){
    var path = "/teacher";
    var method = 'get';
    var controller = "teacher"
    var data = swagger.controllers[controller][path][method].responses['200'];
    api(app.callback()).get("/api" + path).end(function(err, res){
      var ExpectedResponse = {
        username : "Hart",
        phone    : "123456",
        school   : "defaultValue"
      }
       expect(res.body).to.not.deep.equal(data.schema);
       expect(res.body).to.deep.equal(ExpectedResponse);
       done();
    });
  })
});

