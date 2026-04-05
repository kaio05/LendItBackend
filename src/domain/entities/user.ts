export class User
{
    private Id: string;
    private Username: string;
    private Email: string;
    private Password: string;

    constructor(username:string, email: string, password: string, id:string = "") {
        this.Id = id;
        this.Username = username;
        this.Email = email;
        this.Password = password;
    }

    getId() { return this.Id; }

    getEmail(){ return this.Email; }

    getPassword() { return this.Password; }

    setPassword(password: string) { this.Password = password}

    getUsername() { return this.Username; }
}