import express from 'express';

import genshijin from '../api/v1/genshijin.js';

const router = express.Router();

const v1 = {
  genshijin
};

router.post('/v1/genshijin', v1.genshijin.post);

export default router;
