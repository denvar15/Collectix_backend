const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const taskController = require('../../controllers/task.controller');

const router = express.Router();

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
/*
router
  .route('/:userId')
  .get(userValidation.getUser, userController.getUser)
  .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
  .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);
 */

module.exports = router;
