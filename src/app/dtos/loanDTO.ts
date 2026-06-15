import { LoanStatus } from "@/domain/entities/loan";

export type loanDTO = {
    id?: string;
    loanerId?: string;
    receiverId?: string;
    gameId?: string;
    startDate?: Date;
    deadline?: Date;
    status?: LoanStatus;
}

export type LoanGetDTO = {
    id?: string;
    loanerId?: string;
    receiverId?: string;
    gameId?: string;
    startDate?: Date;
    deadline?: Date;
    status?: LoanStatus;
    owner?: string,
    game?: string
}