import multer from "multer";
import fileNameFilter from "./fileNameFilter";
import { Request } from "express";
import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: async (req: Request<{userName:string}>, file, callback) => {

      const { userName  } = req.params
      
      const filteredPic = fileNameFilter(userName);
  
      if (filteredPic.length === 1) {
        fs.unlinkSync(path.join(__dirname, `../uploads/${filteredPic[0]}`));
      }
  
      const processedMimetype = file.mimetype.split("/")[1];
  
      const id = v4();
      callback(
        null,
        `${userName.toLowerCase()}-${id}.${processedMimetype}`
      );
    },
});

export default storage