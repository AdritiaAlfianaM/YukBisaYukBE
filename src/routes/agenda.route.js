const express = require('express');
const { agendaController } = require('../controller');
const { agendaValidation } = require('../validation');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post('/', auth, agendaController.createAgenda);

router.get('/', auth, validate(agendaValidation.getAgendas), agendaController.getAgendas);

module.exports = router;
