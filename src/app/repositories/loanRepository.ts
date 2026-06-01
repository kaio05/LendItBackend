import { Loan, LoanStatus } from "@/domain/entities/loan";
import IloanRepository from "@/domain/Irepositories/IloanRepository";
import { prisma } from "@/infra/data/lib/prisma";

export default class LoanRepository implements IloanRepository
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
            where: { id }
        });

        if (!loan) return null;

        return new Loan(
            loan.loanerId,
            loan.receiverId,
            loan.gameId,
            loan.startDate,
            loan.deadline,
            loan.status as LoanStatus,
            loan.id
        );
    }

    async findByUserId(id: string): Promise<Loan[]> {
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
            loan.status as LoanStatus,
            loan.id
        ));
    }

    async findByGameId(id: string): Promise<Loan[]> {
        const loans = await prisma.loan.findMany({
            where: { gameId: id }
        });

        return loans.map(loan => new Loan(
            loan.loanerId,
            loan.receiverId,
            loan.gameId,
            loan.startDate,
            loan.deadline,
            loan.status as LoanStatus,
            loan.id
        ));
    }

    async findByStatus(id:string, status: LoanStatus): Promise<Loan[]> {
        const loans = await prisma.loan.findMany({
            where: { 
                OR: [ { loanerId : id }, { receiverId: id } ],
                status: status
            }
        });

        return loans.map(loan => new Loan(
            loan.loanerId,
            loan.receiverId,
            loan.gameId,
            loan.startDate,
            loan.deadline,
            loan.status as LoanStatus,
            loan.id
        ));
    }

    async updateDate(id: string, start: Date, deadline: Date): Promise<void> {
        await prisma.loan.update({
            where: { id },
            data: {
                startDate: start,
                deadline: deadline
            }
        });
    }

    async updateStatus(id: string, status: LoanStatus): Promise<void> {
        await prisma.loan.update({
            where: { id },
            data: { status: status }
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.loan.delete({
            where: { id }
        });
    }

    async findOwnerByGameId(id: string): Promise<string | null> {
        const game = await prisma.game.findUnique({
            where: { id }
        });

        if (!game) return null;

        return game.userId;
    }

    async findUserEmailById(id: string): Promise<string | null> {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            return null;
        }

        return user.email;
    }

    async userExists(id: string): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        return user? true : false;
    }
}