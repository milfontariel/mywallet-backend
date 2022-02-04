import express, { json } from 'express';
import cors from 'cors';
import 'dayjs/locale/pt-br.js';
import router from './routes/index.js';

const app = express();
app.use(cors());
app.use(json());
app.use(router);

app.listen(5000, () => {
    console.log('Rodando na porta 5000');
})