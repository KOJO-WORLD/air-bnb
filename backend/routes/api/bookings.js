const express = require('express');
const router = express.Router();

const { Booking, Sequelize, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// Get all of the Current User's Bookings
router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const currUser = req.user;
        const bookings = await Booking.scope('owner').findAll({
            where: {
                userId: currUser.id
            }
        });

        return res.json({
            'Bookings': bookings
        });
    }
)

// Edit a Booking

router.put(
    '/:bookingId',
    requireAuth,
    async (req, res) => {
        const currBooking = await Booking.findByPk(req.params.bookingId);
        const { startDate, endDate } = req.body

        if (!currBooking) {
            const err = new Error();
            err.status = 404;
            err.message = "Booking couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        const date = new Date();

        const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

        if (currBooking.startDate < today) {
            const err = new Error();
            err.status = 403;
            err.message = "Past bookings can't be modified"
            return res.json({ status: err.status, message: err.message })
        }

        const Op = Sequelize.Op;
        const dateChecker = await Booking.findOne({
            where: {
                [Op.or]: [
                    { startDate: startDate },
                    { endDate: endDate }
                ]
            }
        })

        if (dateChecker) {
            const err = new Error();
            err.status = 403;
            err.message = "Sorry, this spot is already booked for the specified dates";
            err.errors = [
                "Start date conflicts with an existing booking",
                "End date conflicts with an existing booking"
            ]
            return res.json({ status: err.status, message: err.message })
        }

        currBooking.set({
            startDate,
            endDate
        })

        await currBooking.save()

        return res.json({
            'Edited Booking': currBooking
        })
    }
)

// Delete a Booking
router.delete(
    '/:bookingId',
    requireAuth,
    async (req, res) => {
        const currUser = req.user;
        const currBooking = await Booking.findByPk(req.params.bookingId);

        if (!currBooking) {
            const err = new Error();
            err.status = 404;
            err.message = "Booking couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        if (currUser.id !== currBooking.userId) {
            const err = new Error();
            err.status = 404;
            err.message = "Booking couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        const date = new Date();
        const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

        if (currBooking.startDate < today) {
            const err = new Error();
            err.status = 403;
            err.message = "Bookings that have been started cannot be deleted"
            return res.json({ status: err.status, message: err.message })
        }

        await currBooking.destroy()

        return res.json({
            'Message': 'Successfully deleted booking'
        });
    }
)

module.exports = router;
