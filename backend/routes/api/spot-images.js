const express = require('express');
const router = express.Router();

const { Spot, Image, Sequelize, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// Delete a Spot Image

router.delete(
    '/:imageId',
    requireAuth,
    async (req, res, next) => {
        const currUser = req.user;
        const currImage = await Image.findOne({
            where: {
                id: req.params.imageId,
                imageableType: 'spot'
            }
        });

        if (!currImage) {
            const err = new Error();
            err.status = 404;
            err.message = "Image couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        const currSpot = await Spot.findByPk(currImage.imageableId);

        if (!currSpot) {
            const err = new Error();
            err.status = 404;
            err.message = "Image couldn't be found";
            return res.json({ status: err.status, message: err.message })
        }

        if (currUser.id !== currSpot.ownerId) {
            const err = new Error();
            err.status = 403;
            err.message = "Only the owner can delete this spot image";
            return res.json({ status: err.status, message: err.message })
        }

        await currImage.destroy()

        res.status(200)
        return res.json({
            'message': 'Successfully deleted spot image'
        })

    }
)



module.exports = router;
