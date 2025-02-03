import express from 'express';
const router = express.Router();
import {
  getOrganizers,
  getOrganizer,
  updateOrganizer,
  deleteOrganizer,
} from '../../controllers/organizerController.js';
import { profileImgUpload } from '../../middlwares/multerMiddleware.js';

router.route('/organizers').get(getOrganizers);
router
  .route('/organizer/:id')
  .get(getOrganizer)
  .put(profileImgUpload, updateOrganizer)
  .delete(deleteOrganizer);

export default router;
