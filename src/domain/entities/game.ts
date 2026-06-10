export enum GameCategories {
    TABLETOP = "TABLETOP",
    CARD = "CARD",
    BOARD = "BOARD",
    PUZZLE = "PUZZLE",
    CARTRIDGES = "CARTRIDGES",
    DISC = "DISC"
}

export class Game 
{
    private Id: string;
    private UserId: string;
    private Code: string;
    private Name: string;
    private Description: string;
    private Category: GameCategories;
    private minPlayers: number;
    private maxPlayers: number;
    private minAge: number;
    private imagePath?: string;

    constructor(
        userId: string, 
        code: string, 
        name: string, 
        category: GameCategories, 
        description: string, 
        minPlayers: number,
        maxPlayers: number,
        minAge: number,
        imagepath: string="", 
        id: string=""
    ) {
        this.Id = id;
        this.UserId = userId;
        this.Code = code;
        this.Name = name;
        this.Category = category;
        this.Description = description;
        this.minPlayers = minPlayers;
        this.maxPlayers = maxPlayers;
        this.minAge = minAge;
        this.imagePath = imagepath;
    }

    getId() { return this.Id; }

    getUserId() { return this.UserId; }

    getCode() { return this.Code; }

    getName() { return this.Name; }

    getCategory() { return this.Category; }

    getDescription() { return this.Description; }

    getMinPlayers() { return this.minPlayers; }

    getMaxPlayers() { return this.maxPlayers; }

    getMinAge() { return this.minAge; }

    getImagePath() { return this.imagePath; }
}