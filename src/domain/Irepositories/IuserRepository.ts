import { User } from "../entities/user"

export interface IuserRepository
{
    save(user: User): Promise<void>;
    login(user: User, realUser: User): Promise<string>;
    remove(user: User, realUser: User): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
}