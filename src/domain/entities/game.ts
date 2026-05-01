export class Game 
{
    private Id: string;
    private UserId: string;
    private Code: string;
    private Name: string;
    private Description: string;
    private Category: string;
    private Available: boolean;

    constructor(userId: string, code: string, name: string, category: string, description: string, available: boolean = true, id: string = "") {
        this.Id = id;
        this.UserId = userId;
        this.Code = code;
        this.Name = name;
        this.Category = category;
        this.Description = description;
        this.Available = available;
    }

    getId() { return this.Id; }

    getUserId() { return this.UserId; }

    getCode() { return this.Code; }

    getName() { return this.Name; }

    getCategory() { return this.Category; }

    getDescription() { return this.Description; }

    getAvailable() { return this.Available; }
}