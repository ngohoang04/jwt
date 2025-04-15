import express from 'express';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';
import initWebRoutes from './routes/web.js';
import configureViewEngine from './config/viewEngine.js';
const app = express();

configureViewEngine(app);

dotenv.config();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initWebRoutes(app);
app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});




