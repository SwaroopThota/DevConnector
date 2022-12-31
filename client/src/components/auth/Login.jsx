import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { throwAlert } from '../../redux/alertSlice'
import { userLogin } from '../../redux/authSlice'

const Login = () => {
	const dispatch = useDispatch()
	const [userCredentials, setUserCredentials] = useState({
		email: '',
		password: '',
	})
	const { email, password } = userCredentials

	const handleChange = (e) => {
		setUserCredentials({
			...userCredentials,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!email.trim() || !password.trim()) {
			// Todo: throw alert
			dispatch(
				throwAlert({
					type: 'danger',
					msg: 'Enter a valid email or password.',
				})
			)
			return
		}
		dispatch(userLogin(userCredentials))
		setUserCredentials({
			email: '',
			password: '',
		})
	}

	return (
		<section className='container'>
			<h1 className='large text-primary'>Sign In</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Sign into Your Account
			</p>
			<form className='form' onSubmit={handleSubmit}>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={handleChange}
						autoComplete='username'
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={handleChange}
						required
						autoComplete='password'
					/>
				</div>
				<input
					type='submit'
					className='btn btn-primary'
					value='Login'
				/>
			</form>
			<p className='my-1'>
				Don't have an account? <Link to='/register'>Sign Up</Link>
			</p>
		</section>
	)
}

export default Login
