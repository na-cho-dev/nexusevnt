import express from 'express';
const router = express.Router();
import {
  createTicket,
  getEventTickets,
  getAttendeeTickets,
  getTicket,
  //updateTicket,
  deleteTicket,
} from '../../controllers/ticketController.js';
import { roleMiddleware } from '../../middlwares/roleMiddleware.js';

router
  .route('/events/:event_id/create-ticket')
  .get(roleMiddleware(['Attendee', 'Organizer']), createTicket);
router.route('/events/:event_id/tickets').get(getEventTickets);
router.route('/attendee/:attendee_id/tickets').get(getAttendeeTickets);
router
  .route('/tickets/:ticket_id')
  .get(getTicket)
  //.put(updateTicket)
  .delete(deleteTicket);

export default router;
