import { Router } from "express";
import {
  apiKey,
  getMe,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { userRegisterValidationSchema } from "../validators/user.validator";
import { verifyJwt } from "../middlewares/auth.middleware";

const router: Router = Router();

router
  .route("/signup")
  .post(validate(userRegisterValidationSchema, ["body"]), userRegister);
router.route("/login").post(validate(userRegisterValidationSchema, ["body"]), userLogin);
router.route("/logout").get(verifyJwt, userLogout);
router.route("/getme").get(verifyJwt, getMe);
router.route("/api-key").get(verifyJwt, apiKey);

export default router;
