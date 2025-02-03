import express from 'express';
const router = express.Router();
import {
  getAttendees,
  getAttendee,
  updateAttendee,
  deleteAttendee,
} from '../../controllers/attendeeController.js';
import { profileImgUpload } from '../../middlwares/multerMiddleware.js';

router.route('/attendees').get(getAttendees);
router
  .route('/attendee/:id')
  .get(getAttendee)
  .put(profileImgUpload, updateAttendee)
  .delete(deleteAttendee);

export default router;
