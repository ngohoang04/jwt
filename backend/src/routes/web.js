import express from 'express';
import homeController from '../controllers/homeCotrollers.js';
const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.post('/register', homeController.postRegister);
    router.get('/crud', homeController.getCRUD);
    router.get('/edit/:id', homeController.getEditCRUD);
    router.post('/update/:id', homeController.postEditCRUD);
    router.get('/delete/:id', homeController.deleteCRUD);
    return app.use('/', router);
}

export default initWebRoutes;