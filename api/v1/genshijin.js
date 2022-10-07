import genshijin from '../../lib/genshijin.js';

export default {
  post: (req, res, next) => {
    genshijin(decodeURIComponent(req.query.status), req.query.domain, req.query.access_token)
        .then(() => {
          res.send("done.")
        })
        .catch((err) => {
          next(err);
        });
  }
};
