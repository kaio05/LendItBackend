import { NextFunction, Request, Response } from "express";
import FineServices from "@/app/services/fineServices";
import FineRepository from "@/app/repositories/fineRepository";
import { jwtHelp } from "@/app/utils/jwtHelp";

type Params = {
    id: string;
};

export default class FineController
{
    private uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    private service: FineServices = new FineServices(new FineRepository(), new jwtHelp());

    getUnique = async (req: Request<Params>, res: Response, next: NextFunction) => {
        const fineId = req.params.id;
        if (!this.uuidRegex.test(fineId)) {
            return res.status(400).json({ 
                message: "Invalid identifier."
            });
        }

        try {
            const token = req.headers['authorization']!.split(' ')[1];
            const fine = await this.service.getUnique(token, fineId);
            return res.status(200).json({
                data: fine
            });

        } catch (error) {
            next(error);
        }
    }

    getMine = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers['authorization']!.split(' ')[1];
            const fines = await this.service.getAll(token);
            return res.status(200).json({
                data: fines
            });

        } catch (error) {
            next(error);
        }
    }

    payFine = async (req: Request<Params>, res: Response, next: NextFunction) => {
        const fineId = req.params.id;
        if (!this.uuidRegex.test(fineId)) {
            return res.status(400).json({ 
                message: "Invalid identifier."
            });
        }

        try {
            const token = req.headers['authorization']!.split(' ')[1];
            await this.service.payFine(token, fineId);
            return res.status(200).json({ message: "Multa paga." });

        } catch (error) {
            next(error);
        }
    }
}