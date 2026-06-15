import { fineGetDTO } from "@/app/dtos/fineDTO";
import Fine from "../entities/fine";

export default interface IfineRepository
{
    getById(id: string): Promise<Fine | null>;
    getAll(id: string): Promise<fineGetDTO[]>;
    getCount(id: string): Promise<number>;
    payFine(id: string): Promise<void>;
    userExists(id: string): Promise<boolean>;
    desuspend(id: string): Promise<void>;
}