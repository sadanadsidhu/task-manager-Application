const User = require("../models/user.model");
const Task = require("../models/task.model");
const addTask = async (req, res) => {
  const { task, id } = req.body;

  try {
    if (!task) return res.status(400).send("Please enter the task");
    if (task.length < 10)
      return res.status(400).send("Add minimum 10 characters for the task");

    const taskDetail = await new Task({
      task,
      createdBy: id,
    });

    await taskDetail.save();
    return res.status(200).send(taskDetail);
  } catch (error) {
    console.error("Error adding task:", error);
    return res.status(400).send("Task addition failed");
  }
};

const getAllTasks = async (req, res) => {
  const { id } = req.query;
  try {
    let tasklist = await Task.find({ cretedBy: id });
    return res.status(200).send(tasklist);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const editTask = async (req, res) => {};

const statusChange = async (req, res) => {
  const { id, string } = req.body;

  try {
    let task = await Task.findById({ _id: id });
    if (string === "right") {
      if (task.status === "backlog") {
        task.status = "todo";
        task.save();
        return res.send(task);
      } else if (task.status === "todo") {
        task.status = "doing";
        task.save();
        return res.send(task);
      } else if (task.status === "doing") {
        task.status = "done";
        task.save();
        return res.send(task);
      }
    } else {
      if (task.status === "done") {
        task.status = "doing";
        task.save();
        return res.send(task);
      } else if (task.status === "doing") {
        task.status = "todo";
        task.save();
        return res.send(task);
      } else if (task.status === "todo") {
        task.status = "backlog";
        task.save();
        return res.send(task);
      }
    }
  } catch (error) {}
};

// const deleteTask = async (req, res) => {
//   const { id } = req.params;
//   try {
//     let response = await Task.findByIdAndDelete(id);
//     return res.status(200).send(response);
//   } catch (error) {
//     return res.status(400).send("deleteFailed");
//   }
// };
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    let response = await Task.findByIdAndDelete(id);
    if (response) {
      // Task successfully deleted
      return res.status(200).send("Task deleted successfully");
    } else {
      // Task with the specified ID not found
      return res.status(404).send("Task not found");
    }
  } catch (error) {
    // Error occurred during deletion
    console.error("Error deleting task:", error);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  addTask,
  getAllTasks,
  editTask,
  statusChange,
  deleteTask,
};
