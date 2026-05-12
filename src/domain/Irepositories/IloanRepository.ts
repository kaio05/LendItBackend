import { Loan, LoanStatus } from "../entities/loan";

export default interface IloanRepository
{
    save(loan: Loan): Promise<void>;
    findById(id: string): Promise<Loan | null>;
    findByUserId(id: string): Promise<Loan[] | []>;
    findOwnerIdByGameId(gameId: string): Promise<string | null>;
    userExists(id: string): Promise<boolean>;
    update(loan: Loan): Promise<void>;
    delete(id: string): Promise<void>;
}