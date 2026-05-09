import { NextFunction, Request, Response } from "express";
import { prisma } from "../../data/lib/prisma";

interface ChatParams {
    userId: string
    firstId?: string,
    secondId?: string
}

export class ChatController {
    create = async(req: Request, res: Response, next: NextFunction) => {
        const {firstId, secondId} = req.body

        try {
            const chat = await prisma.chat.findFirst({
                where: {
                    user1Id: firstId,
                    user2Id: secondId
                }
            })

            if(chat) return res.status(200).json(chat)

            const response = await prisma.chat.create({
                data: {
                    user1Id: firstId,
                    user2Id: secondId
                }
            })

            return res.status(200).json(response)

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    findUserChats = async(req: Request<ChatParams>, res: Response, next: NextFunction) => {
        const userId = req.params.userId

        try {
            const chats = await prisma.chat.findMany({
                where: {
                    OR: [
                        {user1Id: userId},
                        {user2Id: userId}
                    ]
                }
            })

            res.status(200).json(chats)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    findChat = async(req: Request<ChatParams>, res: Response, next: NextFunction) => {
        const {firstId, secondId} = req.params

        try {
            const chat = await prisma.chat.findFirst({
                where: {
                    user1Id: firstId,
                    user2Id: secondId
                }
            })
            res.status(200).json(chat)
        } catch(error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
}