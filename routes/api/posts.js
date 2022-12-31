const express = require('express')
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const Post = require('../../models/Post')
const User = require('../../models/User')
const router = express.Router()

//@method POST /api/posts/
//@desc Create a post
//@access private
router.post(
	'/',
	auth,
	[check('text', 'Text is required').notEmpty()],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.json({ errors: errors.array() })
		}
		try {
			const { text } = req.body
			const { name, avatar } = await User.findById(req.userId).select(
				'-password'
			)
			let post = new Post({
				text,
				name,
				avatar,
				user: req.userId,
			})
			post.save()
			res.json(post)
		} catch (err) {
			console.log(err)
			return res
				.status(500)
				.json({ errors: [{ msg: 'Internal Server Error' }] })
		}
	}
)

//@method GET /api/posts/
//@desc get all posts
//@access private
router.get('/', auth, async (req, res) => {
	try {
		const posts = await Post.find({}).sort({ date: -1 })
		res.json(posts)
	} catch (err) {
		console.log(err)
		return res
			.status(500)
			.json({ errors: [{ msg: 'Internal Server Error' }] })
	}
})

//@method POST /api/posts/:post_id
//@desc get a post by its id
//@access private
router.get('/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id)
		if (!post) {
			return res.status(404).send('Post not found')
		}
		res.json(post)
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).send('Post not found')
		}
		console.log(err)
		return res
			.status(500)
			.json({ errors: [{ msg: 'Internal Server Error' }] })
	}
})

//@method DELETE /api/posts/:post_id
//@desc delete a post by its id
//@access private
router.delete('/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id)
		if (!post) {
			return res.status(404).send('Post not found')
		}
		if (post.user.toString() !== req.userId) {
			return res.status(404).send('User not authorized')
		}
		await post.remove()
		res.json({ msg: 'Post deleted Successfully' })
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).send('Post not found')
		}
		console.log(err)
		return res
			.status(500)
			.json({ errors: [{ msg: 'Internal Server Error' }] })
	}
})

//@method PUT /api/posts/like/:post_id
//@desc like or unlike a post
//@access private
router.put('/like/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		if (post.likes.some((like) => like.user.toString() === req.userId)) {
			return res
				.status(400)
				.json({ errors: [{ msg: 'Post already liked' }] })
		}
		post.likes.unshift({ user: req.userId })
		await post.save()
		return res.json(post.likes)
	} catch (err) {
		console.log(err.message)
		if (err.kind === 'ObjectId') {
			return res.status(404).send('Post not found')
		}
		console.log(err)
		return res
			.status(500)
			.json({ errors: [{ msg: 'Internal Server Error' }] })
	}
})

//@method PUT /api/posts/unlike/:post_id
//@desc like or unlike a post
//@access private
router.put('/unlike/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		if (!post.likes.some((like) => like.user.toString() === req.userId)) {
			return res
				.status(400)
				.json({ errors: [{ msg: 'Post has not yet been liked' }] })
		}
		post.likes = post.likes.filter(
			({ user }) => user.toString() !== req.userId
		)
		await post.save()
		return res.json(post.likes)
	} catch (err) {
		console.log(err.message)
		if (err.kind === 'ObjectId') {
			return res.status(404).send('Post not found')
		}
		console.log(err)
		return res
			.status(500)
			.json({ errors: [{ msg: 'Internal Server Error' }] })
	}
})

//@method POST /api/posts/comment/:post_id
//@desc Create a comment
//@access private
router.post(
	'/comment/:post_id',
	auth,
	[check('text', 'Text is required').notEmpty()],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.json({ errors: errors.array() })
		}
		try {
			const { text } = req.body
			const { name, avatar } = await User.findById(req.userId).select(
				'-password'
			)
			const post = await Post.findById(req.params.post_id)
			let comment = {
				text,
				name,
				avatar,
				user: req.userId,
			}
			post.comments.unshift(comment)
			post.save()
			res.json(post.comments)
		} catch (err) {
			console.log(err)
			return res
				.status(500)
				.json({ errors: [{ msg: 'Internal Server Error' }] })
		}
	}
)

//@method DELETE /api/posts/comment/:post_id/:comment_id
//@desc Delete a comment
//@access private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id)
		const comment = post.comments.find(
			(item) => item.id.toString() === req.params.comment_id
		)
		if (!comment) {
			return res.status(404).send('Comment not found')
		}
		if (comment.user.toString() !== req.userId) {
			return res.status(400).send('User not authorized')
		}
		const index = post.comments
			.map((item) => item.user.toString())
			.indexOf(req.userId)
		post.comments.splice(index, 1)
		post.save()
		res.json(post.comments)
	} catch (err) {
		console.log(err)
		return res
			.status(500)
			.json({ errors: [{ msg: 'Internal Server Error' }] })
	}
})

module.exports = router
