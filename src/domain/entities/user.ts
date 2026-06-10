export class User
{
    private Id: string;
    private Email: string;
    private Password: string;
    private Username: string;
    private picturePath: string;
    private isSuspended: boolean;

    constructor(email: string, password: string, username:string, picPath: string = "", issupended: boolean = false, id:string = "") {
        this.Id = id;
        this.Email = email;
        this.Password = password;
        this.Username = username;
        this.picturePath = picPath;
        this.isSuspended = issupended;
    }

    getId() { return this.Id; }

    getEmail(){ return this.Email; }

    getPassword() { return this.Password; }
    setPassword(password: string) { this.Password = password }

    getUsername() { return this.Username; }

    getPicturePath() { return this.picturePath; }

    getIsSuspended() { return this.isSuspended; }
}