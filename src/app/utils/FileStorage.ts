import fs from "fs/promises";
import path from "path";
import IFileStorage from "@/domain/Iutils/IFileStorage";

export default class FileStorage implements IFileStorage
{
    private basePath = process.cwd();

    async delete(filename: string): Promise<void> {
        const filePath = path.join(this.basePath, filename);

        try {
            console.log(filePath)
            await fs.stat(filePath);
            await fs.unlink(filePath);

        } catch (error: any) {
            if (error.code !== "ENOENT") {
                throw new Error("Falha ao deletar o arquivo.");
            }
        }
    }
}