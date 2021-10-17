const express = require('express');
const { projectController } = require('../controller');
const { projectValidation } = require('../validation');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post('/', auth, projectController.createProject);

router.get('/', auth, validate(projectValidation.getProjects), projectController.getProjects);

module.exports = router;
