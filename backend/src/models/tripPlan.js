const mongoose = require('mongoose');

const tripPlanSchema = new mongoose.Schema({
  // Link to the user who created the plan
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // We can store the destination names or IDs
  destinations: {
    type: [String],
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
  },
  budget: {
    type: String, // e.g., "economy", "luxury"
    required: true,
  },
  // The generated itinerary text can be saved here
  itineraryText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TripPlan = mongoose.model('TripPlan', tripPlanSchema);

module.exports = TripPlan;
