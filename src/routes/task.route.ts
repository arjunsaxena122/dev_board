import { Router } from "express";
import {
  createTask,
  deleteTaskById,
  getAllTask,
  getTaskById,
  updateTaskById,
} from "../controllers/task.controller";
import { validate } from "../middlewares/validate.middleware";
import { createTaskValidation, deleteTaskByIdValidation, getTaskByIdValidation, updateTaskByIdValidation } from "../validators/task.validator";

const router: Router = Router();

router.route("/").post(validate(createTaskValidation, ["body", "params"]), createTask).get(getAllTask);

router
  .route("task/:tid")
  .put(validate(updateTaskByIdValidation, ["body", "params"]), updateTaskById)
  .delete(validate(deleteTaskByIdValidation, ["body", "params"]), deleteTaskById)
  .get(validate(getTaskByIdValidation, ["body", "params"]), getTaskById);

export default router;
