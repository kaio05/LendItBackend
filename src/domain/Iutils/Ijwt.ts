export type payload = {
    id: string
}

export interface Ijwt
{
    generateToken(id: string): string;
    decode(token: string): payload;
}