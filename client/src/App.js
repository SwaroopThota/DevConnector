import './App.css'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { Alert } from './components/layout/Alert'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { loadUser } from './redux/authSlice'
import { useSelector } from 'react-redux'
import Dashboard from './components/pages/dashboard/Dashboard'
import ProfileForm from './components/pages/forms/ProfileForm'
import AddEducationForm from './components/pages/forms/AddEducationForm'
import AddExperienceForm from './components/pages/forms/AddExperienceForm'
import Profiles from './components/pages/profiles/Profiles'
import Profile from './components/pages/profile/Profile'
import Posts from './components/pages/posts/Posts'
import Post from './components/pages/post/Post'

const App = () => {
	const dispatch = useDispatch(),
		{ isLoading } = useSelector((state) => state.auth)
	useEffect(() => {
		dispatch(loadUser())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Navbar />
			<Alert />
			{isLoading ? (
				<>Loading...</>
			) : (
				<Routes>
					<Route
						path='/'
						element={<ProtectedRoute element={<Landing />} />}
					/>
					<Route
						path='/login'
						element={<ProtectedRoute element={<Login />} />}
					/>
					<Route
						path='/register'
						element={<ProtectedRoute element={<Register />} />}
					/>
					<Route
						path='/dashboard'
						element={
							<ProtectedRoute
								element={<Dashboard />}
								isPrivate={true}
							/>
						}
					/>
					<Route
						path='/create-profile'
						element={
							<ProtectedRoute
								element={<ProfileForm />}
								isPrivate={true}
							/>
						}
					/>
					<Route
						path='/edit-profile'
						element={
							<ProtectedRoute
								element={<ProfileForm />}
								isPrivate={true}
							/>
						}
					/>
					<Route
						path='/add-education'
						element={
							<ProtectedRoute
								element={<AddEducationForm />}
								isPrivate={true}
							/>
						}
					/>
					<Route
						path='/add-experience'
						element={
							<ProtectedRoute
								element={<AddExperienceForm />}
								isPrivate={true}
							/>
						}
					/>
					<Route
						path='/posts'
						element={
							<ProtectedRoute
								element={<Posts />}
								isPrivate={true}
							/>
						}
					/>
					<Route
						path='/posts/:id'
						element={
							<ProtectedRoute
								element={<Post />}
								isPrivate={true}
							/>
						}
					/>
					<Route path='/profiles' element={<Profiles />} />
					<Route path='/profile/:id' element={<Profile />} />
				</Routes>
			)}
		</>
	)
}

const ProtectedRoute = ({ element, isPrivate = false }) => {
	const { isAuthenticated } = useSelector((state) => state.auth)
	if (isPrivate) return !isAuthenticated ? <Navigate to='/' /> : element
	return isAuthenticated ? <Navigate to='/posts' /> : element
}

export default App
