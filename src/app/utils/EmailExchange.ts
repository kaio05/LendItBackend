import { IEmail, sendMailOptions } from "@/domain/Iutils/IEmail";
import { createTransport } from "nodemailer";

export default class MailService implements IEmail
{
    private transporter = createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASS
        }
    });

    sendMail = async (options: sendMailOptions): Promise<void> => {
        if (process.env.EMAIL_EXCHANGE === "true") {
            try {
                
                if (!process.env.EMAIL_USERNAME) return;
                console.log("mande")
                await this.transporter.sendMail({
                    from: {
                        name: "LendIt Team",
                        address: process.env.EMAIL_USERNAME
                    },
                    to: options.to,
                    subject: options.subject,
                    text: options.text,
                    html: options.html
                });
            } catch(error) {
                console.log("Error while sending mail: " + error)
            }
        }
    }
}