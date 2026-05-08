import path from "path";
import multer from "multer";

const acceptedExt = [".png", ".jpg", ".jpeg"];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const ms = Date.now() + '-' + Math.round(Math.random() * 1e4);

        const extension = path.extname(file.originalname);

        cb(null, `${day}-${month}-${ms}-${extension}`);
    }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (acceptedExt.includes(ext)) {
        return cb(null, true);
    }

    cb(new Error("Invalid file type."));
}


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 3
    },
});

export { upload };