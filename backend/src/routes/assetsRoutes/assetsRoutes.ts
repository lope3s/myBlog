import expres, { Request, Response } from 'express';
import { tokenAuthenticate } from '../../middlewares/tokenAuthenticate';
import multer from 'multer';
import storage from '../../services/uploadFiles';
import fileNameFilter from '../../services/fileNameFilter';

const assetsRoutes = expres.Router()

const upload = multer({
  storage,
  limits: {
    fileSize: 1000000,
  },
}).single("image");
//como enviar arquivos pelo body da requisição


assetsRoutes.post("/upload", tokenAuthenticate(),(req: Request<any, any, {user: {_id: string, userName: string, email: string, isLogged: boolean}}>, res: Response) => {
  //adicionar validação de usuário
    upload(req, res, (err: any) => {
      if (!err) {
        console.log("File:", req);
        res.sendStatus(200);
        res.end();
      } else {
        res.sendStatus(500);
        res.end(err);
      }
    });
  });

assetsRoutes.get("/avatar", tokenAuthenticate(),async (req: Request<any, any, {user: {_id: string, userName: string, email: string, isLogged: boolean}}>, res: Response) => {
    const { user: {userName} } = req.body
    const filteredImage = fileNameFilter(userName);
    if ( filteredImage.length ) {
        return res.status(200).send(filteredImage).end();
    }

    return res.status(404).send({ message: `Imagem não encontrada` }).end();
});

export default assetsRoutes