import Ticket from '../models/ticketsModel.js';
import Event from '../models/eventsModel.js';
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from '../utils/emailService.js';

// Create Ticket
export const createTicket = async (req, res) => {
  const { event_id } = req.params;
  const { tier_type, quantity } = req.body;

  if (!event_id || !tier_type || !quantity) {
    return res.status(400).json({ message: 'Event ID, Ticket Tier, and Quantity are required' });
  }

  try {
    const event = await Event.findById(event_id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const tier = event.ticket_tiers.find((t) => t.tier_type === tier_type);
    if (!tier) return res.status(400).json({ message: 'Invalid ticket tier' });

    if (tier.available_tickets < quantity) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    const order_id = parseInt(uuidv4().replace(/-/g, '').slice(0, 8), 16);
    const price_paid = tier.price * quantity;

    const ticketData = {
      order_id,
      attendee_id: req.user._id,
      attendee_full_name: `${req.user.first_name} ${req.user.last_name}`,
      event_id,
      event_name: event.event_name,
      event_date: event.event_date,
      event_location: event.event_location,
      event_start_time: event.event_start_time,
      tier_type,
      quantity,
      price_paid,
    };

    const newTicket = new Ticket(ticketData);
    await newTicket.save();

    tier.available_tickets -= quantity;
    await event.save();

    const attendee = req.user;
    await sendEmail(
      attendee.email,
      'Event Ticket Confirmation',
      'Your ticket has been booked successfully.',
      `<p>Dear ${attendee.first_name},<br>Your ticket for ${event.event_name} is confirmed.</p>`
    );

    res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket', error: error.message });
  }
};

// Get Tickets for Event
export const getEventTickets = async (req, res) => {
  const { event_id } = req.params;
  try {
    const tickets = await Ticket.find({ event_id });
    res.status(200).json({ message: 'Fetched event tickets successfully', tickets });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error: error.message });
  }
};

// Get Tickets for Attendee
export const getAttendeeTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ attendee_id: req.user._id });
    res.status(200).json({ message: 'Fetched attendee tickets successfully', tickets });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error: error.message });
  }
};

// Get Single Ticket
export const getTicket = async (req, res) => {
  const { ticket_id } = req.params;
  try {
    const ticket = await Ticket.findById(ticket_id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json({ message: 'Fetched ticket successfully', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ticket', error: error.message });
  }
};

// Delete Ticket
export const deleteTicket = async (req, res) => {
  const { ticket_id } = req.params;
  try {
    const ticket = await Ticket.findByIdAndDelete(ticket_id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json({ message: 'Ticket deleted successfully', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ticket', error: error.message });
  }
};
