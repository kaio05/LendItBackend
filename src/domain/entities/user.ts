export class User
{
    private Id: string;
    private Username: string;
    private Email: string;
    private Password: string;

    constructor(name:string, email: string, password: string, id:string = "") {
        this.Id = id;
        this.Username = name;
        this.Email = email;
        this.Password = password;
    }

    getId() { return this.Id; }

    getEmail(){ return this.Email; }

    getPassword() { return this.Password; }

    getName() { return this.Username; }
}