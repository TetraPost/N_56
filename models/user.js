/* Mongoose */
const path = require('path');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchemeList = {
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
};

const userScheme = new Schema(userSchemeList, { timestamps: true });

const modelname = path.basename(__filename, '.js');
const model = mongoose.model(modelname, userScheme);
module.exports = model;
