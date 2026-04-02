import { User } from "../entities/user"

export interface IuserRepository
{
    save(user: User): Promise<void>;
    findByEmail(email: string): Promise<User | void>
}