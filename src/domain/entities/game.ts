export class Game 
{
    private Id: string;
    private UserId: string;
    private Code: string;
    private Name: string;
    private Description: string;
    private Category: string;
    private imagePath: string;

    constructor(userId: string, code: string, name: string, category: string, description: string, imagepath: string = "", id: string = "") {
        this.Id = id;
        this.UserId = userId;
        this.Code = code;
        this.Name = name;
        this.Category = category;
        this.Description = description;
        this.imagePath = imagepath;
    }

    getId() { return this.Id; }

    getUserId() { return this.UserId; }

    getCode() { return this.Code; }

    getName() { return this.Name; }

    getCategory() { return this.Category; }

    getDescription() { return this.Description; }

    getImagePath() { return this.imagePath; }
}