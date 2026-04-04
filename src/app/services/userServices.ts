import { User } from "../../domain/entities/user";
import { IuserRepository } from "../../domain/Irepositories/IuserRepository";

export class userServices
{
    private repository: IuserRepository;

    constructor(userRep: IuserRepository) {
        this.repository = userRep;
    }

    async create(user: User): Promise<void> {
        const userExists = await this.repository.findByEmail(user.getEmail());

        if (userExists) {
            throw new Error("Email já cadastrado.");
        }

        return await this.repository.save(user);
    }

    async login(user: User) : Promise<string> {
        const userExists = await this.repository.findByEmail(user.getEmail());

        if (!userExists) {
            throw new Error("Email ou senha inválidos.");
        }

        return await this.repository.login(user, userExists);
    }

    async remove(user: User): Promise<void> {
        const userExists = await this.repository.findByEmail(user.getEmail());
        
        if (!userExists) {
            throw new Error("Email ou senha inválidos.");
        }

        return await this.repository.remove(user, userExists);
    }
}