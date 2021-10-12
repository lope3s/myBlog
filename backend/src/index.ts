import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { main } from './db';

import registerRoute from './routes/authRoutes/registerRoute';
import loginRoute from './routes/authRoutes/loginRoute';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/myBlogApi', registerRoute);

app.use('/myBlogApi', loginRoute);

app.get('/myBlogApi', (_req, res) => {
    res.status(200).send({message: "attached"}).end();
});

app.listen(process.env.PORT, async () => {
    await main()

    console.log(`\nServer running on port ${process.env.PORT}`);
});