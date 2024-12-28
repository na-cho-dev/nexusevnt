import Event from '../models/eventsModel.js';

export const createEvent = async (req, res) => {
  const {
    event_name,
    event_description,
    event_date,
    event_location,
    event_start_time,
    event_end_time,
    event_price,
    ticket_tier,
  } = req.body;

  const eventObj = {
    event_name,
    event_description,
    event_date,
    event_location,
    event_start_time,
    event_end_time,
    event_price,
    ticket_tier,
  };

  for (const key in eventObj) {
    if (!eventObj[key]) {
      if (key === 'event_end_time') continue;
      return res.status(400).json({ message: `${key} is required` });
    }
  }

  const newEvent = new Event(eventObj);

  try {
    // const newEvent = await Event.create(eventObj);
    await newEvent.save();
    res
      .status(201)
      .json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating event!', error: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    if (events.length === 0)
      return res.status(404).json({ message: 'Events not found' });
    res
      .status(200)
      .json({ message: 'Fetched all events successfully', events: events });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching events!', error: error.message });
  }
};

export const getEvent = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'Event ID is required' });

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res
      .status(200)
      .json({ message: 'Fetched event successfully', event: event });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching event!', error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  if (!id) return res.status(400).json({ message: 'Event ID is required' });

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const updatedEvent = await Event.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });
    console.log(updatedEvent);
    res.status(200).json({
      message: 'Updated event successfully',
      event: updatedEvent,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating event!', error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Event ID is required' });

    const event = await Event.findByIdAndDelete(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    console.log(event);

    res.status(200).json({
      message: 'Event deleted successfully',
      event: event,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting event!', error: error.message });
  }
};
