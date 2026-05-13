import { z } from "zod";
import { LoanStatus } from "../../domain/entities/loan";

export const createLoanSchema = z.object({
    gameId: z.string(),
    startDate: z.date(),
    deadline: z.date()
});

export const updateLoanSchema = z.object({
    startDate: z.date().optional(),
    deadline: z.date().optional(),
    status: z.enum(LoanStatus).optional()
});