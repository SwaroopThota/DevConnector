import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { throwAlert } from './alertSlice'

const initialState = {
	token: localStorage.getItem('auth_token_dc') ?? null,
	isAuthenticated: null,
	isLoading: true,
	user: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		Auth_Failure: (state) => {
			localStorage.removeItem('auth_token_dc')
			return {
				...state,
				isLoading: false,
				isAuthenticated: false,
				token: null,
				user: null,
			}
		},
		Login_User: (state, { payload: { token, user } }) => {
			return {
				...state,
				token,
				user,
				isLoading: false,
				isAuthenticated: true,
			}
		},
		Start_Loading: (state) => {
			return {
				...state,
				isLoading: true,
			}
		},
		Stop_Loading: (state) => {
			return {
				...state,
				isLoading: false,
			}
		},
	},
})

export const { Auth_Failure, Login_User, Start_Loading, Stop_Loading } =
	authSlice.actions

export const userRegister = (newUser) => async (dispatch) => {
	try {
		dispatch(Start_Loading())
		const res = await axios.post('/api/users', newUser)
		localStorage.setItem('auth_token_dc', res.data.token)
		dispatch(loadUser())
		dispatch(
			throwAlert({
				type: 'success',
				msg: 'Account created successfully.',
			})
		)
	} catch (err) {
		dispatch(Auth_Failure())
		err.response.data.errors.forEach(({ msg }) =>
			dispatch(throwAlert({ type: 'danger', msg }))
		)
	}
}

export const userLogin = (userCredentials) => async (dispatch) => {
	try {
		dispatch(Start_Loading())
		const res = await axios.post('/api/auth', userCredentials)
		localStorage.setItem('auth_token_dc', res.data.token)
		dispatch(loadUser())
		dispatch(
			throwAlert({
				type: 'success',
				msg: 'Account login successful.',
			})
		)
	} catch (err) {
		dispatch(Auth_Failure())
		err.response.data.errors.forEach(({ msg }) =>
			dispatch(throwAlert({ type: 'danger', msg }))
		)
	}
}

export const loadUser = () => async (dispatch) => {
	dispatch(Start_Loading())
	const token = localStorage.getItem('auth_token_dc')
	if (!token) {
		dispatch(Auth_Failure())
		return
	}
	axios.defaults.headers['auth_token_dc'] = token
	try {
		const res = await axios.get('/api/auth')
		dispatch(Login_User({ token, user: res.data }))
		dispatch(
			throwAlert({
				type: 'success',
				msg: `Welcome back ${res.data.name}!`,
			})
		)
	} catch (err) {
		dispatch(Auth_Failure())
		err.response.data.errors.forEach(({ msg }) =>
			dispatch(throwAlert({ type: 'danger', msg }))
		)
	}
}

export default authSlice.reducer
