import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { throwAlert } from '../../redux/alertSlice'
import { Auth_Failure } from '../../redux/authSlice'
import { Profile_Error } from '../../redux/profileSlice'

const Navbar = () => {
	const dispatch = useDispatch()
	const { isAuthenticated } = useSelector((state) => state.auth)
	const handleLogout = (e) => {
		e.preventDefault()
		dispatch(Profile_Error())
		dispatch(Auth_Failure())
		dispatch(
			throwAlert({
				type: 'success',
				msg: 'Logged out successfully. Bye...',
			})
		)
	}
	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/'>
					<i className='fas fa-code'></i> DevConnector
				</Link>
			</h1>
			<ul>
				{isAuthenticated ? (
					<>
						<li>
							<Link to='/profiles'>Developers</Link>
						</li>
						<li>
							<Link to='/posts'>Posts</Link>
						</li>
						<li>
							<Link to='/dashboard' title='Dashboard'>
								<i className='fas fa-user' />
							</Link>
						</li>
						<li>
							<a onClick={handleLogout} href='#!' title='Logout'>
								<i className='fas fa-sign-out-alt' />
							</a>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to='register'>Register</Link>
						</li>
						<li>
							<Link to='login'>Login</Link>
						</li>
						<li>
							<Link to='/profiles'>Developers</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	)
}

export default Navbar
