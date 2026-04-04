import { User } from "../../domain/entities/user";
import { IuserRepository } from "../../domain/Irepositories/IuserRepository";
import { prisma } from "../../infra/data/lib/prisma";
import { genSalt, hash, compare } from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken"

export class userRepository implements IuserRepository
{
    async save(user: User): Promise<void> 
    {
        const salt = await genSalt();
        const hashPass = await hash(user.getPassword(), salt);

        await prisma.user.create({ 
            data: {
                username: user.getName(),
                email: user.getEmail(),
                password: hashPass,
            }
        });
    }

    async login(email: string, password: string): Promise<string> 
    {
        const user = await this.findByEmail(email);

        if (!user) {
            throw new Error("Email ou senha errados.");
        }

        const isEqual = await compare(password, user.getPassword());

        if (!isEqual){
            throw new Error("Email ou senha errados.");
        }

        const secret = process.env.JWT_SECRET || "superSecret";
        const token = jwt.sign({ id: user.getId() }, secret, {
            expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"]
        })

        return token;
    }

    async exit(email: string, password: string): Promise<void>
    {

    }

    async delete(email: string, password: string): Promise<void> 
    {

    }

    async findByEmail(email: string): Promise<User | null> 
    {
        const user = await prisma.user.findUnique({ 
            where: { email: email }
        });

        if (!user) {
            return null;
        }

        return new User(user.username, user.email, user.password, user.id);
    }
}