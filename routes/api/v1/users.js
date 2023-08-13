const express = require('express');
const router = express.Router();

const userController = require('../../../controllers/api/v1/users_api');

router.post("/create", userController.signUp);
router.post("/login", userController.createSession);

module.exports = router;