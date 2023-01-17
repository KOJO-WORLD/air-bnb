const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { email, password, username } = req.body;
        const user = await User.signup({ email, username, password });

        await setTokenCookie(res, user);

        return res.json({
            user
        });
    }
);

fetch('/api/users', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
    body: JSON.stringify({
        email: 'spidey@spider.man',
        username: 'Spidey',
        password: 'password'
    })
}).then(res => res.json()).then(data => console.log(data));

fetch('/api/users', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
    body: JSON.stringify({
        email: 'firestar@spider.man',
        username: 'Firestar',
        password: ''
    })
}).then(res => res.json()).then(data => console.log(data));

module.exports = router;
