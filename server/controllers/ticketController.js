import Ticket from '../models/ticketsModel.js';
import User from '../models/usersModel.js';
import Event from '../models/eventsModel.js';
import { v4 as uuidv4 } from 'uuid';

// Create a new ticket
export const createTicket = async (req, res) => {
  const { attendee_id, event_id } = req.params;

  const attendee = await User.findOne({ _id: attendee_id, role: 'Attendee' });
  if (!attendee) return res.status(400).json({ message: 'Attendee not found' });
  //console.log(attendee);

  const event = await Event.findOne({ _id: event_id });
  if (!event) return res.status(400).json({ message: 'Event not found' });
  //console.log(event);

  const order_id = parseInt(
    uuidv4().replace(/-/g, '').slice(0, 8).toUpperCase(),
    16
  );
  // console.log(typeof order_id);

  const ticketData = {
    order_id,
    attendee_id: attendee_id,
    attendee_full_name: `${attendee.first_name} ${attendee.last_name}`,
    event_id: event_id,
    event_name: event.event_name,
    event_date: event.event_date,
    event_location: event.event_location,
    event_start_time: event.event_start_time,
    event_price: event.event_price || 200,
  };

  // console.log(ticketData);

  const newTicket = new Ticket(ticketData);

  try {
    await newTicket.save();
    console.log(newTicket);
    res
      .status(201)
      .json({ message: 'Ticket created successfully', ticket: newTicket });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating ticket!', error: error.message });
  }
};

// Get all tickets
export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json({
      message: 'Fetched all tickets successfully',
      tickets: tickets,
    });
  } catch (err) {
    res.status(400).json({
      message: 'An error occurred while fetching tickets!',
      error: err.message,
    });
  }
};

// Get a single ticket
export const getTicket = async (req, res) => {
  const ticket_id = req.params.id;
  try {
    const ticket = await Ticket.findById(ticket_id);
    res.status(200).json({
      message: 'Fetched ticket successfully',
      ticket: ticket,
    });
  } catch (err) {
    res.status(400).json({
      message: 'An error occurred while fetching ticket!',
      error: err.message,
    });
  }
};

// Update a ticket
export const updateTicket = async (req, res) => {
  try {
  } catch (err) {}
};

// Delete a ticket
export const deleteTicket = async (req, res) => {
  const ticket_id = req.params.id;
  try {
    const ticket = await Ticket.findByIdAndDelete(ticket_id);
    res.status(200).json({
      message: 'Deleted ticket successfully',
      ticket: ticket,
    });
  } catch (err) {
    res.status(400).json({
      message: 'An error occurred while deleting ticket!',
      error: err.message,
    });
  }
};
