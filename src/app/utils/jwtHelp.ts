import { Ijwt, payload } from "@/domain/Iutils/Ijwt";
import jwt from "jsonwebtoken";

export type JWTVerifyResponse = {
    err: any,
    decoded: any
}

export class jwtHelp implements Ijwt
{
    generateAccessToken(id: string): string {
        const payload = { id: id };

        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || "superSecret", {
            expiresIn: "15m"
        });
    }

    generateRefreshToken(id: string): string {
        const payload = { id: id };

        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || "superSecret", {
            expiresIn: "8h"
        });
    }

    decodeAccessToken(token: string): payload {
        const decode =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "superSecret") as payload;
        return decode;
    }

    decodeRefreshToken(token: string): payload {
        const decode =  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || "superSecret") as payload;
        return decode;
    }

    async verify(token: string, secret: string): Promise<JWTVerifyResponse> {
        let response: JWTVerifyResponse = {'err': '', 'decoded': ''};
        await jwt.verify(
            token,
            secret,
            (err, decoded) => {
                response = {err: err, decoded: decoded}
            }
        )
        return response;
    }
}