import { User } from "../../../domain/entities/user";

import { userRepository } from "../../../app/repositories/userRepository";
import { userServices } from "../../../app/services/userServices";
import { jwtHelp } from "../../../app/utils/jwtHelp";
import { hashHelp } from "../../../app/utils/hashHelp";

import { 
    userSchema, 
    loginSchema,
    updateUserSchema  
} from "../../schemas/userSchema";

import { NextFunction, Request, Response } from "express";

export class userController
{
    private service: userServices = new userServices(
        new userRepository, new hashHelp, new jwtHelp
    );

    async create(req: Request, res: Response, next: NextFunction) {
        const result = userSchema.safeParse(req.body);

        if (!result.success){
            return res.status(400).json({
                message: "Invalid format."
            });
        }

        try {
            await this.service.create(new User(
                result.data.username, result.data.email, result.data.password
            ));

            res.status(201).json({ message: "User created." });
        }
        catch(error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const credential = req.cookies?.jwt as string;

        if(!credential) {
            return res.status(401).json({ message: "Credential not found." });
        }

        try {
            const token = credential.split("Bearer ")[1];   // remove 'Bearer' and return the token

            await this.service.delete(token);
            res.status(200).json({ message: "User deleted." });
        }
        catch(error){
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const credential = req.cookies?.jwt as string;
        if(!credential){
            return res.status(401).json({ message: "Credential not found." });
        }

        const newUser = updateUserSchema.safeParse(req.body);
        if(!newUser.success) {
            return res.status(400).json({ message: "Invalid format." });
        }

        try {
            const token = credential.split("Bearer ")[1];

            await this.service.update(token, newUser.data);
            res.status(200).json({ message: "User changed." });
        }
        catch(error){
            next(error);
        }
    }

    async find(req: Request, res: Response, next: NextFunction){
        const credential = req.cookies?.jwt as string;
        if(!credential) {
            return res.status(401).json({ message: "Credential not found." });
        }

        try {
            const token = credential.split("Bearer ")[1];

            const user = await this.service.find(token);
            res.status(200).json({ data: user });
        } 
        catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const result = loginSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({ message: "Invalid format." })
        }

        let token = "";
        try{
            token = await this.service.login(result.data.email, result.data.password);
        }
        catch(error){
            next(error);
        }

        res.cookie("jwt", `Bearer ${token}`, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",  // use https if in production
            expires: new Date(Date.now() + 8 * 3600000)     // 8h
        })

        res.status(200).json({ message: "logged in." })
    }

    logout(req: Request, res: Response, next: NextFunction) {
        const credential = req.cookies?.jwt;
        if (!credential) {
            return res.status(401).json({ message: "Credential not found." });
        }

        res.cookie("jwt", "", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",  // use https if in production
            expires: new Date(Date.now() - 1)               // Yesterday
        })

        res.status(200).json({ message: "logged out." })
    }
}