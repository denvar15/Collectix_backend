const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    collection_user: {
      type: String,
      required: false,
      trim: true,
    },
    deadline: {
      type: String,
      required: false,
      trim: true,
    },
    hashtag: {
      type: String,
      required: false,
      trim: true,
    },
    reward: {
      type: String,
      required: false,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
taskSchema.plugin(toJSON);
taskSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */

taskSchema.pre('save', async function (next) {
  const task = this;
  next();
});

/**
 * @typedef User
 */
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
