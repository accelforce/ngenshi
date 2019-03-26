var genshijin = require('../../lib/genshijin');

module.exports = {
  post : function(req, res) {
    genshijin(decodeURIComponent(req.query.status), req.query.domain, req.query.access_token);
    res.send("Execution started.");
  }
}
