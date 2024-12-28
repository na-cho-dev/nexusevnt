import express from 'express';
const router = express.Router();
import {
  getOrganizers,
  getOrganizer,
  updateOrganizer,
  deleteOrganizer,
} from '../../controllers/organizerController.js';

router.route('/organizers').get(getOrganizers);
router
  .route('/organizer/:id')
  .get(getOrganizer)
  .put(updateOrganizer)
  .delete(deleteOrganizer);

export default router;
