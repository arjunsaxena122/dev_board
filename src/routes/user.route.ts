import { Router } from "express";
import {
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { userApiKeyValidationSchema, userGetValidationSchema, userLogoutValidationSchema, userRegisterValidationSchema } from "../validators/user.validator";
import { verifyJwt } from "../middlewares/auth.middleware";
import { zodRequestedSource } from "../utils/constants";

const router: Router = Router();

router
  .route("/signup")
  .post(validate(userRegisterValidationSchema, ["body"]), userRegister);
router.route("/login").post(validate(userRegisterValidationSchema, ["body"]), userLogin);
router.route("/logout").get(validate(userLogoutValidationSchema, ["body"]), verifyJwt, userLogout);
router.route("/getme").get(validate(userGetValidationSchema, ["body"]), verifyJwt, userLogout);
router.route("/api-key").get(validate(userApiKeyValidationSchema, ["body"]), verifyJwt, userLogout);

export default router;
