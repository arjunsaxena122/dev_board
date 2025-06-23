import { NextFunction, Request, Response } from "express";

export const asyncHandler = (
  requestHandler: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<any>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    requestHandler(req, res, next).catch(next);
  };
};
