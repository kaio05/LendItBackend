import { Loan, LoanStatus } from "../../domain/entities/loan";
import IloanRepository from "../../domain/Irepositories/IloanRepository";
import { Ijwt } from "../../domain/Iutils/Ijwt";
import { loanDTO } from "../dtos/loanDTO";

export class LoanService
{
    private repository: IloanRepository;
    private jwt: Ijwt;

    constructor(repository: IloanRepository, jwt: Ijwt) {
        this.repository = repository;
        this.jwt = jwt;
    }

    async create(token: string, loan: loanDTO): Promise<void> {
        const receiverId = this.jwt.decodeAccessToken(token).id;

        const userExists = await this.repository.userExists(receiverId);
        if (!userExists) {
            throw new Error("Usuário não existe.");
        }

        const ownerId = await this.repository.findOwnerIdByGameId(loan.gameId!);

        if (!ownerId) throw new Error("Este jogo não possui um dono.");

        if (ownerId === receiverId) throw new Error("Você não pode emprestar seu próprio jogo.");

        try {
            await this.repository.save(new Loan(
                ownerId, 
                receiverId, 
                loan.gameId!, 
                loan.startDate!, 
                loan.deadline!
            ));
        } catch (err) {
            throw new Error("Erro durante o cadastro do empréstrimo.");
        }
    }

    async getAll(token: string): Promise<Loan[] | []> {
        const userId = this.jwt.decodeAccessToken(token).id;
        
        const userExists = this.repository.userExists(userId);

        if (!userExists) throw new Error("Usuário não existe.");

        return await this.repository.findByUserId(userId);
    }

    async getUnique(token:string, id: string): Promise<Loan | null> {
        const userId = this.jwt.decodeAccessToken(token).id;

        if (!await this.repository.userExists(userId)) {
            throw new Error("Usuário não existe.");
        }

        const loan = await this.repository.findById(id);
        if (!loan) {
            return null;
        }

        if (userId !== loan.getLoanerId() || userId !== loan.getReceiverId()) {
            throw new Error("Você não tem acesso ao emprestimo.")
        }

        return loan;
    }

    async update(token: string, loan: loanDTO): Promise<void> {
        const id = this.jwt.decodeAccessToken(token).id;

        const userExists = await this.repository.userExists(id);
        if (!userExists) throw new Error("Usuário não existe.");

        const oldLoan = await this.repository.findById(loan.id!);
        if (!oldLoan) throw new Error("Empréstimo não encontrado.");

        if (oldLoan.getReceiverId() !== id || oldLoan.getLoanerId() !== id) {
            throw new Error("Você não tem permissão para alterar este empréstimo.");
        }

        if (oldLoan.getStatus() !== LoanStatus.ANALYSIS) {
            throw new Error("Este empréstimo já foi aceito e não pode ser alterado.");
        }

        const newStartDate = loan.startDate? loan.startDate : oldLoan.getStartDate();
        const newDeadline = loan.deadline? loan.deadline : oldLoan.getDeadline();
        const newStatus = loan.status? loan.status : oldLoan.getStatus();

        await this.repository.update(new Loan(
            oldLoan.getLoanerId(), 
            oldLoan.getReceiverId(), 
            oldLoan.getGameId(), 
            newStartDate, 
            newDeadline, 
            oldLoan.getId(), 
            newStatus
        ));
    }

    async delete(token: string, id: string) {
        const userId = this.jwt.decodeAccessToken(token).id;

        const userExists = await this.repository.userExists(userId);
        if (!userExists) throw new Error("Usuário não existe.");

        const loan = await this.repository.findById(id);
        if (!loan) throw new Error("Empréstimo não existe.");

        if (userId !== loan.getLoanerId() || userId !== loan.getReceiverId()) {
            throw new Error("Você não tem permissão para deletar esse empréstimo.");
        }

        if (loan.getStatus() != LoanStatus.ANALYSIS) {
            throw new Error("Este empréstimo já foi aceito e não pode ser apagado.");
        }

        await this.repository.delete(id);
    }
}