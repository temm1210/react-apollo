import express from "express";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const imageFolder = path.join(__dirname, "../", "images");
if (!fs.existsSync(imageFolder)) {
  fs.mkdirSync(imageFolder);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageFolder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });
const router = express.Router();

router.post("/", upload.single("editorImage"), async (req, res) => {
  // image의 메타데이터중 width값을 가져옴
  const metaReader = sharp(req.file.path);
  const { width } = await metaReader.metadata();

  // resize된 이미지앞에 resize라는 이름을 붙여줌
  const resizeFileName = `resize_${req.file.filename}`;
  try {
    // 이미지의 width값이 850보다 크면 sharp를 통해 850으로
    // resizing후 다시 저장. 이후 resizing된 image를
    // client로 보내줌
    const resizeWidth = width < 800 ? width : 800;
    sharp(req.file.path)
      .resize({ width: resizeWidth })
      .toFile(`${imageFolder}/${resizeFileName}`, (err, _) => {
        if (err) throw new Error("Sharp Error");
        fs.unlinkSync(req.file.path);

        res.json({
          url: `http://localhost:4000/${resizeFileName}`,
        });
      });
  } catch (err) {
    throw new Error("Image upload Error");
  }
});

export default router;
