import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  checkID,
  checkPostBody,
} from '../controllers/userController';

const router = express.Router();

router.param('id', checkID);

router.route('/').get(getAllUsers).post(checkPostBody, createUser);
router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
