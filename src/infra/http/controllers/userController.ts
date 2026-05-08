import { User } from "../../../domain/entities/user";

import { userRepository } from "../../../app/repositories/userRepository";
import { userServices } from "../../../app/services/userServices";
import { jwtHelp } from "../../../app/utils/jwtHelp";
import { bcryptHash } from "../../../app/utils/bcryptHash";
import { TokenResponse } from "../../../app/dtos/tokenResponse";

import { NextFunction, Request, Response } from "express";
import { createUserSchema, updateUserSchema, loginSchema } from "../../schemas/userSchema";

export class userController
{
    private service: userServices = new userServices(
        new userRepository(), 
        new bcryptHash(), 
        new jwtHelp()
    );

    create = async (req: Request, res: Response, next: NextFunction) => {
        const result = createUserSchema.safeParse(req.body);

        if (!result.success){
            return res.status(400).json({
                message: "Invalid format."
            });
        }

        const data = result.data;
        try {
            await this.service.create(new User(data.email, data.password, data.username));

            res.status(201).json({ message: "User created." });
        }
        catch(error) {
            next(error);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers['authorization']!.split(' ')[1];

            await this.service.delete(token);

            res.status(200).json({ message: "User deleted." });
        }
        catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const newUser = updateUserSchema.safeParse(req.body);
        if (!newUser.success) {
            return res.status(400).json({ message: "Invalid format." });
        }
        
        const path = req.file?.path;
        try {
            const token = req.headers['authorization']!.split(' ')[1];

            await this.service.update(token, {
                email: newUser.data.email,
                password: newUser.data.password,
                username: newUser.data.username,
                picturePath: path
            });

            res.status(200).json({ message: "User changed." });
        }
        catch (error) {
            next(error);
        }
    }

    find = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers['authorization']!.split(' ')[1];

            const user = await this.service.find(token);

            res.status(200).json({ data: user });
        } 
        catch (error) {
            next(error);
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = loginSchema.safeParse(req.body);
            
            if (!result.success) {
                return res.status(400).json({ message: "Invalid format." });
            }

            let tokens: TokenResponse = {'accessToken':'', 'refreshToken':''};
            
            tokens = await this.service.login(result.data.email, result.data.password);
            
            res.cookie("jwt", tokens.refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",  // use https if in production
                expires: new Date(Date.now() + 8 * 3600000)     // 8h
            });
            
            const accessToken = tokens.accessToken;
            res.status(200).json({accessToken});
        } catch (error) {
            next(error);
        }
    }

    logout = (req: Request, res: Response, next: NextFunction) => {
        try {
            res.cookie("jwt", "", {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",  // use https if in production
                expires: new Date(Date.now() - 1)               // Yesterday
            });

            res.status(200).json({ message: "logged out." });
        } catch (error) {
            next(error);
        }
    }

    refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cookies = req.cookies;
            if (!cookies?.jwt) return res.sendStatus(401);

            const refreshToken = cookies.jwt;
            const accessToken = await this.service.refresh(refreshToken);

            res.status(200).json({accessToken});
        } catch (error) {
            next(error);
        }
    }
}