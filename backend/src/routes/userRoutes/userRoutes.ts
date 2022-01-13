import express, { Request, Response } from "express";
import { client } from "../../db";
import { ObjectId } from "mongodb";
import { tokenAuthenticate } from "../../middlewares/tokenAuthenticate";

const db = client.db();
const userRouter = express.Router();

userRouter.get(
    "/getUserById/:id",
    tokenAuthenticate(),
    async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const user = await db
                .collection("users")
                .findOne({ _id: new ObjectId(id) });

            return res.status(200).send(user).end();
        } catch (error) {
            console.log(error);
            return res.sendStatus(500).end();
        }
    }
);

export default userRouter;
