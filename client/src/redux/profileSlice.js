import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { throwAlert } from './alertSlice'
import { Auth_Failure } from './authSlice'

const initialState = {
	profile: null,
	profiles: [],
	loading: true,
	repos: [],
}

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		Add_Profile: (state, action) => {
			return {
				...state,
				profile: action.payload,
				loading: false,
			}
		},
		Add_Profiles: (state, action) => {
			return {
				...state,
				profiles: action.payload,
				loading: false,
			}
		},
		Add_Repos: (state, action) => {
			return {
				...state,
				repos: action.payload,
				loading: false,
			}
		},
		Profile_Error: (state) => {
			return {
				...state,
				profile: null,
				loading: false,
				repos: [],
			}
		},
	},
})

export const {
	Add_Profile,
	Add_Profiles,
	Add_Repos,
	Profile_Error,
	Account_Deleted,
} = profileSlice.actions

export default profileSlice.reducer

export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile/me')
		dispatch(Add_Profile(res.data))
	} catch (err) {
		err.response.data.errors.forEach(({ msg }) =>
			dispatch(throwAlert({ type: 'danger', msg }))
		)
		dispatch(Profile_Error())
	}
}

// Get all profiles
export const getProfiles = () => async (dispatch) => {
	try {
		console.log("hello")
		const res = await axios.get('/api/profile')
		dispatch(Add_Profiles(res.data))
	} catch (err) {
		err.response.data.errors.forEach(({ msg }) =>
			dispatch(throwAlert({ type: 'danger', msg }))
		)
	}
}

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/user/${userId}`)
		dispatch(Add_Profile(res.data))
	} catch (err) {
		err.response.data.errors.forEach(({ msg }) =>
			dispatch(throwAlert({ type: 'danger', msg }))
		)
	}
}

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/github/${username}`)
		dispatch(Add_Repos(res.data))
	} catch (err) {
		err.response.data.errors.forEach(({ msg }) =>
			dispatch(throwAlert({ type: 'danger', msg }))
		)
	}
}

export const createProfile = (formData, navigate) => async (dispatch) => {
	try {
		const res = await axios.post('/api/profile', formData)
		navigate('/dashboard')
		dispatch(Add_Profile(res.data))
		dispatch(
			throwAlert({
				type: 'success',
				msg: 'Account updated successfully.',
			})
		)
	} catch (err) {
		err.response.data.errors.forEach(({ msg }) =>
			dispatch(throwAlert({ type: 'danger', msg }))
		)
	}
}
export const addExperience = (formData, navigate) => async (dispatch) => {
	try {
		const res = await axios.put('/api/profile/experience', formData)
		dispatch(Add_Profile(res.data))
		navigate('/dashboard')
		dispatch(
			throwAlert({
				type: 'success',
				msg: 'Account updated successfully.',
			})
		)
	} catch (err) {
		err.response.data.errors.forEach(({ msg }) =>
			dispatch(throwAlert({ type: 'danger', msg }))
		)
	}
}
export const addEducation = (formData, navigate) => async (dispatch) => {
	try {
		const res = await axios.put('/api/profile/education', formData)
		dispatch(Add_Profile(res.data))
		navigate('/dashboard')
		dispatch(
			throwAlert({
				type: 'success',
				msg: 'Account updated successfully.',
			})
		)
	} catch (err) {
		err.response.data.errors.forEach(({ msg }) =>
			dispatch(throwAlert({ type: 'danger', msg }))
		)
	}
}
// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/experience/${id}`)
		dispatch(Add_Profile(res.data))
		dispatch(
			throwAlert({
				type: 'success',
				msg: 'Account updated successfully.',
			})
		)
	} catch (err) {
		err.response.data.errors.forEach(({ msg }) =>
			dispatch(throwAlert({ type: 'danger', msg }))
		)
	}
}

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/education/${id}`)
		dispatch(Add_Profile(res.data))
		dispatch(
			throwAlert({
				type: 'success',
				msg: 'Account updated successfully.',
			})
		)
	} catch (err) {
		err.response.data.errors.forEach(({ msg }) =>
			dispatch(throwAlert({ type: 'danger', msg }))
		)
	}
}

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
	if (window.confirm('Are you sure? This can NOT be undone!')) {
		try {
			await axios.delete('/api/profile')
			dispatch(Profile_Error())
			dispatch(Auth_Failure())
			dispatch(
				throwAlert({
					type: 'success',
					msg: 'Account deleted successfully.',
				})
			)
		} catch (err) {
			err.response.data.errors.forEach(({ msg }) =>
				dispatch(throwAlert({ type: 'danger', msg }))
			)
		}
	}
}
