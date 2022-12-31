import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteAccount, getCurrentProfile } from '../../../redux/profileSlice'
import DashboardActions from './DashboardActions'
import Education from './Education'
import Experience from './Experience'

const Dashboard = () => {
	const dispatch = useDispatch(),
		{ profile } = useSelector((state) => state.profile),
		{ user } = useSelector((state) => state.auth)
	useEffect(() => {
		dispatch(getCurrentProfile())
	}, [dispatch])

	return (
		<section className='container'>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Welcome {user && user.name}
			</p>
			{profile !== null ? (
				<>
					<DashboardActions />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />

					<div className='my-2'>
						<button
							className='btn btn-danger'
							onClick={() => dispatch(deleteAccount())}
						>
							<i className='fas fa-user-minus' /> Delete My
							Account
						</button>
					</div>
				</>
			) : (
				<>
					<p>
						You have not yet setup a profile, please add some info
					</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</>
			)}
		</section>
	)
}

export default Dashboard
