const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	text: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
		required: true,
	},
	likes: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
		},
	],
	comments: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
			text: {
				type: String,
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
			avatar: {
				type: String,
				required: true,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
})

module.exports = Post = new mongoose.model('Post', PostSchema)
