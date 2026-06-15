import { z } from "zod";
import { LoanStatus } from "@/domain/entities/loan";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

const minDeadline = new Date(tomorrow);
minDeadline.setDate(minDeadline.getDate() + 2);

export const createLoanSchema = z.object({
    gameId: z.uuid(),
    startDate: z.coerce.date().min(tomorrow),
    deadline: z.coerce.date().min(minDeadline)
});

export const updateLoanSchema = z.object({
    startDate: z.coerce.date().optional(),
    deadline: z.coerce.date().optional(),
}).refine((data) => {
    if (data.startDate && data.startDate < tomorrow) return false;
    if (data.deadline && data.deadline < tomorrow) return false;
    return true;
}, {
    message: "As datas não podem ser no passado.",
    path: ["startDate"] // Onde o erro vai brilhar no front
})
.refine((data) => {
    if (data.startDate && data.deadline) {
        return data.deadline > data.startDate;
    }
    return true;
}, {
    message: "A data de devolução deve ser posterior à data de início.",
    path: ["deadline"]
});

export const statusSchema = z.object({
    status: z.enum(LoanStatus)
});