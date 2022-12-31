import { configureStore } from '@reduxjs/toolkit'
import alerts from './alertSlice'
import auth from './authSlice'
import profile from './profileSlice'
import posts from './postSlice'

export const store = configureStore({
	reducer: {
		alerts,
		auth,
		profile,
		posts
	},
})
