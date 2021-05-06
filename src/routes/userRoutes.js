import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

router.post('/', userController.create);

// router.get('/', loginRequired, userController.index);

router.get('/details/', loginRequired, userController.show);
router.put('/', loginRequired, userController.update);

// router.delete('/:id', loginRequired, userController.delete); // não é necessário

export default router;
