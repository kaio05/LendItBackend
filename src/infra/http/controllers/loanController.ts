import { NextFunction, Request, Response } from "express";
import { createLoanSchema, updateLoanSchema } from "../../schemas/loanSchemas";
import { LoanService } from "../../../app/services/loanService";
import { LoanRepository } from "../../../app/repositories/loanRepository";
import { jwtHelp } from "../../../app/utils/jwtHelp";

type Params = {
    id: string;
};

export class loanController
{
    private uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    private service: LoanService = new LoanService(
        new LoanRepository(),
        new jwtHelp()
    );
    
    createLoan = async (req: Request, res: Response, next: NextFunction) => {
        const loan = createLoanSchema.safeParse(req.body);
        if (!loan.success) {
            return res.status(400).json({ 
                message: "Invalid format." 
            });
        }

        try {
            const token = req.headers['authorization']!.split(' ')[1];
            await this.service.create(token, {
                gameId: loan.data.gameId,
                startDate: loan.data.startDate,
                deadline: loan.data.deadline
            });
            return res.status(201);

        } catch(error) {
            next(error);
        }
    }

    getAllLoans = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers['authorization']!.split(' ')[1];
            const loans = await this.service.getAll(token);
            return res.status(200).json({
                data: loans
            });

        } catch (error) {
            next(error)
        }
    }

    getLoan = async (req: Request<Params>, res: Response, next: NextFunction) => {
        const loanId  = req.params.id;
        if (!this.uuidRegex.test(loanId)) {
            return res.status(400).json({ 
                message: "Invalid identifier."
            });
        }

        try {
            const token = req.headers['authorization']!.split(' ')[1];
            const loan = this.service.getUnique(token, loanId);
            return res.status(200).json({
                data: loan
            });

        } catch (error) {
            next(error);
        }
    }

    updateLoan = async (req: Request<Params>, res: Response, next: NextFunction) => {
        const loanId = req.params.id;
        if (this.uuidRegex.test(loanId)) {
            return res.status(400).json({
                message: "Invalid identifier."
            });
        }

        const loan = updateLoanSchema.safeParse(req.body);
        if (!loan.success) {
            return res.status(400).json({
                message: "Invalid format."
            });
        }

        try {
            const token = req.headers['authorization']!.split(' ')[1];
            await this.service.update(token, {
                id: loanId,
                startDate: loan.data?.startDate,
                deadline: loan.data?.deadline,
                status: loan.data?.status
            });
            return res.status(200);

        } catch (error) {
            next(error);
        }
    }

    delete = async (req: Request<Params>, res: Response, next: NextFunction) => {
        const loanId  = req.params.id;
        if (!this.uuidRegex.test(loanId)) {
            return res.status(400).json({ 
                message: "Invalid identifier."
            });
        }

        try {
            const token = req.headers['authorization']!.split(' ')[1];
            await this.service.delete(token, loanId);
            return res.status(200);

        } catch (error) {
            next(error);
        }
    }
}