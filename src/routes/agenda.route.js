const express = require('express');
const { agendaController } = require('../controller');
const { agendaValidation } = require('../validation');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post('/', auth, validate(agendaValidation.createAgenda), agendaController.createAgenda);

router.get('/', auth, validate(agendaValidation.getAgendas), agendaController.getAgendas);

router.patch('/:agendaId', auth, validate(agendaValidation.updateAgenda), agendaController.updateAgenda);

module.exports = router;
