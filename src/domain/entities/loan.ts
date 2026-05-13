export enum LoanStatus { 
    ANALYSIS = "ANALYSIS", 
    ACCEPTED = "ACCEPTED", 
    ONGOING = "ONGOING", 
    OVERDUE = "OVERDUE"
}

export class Loan 
{
    private Id: string;
    private LoanerId: string;
    private ReceiverId: string;
    private GameId: string;
    private StartDate: Date;
    private Deadline: Date;
    private Status: LoanStatus;

    constructor(loanerId: string, receiverId: string, gameId: string, startDate: Date, deadline: Date, id: string = "", status: LoanStatus = LoanStatus.ANALYSIS) {
        this.Id = id;
        this.LoanerId = loanerId;
        this.ReceiverId = receiverId;
        this.GameId = gameId;
        this.StartDate = startDate;
        this.Deadline = deadline;
        this.Status = status;
    }

    getId() { return this.Id; }

    getLoanerId() { return this.LoanerId; }

    getReceiverId() { return this.ReceiverId; }

    getGameId() { return this.GameId; }

    getStartDate() { return this.StartDate; }

    getDeadline() { return this.Deadline; }

    getStatus() { return this.Status; }
}