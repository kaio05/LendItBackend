import { NextFunction, Request, Response } from "express";
import { jwtHelp, JWTVerifyResponse } from "../../app/utils/jwtHelp";

export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    const response = await new jwtHelp().verify(
        token,
        process.env.ACCESS_TOKEN_SECRET || "superSecret"
    )

    if(response.err) return res.sendStatus(403);
    
    next();
}