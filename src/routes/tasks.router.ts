import { Router } from "express"
import {
  createTask,
  deleteTask,
  getTask,
  listTasks,
  updateTask
} from "../controllers/tasks.controller"

const router = Router()

router.post("/", createTask)
router.get("/", listTasks)
router.get("/:id", getTask)
router.patch("/:id", updateTask)
router.delete("/:id", deleteTask)

export default router
