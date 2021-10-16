const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const agendaSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    subproject: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Subproject',
      required: true,
    },
    feature: {
      // kumpulan fitur2
      type: [mongoose.SchemaTypes.ObjectId],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
agendaSchema.plugin(toJSON);
agendaSchema.plugin(paginate);

/**
 * @typedef Agenda
 */
const Agenda = mongoose.model('Agenda', agendaSchema);

module.exports = Agenda;
