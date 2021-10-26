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
    project: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Project',
      required: true,
    },
    subproject: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Subproject',
      required: true,
    },
    status: {
      type: String,
      default: '',
      enum: ['In Progress', 'Stuck', 'Done', ''],
    },
    description: {
      type: String,
      default: '',
    },
    dueDate: {
      type: Date,
    },
    pathFileSharing: {
      type: [String],
      default: [],
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
