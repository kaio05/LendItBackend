import Fine from "@/domain/entities/fine";
import IfineRepository from "@/domain/Irepositories/IfineRepository";
import { prisma } from "@/infra/data/lib/prisma";
import { fineGetDTO } from "../dtos/fineDTO";

export default class FineRepository implements IfineRepository
{
    async getById(id: string): Promise<Fine | null> {
        const fine = await prisma.fine.findUnique({
            where: { id }
        });

        if (!fine) return null;

        return new Fine(fine.debtorId, fine.loanId, fine.value.toNumber(), fine.id);
    }

    async getAll(id: string): Promise<fineGetDTO[]> {
        const fines = await prisma.fine.findMany({
            where: { debtorId: id },
            include: {
                loan: {
                    select: { deadline: true },
                    include: { game: { select: {name: true}}}
                }
            }
        });

        return fines.map(fine => ({
            id: fine.id,
            loanId: fine.loanId,
            debtorId: fine.debtorId,
            value: fine.value.toNumber(),
            deadline: fine.loan.deadline,
            gameName: fine.loan.game.name
        }));
    }

    async getCount(id: string): Promise<number> {
        const fines = await prisma.fine.findMany({
            where: { debtorId: id }
        });

        return fines.length;
    }

    async userExists(id: string): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        return user? true : false;
    }

    async payFine(id: string): Promise<void> {
        await prisma.fine.delete({
            where: { id }
        });
    }

    async desuspend(id: string): Promise<void> {
        await prisma.user.update({
            where: { id },
            data: { isSuspended: false }
        });
    }
}