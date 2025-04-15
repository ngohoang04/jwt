import express from 'express';
import homeController from '../controller/homeController';
const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/',
        homeController.handleGetUser
    );
    router.post('/users/create-user',
        homeController.handleCreateNewUser
    );

    router.post('/users/update-user',
        homeController.handleUpdateUser
    );

    router.get('/delete-user/:id', homeController.handleDeleteUser);
    router.get('/edit-user/:id', homeController.handleEditUser);

    return app.use('/', router);
}

export default initWebRoutes;