import { Router } from "express";
import {
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { userRegisterValidationSchema } from "../validators/user.validator";

const router: Router = Router();

router
  .route("/sign-up")
  .post(validate(userRegisterValidationSchema, "body"), userRegister);
router.route("/sign-in").post(userLogin);
router.route("/logout").get(userLogout);

export default router;
