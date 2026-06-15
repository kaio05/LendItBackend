import Fine from "@/domain/entities/fine";
import IfineRepository from "@/domain/Irepositories/IfineRepository";
import { Ijwt } from "@/domain/Iutils/Ijwt";
import { fineGetDTO } from "../dtos/fineDTO";

export default class FineServices
{
    private repository: IfineRepository;
    private jwt: Ijwt;

    constructor(repository: IfineRepository, jwt: Ijwt) {
        this.repository = repository;
        this.jwt = jwt;
    }

    async getUnique(token: string, id: string): Promise<Fine | null> {
        const userId = this.jwt.decodeAccessToken(token).id;

        const userExists = this.repository.userExists(userId);
        if (!userExists) throw new Error("Esse usuário não existe.");

        const fine = await this.repository.getById(id);
        if (!fine) return null;

        if (fine.getDebtorId() !== userId) throw new Error("Você não tem acesso a esta multa.");

        return fine;
    }

    async getAll(token: string): Promise<fineGetDTO[]> {
        const userId = this.jwt.decodeAccessToken(token).id;

        const userExists = this.repository.userExists(userId);
        if (!userExists) throw new Error("Esse usuário não existe.");

        return await this.repository.getAll(userId);
    }

    async payFine(token: string, id: string): Promise<void> {
        const userId = this.jwt.decodeAccessToken(token).id;

        const userExists = await this.repository.userExists(userId);
        if (!userExists) throw new Error("Usuário não encontrado.");

        const fine = await this.repository.getById(id);
        if (!fine) throw new Error("Multa não encontrada");

        if (fine.getDebtorId() !== userId) throw new Error("Você não tem acesso a esta multa.");

        await this.repository.payFine(id);

        const count = await this.repository.getCount(id);
        if (!count){
            await this.repository.desuspend(userId);
        }
    }
}