var express = require('express');
var router = express.Router();

var v1 = {
  genshijin : require('../api/v1/genshijin')
}

router.post('/v1/genshijin', v1.genshijin.post);

module.exports = router;
