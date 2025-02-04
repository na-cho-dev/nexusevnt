import express from 'express';
const router = express.Router();
import {
  createTicket,
  getEventTickets,
  getUserTickets,
  getTicket,
  getAvailableTickets,
  deleteTicket,
} from '../../controllers/ticketController.js';
import { roleMiddleware } from '../../middlwares/roleMiddleware.js';
import verifyJWT from '../../middlwares/verifyJWTMiddleware.js';

// Create Ticket
router
  .route('/events/:event_id/create-ticket')
  .post(verifyJWT, roleMiddleware(['Attendee', 'Organizer']), createTicket);

// Get Event Tickets
router.route('/events/:event_id/tickets').get(getEventTickets);

// Get Available Tickets for Event
router
  .route('/events/:event_id/available-tickets')
  .get(roleMiddleware(['Organizer']), getAvailableTickets);

// Get User Tickets
router.route('/attendee/:attendee_id/tickets').get(verifyJWT, getUserTickets);
router.route('/organizer/:organizer_id/tickets').get(verifyJWT, getUserTickets);

// Single Ticket Operations
router.route('/tickets/:ticket_id').get(getTicket).delete(deleteTicket);

export default router;
