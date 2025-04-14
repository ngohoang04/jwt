import express from 'express';
import homeController from '../controller/homeController';
const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/',
        homeController.handleHelloWorld
    );

    return app.use('/', router);
}

export default initWebRoutes;