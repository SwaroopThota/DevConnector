const { default: axios } = require('axios')
const config = require('config')
const express = require('express')
const { check, validationResult, body } = require('express-validator')
const auth = require('../../middleware/auth')
const router = express.Router()
const Profile = require('../../models/Profile')
const User = require('../../models/User')

//@method GET /api/profile/me
//@desc get current user profile
//@access private
router.get('/me', auth, async (req, res) => {
	try {
		let profile = await Profile.findOne({ user: req.userId }).populate(
			'user',
			['name', 'avatar']
		)
		if (!profile) {
			return res
				.status(400)
				.json({ msg: 'There is no Profile for the user.' })
		}
		return res.json(profile)
	} catch (err) {
		console.log(err.message)
		return res
			.status(500)
			.json({ errors: [{ msg: 'Internal Server Error' }] })
	}
})

//@method POST /api/profile/
//@desc create current user profile
//@access private
router.post(
	'/',
	auth,
	check('status', 'status is required').notEmpty(),
	check('skills', 'skills are required').notEmpty(),
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		//some of the code is copied from Brad traveysys github
		try {
			const {
				website,
				skills,
				status,
				location,
				bio,
				company,
				githubusername,
				youtube,
				twitter,
				instagram,
				linkedin,
				facebook,
			} = req.body
			const profileFields = {
				user: req.userId,
				website: website ? website.trim() : '',
				status: status ? status.trim() : '',
				githubusername: githubusername ? githubusername.trim() : '',
				bio: bio ? bio.trim() : '',
				company: company ? company.trim() : '',
				location: location ? location.trim() : '',
				skills: skills.split(',').map((skill) => ' ' + skill.trim()),
				social: { youtube, twitter, instagram, linkedin, facebook },
			}
			let profile = await Profile.findOneAndUpdate(
				{ user: req.userId },
				{ $set: profileFields },
				{ new: true, upsert: true, setDefaultsOnInsert: true }
			)
			return res.json(profile)
		} catch (err) {
			console.log(err.message)
			return res
				.status(500)
				.json({ errors: [{ msg: 'Internal Server Error' }] })
		}
	}
)

//@method GET /api/profile/
//@desc get all users profiles
//@access public
router.get('/', async (req, res) => {
	try {
		let profiles = await Profile.find({}).populate('user', [
			'name',
			'avatar',
		])
		res.json(profiles)
	} catch (err) {
		console.log(err.message)
		return res
			.status(500)
			.json({ errors: [{ msg: 'Internal Server Error' }] })
	}
})

//@method GET /api/profile/:user_id
//@desc get user profile by user id
//@access public
router.get('/user/:user_id', async (req, res) => {
	try {
		let profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate('user', ['name', 'avatar'])
		if (!profile) return res.status(400).send('User not Found')
		res.json(profile)
	} catch (err) {
		console.log(err.message)
		if (err.kind === 'ObjectId')
			return res.status(400).send('User not Found')
		return res
			.status(500)
			.json({ errors: [{ msg: 'Internal Server Error' }] })
	}
})

//@method DELETE /api/profile/
//@desc delete user profile
//@access private
router.delete('/', auth, async (req, res) => {
	try {
		//TODO: Delete all posts
		await Profile.findOneAndDelete({ user: req.userId })
		await User.findByIdAndDelete(req.userId)
		res.json({ msg: 'User deleted successfully' })
	} catch (err) {
		console.log(err.messgage)
		return res
			.status(500)
			.json({ errors: [{ msg: 'Internal Server Error' }] })
	}
})

//@method POST /api/profile/experience
//@desc add experience to profile
//@access private
router.put(
	'/experience',
	auth,
	check('title', 'Title is required').notEmpty(),
	check('company', 'Company is required').notEmpty(),
	check('from', 'From date is required').notEmpty(),
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		const { title, company, from, to, current, location, description } =
			req.body
		const newExp = {
			title,
			company,
			from,
			to,
			current,
			location,
			description,
		}
		try {
			let profile = await Profile.findOne({ user: req.userId })
			profile.experience.unshift(newExp)
			await profile.save()
			res.json(profile)
		} catch (err) {
			console.log(err.message)
			return res
				.status(500)
				.json({ errors: [{ msg: 'Internal Server Error' }] })
		}
	}
)

//@method DELETE /api/profile/experience
//@desc delete experience from profile
//@access private
router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		let profile = await Profile.findOne({ user: req.userId })
		let index = profile.experience
			.map((exp) => exp.id)
			.indexOf(req.params.exp_id)
		if (index !== -1) profile.experience.splice(index, 1)
		profile.save()
		res.json(profile)
	} catch (err) {
		console.log(err.message)
		return res
			.status(500)
			.json({ errors: [{ msg: 'Internal Server Error' }] })
	}
})

//@method POST /api/profile/education
//@desc add education to profile
//@access private
router.put(
	'/education',
	auth,
	check('school', 'school is required').notEmpty(),
	check('degree', 'degree is required').notEmpty(),
	check('from', 'from date is required').notEmpty(),
	check('fieldOfStudy', 'Field of study is required').notEmpty(),
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		const { school, degree, from, to, fieldOfStudy, current, description } =
			req.body
		const newExp = {
			school,
			degree,
			from,
			to,
			current,
			fieldOfStudy,
			description,
		}
		try {
			let profile = await Profile.findOne({ user: req.userId })
			profile.education.unshift(newExp)
			await profile.save()
			res.json(profile)
		} catch (err) {
			console.log(err.message)
			return res
				.status(500)
				.json({ errors: [{ msg: 'Internal Server Error' }] })
		}
	}
)

//@method DELETE /api/profile/education
//@desc delete education from profile
//@access private
router.delete('/education/:edu_id', auth, async (req, res) => {
	try {
		let profile = await Profile.findOne({ user: req.userId })
		let index = profile.education
			.map((edu) => edu.id)
			.indexOf(req.params.edu_id)
		if (index !== -1) profile.education.splice(index, 1)
		profile.save()
		res.json(profile)
	} catch (err) {
		console.log(err.message)
		return res
			.status(500)
			.json({ errors: [{ msg: 'Internal Server Error' }] })
	}
})

//@method GET /api/profile/github/:username
//@desc get user repos from github
//@access public
router.get('/github/:username', async (req, res) => {
	try {
		const uri = encodeURI(
			`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
		)
		const headers = {
			'user-agent': 'node.js',
			Authorization: `token ${config.get('githubToken')}`,
		}
		const gitHubResponse = await axios.get(uri, { headers })
		return res.json(gitHubResponse.data)
	} catch (err) {
		console.error(err.message)
		return res
			.status(404)
			.json({ errors: [{ msg: 'No Github profile found' }] })
	}
})

module.exports = router
