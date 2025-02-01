import Event from '../models/eventsModel.js';

// Create Event
export const createEvent = async (req, res) => {
  const {
    title,
    category,
    description,
    eventType,
    date,
    location,
    startTime,
    endTime,
  } = req.body;

  const event_image = req.file
    ? {
        data: req.file.buffer, // Store the image buffer
        mimeType: req.file.mimetype, // Store the mime type
      }
    : null;
  console.log('Event Image:', event_image);

  let ticket_tiers = [];
  if (req.body.ticket_tiers) {
    try {
      ticket_tiers = JSON.parse(req.body.ticket_tiers); // Parse ticket_tiers JSON
      if (!Array.isArray(ticket_tiers)) {
        return res
          .status(400)
          .json({ message: 'ticket_tiers must be an array' });
      }
    } catch (error) {
      return res.status(400).json({ message: 'Invalid ticket_tiers format' });
    }
  }

  ticket_tiers = ticket_tiers.map((tier) => ({
    ...tier,
    tier_price: tier.tier_price === 'Free' ? 0 : Number(tier.tier_price),
  }));

  req.body.ticket_tiers = ticket_tiers;

  // console.log("Ticket Tiers:", ticket_tiers);
  // console.log('User:', req.user);

  const eventObj = {
    event_organizer_id: String(req.user._id),
    event_image,
    event_name: title,
    event_category: category,
    event_description: description,
    event_type: eventType,
    event_date: date,
    event_location: location,
    event_start_time: startTime,
    event_end_time: endTime,
    ticket_tiers,
  };

  for (const key in eventObj) {
    if (!eventObj[key] && key !== 'event_end_time') {
      return res.status(400).json({ message: `${key} is required` });
    }
  }

  console.log('Event Object:', eventObj);

  try {
    const newEvent = new Event(eventObj);
    await newEvent.save();
    res
      .status(201)
      .json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.log(`An error occurred while creating event! ${error.message}`);
    res
      .status(500)
      .json({ message: 'Error creating event', error: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();

    if (events.length === 0) {
      return res.status(404).json({ message: 'No events found' });
    }

    const formattedEvents = events.map((event) => {
      let base64Image = null;

      if (event.event_image && event.event_image.data) {
        base64Image = Buffer.from(event.event_image.data).toString('base64');
      }

      return {
        ...event.toObject(), // Convert Mongoose document to plain object
        event_image: base64Image
          ? { mimeType: event.event_image.mimeType, data: base64Image }
          : null,
      };
    });

    res
      .status(200)
      .json({
        message: 'Fetched events successfully',
        events: formattedEvents,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching events', error: error.message });
  }
};

// Get Single Event
export const getEvent = async (req, res) => {
  const { event_id } = req.params;
  if (!event_id)
    return res.status(400).json({ message: 'Event ID is required' });

  try {
    const event = await Event.findById(event_id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    let base64Image = null;

    if (event.event_image && event.event_image.data) {
      base64Image = Buffer.from(event.event_image.data).toString('base64');
    }

    const eventData = {
      ...event.toObject(),
      event_image: base64Image
        ? { mimeType: event.event_image.mimeType, data: base64Image }
        : null,
    };

    res
      .status(200)
      .json({ message: 'Fetched event successfully', event: eventData });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching event', error: error.message });
  }
};

// Update Event
export const updateEvent = async (req, res) => {
  const { event_id } = req.params;
  const updatedFields = req.body;

  if (!event_id)
    return res.status(400).json({ message: 'Event ID is required' });

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      event_id,
      updatedFields,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedEvent)
      return res.status(404).json({ message: 'Event not found' });

    res
      .status(200)
      .json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating event', error: error.message });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  const { event_id } = req.params;

  if (!event_id)
    return res.status(400).json({ message: 'Event ID is required' });

  try {
    const event = await Event.findByIdAndDelete(event_id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.status(200).json({ message: 'Event deleted successfully', event });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting event', error: error.message });
  }
};
