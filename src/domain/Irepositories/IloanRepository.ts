import { Loan, LoanStatus } from "../entities/loan";
import { User } from "../entities/user";

export default interface IloanRepository
{
    save(loan: Loan): Promise<void>;
    findById(id: string): Promise<Loan | null>;
    findByUserId(id: string): Promise<Loan[]>;
    findByGameId(id: string): Promise<Loan[]>;
    findByStatus(id:string, status: LoanStatus): Promise<Loan[]>;
    updateDate(id: string, start: Date, deadline: Date): Promise<void>;
    updateStatus(id: string, status: LoanStatus): Promise<void>;
    delete(id: string): Promise<void>;

    findOwnerByGameId(id: string): Promise<string | null>;
    findUserById(id: string): Promise<User | null>;
    userExists(id: string): Promise<boolean>;
}