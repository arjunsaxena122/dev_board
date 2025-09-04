import { Router } from "express";
import { createProject, 
    deleteProjectById, 
    getAllProjects, 
    getProjectById, 
    updateProjectById 
} from "../controllers/project.controller";
import { verifyJwt } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
    createProjectValidationSchema,
    deleteProjectByIdtValidationSchema,
    getAllProjectValidationSchema,
    getProjectByIdtValidationSchema, updateProjectByIdtValidationSchema
} from "../validators/project.validator";

const router: Router = Router();

router.route("/create-project")
.post(validate(createProjectValidationSchema, ['body', 'params']), verifyJwt, createProject);
router.route("/get-all-project")
.get(validate(getAllProjectValidationSchema, ['params']), verifyJwt, getAllProjects);
router.route("/project/:pid")
.get(validate(getProjectByIdtValidationSchema, ['params']), verifyJwt, getProjectById)
.put(validate(updateProjectByIdtValidationSchema, ['body', 'params']), verifyJwt, updateProjectById)
.delete(validate(deleteProjectByIdtValidationSchema, ['params']), verifyJwt, deleteProjectById);

export default router;
