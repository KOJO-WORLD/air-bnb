const express = require('express');
const router = express.Router();

const { Image, Review, Sequelize, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// Delete a Spot Image

router.delete(
    '/:imageId',
    requireAuth,
    async (req, res, next) => {
        const currUser = req.user;
        const currImage = await Image.scope('owner').findOne({
            where: {
                id: req.params.imageId,
                imageableType: 'review'
            }
        });

        console.log(currImage);

        if (!currImage) {
            const err = new Error();
            err.status = 404;
            err.message = "Image couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        const currReview = await Review.findByPk(currImage.imageableId);

        console.log(currReview);

        if (!currReview) {
            const err = new Error();
            err.status = 404;
            err.message = "Image couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        if (currUser.id !== currReview.userId) {
            const err = new Error();
            err.status = 403;
            err.message = "Only the owner can delete this review image";
            return res.json({ status: err.status, message: err.message })
        }

        await currImage.destroy()

        res.status(200)
        return res.json({
            'message': 'Successfully deleted review image'
        })

    }
)



module.exports = router;
