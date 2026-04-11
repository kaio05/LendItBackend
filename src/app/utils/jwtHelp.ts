import { Ijwt, payload } from "../../domain/Iutils/Ijwt";
import jwt from "jsonwebtoken";

export class jwtHelp implements Ijwt
{
    generateToken(id: string): string {
        const payload = { id: id };

        return jwt.sign(payload, process.env.JWT_PASS || "superSecret", {
            expiresIn: "8h"
        });
    }

    decode(token: string): payload {
        const decode =  jwt.verify(token, process.env.JWT_PASS || "superSecret") as payload;
        return decode;
    }
}