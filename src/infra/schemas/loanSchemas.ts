import { z } from "zod";
import { LoanStatus } from "@/domain/entities/loan";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

export const createLoanSchema = z.object({
    gameId: z.uuid(),
    startDate: z.coerce.date().min(tomorrow),
    deadline: z.coerce.date().min(tomorrow.getDate() + 2)
});

export const updateLoanSchema = z.object({
    startDate: z.coerce.date().min(tomorrow).optional(),
    deadline: z.coerce.date().min(tomorrow.getDate() + 2).optional(),
});

export const statusSchema = z.object({
    status: z.enum(LoanStatus)
});