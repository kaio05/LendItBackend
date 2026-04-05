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

    async update(id:string, user: Partial<User>): Promise<void> {
        const oldUser = await this.findById(id);
        if (!oldUser) throw new Error("Usuário não encontrado.");

        let newEmail = oldUser.getEmail();
        if (user.getEmail){
            newEmail = user.getEmail();
        }

        let newPassword = oldUser.getPassword()
        if (user.getPassword) {
            newPassword = user.getPassword();
        }

        let newUsername = oldUser.getUsername();
        if (user.getUsername) {
            newUsername = user.getUsername();
        }

        await prisma.user.update({
            where: { id: id },
            data: { 
                email: newEmail,
                password: newPassword,
                username: newUsername
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