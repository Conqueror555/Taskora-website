import asyncHandler from "express-async-handler";
import TaskModel from "../../models/task/TaskModel.js";

// Create Task
export const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required!" });
    }
    if (!description || description.trim() === "") {
      return res.status(400).json({ message: "Description is required!" });
    }

    const task = new TaskModel({
      title,
      description,
      dueDate,
      priority,
      status,
      user: req.user._id,
    });

    await task.save();
    return res.status(201).json(task);
  } catch (error) {
    console.log("Error in createTask:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

// Get all tasks
export const getTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ message: "User not found!" });
    }

    const tasks = await TaskModel.find({ user: userId });
    return res.status(200).json({
      length: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log("Error in getTasks:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

// Get single task
export const getTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Please provide a task id" });
    }

    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }

    if (!task.user.equals(userId)) {
      return res.status(401).json({ message: "Not authorized!" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.log("Error in getTask:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

// Update task
export const updateTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { title, description, dueDate, priority, status, completed } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Please provide a task id" });
    }

    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }

    if (!task.user.equals(userId)) {
      return res.status(401).json({ message: "Not authorized!" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status ?? task.status;
    task.completed = completed ?? task.completed;

    await task.save();
    return res.status(200).json(task);
  } catch (error) {
    console.log("Error in updateTask:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

// Delete task
export const deleteTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }

    if (!task.user.equals(userId)) {
      return res.status(401).json({ message: "Not authorized!" });
    }

    await TaskModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteTask:", error.message);
    return res.status(500).json({ message: error.message });
  }
});
