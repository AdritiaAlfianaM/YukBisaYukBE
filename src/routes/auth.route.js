const express = require('express');
const { authValidation } = require('../validation');
const { authController } = require('../controller');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post('/google-login', validate(authValidation.googleLogin), authController.googleLogin);

module.exports = router;
