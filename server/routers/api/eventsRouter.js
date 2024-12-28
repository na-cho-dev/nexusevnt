import express from 'express';
const router = express.Router();
import {
  createEvent,
  getEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from '../../controllers/eventsController.js';
import { roleMiddleware } from '../../middlwares/roleMiddleware.js';

router.route('/create-event').post(roleMiddleware(['Organizer']), createEvent);
router
  .route('/events')
  .get(roleMiddleware(['Organizer', 'Attendee']), getEvents);
router
  .route('/event/:id')
  .get(roleMiddleware(['Organizer', 'Attendee']), getEvent)
  .put(updateEvent)
  .delete(deleteEvent);

export default router;
