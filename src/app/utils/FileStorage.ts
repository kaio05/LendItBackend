import IFileStorage from "@/domain/Iutils/IFileStorage";
import fs from "fs";
import fsp from "fs/promises";
import path from "path";

export default class FileStorage implements IFileStorage
{
    private basePath = process.cwd();

    async delete(filename: string): Promise<void> {
        const filePath = path.join(this.basePath, filename);

        if (!fs.existsSync(filePath)) {
            return;
        }

        try {
            await fsp.stat(filePath);
            await fsp.unlink(filePath);

        } catch (error: any) {
            if (error.code !== "ENOENT") {
                throw new Error("Falha ao deletar o arquivo.");
            }
        }
    }
}