import { Loan, LoanStatus } from "@/domain/entities/loan";
import IloanRepository from "@/domain/Irepositories/IloanRepository";
import { IEmail } from "@/domain/Iutils/IEmail";
import { Ijwt } from "@/domain/Iutils/Ijwt";
import { loanDTO } from "../dtos/loanDTO";

export class LoanService
{
    private repository: IloanRepository;
    private mail: IEmail;
    private jwt: Ijwt;

    constructor(repository: IloanRepository, mail: IEmail, jwt: Ijwt) {
        this.repository = repository;
        this.mail = mail;
        this.jwt = jwt;
    }

    async create(token: string, loan: loanDTO) {
        const receiverId = this.jwt.decodeAccessToken(token).id;


        const receiver = await this.repository.findUserById(receiverId);
        if (!receiver) {
            throw new Error("Usuário não encontrado.");
        }

        if (receiver.getIsSuspended()) {
            throw new Error("Usuário está suspenso.");
        }

        if (!loan.gameId) throw new Error("Identificador do jogo não encontrado.");

        const loanerId = await this.repository.findOwnerByGameId(loan.gameId);
        if (!loanerId) throw new Error("Identificar do dono não foi encontrado.");

        if (! await this.repository.userExists(loanerId)) {
            throw new Error("Dono do jogo não encontrado.");
        }

        if (loanerId == receiverId) throw new Error("Você não pode pegar emprestado seu próprio jogo.");

        loan.startDate!.setHours(0, 0, 0, 0);
        loan.deadline!.setHours(0, 0, 0, 0);

        const gameLoans = await this.repository.findByGameId(loan.gameId);

        const isDateValid = this.validateDate(gameLoans, loan.startDate!, loan.deadline!);
        if (!isDateValid) throw new Error("Já existe um empréstimo nessa data.");

        await this.repository.save(new Loan(
            loanerId,
            receiverId,
            loan.gameId,
            loan.startDate!,
            loan.deadline!
        ));

        const loanerEmail = await this.repository.findUserById(loanerId);
        if (loanerEmail) {
            await this.mail.sendMail({
                to: loanerEmail.getEmail(),
                subject: "New Loan.",
                text: "You received a new loan."
            });
        }
    }

    async getAll(token: string): Promise<Loan[] | []> {
        const userId = this.jwt.decodeAccessToken(token).id;
        
        const userExists = this.repository.userExists(userId);

        if (!userExists) throw new Error("Usuário não existe.");

        return await this.repository.findByUserId(userId);
    }

    async getUnique(token: string, id: string): Promise<Loan | null> {
        const userId = this.jwt.decodeAccessToken(token).id;

        if (!await this.repository.userExists(userId)) {
            throw new Error("Usuário não existe.");
        }

        const loan = await this.repository.findById(id);
        if (!loan) {
            return null;
        }

        const receiverId = loan.getReceiverId();
        const loanerId = loan.getLoanerId();

        if (!(userId !== receiverId || userId !== loanerId)) {
            throw new Error("Você não tem acesso ao emprestimo.");
        }

        return loan;
    }

    async getByStatus(token: string, status: LoanStatus): Promise<Loan[]> {
        const userId = this.jwt.decodeAccessToken(token).id;

        const userExists = await this.repository.userExists(userId);
        if (!userExists) throw new Error("Usuário não existe.");

        try {
            return await this.repository.findByStatus(userId, status);
        } catch (error) {
            throw new Error("Erro durante a busca.");
        }
    }

    async updateDate(token: string, loan: loanDTO): Promise<void> {
        const userId = this.jwt.decodeAccessToken(token).id;

        const userExists = await this.repository.userExists(userId);
        if (!userExists) throw new Error("Usuário não existe.");

        const oldLoan = await this.repository.findById(loan.id!);
        if (!oldLoan) throw new Error("Empréstimo não existe.");

        if (userId !== oldLoan.getReceiverId()) {
            throw new Error("Você não pode alterar a data desse empréstimo.");
        }

        if (oldLoan.getStatus() !== LoanStatus.ANALYSIS) {
            throw  new Error("Este empréstimo já foi aceito e não pode ter sua data alterada.");
        }

        const newStart = loan.startDate? loan.startDate : oldLoan.getStartDate();
        const newDeadline = loan.deadline? loan.deadline : oldLoan.getDeadline();

        newStart.setHours(0, 0, 0, 0);
        newDeadline.setHours(0, 0, 0, 0);

        const loans = await this.repository.findByGameId(oldLoan.getGameId());

        const isDateValid = this.validateDate(loans, newStart, newDeadline);
        if (!isDateValid) throw new Error("Já existe um empréstimo nessa data.");

        await this.repository.updateDate(oldLoan.getId(), newStart, newDeadline);
    }

