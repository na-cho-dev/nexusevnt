import express from 'express';
const router = express.Router();
import {
  createEvent,
  getEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from '../../controllers/eventsController.js';
import verifyJWTMiddleware from '../../middlwares/verifyJWTMiddleware.js';
import { roleMiddleware } from '../../middlwares/roleMiddleware.js';
import { eventImgUpload } from '../../middlwares/multerMiddleware.js';

router
  .route('/create-event')
  .post(
    verifyJWTMiddleware,
    roleMiddleware(['Organizer']),
    eventImgUpload,
    createEvent
  );
router.route('/events').get(getEvents);
router
  .route('/events/:event_id')
  .get(getEvent)
  .put(updateEvent)
  .delete(deleteEvent);

export default router;
