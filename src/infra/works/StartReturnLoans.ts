import { LoanStatus } from "@/domain/entities/loan";
import MailService from "@/app/utils/EmailExchange";
import { prisma } from "../data/lib/prisma";

export default async function StartReturnLoans()
{
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const mail = new MailService();

    const loans = await prisma.loan.findMany({
        where: {
            status: LoanStatus.ONGOING,
            deadline: { lt: today }
        }
    });

    loans.forEach(async (loan) => {
        await prisma.loan.update({
            where: { id: loan.id },
            data: { status: LoanStatus.RETURN_PENDING }
        });

        await mail.sendMail({
            to: loan.loanerId,
            subject: "Devolução de empréstimo.",
            text: `Você pode confirmar a devolução do empréstimo de id:${loan.id}.`
        });

        await mail.sendMail({
            to: loan.receiverId,
            subject: "Devolução iniciada.",
            text: `O seu empréstimo de id:${loan.id} está marcado como retorno pendente. Agradecemos por usar LendIt!`
        });
    });
}