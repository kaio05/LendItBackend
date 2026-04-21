export interface Ihash
{
    hashPass(pass: string): Promise<string>;
    comparePass(pass: string, crypPass: string): Promise<boolean>;
}