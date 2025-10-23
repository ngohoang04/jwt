import express from 'express';
import configureViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import dotenv from 'dotenv';
import connect from './config/db.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configureViewEngine(app);
initWebRoutes(app);
connect();
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});
