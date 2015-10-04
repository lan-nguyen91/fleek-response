# Fleek Response

Response module that must be used with fleek router or fleek web socket.

Quick reference:
- Best used with the [fleek-router](#usage)
- Best used with the [fleek-ws](#usage)


## Usage
```javascript

  //using with fleek-router

  var fleekResponse = require("fleek-response")('http');
  var route         = require("koa-router");

  ...

  //psuedocode for using fleek response as middleware
  var sampleRouter = new route['GET'](path, bindRouteData, fleekResponse, middleware);


  //----------------------------------------------------------------------------

  //using with fleek-ws (fleek web socket)

  var fleekResponse = require("fleek-response")('socket');
  var parser        = require('fleek-parser');

  //parse document as json object
  var swagger = parser.parse(docs);

  var responsesHandler = fleekResponse(swagger);

  responsesHandler contain object that load up swagger schema as default response body

```

## Tip
  - For deeper understanding the use of fleek response, please study fleek-router, and fleek-ws implementation

## Authors

- [John Hofrichter](https://github.com/johnhof)
- [Lan Nguyen](https://github.com/lan-nguyen91)
