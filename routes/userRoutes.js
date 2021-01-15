import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../../controller/user';

import { Router } from 'express';

const router = Router();
router.route('/').get(getAllUsers).post(createUser);
router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
