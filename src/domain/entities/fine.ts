export default class Fine
{
    private id: string;
    private debtorId: string;
    private loanId: string;
    private value: number;

    constructor(debtorId: string, loanId: string, value: number, id: string="") {
        this.id = id;
        this.debtorId = debtorId;
        this.loanId = loanId;
        this.value = value;
    }

    getId() { return this.id; }
    getDebtorId() { return this.debtorId; }
    getLoanId() { return this.loanId; }
    getValue() { return this.value; }
}