const express = require('express');
const router = express.Router();

const { Spot, User, Image, Review, Sequelize, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateNewReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage('Must be an integer from 1 to 5'),
    handleValidationErrors
];

// Get all reviews of the current user NOT DONE
router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const currUser = req.user;

        const reviews = await Review.findAll({
            where: {
                userId: currUser.id
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName'],
                    as: 'Owner'
                },
                {
                    model: Spot,
                    attributes: []
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

// Add an Image to a Review based on the Review's id
router.post(
    '/:reviewId/images',
    requireAuth,
    async (req, res) => {
        const currUser = req.user;
        const revId = req.params.reviewId;
        const review = await Review.findByPk(revId);
        const { url } = req.body;
        const imgCount = await Image.findAll({
            where: {
                imageableId: revId,
                imageableType: 'review'
            },
            attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'imageCount']]
        })

        if (!review) {
            const err = new Error();
            err.status = 404;
            err.message = "Review couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        if (currUser.id !== review.userId) {
            const err = new Error();
            err.status = 404;
            err.message = "Review couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        if (imgCount.imageCount === 10) {
            const err = new Error();
            err.status = 403;
            err.message = "Maximum number of images for this resource was reached";
            return res.json({ status: err.status, message: err.message })
        }

        const newImage = await Image.create({
            url,
            imageableId: revId,
            imageableType: 'review',
        })

        return res.json({
            newImage
        });
    }
)

// Edit a review
router.put(
    '/:reviewId',
    requireAuth,
    validateNewReview,
    async (req, res) => {
        const currUser = req.user;
        const revId = req.params.reviewId;
        const currReview = await Review.findByPk(revId);
        const { review, stars } = req.body;

        if (!currReview) {
            const err = new Error();
            err.status = 404;
            err.message = "Review couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        if (currUser.id !== currReview.userId) {
            const err = new Error();
            err.status = 404;
            err.message = "Review couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        currReview.set({
            review,
            stars
        })

        await currReview.save()

        return res.json({
            currReview
        });
    }
)

// Delete a review
router.delete(
    '/:reviewId',
    requireAuth,
    async (req, res) => {
        const currUser = req.user;
        const revId = req.params.reviewId;
        const currReview = await Review.findByPk(revId);

        if (!currReview) {
            const err = new Error();
            err.status = 404;
            err.message = "Review couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        if (currUser.id !== currReview.userId) {
            const err = new Error();
            err.status = 404;
            err.message = "Review couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        await currReview.destroy()

        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        });
    }
)

module.exports = router;
