import express from 'express';
import cors from 'cors';
import path from 'path';
import newsRouter from './routes/news';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/news', newsRouter);
app.use('/public', express.static(path.join(__dirname, '../public')));

export default app;

