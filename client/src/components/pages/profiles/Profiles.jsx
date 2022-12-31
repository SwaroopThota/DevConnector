import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfiles } from '../../../redux/profileSlice'
import ProfileItem from './ProfileItem'

const Profiles = () => {
	const dispatch = useDispatch(),
		{ loading, profiles } = useSelector((state) => state.profile)
	useEffect(() => {
		dispatch(getProfiles())
	}, [dispatch])

	return (
		<section className='container'>
			{loading ? (
				'Loading...'
			) : (
				<>
					<h1 className='large text-primary'>Developers</h1>
					<p className='lead'>
						<i className='fab fa-connectdevelop' /> Browse and
						connect with developers
					</p>
					<div className='profiles'>
						{profiles.length > 0 ? (
							profiles.map((profile) => (
								<ProfileItem
									key={profile._id}
									profile={profile}
								/>
							))
						) : (
							<h4>No profiles found...</h4>
						)}
					</div>
				</>
			)}
		</section>
	)
}

export default Profiles
