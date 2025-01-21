import express from 'express';
const router = express.Router();
import {
  createTicket,
  getEventTickets,
  getAttendeeTickets,
  getTicket,
  getAvailableTickets,
  deleteTicket,
} from '../../controllers/ticketController.js';
import { roleMiddleware } from '../../middlwares/roleMiddleware.js';

// Create Ticket
router
  .route('/events/:event_id/create-ticket')
  .post(roleMiddleware(['Attendee', 'Organizer']), createTicket);

// Get Event Tickets
router.route('/events/:event_id/tickets').get(getEventTickets);

// Get Available Tickets for Event
router
  .route('/events/:event_id/available-tickets')
  .get(roleMiddleware(['Organizer']), getAvailableTickets);

// Get Attendee Tickets
router.route('/attendee/:attendee_id/tickets').get(getAttendeeTickets);

// Single Ticket Operations
router
  .route('/tickets/:ticket_id')
  .get(getTicket)
  .delete(deleteTicket);

export default router;
