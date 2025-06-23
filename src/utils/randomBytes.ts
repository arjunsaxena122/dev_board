import crypto from "crypto";

export const randomString = () => {
  return crypto.randomBytes(32).toString("hex");
};
