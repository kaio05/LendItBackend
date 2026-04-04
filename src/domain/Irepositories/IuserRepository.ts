import { User } from "../entities/user"

export interface IuserRepository
{
    save(user: User): Promise<void>;
    login(user: User, realUser: User): Promise<string>;
    findByEmail(email: string): Promise<User | null>;
}