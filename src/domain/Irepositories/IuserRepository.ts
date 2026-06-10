import { User } from "../entities/user"

export interface IuserRepository
{
    save(user: User): Promise<void>;
    delete(user: User): Promise<void>;
    update(user: User): Promise<void>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<{
        id: string,
        email: string,
        password: string,
        username: string,
        picturePath: string,
    }[]| []>
}