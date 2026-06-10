import { Ihash } from "@/domain/Iutils/Ihash";
import { hash, genSalt, compare } from "bcrypt";

export class bcryptHash implements Ihash
{
    async hashPass(pass: string): Promise<string> {
        const salt = await genSalt();
        return await hash(pass, salt);
    }

    async comparePass(pass: string, crypPass: string): Promise<boolean> {
        return await compare(pass, crypPass);
    }
}