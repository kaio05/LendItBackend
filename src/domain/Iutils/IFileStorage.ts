export default interface IFileStorage 
{
    join(firstPath: string, secondPath: string): string;
    changeDir(filename: string, dirPath: string): void;
    delete(filename: string): void;
}