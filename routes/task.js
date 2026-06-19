import express from "express";
import {createTask, updateTask, deleteTask, getTasks} from "../controllers/taskController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/create", authMiddleware, createTask);
router.put("/update/:id", authMiddleware, updateTask);
router.delete("/delete/:id", authMiddleware, deleteTask);
router.get("/", authMiddleware, getTasks);

export default router;