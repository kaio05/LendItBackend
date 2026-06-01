export default interface IFileStorage 
{
    delete(filename: string): Promise<void>;
}