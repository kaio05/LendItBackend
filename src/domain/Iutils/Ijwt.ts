import { JWTVerifyResponse } from "../../app/utils/jwtHelp";

export type payload = {
    id: string
}

export interface Ijwt
{
    generateAccessToken(id: string): string;
    generateRefreshToken(id: string): string;
    decodeAccessToken(token: string): payload;
    decodeRefreshToken(token: string): payload;
    verify(token: string, secret: string): Promise<JWTVerifyResponse>;
}