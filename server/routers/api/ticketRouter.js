import express from 'express';
const router = express.Router();
import {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
} from '../../controllers/ticketController.js';
import { roleMiddleware } from '../../middlwares/roleMiddleware.js';

router
  .route('/ticket/user/:attendee_id/event/:event_id/')
  .get(roleMiddleware(['Attendee']), createTicket);
router.route('/tickets').get(getTickets);
router
  .route('/ticket/:id')
  .get(getTicket)
  .put(updateTicket)
  .delete(deleteTicket);

export default router;
