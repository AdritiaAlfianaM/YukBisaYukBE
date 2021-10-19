const express = require('express');
const { subprojectController } = require('../controller');
const { subprojectValidation } = require('../validation');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post('/', auth, subprojectController.createSubproject);

router.get('/', auth, validate(subprojectValidation.getSubprojects), subprojectController.getSubprojects);

module.exports = router;