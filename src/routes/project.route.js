const express = require('express');
const { projectController } = require('../controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, projectController.createProject);

module.exports = router;
