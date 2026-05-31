import { User } from "@/domain/entities/user";
import { IuserRepository } from "@/domain/Irepositories/IuserRepository";
import { prisma } from "@/infra/data/lib/prisma";

export class userRepository implements IuserRepository
{
    async save(user: User): Promise<void> {
        await prisma.user.create({ 
            data: {
                email: user.getEmail(),
                password: user.getPassword(),
                username: user.getUsername(),
                picturePath: user.getPicturePath()
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
                username: user.getUsername(),
                picturePath: user.getPicturePath()
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

        return new User(user.email, user.password, user.username, user.picturePath, user.id);
    }

    async findAll(): Promise<{
        id: string,
        email: string,
        password: string,
        username: string,
        picturePath: string,
    }[]| []> {
        const users = await prisma.user.findMany();

        return users;
    }
    
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ 
            where: { email: email }
        });

        if (!user) {
            return null;
        }

        return new User(user.email, user.password, user.username, user.picturePath, user.id);
    }
}