    async accept(token: string, id: string): Promise<void> {
        const { userId, loan } = await this.validateUserAndLoan(token, id); 

        if (loan.getLoanerId() !== userId) {
            throw new Error("Você não pode aceitar esse empréstimo.");
        }

        if (loan.getStatus() !== LoanStatus.ANALYSIS) {
            throw new Error("Esse empréstimo não pode ser aceito.");
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (today.getTime() > loan.getStartDate().getTime()) {
            throw new Error("A data de inicio do empréstimo já passou.");
        }

        await this.repository.updateStatus(id, LoanStatus.ACCEPTED);
    }

    async cancel(token: string, id: string): Promise<void> {
        const { userId, loan } = await this.validateUserAndLoan(token, id);

        const receiverId = loan.getReceiverId();
        const loanerId = loan.getLoanerId();

        if (!(userId !== receiverId || userId !== loanerId)) {
            throw new Error("Você não tem permissão para cancelar este empréstimo.");
        }

        if (!(loan.getStatus() !== LoanStatus.ANALYSIS || loan.getStatus() !== LoanStatus.ACCEPTED)) {
            throw new Error("Esse empréstimo não pode ser cancelado.");
        }

        await this.repository.updateStatus(id, LoanStatus.ANALYSIS);
    }

    async return(token: string, id: string): Promise<void> {
        const { userId, loan } = await this.validateUserAndLoan(token, id);

        if (loan.getReceiverId() !== userId) {
            throw new Error("Você tem permissão para iniciar o retorno do jogo.");
        }

        if (loan.getStatus() !== LoanStatus.ONGOING) {
            throw new Error("O empréstimo não começou.");
        }

        await this.repository.updateStatus(id, LoanStatus.RETURN_PENDING);
    }

    async confirmOverdue(token: string, id: string): Promise<void> {
        const { userId, loan } = await this.validateUserAndLoan(token, id);

        if (loan.getLoanerId() !== userId) {
            throw new Error("Você não tem permissão para confirmar o atraso.");
        }

        if (!(loan.getStatus() !== LoanStatus.RETURN_PENDING || loan.getStatus() !== LoanStatus.ONGOING)) {
            throw new Error("Você não pode confirmar o atraso");
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (today.getTime() <= loan.getDeadline().getTime()) {
            throw new Error("O prazo final não foi atingido.");
        }

        await this.repository.updateStatus(id, LoanStatus.OVERDUE);
    }

    async confirmReturn(token: string, id: string): Promise<void> {
        const { userId, loan } = await this.validateUserAndLoan(token, id);

        if (loan.getLoanerId() !== userId) {
            throw new Error("Você não tem permissão para confirmar a devolução do jogo.");
        }

        if (!(loan.getStatus() !== LoanStatus.RETURN_PENDING || loan.getStatus() !== LoanStatus.OVERDUE)) {
            throw new Error("Você não pode confirmar a devolução ainda.");
        }

        await this.repository.updateStatus(id, LoanStatus.FINALIZED);
    }

    async delete(token: string, id: string) {
        const { userId, loan } = await this.validateUserAndLoan(token, id);

        if (!(userId !== loan.getLoanerId() || userId !== loan.getReceiverId())) {
            throw new Error("Você não tem permissão para deletar esse empréstimo.");
        }

        if (loan.getStatus() !== LoanStatus.ANALYSIS) {
            throw new Error("Este empréstimo já foi aceito e não pode ser apagado.");
        }

        await this.repository.delete(id);
    }

    private validateDate(loans: Loan[], start: Date, deadline: Date): boolean {
        for (let loan of loans) {
            let startTime = loan.getStartDate().getTime();
            let deadlineTime = loan.getDeadline().getTime();

            if (startTime <= deadline.getTime() && deadlineTime >= start.getTime()) {
                return false;
            }
        }

        return true;
    }

    private async validateUserAndLoan(token: string, id: string) {
        const userId = this.jwt.decodeAccessToken(token).id;
        if (! await this.repository.userExists(userId)) {
            throw new Error("Usuário não existe.");
        }

        const loan = await this.repository.findById(id);
        if (!loan) {
            throw new Error("Empréstimo não encontrado.");
        }

        return { userId, loan };
    }
}