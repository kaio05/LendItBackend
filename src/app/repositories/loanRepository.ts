import { Loan, LoanStatus } from "../../domain/entities/loan";
import IloanRepository from "../../domain/Irepositories/IloanRepository";
import { prisma } from "../../infra/data/lib/prisma";

export class LoanRepository implements IloanRepository
{
    async save(loan: Loan): Promise<void> {
        await prisma.loan.create({
            data: {
                loanerId: loan.getLoanerId(),
                receiverId: loan.getReceiverId(),
                gameId: loan.getGameId(),
                startDate: loan.getStartDate(),
                deadline: loan.getDeadline()
            }
        });
    }

    async findById(id: string): Promise<Loan | null> {
        const loan = await prisma.loan.findUnique({
            where: { id: id }
        });

        if (!loan) {
            return null;
        }

        return new Loan(loan.loanerId, loan.receiverId, loan.gameId, loan.startDate, loan.deadline, loan.id, loan.status as LoanStatus);
    }

    async findByUserId(id: string): Promise<Loan[] | []> {
        const loans = await prisma.loan.findMany({
            where: {
                OR: [
                    { loanerId: id },
                    { receiverId: id }
                ] 
            }
        });

        return loans.map(loan => new Loan(
            loan.loanerId, 
            loan.receiverId, 
            loan.gameId, 
            loan.startDate, 
            loan.deadline, 
            loan.id, 
            loan.status as LoanStatus)
        );
    }

    async findByStatus(status: LoanStatus): Promise<Loan[] | []> {
        const loans = await prisma.loan.findMany({
            where: { status: status }
        });

        return loans.map(loan => new Loan(
            loan.loanerId, 
            loan.receiverId, 
            loan.gameId, 
            loan.startDate, 
            loan.deadline, 
            loan.id, 
            loan.status as LoanStatus)
        );
    }

    async findOwnerIdByGameId(gameId: string): Promise<string | null> {
        const owner = await prisma.game.findUnique({
            where: { id: gameId },
        });

        if (!owner) {
            return null;
        }

        return owner.userId;
    }

    async userExists(id: string): Promise<boolean> {
        const exists = await prisma.user.findUnique({
            where: { id: id }
        });

        return exists? true : false;
    }

    async update(loan: Loan): Promise<void> {
        await prisma.loan.update({
            where: { id: loan.getId() },
            data: {
                startDate: loan.getStartDate(),
                deadline: loan.getDeadline(),
                status: loan.getStatus()
            }
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.loan.delete({
            where: { id: id }
        });
    }
}