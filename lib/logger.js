var colors = require('colors/safe');
var morgan = require('morgan');

function method(method) {
  var color = {
    'GET' : colors.green,
    'POST' : colors.yellow
  }

  return (color[method] === undefined ? colors.green : color[method])(method);
}

function url(url, status) {
  var color;

  if(status == 404) {
    color = colors.red;
  } else if(url.startsWith("/api")) {
    color = colors.magenta;
  } else {
    color = colors.white;
  }

  return color(url);
}

function status(status) {
  var color;

  if(status < 300) {
    color = colors.green;
  } else if(status < 400) {
    color = colors.gray;
  } else if(status < 500) {
    color = colors.yellow;
  } else {
    color = colors.red;
  }

  return color(status);
}

module.exports = morgan(function (tokens, req, res) {
  return method(tokens.method(req, res)) +
    ' ' + url(tokens.url(req, res), tokens.status(req, res)) +
    ' ' + status(tokens.status(req, res)) +
    ' ' + colors.green(tokens['remote-addr'](req, res));
})
