/**
 *
 * @author mteuber
 */

const express = require('express');
const router = express.Router();

/* POST apply cancel transaction. */
router.post('/', function(req, res, next) {
    res.send(req.body);    // echo the result back
});

module.exports = router;