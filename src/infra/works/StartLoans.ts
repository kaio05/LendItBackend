import { LoanStatus } from "@/domain/entities/loan";
import { prisma } from "../data/lib/prisma";

export default async function StartLoans()
{
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.loan.updateMany({
        where: {
            status: LoanStatus.ACCEPTED,
            startDate: { lte: today }
        },
        data: { 
            status: LoanStatus.ONGOING 
        }
    });
}