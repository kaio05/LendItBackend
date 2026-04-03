import { User } from "../../domain/entities/user";
import { IuserRepository } from "../../domain/Irepositories/IuserRepository";

export class userServices
{
    private userRep: IuserRepository;

    constructor(userRep: IuserRepository) {
        this.userRep = userRep;
    }

    async create(username: string, email: string, password: string): Promise<void> {
        const finded = await this.userRep.findByEmail(email);

        if (finded) {
            throw new Error("Email já cadastrado.");
        }

        const saved = await this.userRep.save(new User(username, email, password));

        return saved;
    }
}