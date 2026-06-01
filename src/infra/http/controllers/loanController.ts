import { NextFunction, Request, Response } from "express";
import { createLoanSchema, updateLoanSchema, statusSchema } from "../../schemas/loanSchemas";
import { LoanService } from "@/app/services/loanService";
import LoanRepository from "@/app/repositories/loanRepository";
import { jwtHelp } from "@/app/utils/jwtHelp";
import MailService from "@/app/utils/EmailExchange";

type Params = {
    id: string;
};

export class loanController
{
    private uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    private service: LoanService = new LoanService(
        new LoanRepository(),
        new MailService(),
        new jwtHelp()
    );

    create = async (req: Request, res: Response, next: NextFunction) => {
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
            return res.status(201).json({ message: "Loan created." });

        } catch(error) {
            next(error);
        }
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
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

    getUnique = async (req: Request<Params>, res: Response, next: NextFunction) => {
        const loanId  = req.params.id;
        if (!this.uuidRegex.test(loanId)) {
            return res.status(400).json({ 
                message: "Invalid identifier."
            });
        }

        try {
            const token = req.headers['authorization']!.split(' ')[1];
            const loan = await this.service.getUnique(token, loanId);
            return res.status(200).json({
                data: loan
            });

        } catch (error) {
            next(error);
        }
    }

    getByStatus = async (req: Request, res: Response, next: NextFunction) => {
        const status = statusSchema.safeParse(req.body);
        if (!status.success) {
            return res.status(400).json({ 
                message: "Invalid status."
            });
        }

        try {
            const token = req.headers['authorization']!.split(' ')[1];
            const loans = await this.service.getByStatus(token, status.data.status);
            return res.status(200).json({
                data: loans
            });

        } catch (error) {
            next(error)
        }
    }

    updateDate = async (req: Request<Params>, res: Response, next: NextFunction) => {
        const loanId  = req.params.id;
        if (!this.uuidRegex.test(loanId)) {
            return res.status(400).json({ 
                message: "Invalid identifier."
            });
        }

        const newDates = updateLoanSchema. safeParse(req.body);
        if (!newDates.success) {
            return res.status(400).json({
                message: "Invalid format."
            });
        }

        try {
            const token = req.headers['authorization']!.split(' ')[1];
            await this.service.updateDate(token, {
                startDate: newDates.data.startDate,
                deadline: newDates.data.deadline
            });
            return res.status(200).json({ message: "Loan updated." });

        } catch (error) {
            next(error);
        }

    }

    accept = async (req: Request<Params>, res: Response, next: NextFunction) => {
        const loanId  = req.params.id;
        if (!this.uuidRegex.test(loanId)) {
            return res.status(400).json({ 
                message: "Invalid identifier."
            });
        }

        try {
            const token = req.headers['authorization']!.split(' ')[1];
            await this.service.accept(token, loanId);
            return res.status(200).json({ message: "Loan Accepted."  });
            
        } catch (error) {
            next(error);
        }
    }

    cancel = async (req: Request<Params>, res: Response, next: NextFunction) => {
        const loanId  = req.params.id;
        if (!this.uuidRegex.test(loanId)) {
            return res.status(400).json({ 
                message: "Invalid identifier."
            });
        }

        try {
            const token = req.headers['authorization']!.split(' ')[1];
            await this.service.cancel(token, loanId);
            return res.status(200).json({ message: "The loan was canceled." });
            
        } catch (error) {
            next(error);
        }
    }

    startReturn = async (req: Request<Params>, res: Response, next: NextFunction) => {
        const loanId  = req.params.id;
        if (!this.uuidRegex.test(loanId)) {
            return res.status(400).json({ 
                message: "Invalid identifier."
            });
        }

        try {
            const token = req.headers['authorization']!.split(' ')[1];
            await this.service.return(token, loanId);
            return res.status(200).json({ message: "The return process was iniciated." });
            
        } catch (error) {
            next(error);
        }
    } 

    confirmOverdue = async (req: Request<Params>, res: Response, next: NextFunction) => {
        const loanId  = req.params.id;
        if (!this.uuidRegex.test(loanId)) {
            return res.status(400).json({ 
                message: "Invalid identifier."
            });
        }

        try {
            const token = req.headers['authorization']!.split(' ')[1];
            await this.service.confirmOverdue(token, loanId);
            return res.status(200).json({ message: "The loan is overdue." });
            
        } catch (error) {
            next(error);
        }
    }

    confirmReturn = async (req: Request<Params>, res: Response, next: NextFunction) => {
        const loanId  = req.params.id;
        if (!this.uuidRegex.test(loanId)) {
            return res.status(400).json({ 
                message: "Invalid identifier."
            });
        }

        try {
            const token = req.headers['authorization']!.split(' ')[1];
            await this.service.confirmReturn(token, loanId);
            return res.status(200).json({ message: "The loan was returned." });
            
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
            return res.status(200).json({ messsage: "Loan deleted."});

        } catch (error) {
            next(error);
        }
    }
}