const { default: mongoose } = require('mongoose')

const educationDetails = {
	school: {
		type: String,
		required: true,
	},
	degree: {
		type: String,
		required: true,
	},
	fieldOfStudy: {
		type: String,
		required: true,
	},
	from: {
		type: Date,
		required: true,
	},
	to: {
		type: Date,
	},
	current: {
		type: Boolean,
		default: false,
	},
	description: {
		type: String,
	},
}

const experienceDetails = {
	title: {
		type: String,
		required: true,
	},
	company: {
		type: String,
		required: true,
	},
	location: {
		type: String,
	},
	from: {
		type: Date,
		required: true,
	},
	to: {
		type: Date,
	},
	current: {
		type: Boolean,
		default: false,
	},
	description: {
		type: String,
	},
}

const social = {
	youtube: {
		type: String,
	},
	twitter: {
		type: String,
	},
	linkedin: {
		type: String,
	},
	facebook: {
		type: String,
	},
	instagram: {
		type: String,
	},
}

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	company: {
		type: String,
	},
	website: {
		type: String,
	},
	location: {
		type: String,
	},
	status: {
		type: String,
		required: true,
	},
	skills: {
		type: [String],
		required: true,
	},
	bio: {
		type: String,
	},
	githubusername: {
		type: String,
	},
	experience: [experienceDetails],
	education: [educationDetails],
	social,
	date: {
		type: Date,
		default: Date.now,
	},
})

module.exports = Profile = new mongoose.model('Profile', ProfileSchema)
