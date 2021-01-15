import {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} from './../routeControllers/tourController';

const router = express.Router();
router.route('/').get(getAllTours).post(createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

export default router;
