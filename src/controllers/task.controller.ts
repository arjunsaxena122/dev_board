import prisma from "../db/db";
import { ApiError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";
import { asyncHandler } from "../utils/async-handler";

export const createTask = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const { title, description, status } = req.body;

  if (!pid) {
    throw new ApiError(400, "Project id not found");
  }

  if (!title || !description) {
    throw new ApiError(400, "Please fill all the required fields");
  }

  const project = await prisma.project.findUnique({
    where: {
      id: pid,
    },
  });

  if (!project) {
    throw new ApiError(400, "Project not found");
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      status,
      projectId: pid,
    },
  });

  if (!task) {
    throw new ApiError(
      500,
      "Internal server error, Please try again to create the task",
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "Task create successfully", task));
});

export const getAllTask = asyncHandler(async (req, res) => {
  const { pid } = req.params;

  if (!pid) {
    throw new ApiError(400, "Project id not found");
  }

  const task = await prisma.task.findMany({
    where: {
      projectId: pid,
    },
  });

  if (!task) {
    throw new ApiError(400, "Task isn't creating yet");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Fetched all task successfully", task));
});

export const getTaskById = asyncHandler(async (req, res) => {
  const { tid } = req.params;

  if (!tid) {
    throw new ApiError(400, "Task id not found");
  }

  const task = await prisma.task.findUnique({
    where: { id: tid },
  });

  if (!task) {
    throw new ApiError(400, "Task not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Your particular Task found successfully", task),
    );
});

export const updateTaskById = asyncHandler(async (req, res) => {
  const { tid } = req.params;
  const { title, description, status } = req.body;

  if (!tid) {
    throw new ApiError(400, "Task id not found");
  }

  const isCheckTask = await prisma.task.findUnique({
    where: { id: tid },
  });

  if (!isCheckTask) {
    throw new ApiError(400, "Task not found");
  }

  if (
    isCheckTask.title === title ||
    isCheckTask.description === description ||
    isCheckTask.status === status
  ) {
    throw new ApiError(400, "Please update something first!");
  }

  const task = await prisma.task.update({
    where: {
      id: tid,
    },
    data: {
      title,
      description,
      status,
    },
  });

  if (!task) {
    throw new ApiError(
      500,
      "Internal server error with updating the Task, Please try again!",
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Task update successfully", task));
});

export const deleteTaskById = asyncHandler(async (req, res) => {
  const { tid } = req.params;

  if (!tid) {
    throw new ApiError(400, "Task id not found");
  }

  const task = await prisma.task.findUnique({
    where: { id: tid },
  });

  if (!task) {
    throw new ApiError(400, "Task not found");
  }

  const delTask = await prisma.task.delete({
    where: { id: tid },
  });

  if (!delTask) {
    throw new ApiError(
      500,
      "Internal server error with updating the Task, Please try again!",
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Task deleted successfully", delTask));
});
