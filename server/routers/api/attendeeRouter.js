import express from 'express';
const router = express.Router();
import {
  getAttendees,
  getAttendee,
  updateAttendee,
  deleteAttendee,
} from '../../controllers/attendeeController.js';

router.route('/attendees').get(getAttendees);
router
  .route('/attendee/:id')
  .get(getAttendee)
  .put(updateAttendee)
  .delete(deleteAttendee);

export default router;
