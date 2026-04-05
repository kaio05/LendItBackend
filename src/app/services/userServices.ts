import { userDto } from "../dtos/userDto";
import { User } from "../../domain/entities/user";
import { Ihash } from "../../domain/Iutils/Ihash";
import { Ijwt } from "../../domain/Iutils/Ijwt";
import { IuserRepository } from "../../domain/Irepositories/IuserRepository";

export class userServices
{
    private repository: IuserRepository;
    private crypt: Ihash;
    private jwtHelp: Ijwt;

    constructor(userRep: IuserRepository, crypt: Ihash, jwtHelp: Ijwt) {
        this.repository = userRep;
        this.crypt = crypt;
        this.jwtHelp = jwtHelp;
    }

    async create(user: User): Promise<void> {
        const userExists = await this.repository.findByEmail(user.getEmail());
        if (userExists) {
            throw new Error("Email já cadastrado.");
        }

        const hashPassword = await this.crypt.hashPass(user.getPassword());
        user.setPassword(hashPassword);

        await this.repository.save(user);
    }

    async delete(token: string): Promise<void> {
        const decoded = this.jwtHelp.decode(token);
        
        const userExists = await this.repository.findById(decoded.id);
        if (!userExists) {
            throw new Error("Erro interno.");
        }

        await this.repository.delete(userExists);
    }

    async update(token: string, user: userDto): Promise<void> {
        const decoded = this.jwtHelp.decode(token);

        const userExists = await this.repository.findById(decoded.id);
        if (!userExists) {
            throw new Error("Erro interno.");
        }

        const newEmail = user.email? user.email : userExists.getEmail();
        const newName = user.username? user.username : userExists.getUsername();
        const newPass = user.password? user.password : userExists.getPassword();

        await this.repository.update(new User(newEmail, newName, newPass));
    }

    async find(token: string): Promise<User | null> {
        const decoded = this.jwtHelp.decode(token);
        if (!decoded) {
            throw new Error("Erro interno.");
        }

        const user = await this.repository.findById(decoded.id);
        if (!user) {
            return null;
        }

        return user;
    }

    async login(email: string, password: string): Promise<string> {
        const userExists = await this.repository.findByEmail(email);
        if (!userExists) {
            throw new Error("Email ou senha inválidos.");
        }

        const isEqual = await this.crypt.comparePass(password, userExists.getPassword());
        if (!isEqual) {
            throw new Error("Email ou senha inválidos.");
        }

        return this.jwtHelp.generateToken(userExists.getId());
    }
}