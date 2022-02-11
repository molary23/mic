const express = require("express"),
  router = express.Router();

/*
@route GET api/user/test
@desc Test our route
@access public
*/

router.get("/test", (req, res) => res.json({ msg: "user page works" }));

module.exports = router;
