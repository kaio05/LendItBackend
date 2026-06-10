import { NextFunction, Request, Response } from "express";
import { prisma } from "../../data/lib/prisma";

export class MessageController {
    create = async(req: Request, res: Response, next: NextFunction) => {
        const {chatId, senderId, text} = req.body

        try {
            const response = await prisma.message.create({
                data: {
                    chatId: chatId,
                    senderId: senderId,
                    text: text
                }
            });

            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    getMessages = async(req: Request<{chatId: string}>, res: Response, next: NextFunction) => {
        const {chatId} = req.params

        try {
            const messages = await prisma.message.findMany({
                where: {
                    chatId: chatId
                }
            })
            res.status(200).json(messages)
        } catch (error) {
            next(error)
        }
    }
}