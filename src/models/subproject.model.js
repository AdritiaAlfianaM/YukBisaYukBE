const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const subprojectSchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
subprojectSchema.plugin(toJSON);
subprojectSchema.plugin(paginate);

/**
 * @typedef Subproject
 */
const Subproject = mongoose.model('Subproject', subprojectSchema);

module.exports = Subproject;
