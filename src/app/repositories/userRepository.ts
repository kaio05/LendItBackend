import { User } from "../../domain/entities/user";
import { IuserRepository } from "../../domain/Irepositories/IuserRepository";
import { prisma } from "../../infra/data/lib/prisma";

export class userRep implements IuserRepository
{
    async save(user: User): Promise<void> {
        prisma.user.create({ 
            data: {
                username: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
            }
        });
    }

    async findByEmail(email: string): Promise<User | void> {
        const user = await prisma.user.findUnique({ where: {
            email: email
        }})

        if (user) {
            return new User(user.username, user.email, user.password, user.id);
        }

        return undefined;
    }
}