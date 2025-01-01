import Ticket from '../models/ticketsModel.js';
import Event from '../models/eventsModel.js';
import { v4 as uuidv4 } from 'uuid';

// Create a new ticket
export const createTicket = async (req, res) => {
  const { event_id } = req.params;
  const current_user = req.user;

  const event = await Event.findOne({ _id: event_id });
  if (!event) return res.status(400).json({ message: 'Event not found' });
  //console.log(event);

  const order_id = parseInt(uuidv4().replace(/-/g, '').slice(0, 8), 16);
  // console.log(typeof order_id);

  const ticketData = {
    order_id,
    attendee_id: current_user._id,
    attendee_full_name: `${current_user.first_name} ${current_user.last_name}`,
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

// Get all Event Tickets
export const getEventTickets = async (req, res) => {
  try {
    const event_id = req.params.event_id;
    const event_tickets = await Ticket.find({ event_id: event_id });
    res.status(200).json({
      message: 'Fetched all Event Tickets successfully',
      tickets: event_tickets,
    });
  } catch (err) {
    res.status(400).json({
      message: 'An error occurred while fetching tickets!',
      error: err.message,
    });
  }
};

// Get all Attendee Tickets
export const getAttendeeTickets = async (req, res) => {
  try {
    const attendee_id = req.user._id;
    const attendee_tickets = await Ticket.find({ attendee_id: attendee_id });
    res.status(200).json({
      message: 'Fetched all Attendee Tickets successfully',
      tickets: attendee_tickets,
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
  const ticket_id = req.params.ticket_id;
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
    // const ticket = await Ticket.findByIdAndDelete(ticket_id);
    // res.status(200).json({
    //   message: 'Deleted ticket successfully',
    //   ticket: ticket,
    // });
  } catch (err) {
    // res.status(400).json({
    //   message: 'An error occurred while deleting ticket!',
    //   error: err.message,
    // });
  }
};
