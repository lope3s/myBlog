import expres, { Request, Response } from "express";
import { tokenAuthenticate } from "../../middlewares/tokenAuthenticate";
import multer from "multer";
import storage from "../../services/uploadFiles";
import fileNameFilter from "../../services/fileNameFilter";

const assetsRoutes = expres.Router();

const upload = multer({
    storage,
    limits: {
        fileSize: 1000000,
    },
}).single("image");

assetsRoutes.post(
    "/upload/:userName",
    tokenAuthenticate(),
    (req: Request<{ userName: string }>, res: Response) => {
        upload(req, res, (err: any) => {
            if (!err) {
                res.sendStatus(200);
                res.end();
            } else {
                res.sendStatus(500);
                res.end(err);
            }
        });
    }
);

assetsRoutes.get(
    "/avatar",
    tokenAuthenticate(),
    async (
        req: Request<
            any,
            any,
            {
                user: {
                    _id: string;
                    userName: string;
                    email: string;
                    isLogged: boolean;
                };
            }
        >,
        res: Response
    ) => {
        const {
            user: { userName },
        } = req.body;
        const filteredImage = fileNameFilter(userName);
        if (filteredImage.length) {
            return res.status(200).send(filteredImage).end();
        }

        return res.status(404).send({ message: `Imagem não encontrada` }).end();
    }
);

export default assetsRoutes;
