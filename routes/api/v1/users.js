const express = require('express');
const cors = require("cors");
const router = express.Router();

const userController = require('../../../controllers/api/v1/users_api');

router.post("/create",cors(), userController.signUp);
router.post("/login", cors(), userController.createSession);

module.exports = router;