import { User } from "../../domain/entities/user";
import { IuserRepository } from "../../domain/Irepositories/IuserRepository";

export class userServices
{
    private repository: IuserRepository;

    constructor(userRep: IuserRepository) {
        this.repository = userRep;
    }

    async create(username: string, email: string, password: string): Promise<User>
    {
        const userExists = await this.repository.findByEmail(email);

        if (userExists) {
            throw new Error("Email já cadastrado.");
        }
        const user = new User(username, email, password);

        await this.repository.save(user);

        return user;
    }

    async login(email: string, password: string) : Promise<string>
    {
        const userExists = await this.repository.findByEmail(email);

        if (!userExists) {
            throw new Error("Email ou senha inválidos.")
        }

        const token = await this.repository.login(email, password);
        
        return token;
    }

    async exit()
    {

    }

    async delete(email: string)
    {

    }
}