import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const alertSlice = createSlice({
	name: 'alerts',
	initialState,
	reducers: {
		setAlert: (state, action) => {
			state.push(action.payload)
		},
		removeAlert: (state, action) => {
			return state.filter((alert) => alert.id !== action.payload)
		},
	},
})

export const { setAlert, removeAlert } = alertSlice.actions

export const throwAlert = (alertInfo) => (dispatch) => {
	let id = Date.now()
	dispatch(setAlert({ id, ...alertInfo }))
	setTimeout(() => {
		dispatch(removeAlert(id))
	}, 2000)
}

export default alertSlice.reducer
