import { LoanStatus } from "@/domain/entities/loan";
import MailService from "@/app/utils/EmailExchange";
import { prisma } from "../data/lib/prisma";

export default async function StartReturnLoans()
{
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.loan.updateMany({
        where: {
            status: LoanStatus.ONGOING,
            deadline: { lt: today }
        },
        data: {
            status: LoanStatus.RETURN_PENDING
        }
    });

    const loans = await prisma.loan.findMany({
        where: {
            status: LoanStatus.RETURN_PENDING,
            deadline: { lt: today }
        }
    });

    const mail = new MailService();

    loans.forEach(loan => {
        mail.sendMail({
            to: loan.loanerId,
            subject: "Devolução de empréstimo.",
            text: `Você pode confirmar a devolução do empréstimo de id:${loan.id}.`
        })
    });
}