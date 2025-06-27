import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1000 * 60,
  limit: 20,
  message: "You reached your request limit, Please try again after a min",
  statusCode: 429,
  legacyHeaders: false,
  standardHeaders: "draft-8",
});

export { limiter };
