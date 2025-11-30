import { Router } from "express";
import { getServerHealthInfo } from "../controllers/health.controller";

const router = Router()

router.route("/health").get(getServerHealthInfo)

export default router