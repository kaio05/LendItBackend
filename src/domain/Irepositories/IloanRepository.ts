import { Loan, LoanStatus } from "../entities/loan";
import { User } from "../entities/user";
import { Game } from "../entities/game";
import { LoanGetDTO } from "@/app/dtos/loanDTO";

export default interface IloanRepository
{
    save(loan: Loan): Promise<void>;
    findById(id: string): Promise<Loan | null>;
    findByUserId(id: string): Promise<LoanGetDTO[]>;
    findByGameId(id: string): Promise<Loan[]>;
    findByStatus(id:string, status: LoanStatus): Promise<Loan[]>;
    updateDate(id: string, start: Date, deadline: Date): Promise<void>;
    updateStatus(id: string, status: LoanStatus): Promise<void>;
    delete(id: string): Promise<void>;

    findOwnerByGameId(id: string): Promise<string | null>;
    findUserById(id: string): Promise<User | null>;
    findGameById(id: string): Promise<Game | null>;
    userExists(id: string): Promise<boolean>;
    
    createFine(debtorId: string, loanId: string, value: number): Promise<void>;
}