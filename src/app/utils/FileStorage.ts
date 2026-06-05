import IFileStorage from "@/domain/Iutils/IFileStorage";
import fs from "fs";
import path from "path";

export default class FileStorage implements IFileStorage
{
    private basePath = process.cwd();

    join(firstPath: string, secondPath: string): string {
        return path.join(firstPath, secondPath);
    }

    changeDir(filename: string, dirPath: string): void {
        const oldPath = path.join(this.basePath, filename);
        const newPath = path.join(this.basePath, dirPath, filename);

        if (!fs.existsSync(oldPath) || fs.existsSync(newPath)) {
            return;
        }

        fs.rename(oldPath, newPath, (err) => { if (err != null) console.log(err) });
    }

    delete(filename: string): void {
        const filePath = path.join(this.basePath, filename);

        if (!fs.existsSync(filePath)) {
            return;
        }

        fs.stat(filePath, (err) => { if (err != null) console.log(err) });
        fs.unlink(filePath, (err) => { if (err != null) console.log(err) });
    }
}