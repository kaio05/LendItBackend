import { User } from "./user";

export class Game 
{
    private Id: string;
    private User: User;
    private Code: string;
    private Name: string;
    private Description: string;
    private Category: string;
    private Available: boolean;

    constructor(user: User, code: string, name: string, category: string, description: string, available: boolean = true, id: string = "") {
        this.Id = id;
        this.User = user;
        this.Code = code;
        this.Name = name;
        this.Category = category;
        this.Description = description;
        this.Available = available;
    }

    getId() { return this.Id; }

    getUser() { return this.User; }

    getCode() { return this.Code; }

    getName() { return this.Name; }

    getCategory() { return this.Category; }

    getDescription() { return this.Description; }

    getAvailable() { return this.Available; }
}