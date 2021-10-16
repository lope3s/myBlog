import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { main } from './db';

import registerRoute from './routes/authRoutes/registerRoute';
import loginRoute from './routes/authRoutes/loginRoute';
import tokenRoute from './routes/authRoutes/tokenLoginRoute';

import postRoute from './routes/postRoutes/postRoutes';

import commentRoute from './routes/commentsRoutes/commentsRoutes';

import likeRoute from './routes/likeRoutes/likeRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/myBlogApi', registerRoute);

app.use('/myBlogApi', loginRoute);

app.use('/myBlogApi', tokenRoute)

app.use('/myBlogApi', postRoute)

app.use('/myBlogApi', commentRoute)

app.use('/myBlogApi', likeRoute)

app.get('/myBlogApi', (_req, res) => {
    res.status(200).send({message: "attached"}).end();
});

app.listen(process.env.PORT, async () => {
    await main()

    console.log(`\nServer running on port ${process.env.PORT}`);
});