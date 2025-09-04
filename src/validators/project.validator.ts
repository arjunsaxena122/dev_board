import { z } from "zod";

export const createProjectValidationSchema = z.object({
  id: z.string().cuid({
    message: "userId is required"
  }),
  title: z.string({
    message: "Title is required"
  }),
  description: z.string({
    message: "Description is required"
  })
});

export const getAllProjectValidationSchema = z.object({
  id: z.string().cuid({
    message: "userId is required"
  }),
});

export const getProjectByIdtValidationSchema = z.object({
  pid: z.string().cuid({
    message: "pid (projectID) is required"
  })
});

export const updateProjectByIdtValidationSchema = z.object({
  pid: z.string().cuid({
    message: "pid (projectID) is required"
  }),
  title: z.string({
    message: "Title is required"
  }),
  description: z.string({
    message: "Description is required"
  })
});

export const deleteProjectByIdtValidationSchema = z.object({
  pid: z.string().cuid({
    message: "pid (projectID) is required"
  })
});