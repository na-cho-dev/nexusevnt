import Ticket from '../models/ticketsModel.js';
import Event from '../models/eventsModel.js';
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from '../utils/emailService.js';
import { sendSMS } from '../utils/smsService.js';
import QRCode from 'qrcode';

// Create Ticket
export const createTicket = async (req, res) => {
  const { event_id } = req.params;
  const { tier_type } = req.body;
  let { quantity } = req.body;
  quantity = Number(quantity)

  // console.log("Body:", req.body);

  if (!event_id) {
    return res.status(400).json({ message: 'Event ID are required' });
  }

  if (!tier_type) {
    return res.status(400).json({ message: 'Ticket Tier are required' });
  }

  if (!quantity) {
    return res.status(400).json({ message: 'Quantity are required' });
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
    const price_paid = tier.tier_price * quantity;

    // console.log(`Tier Price: ${tier.tier_price} -> Type of ${typeof tier.tier_price}`)
    // console.log(`Quantity: ${quantity} -> Type of ${typeof quantity}`)
    // console.log(`Price Paid: ${price_paid} -> Type of ${typeof price_paid}`)

    const ticketData = {
      order_id,
      attendee_id: req.user._id,
      attendee_full_name: `${req.user.first_name} ${req.user.last_name}`,
      event_id,
      event_name: event.event_name,
      event_date: event.event_date,
      event_location: event.event_location,
      event_venue: event.event_venue,
      event_start_time: event.event_start_time,
      tier_type,
      quantity,
      price_paid,
    };

    const newTicket = new Ticket(ticketData);
    await newTicket.save();

    // Already Implemented in PaymentController.js (Deducting twice from DB)
    // tier.available_tickets -= quantity; 
    await event.save(); // Saves available ticket to database

    // Generate QR Code
    const qrCodeData = JSON.stringify(ticketData); // You can customize this data
    const qrCodeImage = await QRCode.toDataURL(qrCodeData); // Generate QR code as a data URL

    const attendee = req.user;
    await sendEmail(
      attendee.email,
      'Event Ticket Confirmation',
      'Your ticket has been booked successfully.',
      `
      <p>Dear ${attendee.first_name},<br>Your ticket for ${event.event_name} is confirmed.</p>
      <p>Order ID: ${order_id}</p>
      <p>Event: ${event.event_name}</p>
      <p>Date: ${event.event_date}</p>
      <p>Location: ${event.event_location}</p>
      <p>Venue: ${event.event_venue}<p>
      <p>Tier: ${tier_type}</p>
      <p>Quantity: ${quantity}</p>
      <p>Price Paid: $${price_paid}</p>
      <img src="${qrCodeImage}" alt="QR Code" />
      `
    );

    //const smsMessage = `Hi ${attendee.first_name}, your ticket for "${event.event_name}" is confirmed!`;
    //await sendSMS(attendee.phone_number, smsMessage);

    res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket', error: error.message });
  }
};

// Get Available Tickets for Each Tier
export const getAvailableTickets = async (req, res) => {
  const { event_id } = req.params; // Extract event ID from request params

  try {
    // Find the event by ID
    const event = await Event.findById(event_id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Extract ticket tiers and their available tickets
    const ticketTiers = event.ticket_tiers.map((tier) => ({
      tier_type: tier.tier_type,
      price: tier.price,
      total_tickets: tier.total_tickets,
      available_tickets: tier.available_tickets,
    }));

    // Return ticket tier details
    res.status(200).json({
      message: 'Fetched available tickets successfully',
      ticket_tiers: ticketTiers,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching available tickets',
      error: error.message,
    });
  }
};


// Get Tickets for Event
export const getEventTickets = async (req, res) => {
  const { event_id } = req.params;
  try {
    const tickets = await Ticket.find({ event_id });
    if (tickets.length === 0) return res.status(404).json({ message: 'No tickets found for this event' });
    res.status(200).json({ message: 'Fetched event tickets successfully', tickets });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error: error.message });
  }
};

// Get Tickets for Attendee
export const getAttendeeTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ attendee_id: req.user._id });
    if (tickets.length === 0) return res.status(404).json({ message: 'No tickets found for this attendee' });
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
