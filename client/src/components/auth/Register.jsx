import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { throwAlert } from '../../redux/alertSlice'
import { userRegister } from '../../redux/authSlice'

const Register = () => {
	const dispatch = useDispatch()
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password1: '',
		password2: '',
	})
	const { name, email, password1, password2 } = formData
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		if (password1 !== password2) {
			dispatch(
				throwAlert({
					type: 'danger',
					msg: "Passwords doesn't match.",
				})
			)
			return
		}
		const newUser = {
			name,
			email,
			password: password1,
		}
		dispatch(userRegister(newUser))
		setFormData({
			name: '',
			email: '',
			password1: '',
			password2: '',
		})
	}
	return (
		<section className='container'>
			<h1 className='large text-primary'>Sign Up</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Create Your Account
			</p>
			<form className='form' onSubmit={handleSubmit}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Name'
						name='name'
						value={name}
						onChange={handleChange}
						required
						autoComplete='off'
					/>
				</div>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						value={email}
						onChange={handleChange}
						name='email'
						autoComplete='email'
						required
					/>
					<small className='form-text'>
						This site uses Gravatar so if you want a profile image,
						use a Gravatar email
					</small>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password1'
						minLength='6'
						value={password1}
						onChange={handleChange}
						autoComplete='new-password'
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Confirm Password'
						name='password2'
						minLength='6'
						value={password2}
						onChange={handleChange}
						required
						autoComplete='new-password'
					/>
				</div>
				<input
					type='submit'
					className='btn btn-primary'
					value='Register'
				/>
			</form>
			<p className='my-1'>
				Already have an account? <Link to='/login'>Sign In</Link>
			</p>
		</section>
	)
}

export default Register
