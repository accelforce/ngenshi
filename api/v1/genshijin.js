var genshijin = require('../../lib/genshijin');

module.exports = {
  post : function(req, res) {
    genshijin(req.body.status);
    res.send();
  }
}
