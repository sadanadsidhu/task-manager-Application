
const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
router.route("/task/add").post(taskController.addTask);
router.route("/task/tasks").get(taskController.getAllTasks);
router.route("/task/edit/:id").put(taskController.editTask); // Corrected route

router
  .route("/task/:id") // Corrected route
  .put(taskController.statusChange)
  .delete(taskController.deleteTask);

module.exports = router;
