const express = require('express');
const taskController = require('./../controllers/taskController');
const authController = require('./../controllers/authController');

const router = express.Router();
router.use(authController.isLoggedInUser);

router.route('/').post(taskController.createTask);
router.route('/:taskid').get(taskController.getTask).delete(taskController.deleteTask).patch(taskController.updateTask);
// router.route('/tasks/mytask').get(taskController.getMyAllTasks)
router.route('/tasks/mytask').get(taskController.mytask)
router.route('/tasks/done/:taskid').patch(taskController.markDone)
router.route('/tasks/clearCompleted').delete(taskController.deleteCompletedTask);

module.exports  = router;

