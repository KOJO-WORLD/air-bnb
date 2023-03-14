const express = require('express');
const router = express.Router();

const { Spot, User, Image, Review, Booking, Sequelize, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateNewSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const validateNewReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage('Must be an integer from 1 to 5'),
    handleValidationErrors
];

// Get all spots
router.get(
    '/',
    async (req, res) => {
        let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query

        if (!page) page = 1;
        if (page > 10) page = 10;
        if (!size) size = 20;
        if (size > 10) size = 20;
        if (!minPrice) minPrice = 0.0;
        if (!maxPrice) maxPrice = 999999999.99;

        if (!minLat) minLat = -90.0;
        if (!maxLat) maxLat = 90.0;
        if (!minLng) minLng = -180.0;
        if (!maxLng) maxLng = 180.0;

        const pagination = {};

        if (page >= 0 && size >= 1) {
            pagination.limit = size
            pagination.offset = size * (page - 1)
        }

        const Op = Sequelize.Op;
        const spots = await Spot.findAll({
            where: {
                price: {
                    [Op.between]: [minPrice, maxPrice]
                },
                lat: {
                    [Op.between]: [minLat, maxLat]
                },
                lng: {
                    [Op.between]: [minLng, maxLng]
                }
            },
            include: [
                {
                    model: Review,
                },
                {
                    model: Image,
                    as: 'SpotImages',
                },
            ],
            ...pagination
        });

        let spotList = [];
        spots.forEach(spot => {
            spotList.push(spot.toJSON());
        });

        spotList.forEach(spot => {
            let starSum = spot.Reviews.reduce((acc, currVal) => {
                return currVal.stars + acc
            }, 0);

            spot.avgRating = (starSum / (spot.Reviews.length)).toFixed(2)

            delete spot.Reviews

            spot.SpotImages.forEach(image => {
                if (image.preview) {
                    spot.previewImage = image.url
                }
            })

            if (!spot.previewImage) {
                spot.previewImage = 'none'
            }

            delete spot.SpotImages
        });

        //add numstars
        //add avgRating
        return res.json({
            'Spots': spotList
        });
    }
)


// Get all spots for the current user
router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const currUser = req.user;
        const spots = await Spot.findAll({
            where: {
                ownerId: currUser.id
            },
            include: [
                {
                    model: Review,
                },
                {
                    model: Image,
                    as: 'SpotImages',
                },
            ]
        });

        if (!spots) {
            const err = new Error();
            err.status = 404;
            err.message = "Spots couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        let spotList = [];

        if (spots.length) {
            spots.forEach(spot => {
                spotList.push(spot.toJSON());
            });

            spotList.forEach(spot => {
                let starSum = spot.Reviews.reduce((acc, currVal) => {
                    return currVal.stars + acc
                }, 0);

                spot.avgRating = (starSum / (spot.Reviews.length)).toFixed(2)

                delete spot.Reviews

                spot.SpotImages.forEach(image => {
                    if (image.preview) {
                        spot.previewImage = image.url
                    }
                })

                if (!spot.previewImage) {
                    spot.previewImage = 'none'
                }

                delete spot.SpotImages
            });
        }


        //add numstars
        //add avgRating
        return res.json({
            'Spots': spotList
        });
    }
)

// Get details of a Spot from an id
router.get(
    '/:spotId',
    async (req, res, next) => {
        const spotId = req.params.spotId
        const tester = await Spot.findByPk(spotId);

        if (!tester) {
            const err = new Error();
            err.status = 404;
            err.message = "Spot couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        const spot = await Spot.findByPk(spotId, {
            include: [
                {
                    model: Review,
                },
                {
                    model: Image,
                    as: 'SpotImages',
                },
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName'],
                    as: 'Owner'
                },
            ]

        });

        if (!spot) {
            const err = new Error();
            err.status = 404;
            err.message = "Spots couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        let jsonSpot = spot.toJSON()

        let starSum = jsonSpot.Reviews.reduce((acc, currVal) => {
            return currVal.stars + acc
        }, 0);

        jsonSpot.avgRating = (starSum / (jsonSpot.Reviews.length)).toFixed(2)

        jsonSpot.numReviews = jsonSpot.Reviews.length

        delete jsonSpot.Reviews

        return res.json(jsonSpot);
    }
)

// Create a spot
router.post(
    '/',
    requireAuth,
    validateNewSpot,
    async (req, res, next) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        const newSpot = await Spot.create({
            ownerId: req.user.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });

        res.status(201);
        return res.json(newSpot);
    }
)

