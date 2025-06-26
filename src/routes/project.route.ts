import { Router } from "express";
import { createProject } from "../controllers/project.controller";
import { verifyJwt } from "../middlewares/auth.middleware";

const router: Router = Router();

router.route("/create-project").post(verifyJwt, createProject);

export default router;
