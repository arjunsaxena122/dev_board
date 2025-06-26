import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { ApiError } from "../utils/api-error";
import { Iuser } from "../middlewares/auth.middleware";
import prisma from "../db/db";
import { ApiResponse } from "../utils/api-response";

export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const { id } = (req as Iuser).user;

    if (!title || !description) {
      throw new ApiError(400, "Please fill all required fields");
    }

    const isProjectTitleUnique = await prisma.project.findUnique({
      where: { title },
    });

    if (isProjectTitleUnique) {
      throw new ApiError(400, "Please enter the different project title ");
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        createdById: id,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            fullname: true,
            username: true,
            email: true,
            isEmailVerified: true,
          },
        },
      },
    });

    if (!project) {
      throw new ApiError(
        500,
        "Interal server error, Please try again to create project",
      );
    }

    return res
      .status(201)
      .json(new ApiResponse(201, "Project create successfully", project));
  },
);

export const getAllProjects = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = (req as Iuser).user;

    const allUserProject = await prisma.project.findMany({
      where: {
        createdById: id,
      },
    });

    if (!allUserProject) {
      throw new ApiError(400, "Project isn't created yet! ");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Fetched all project successfully",
          allUserProject,
        ),
      );
  },
);

export const getProjectById = asyncHandler(
  async (req: Request, res: Response) => {
    const { pid } = req.params;

    if (!pid) {
      throw new ApiError(400, "Project Id not found");
    }

    const project = await prisma.project.findUnique({
      where: { id: pid },
    });

    if (!project) {
      throw new ApiError(400, "Project not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Project found successfully", project));
  },
);

export const updateProjectById = asyncHandler(
  async (req: Request, res: Response) => {
    const { pid } = req.params;
    const { title, description } = req.body;

    if (!pid) {
      throw new ApiError(400, "Project Id not found");
    }

    const isProjectExist = await prisma.project.findUnique({
      where: { id: pid },
    });

    if (!isProjectExist) {
      throw new ApiError(400, "Project not found");
    }

    if (isProjectExist.title === title) {
      throw new ApiError(400, "Please take an unique title");
    }

    const project = await prisma.project.update({
      where: {
        id: pid,
      },
      data: {
        title,
        description,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Project update successfully", project));
  },
);

export const deleteProjectById = asyncHandler(
  async (req: Request, res: Response) => {
    const { pid } = req.params;

    if (!pid) {
      throw new ApiError(400, "Project Id not found");
    }

    const isProjectExist = await prisma.project.findUnique({
      where: { id: pid },
    });

    if (!isProjectExist) {
      throw new ApiError(400, "Project not found");
    }

    const project = await prisma.project.delete({
      where: { id: pid },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Project deleted successfully", project));
  },
);