// Add an Image to a Spot based on the Spot's id
router.post(
    '/:spotId/images',
    requireAuth,
    async (req, res, next) => {
        const currUser = req.user;
        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(spotId);
        const { id, url, preview } = req.body;

        if (!spot) {
            const err = new Error();
            err.status = 404;
            err.message = "Spot couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        if (currUser.id !== spot.ownerId) {
            const err = new Error();
            err.status = 403;
            err.message = "Spot couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        const newImage = await Image.create({
            id,
            url,
            imageableId: spotId,
            imageableType: 'spot',
            preview,
        })

        return res.json(newImage);
    }
)

// Edit a spot

router.put(
    '/:spotId',
    requireAuth,
    async (req, res, next) => {
        const currUser = req.user;
        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(spotId);
        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        if (!spot) {
            const err = new Error();
            err.status = 404;
            err.message = "Spot couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        if (currUser.id !== spot.ownerId) {
            const err = new Error();
            err.status = 403;
            err.message = "Spot couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        spot.set({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })

        await spot.save()

        return res.json(spot);
    }
)

// Delete a spot
router.delete(
    '/:spotId',
    requireAuth,
    async (req, res) => {
        const currUser = req.user;
        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(spotId);

        if (!spot) {
            const err = new Error();
            err.status = 404;
            err.message = "Spot couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        if (currUser.id !== spot.ownerId) {
            const err = new Error();
            err.status = 404;
            err.message = "Spot couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        await spot.destroy()

        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        });
    }
)

// Get all Reviews by a Spot's id
router.get(
    '/:spotId/reviews',
    async (req, res, next) => {
        const currSpotId = req.params.spotId;
        const spot = await Spot.findByPk(currSpotId);

        if (!spot) {
            const err = new Error();
            err.status = 404;
            err.message = "Spot couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        const reviews = await Review.findAll({
            where: {
                spotId: currSpotId
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName'],
                    as: 'Owner'
                },
                {
                    model: Image,
                    as: 'ReviewImages',
                },
            ]
        })

        return res.json({
            'Reviews': reviews
        });
    }
)

// Create a review for a spot based on the spotId
router.post(
    '/:spotId/reviews',
    requireAuth,
    validateNewReview,
    async (req, res, next) => {
        const currUser = req.user;
        const currSpotId = req.params.spotId;
        const spot = await Spot.findByPk(currSpotId);
        const { review, stars } = req.body;

        const reviewChecker = await Review.findAll({
            where: {
                userId: currUser.id
            }
        });

        if (!spot) {
            const err = new Error();
            err.status = 404;
            err.message = "Spot couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        if (reviewChecker.length > 0) {
            const err = new Error();
            err.status = 403;
            err.message = "User already has a review for this spot";
            return res.json({ status: err.status, message: err.message })
        }

        const newReview = await Review.create({
            userId: currUser.id,
            spotId: currSpotId,
            review,
            stars
        });

        res.status(201);
        return res.json(newReview);
    }
)

// Get all Bookings by a Spot's id
router.get(
    '/:spotId/bookings',
    async (req, res, next) => {
        const currSpotId = req.params.spotId;
        const currUser = req.user;
        const spot = await Spot.findByPk(currSpotId);

        if (!spot) {
            const err = new Error();
            err.status = 404;
            err.message = "Spot couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        const ownerBookings = await Booking.scope('owner').findAll({
            where: {
                spotId: currSpotId
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName'],
                    as: 'Owner'
                }
            ]
        })

        const bookings = await Booking.scope('booker').findAll({
            where: {
                spotId: currSpotId
            }
        })

        if (currUser.id === spot.ownerId) {
            return res.json({
                'Bookings': ownerBookings
            });
        } else {
            return res.json({
                'Bookings': bookings
            });
        }
    }
)

// Create a Booking from a Spot based on the Spot's id
router.post(
    '/:spotId/bookings',
    requireAuth,
    async (req, res, next) => {
        const currUser = req.user;
        const currSpotId = req.params.spotId;
        const spot = await Spot.findByPk(currSpotId);
        const { startDate, endDate } = req.body;

        if (!spot) {
            const err = new Error();
            err.status = 404;
            err.message = "Spot couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        if (spot.ownerId === currUser.id) {
            const err = new Error();
            err.status = 403;
            err.message = "User cannot book their own spots";
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

        const newBooking = await Booking.create({
            userId: currUser.id,
            spotId: currSpotId,
            startDate,
            endDate
        });

        res.status(201);
        return res.json(newBooking);
    }
)

module.exports = router;
