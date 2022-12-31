const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const config = require('config')
const jsonwebtoken = require('jsonwebtoken')

//@method POST /api/users
//@desc Create a user
//@access public
router.post(
	'/',
	[
		check('name', 'Name is required').trim().not().isEmpty().escape(),
		check('email', 'Please include a valid email').isEmail().normalizeEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).trim().isLength({
			min: 6,
		}).escape(),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(401).json({ errors: errors.array() })
		}
		try {
			let { name, email, password } = req.body
			let user = await User.findOne({ email })
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exists.' }] })
			}
			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm',
			}).substring(2)
			const salt = await bcrypt.genSalt(10)
			password = await bcrypt.hash(password, salt)
			user = new User({
				name,
				email,
				password,
				avatar,
			})
			await user.save()
			const JWT_SECRET = config.get('jwtSecret')
			const payload = {
				user: {
					id: user.id,
				},
			}
			const token = jsonwebtoken.sign(payload, JWT_SECRET, {
				expiresIn: '10d',
			})
			res.json({ token })
		} catch (err) {
			console.log(err)
			return res
				.status(500)
				.json({ errors: [{ msg: 'Internal Server Error.' }] })
		}
	}
)

module.exports = router
