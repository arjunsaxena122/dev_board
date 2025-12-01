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
import { verifyJwt } from "../middlewares/auth.middleware";

const router: Router = Router({ mergeParams: true });
// ? mergeParams : it's actually mergering parent and child route

router.route("/task").post(validate(createTaskValidation, ["body", "params"]), verifyJwt, createTask).get(verifyJwt, getAllTask);


router
  .route("/task/:tid")
  .get(validate(getTaskByIdValidation, ["body", "params"]), verifyJwt, getTaskById)
  .put(validate(updateTaskByIdValidation, ["body", "params"]), verifyJwt, updateTaskById)
  .delete(validate(deleteTaskByIdValidation, ["body", "params"]), verifyJwt, deleteTaskById)

export default router;
