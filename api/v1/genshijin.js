module.exports = {
  post : function(req, res) {
    res.send(req.body.status)
  }
}
