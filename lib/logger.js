import colors from 'colors/safe.js';
import morgan from 'morgan';

function method(method) {
  const color = {
    'GET': colors.green,
    'POST': colors.yellow
  };

  return (color[method] || colors.red)(method);
}

function url(url, status) {
  let color;

  if (status === 404) {
    color = colors.red;
  } else if (url.startsWith("/api")) {
    color = colors.magenta;
  } else {
    color = colors.white;
  }

  return color(url);
}

function status(status) {
  let color;

  if (status < 300) {
    color = colors.green;
  } else if (status < 400) {
    color = colors.gray;
  } else if (status < 500) {
    color = colors.yellow;
  } else {
    color = colors.red;
  }

  return color(status);
}

export default morgan(function (tokens, req, res) {
  return `${method(tokens.method(req, res))} ${url(tokens.url(req, res), tokens.status(req, res))} ${status(tokens.status(req, res))} ${colors.green(tokens['remote-addr'](req, res))}`;
});
