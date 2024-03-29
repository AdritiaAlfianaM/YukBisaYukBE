const express = require('express');
const { projectController } = require('../controller');
const { projectValidation } = require('../validation');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post('/', auth, projectController.createProject);

router.get('/', auth, validate(projectValidation.getProjects), projectController.getProjects);

router.delete('/:projectId', auth, validate(projectValidation.deleteProject), projectController.deleteProject);

router.patch('/:projectId', auth, validate(projectValidation.updateProject), projectController.updateProject);

module.exports = router;
