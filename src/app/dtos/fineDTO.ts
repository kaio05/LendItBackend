export type fineDTO = {
    id?: string,
    debtorId?: string,
    loanId?: string,
    value?: number
}

export type fineGetDTO = {
    id?: string,
    debtorId?: string,
    loanId?: string,
    value?: number,
    gameName?: string,
    startDate?: Date,
    deadline?: Date
}