const express = require('express');
const router = express.Router();
const { saveTripPlan } = require('../controllers/tripPlanController');
const auth = require('../middleware/auth');

// Protect this route with the auth middleware.
// Only logged-in users will be able to save trip plans.
router.post('/', auth, saveTripPlan);

module.exports = router;
