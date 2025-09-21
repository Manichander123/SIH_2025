const TripPlan = require('../models/tripPlan');

// --- Save a new trip plan ---
exports.saveTripPlan = async (req, res) => {
  try {
    const { destinations, numberOfPeople, budget, itineraryText } = req.body;

    // req.user.id is attached by our auth middleware
    const newTripPlan = new TripPlan({
      user: req.user.id,
      destinations,
      numberOfPeople,
      budget,
      itineraryText,
    });

    await newTripPlan.save();

    console.log(`SUCCESS: Trip plan saved for user ${req.user.id}`);
    res.status(201).json({ message: 'Trip plan saved successfully!', tripPlan: newTripPlan });
  } catch (error) {
    console.error('SAVE TRIP PLAN ERROR:', error);
    res.status(500).json({ message: 'Server error while saving trip plan.' });
  }
};
