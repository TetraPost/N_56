/* Mongoose */
const path = require('path');
const mongoose = require('mongoose');

require('../models/user');
require('../models/article');

const { Schema } = mongoose;

const commentSchemeList = {
  comment: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 250,
  },
  authorId: { type: Schema.Types.ObjectId, ref: 'user' },
  articleId: { type: Schema.Types.ObjectId, ref: 'article' },
};

const commentScheme = new Schema(commentSchemeList, { timestamps: true });

const modelname = path.basename(__filename, '.js');
const model = mongoose.model(modelname, commentScheme);
module.exports = model;
