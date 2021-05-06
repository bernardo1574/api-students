import { Router } from 'express';
import studentController from '../controllers/StudentController';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

router.get('/', loginRequired, studentController.index);
router.post('/', loginRequired, studentController.create);

router.get('/:id', loginRequired, studentController.show);

router.put('/:id', loginRequired, studentController.update);
router.delete('/:id', loginRequired, studentController.delete);

export default router;
