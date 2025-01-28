import mongoose from 'mongoose';

const ticketTierSchema = new mongoose.Schema(
  {
    tier_type: {
      type: String,
      required: [true, 'Ticket Tier Type is required'],
      enum: ['Regular', 'VIP', 'VVIP'],
      default: 'Regular',
    },
    price: {
      type: Number,
      required: [true, 'Ticket Tier Price is required'],
    },
    total_tickets: {
      type: Number,
      required: [true, 'Total Tickets are required'],
    },
    available_tickets: {
      type: Number,
      required: true,
      default: function () {
        return this.total_tickets;
      },
    },
  }
);

const eventSchema = new mongoose.Schema(
  {
    event_organizer_id: {
      type: String,
      required: [true, 'Event Organizer is required'],
      trim: true,
    },
    event_image: {
      type: Buffer,
      required: false,
    },
    event_name: {
      type: String,
      required: [true, 'Event Name is required'],
      trim: true,
    },
    event_category: {
      type: String,
      required: [true, 'Ticket Tier Type is required'],
      enum: ['Music Festival', 'Conference'],
      default: 'Regular',
    },
    event_description: {
      type: String,
      required: [true, 'Event Description is required'],
      trim: true,
    },
    event_type: {
      type: String,
      required: [true, 'Event Type is required'],
      enum: ['Free', 'Paid',],
      default: 'Free',
    },
    event_date: {
      type: Date,
      required: [true, 'Event Date is required'],
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
    ticket_tiers: [ticketTierSchema],  // Embed ticket tiers within events
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);
export default Event;
