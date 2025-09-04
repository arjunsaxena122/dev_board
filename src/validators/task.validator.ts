import { z } from "zod"

export const createTaskValidation = z.object({
    pid: z.string().cuid("pid (projectID) is required"),
    title: z.string({
        message: "Title is required"
    }),
    description: z.string({
        message: "Description is required"
    }),
    status: z.enum(["TODO", "PENDING", "DONE"], {
        // ! issue :- A object contains details about validation error like code, path, expected, receive
        // ! ctx (context) :- An object containing context about the validation process.
        errorMap: (issue, ctx) => {
            return {
                message: "Invalid task status"
            }
        }
    })
})

export const getAllTaskValidation = z.object({
    pid: z.string().cuid({
        message: "pid (projectID) is required"
    })
})

export const getTaskByIdValidation = z.object({
    tid: z.string().cuid({
        message: "tid (taskID) is required"
    })

})

export const updateTaskByIdValidation = z.object({
    tid: z.string().cuid("tid (taskID) is required"),
    title: z.string({
        message: "Title is required"
    }),
    description: z.string({
        message: "Description is required"
    }),
    status: z.enum(["TODO", "PENDING", "DONE"], {
        // ! issue :- A object contains details about validation error like code, path, expected, receive
        // ! ctx (context) :- An object containing context about the validation process.
        errorMap: (issue, ctx) => {
            return {
                message: "Invalid task status"
            }
        }
    })
})

export const deleteTaskByIdValidation = z.object({
    tid: z.string().cuid("tid (taskID) is required")
})