import express from 'express';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';
import initWebRoutes from './routes/web.js';
import configureViewEngine from './configs/viewEngine.js';
const app = express();

configureViewEngine(app);
initWebRoutes(app);

dotenv.config();

const port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});




