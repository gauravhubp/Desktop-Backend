import express from 'express';
import bodyParser from 'body-parser';
import { Routes } from './routes/routes';

const app = express();
const port = 3000;

app.use(bodyParser.json());
Routes(app);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
