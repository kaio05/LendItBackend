import fs from "fs";
import path from "path";

export default function createDirs() {
    const dir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    const userDir = path.join(dir, "user_images");
    if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir);
    }

    const gameDir = path.join(dir, "game_images");
    if (!fs.existsSync(gameDir)) {
        fs.mkdirSync(gameDir);
    }
}