import { Router } from "express";
import {
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { userRegisterValidationSchema } from "../validators/user.validator";
import { verifyJwt } from "../middlewares/auth.middleware";

const router: Router = Router();

router
  .route("/sign-up")
  .post(validate(userRegisterValidationSchema, "body"), userRegister);
router.route("/login").post(userLogin);
router.route("/logout").get(verifyJwt, userLogout);

export default router;
