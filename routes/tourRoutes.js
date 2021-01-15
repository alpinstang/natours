import {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkID,
  checkPostBody,
} from '../controllers/tourController';

const router = express.Router();

router.param('id', checkID);

router.route('/').get(getAllTours).post(checkPostBody, createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

export default router;
