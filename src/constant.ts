import { Status } from "./generated/prisma/enums"

export const EnumStatus = {
    TODO: Status.TODO,
    IN_PROGRESS: Status.IN_PROGRESS,
    DONE: Status.DONE
}

export const AvialableEnumStatus = Object.values(EnumStatus)
