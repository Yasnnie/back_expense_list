import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index';

const app: Application = express();
const port: number = 8000;

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
