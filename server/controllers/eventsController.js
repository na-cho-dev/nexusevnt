import Event from '../models/eventsModel.js';

// Create Event
export const createEvent = async (req, res) => {
  const {
    event_name,
    event_description,
    event_date,
    event_location,
    event_venue,
    event_start_time,
    event_end_time,
    ticket_tiers,
  } = req.body;

  const eventObj = {
    event_organizer_id: String(req.user._id),
    event_name,
    event_description,
    event_date,
    event_location,
    event_venue,
    event_start_time,
    event_end_time,
    ticket_tiers,
  };

  for (const key in eventObj) {
    if (!eventObj[key] && key !== 'event_end_time') {
      return res.status(400).json({ message: `${key} is required` });
    }
  }

  try {
    const newEvent = new Event(eventObj);
    await newEvent.save();
    res
      .status(201)
      .json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

// Get All Events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    if (events.length === 0) return res.status(404).json({ message: 'No events found' });
    res.status(200).json({ message: 'Fetched events successfully', events });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

// Get Single Event
export const getEvent = async (req, res) => {
  const { event_id } = req.params;
  if (!event_id) return res.status(400).json({ message: 'Event ID is required' });

  try {
    const event = await Event.findById(event_id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json({ message: 'Fetched event successfully', event });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
};

// Update Event
export const updateEvent = async (req, res) => {
  const { event_id } = req.params;
  const updatedFields = req.body;

  if (!event_id) return res.status(400).json({ message: 'Event ID is required' });

  try {
    const updatedEvent = await Event.findByIdAndUpdate(event_id, updatedFields, {
      new: true,
      runValidators: true,
    });
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });

    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error: error.message });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  const { event_id } = req.params;

  if (!event_id) return res.status(400).json({ message: 'Event ID is required' });

  try {
    const event = await Event.findByIdAndDelete(event_id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.status(200).json({ message: 'Event deleted successfully', event });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};
