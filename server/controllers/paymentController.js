import stripePackage from 'stripe';
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);
import mongoose from 'mongoose';
import Event from '../models/eventsModel.js';

export const createPaymentSession = async (req, res) => {
  const { event_id, tier_name, quantity } = req.body;

  try {
    const event = await Event.findById(event_id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Find the selected ticket tier
    const selectedTier = event.ticket_tiers.find(
      (tier) => tier.tier_name === tier_name
    );
    if (!selectedTier) {
      return res.status(400).json({ message: 'Invalid ticket tier selected' });
    }

    // Check availability
    if (selectedTier.available_tickets < quantity) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    // Calculate total price
    const totalAmount = selectedTier.price * quantity * 100; // Convert to cents

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${event.event_name} - ${tier_name} Ticket`,
              description: `${event.event_description}`,
            },
            unit_amount: selectedTier.price * 100, // Price in cents
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        event_id: event_id,
        tier_name: tier_name,
        quantity: quantity,
      },  // Include metadata for post-payment processing
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating payment session',
      error: error.message,
    });
  }
};

export const handlePaymentSuccess = async (session) => {
  const sessionDetails = session.metadata; // Retrieve metadata passed during session creation

  const { event_id, tier_name, quantity } = sessionDetails; // Extract metadata values

  // Start Mongoose transaction
  const sessionDb = await mongoose.startSession();
  sessionDb.startTransaction();

  try {
    // Fetch the event with the session
    const event = await Event.findById(event_id).session(sessionDb);
    if (!event) throw new Error('Event not found');

    // Find the ticket tier
    const tierIndex = event.ticket_tiers.findIndex(
      (tier) => tier.tier_name === tier_name
    );
    if (tierIndex === -1) throw new Error('Ticket tier not found');

    // Validate ticket availability
    if (event.ticket_tiers[tierIndex].available_tickets < quantity) {
      throw new Error('Not enough tickets available');
    }

    // Deduct tickets atomically
    event.ticket_tiers[tierIndex].available_tickets -= quantity;

    // Save the updated event within the transaction
    await event.save({ session: sessionDb });

    // Commit the transaction
    await sessionDb.commitTransaction();
    sessionDb.endSession();

    console.log('Payment processed successfully, and tickets updated.');
  } catch (error) {
    // Rollback transaction in case of error
    await sessionDb.abortTransaction();
    sessionDb.endSession();

    console.error('Error processing payment:', error.message);
  }
};

export const getPaymentStatus = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      return res.status(200).json({ status: 'paid' });
    } else {
      return res.status(200).json({ status: session.payment_status }); // 'unpaid', 'pending'
    }
  } catch (error) {
    console.error('Error fetching payment status:', error.message);
    return res.status(500).json({
      message: 'Failed to fetch payment status',
      error: error.message,
    });
  }
};
