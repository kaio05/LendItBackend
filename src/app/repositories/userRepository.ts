import { User } from "../../domain/entities/user";
import { IuserRepository } from "../../domain/Irepositories/IuserRepository";
import { prisma } from "../../infra/data/lib/prisma";

export class userRepository implements IuserRepository
{
    async save(user: User): Promise<void> {
        await prisma.user.create({ 
            data: {
                username: user.getUsername(),
                email: user.getEmail(),
                password: user.getPassword(),
            }
        });
    }

    async delete(user: User): Promise<void> {
        await prisma.user.delete({
            where: { id: user.getId() }
        });
    }

    async update(user: User): Promise<void> {
        await prisma.user.update({
            where: { id: user.getId() },
            data: { 
                email: user.getEmail(),
                password: user.getPassword(),
                username: user.getUsername()
            }
        });
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id: id }
        });

        if (!user) {
            return null;
        }

        return new User(user.username, user.email, user.password, user.id);
    }
    
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ 
            where: { email: email }
        });

        if (!user) {
            return null;
        }

        return new User(user.username, user.email, user.password, user.id);
    }
}