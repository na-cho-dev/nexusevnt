import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    event_organizer_id: {
      type: String,
      required: [true, 'Event Organizer is required'],
      trim: true,
    },
    event_name: {
      type: String,
      required: [true, 'Event Name is required'],
      trim: true,
    },
    event_description: {
      type: String,
      required: [true, 'Event Description is required'],
      trim: true,
    },
    event_date: {
      type: Date,
      required: [true, 'Event Date is required'],
      trim: true,
    },
    event_location: {
      type: String,
      required: [true, 'Event Location is required'],
      trim: true,
    },
    event_venue: {
      type: String,
      required: [true, 'Event Venue is required'],
      trim: true,
    },
    event_start_time: {
      type: Date,
      required: [true, 'Event Start Time is required'],
      trim: true,
    },
    event_end_time: {
      type: Date,
      required: false,
      trim: true,
    },
    event_price: {
      type: Number,
      required: [true, 'Event Price is required'],
      trim: true,
    },
    ticket_tier: {
      type: String,
      required: [true, 'Ticket Tier is required'],
      enum: ['Basic', 'VIP', 'VIPP'],
      default: 'Basic',
    },
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);
export default Event;
