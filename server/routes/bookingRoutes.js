const express = require('express');
const { createBooking, getUserBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my', protect, getUserBookings);

module.exports = router;