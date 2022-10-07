import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, _) {
  res.render('index', { title: 'ngenshi' });
});

export default router;
