import mongoose from 'mongoose';

const ticketTierSchema = new mongoose.Schema(
  {
    tier_type: {
      type: String,
      required: [false, 'Ticket Tier Type is required'],
      enum: ['Regular', 'VIP', 'VVIP'],
      default: 'Regular',
    },
    tier_price: {
      type: Number,
      required: [true, 'Ticket Tier Price is required'],
      default: 0,
    },
    total_tickets: {
      type: Number,
      required: [false, 'Total Tickets are required'],
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
      data: { type: Buffer },
      mimeType: { type: String },
    },
    event_name: {
      type: String,
      required: [true, 'Event Name is required'],
      trim: true,
    },
    event_category: {
      type: String,
      required: [true, 'Ticket Tier Type is required'],
      enum: ['Music Festivals', 'Conference', 'Outdoor Movie Nights', 'Color Runs', 'Food and Drink Festivals', 'Art and Craft Fairs'],
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
    event_location: {
      type: String,
      required: [true, 'Event Location is required'],
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
