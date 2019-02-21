var genshijin = require('../../lib/genshijin');

module.exports = {
  post : function(req, res) {
    genshijin(req.body.status, req.body.domain, req.body.access_token);
    res.send("Execution started.");
  }
}
