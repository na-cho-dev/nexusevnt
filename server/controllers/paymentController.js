import stripePackage from 'stripe';
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

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
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating payment session',
      error: error.message,
    });
  }
};
