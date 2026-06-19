import bcrypt from "bcrypt";
import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      //візьме з мідлвер в роуті
      user: req.user.id,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: req.user.id },
      req.body,
      { new: true },
    );
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findOneAndDelete({
      _id: taskId,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;

    let filter = { user: req.user.id };

    if (status) {
      filter.status = status;
    }

    if (startDate || endDate) {
      filter.createdAt = {};

      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }

      if (endDate) {
        filter.createdAt.$lte = new Date(endDate);
      }
    }

    const tasks = await Task.find(filter);

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};