import { User } from "../entities/user"

export interface IuserRepository
{
    save(user: User): Promise<void>;
    delete(user: User): Promise<void>;
    update(id: string, user: Partial<User>): Promise<void>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}