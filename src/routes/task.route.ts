import { Router } from "express";
import {
  createTask,
  deleteTaskById,
  getAllTask,
  getTaskById,
  updateTaskById,
} from "../controllers/task.controller";

const router: Router = Router();

router.route("/").post(createTask).get(getAllTask);

router
  .route("task/:tid")
  .put(updateTaskById)
  .delete(deleteTaskById)
  .get(getTaskById);

export default router;
