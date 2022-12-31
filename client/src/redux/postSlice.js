import axios from 'axios'
import { throwAlert } from './alertSlice'

const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
	posts: [],
	loading: true,
	post: null,
}

const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		Get_Posts: (state, action) => {
			return {
				...state,
				posts: action.payload,
				loading: false,
			}
		},
		Get_Post: (state, action) => {
			return {
				...state,
				post: action.payload,
				loading: false,
			}
		},
		Posts_Error: (state) => {
			return {
				...state,
				posts: [],
				loading: false,
			}
		},
		Add_Post: (state, action) => {
			state.posts.unshift(action.payload)
			return state
		},
		Delete_Post: (state, action) => {
			state.posts = state.posts.filter(
				(post) => post._id !== action.payload
			)
			return state
		},
		Update_Likes: (state, { payload }) => {
			state.posts = state.posts.map((post) =>
				post._id === payload.id
					? { ...post, likes: payload.likes }
					: post
			)
			return state
		},
		Add_Comment: (state, { payload }) => {
			state.post.comments = payload
			return state
		},
		Delete_Comment: (state, { payload }) => {
			state.post.comments = state.post.comments.filter(
				(comment) => comment._id !== payload
			)
			return state
		},
	},
})

export const {
	Get_Posts,
	Posts_Error,
	Add_Post,
	Update_Likes,
	Add_Comment,
	Delete_Comment,
	Delete_Post,
	Get_Post,
} = postSlice.actions

export default postSlice.reducer

export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/posts')
		dispatch(Get_Posts(res.data))
	} catch (err) {
		err.response.data.errors.forEach(({ msg }) =>
			dispatch(throwAlert({ type: 'danger', msg }))
		)
		dispatch(Posts_Error())
	}
}

export const addPost = (text) => async (dispatch) => {
	try {
		const res = await axios.post('/api/posts', { text })
		dispatch(Add_Post(res.data))
		dispatch(throwAlert({ type: 'success', msg: 'You just posted...' }))
	} catch (err) {
		err.response.data.errors.forEach(({ msg }) =>
			dispatch(throwAlert({ type: 'danger', msg }))
		)
	}
}

export const addLike = (id) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/posts/like/${id}`)
		dispatch(Update_Likes({ id, likes: res.data }))
	} catch (err) {
		err.response.data.errors.forEach(({ msg }) =>
			dispatch(throwAlert({ type: 'danger', msg }))
		)
	}
}

export const unlike = (id) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/posts/unlike/${id}`)
		dispatch(Update_Likes({ id, likes: res.data }))
	} catch (err) {
		err.response.data.errors.forEach(({ msg }) =>
			dispatch(throwAlert({ type: 'danger', msg }))
		)
	}
}

// Delete post
export const deletePost = (id) => async (dispatch) => {
	try {
		await axios.delete(`/api/posts/${id}`)
		dispatch(Delete_Post(id))
		dispatch(
			throwAlert({ type: 'success', msg: 'Post Deleted Successfully...' })
		)
	} catch (err) {
		err.response.data.errors.forEach(({ msg }) =>
			dispatch(throwAlert({ type: 'danger', msg }))
		)
	}
}

// Get post
export const getPost = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/posts/${id}`)
		dispatch(Get_Post(res.data))
	} catch (err) {
		err.response.data.errors.forEach(({ msg }) =>
			dispatch(throwAlert({ type: 'danger', msg }))
		)
	}
}

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
	try {
		const res = await axios.post(`/api/posts/comment/${postId}`, formData)
		dispatch(Add_Comment(res.data))
	} catch (err) {
		err.response.data.errors.forEach(({ msg }) =>
			dispatch(throwAlert({ type: 'danger', msg }))
		)
	}
}

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
	try {
		await axios.delete(`/api/posts/comment/${postId}/${commentId}`)
		dispatch(Delete_Comment(commentId))
		dispatch(
			throwAlert({
				type: 'success',
				msg: 'Comment Deleted Successfully...',
			})
		)
	} catch (err) {
		err.response.data.errors.forEach(({ msg }) =>
			dispatch(throwAlert({ type: 'danger', msg }))
		)
	}
}
