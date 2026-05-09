import { Loan, LoanStatus } from "../../domain/entities/loan";
import IloanRepository from "../../domain/Irepositories/IloanRepository";
import { Ijwt } from "../../domain/Iutils/Ijwt";
import { loanDTO } from "../dtos/loanDTO";

export class LoanService
{
    private repository: IloanRepository;
    private jwt: Ijwt;

    constructor(repository: IloanRepository, jwt: Ijwt){
        this.repository = repository;
        this.jwt = jwt;
    }

    async create(token: string, loan: loanDTO): Promise<void> {
        const receiverId = this.jwt.decodeAccessToken(token).id;

        const userExists = await this.repository.userExists(receiverId);
        if (!userExists) {
            throw new Error("Usuário não existe.")
        }

        const ownerId = await this.repository.findOwnerIdByGameId(loan.gameId!);
        if (!ownerId) {
            throw new Error("Este jogo não possui um dono.")
        }

        try {
            await this.repository.save(new Loan(ownerId, receiverId, loan.gameId!, loan.startDate!, loan.deadline!));
        }
        catch (err) {
            throw new Error("Erro durante o cadastro do empréstrimo.")
        }
    }

    async getAll(token: string): Promise<Loan[] | []> {
        const id = this.jwt.decodeAccessToken(token).id;
        
        const userExists = this.repository.userExists(id);
        if (!userExists) {
            throw new Error("Usuário não existe.")
        }

        const loans = await this.repository.findByUserId(id);
        return loans;
    }

    async getUnique(id: string): Promise<Loan | null> {
        return await this.repository.findById(id);
    }

    async update(token: string, loan: loanDTO): Promise<void> {
        const id = this.jwt.decodeAccessToken(token).id;

        const userExists = await this.repository.userExists(id);
        if (!userExists) {
            throw new Error("Usuário não existe.")
        }

        const oldLoan = await this.repository.findById(loan.id!);
        if (!oldLoan) {
            throw new Error("Empréstimo não encontrado.")
        }

        if (oldLoan.getStatus() !== LoanStatus.ANALYSIS && oldLoan.getReceiverId() !== id || oldLoan.getLoanerId() !== id) {
            throw new Error("Este empréstimo não pode ser alterado.");
        }

        const newStartDate = loan.startDate? loan.startDate : oldLoan.getStartDate();
        const newDeadline = loan.deadline? loan.deadline : oldLoan.getDeadline();
        const newStatus = loan.status? loan.status : oldLoan.getStatus();

        await this.repository.update(new Loan(oldLoan.getLoanerId(), oldLoan.getReceiverId(), oldLoan.getGameId(), newStartDate, newDeadline, oldLoan.getId(), newStatus));
    }

    async delete(token: string, id: string) {
        const userId = this.jwt.decodeAccessToken(token).id;

        const userExists = await this.repository.userExists(userId);
        if (userExists) {
            throw new Error("Usuário não existe.")
        }

        const loan = await this.repository.findById(id);
        if (!loan) {
            throw new Error("Empréstimo não existe.")
        }

        if (loan.getStatus() != LoanStatus.ANALYSIS && userId !== loan?.getLoanerId() || userId !== loan.getReceiverId()) {
            throw new Error("Este empréstimo não pode ser apagado.")
        }

        await this.repository.delete(id);
    }
}