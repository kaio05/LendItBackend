export type sendMailOptions = {
    to: string,
    subject: string,
    text?: string,
    html?: string
}

export interface IEmail
{
    sendMail(options: sendMailOptions): Promise<void>
}