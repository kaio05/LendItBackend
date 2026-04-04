import { User } from "../entities/user"

export interface IuserRepository
{
    save(user: User): Promise<void>;
    login(email: string, password: string): Promise<string>;
    exit(email: string, password: string): Promise<void>;
    delete(email: string, password: string): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
}