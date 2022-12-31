import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getProfileById } from '../../../redux/profileSlice'
import ProfileAbout from './ProfileAbout'
import ProfileEducation from './ProfileEducation'
import ProfileExperience from './ProfileExperience'
import ProfileGithub from './ProfileGithub'
import ProfileTop from './ProfileTop'

const Profile = () => {
	const { id } = useParams(),
		{
			profile: { profile, repos },
			auth,
		} = useSelector((state) => state),
		dispatch = useDispatch()
	useEffect(() => {
		dispatch(getProfileById(id))
	}, [dispatch, id])

	return (
		<section className='container'>
			{profile === null ? (
				'Loading...'
			) : (
				<>
					<Link to='/profiles' className='btn btn-light'>
						Back To Profiles
					</Link>
					{auth.isAuthenticated &&
						auth.user._id === profile.user._id && (
							<Link to='/edit-profile' className='btn btn-dark'>
								Edit Profile
							</Link>
						)}
					<div className='profile-grid my-1'>
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
						<div className='profile-exp bg-white p-2'>
							<h2 className='text-primary'>Experience</h2>
							{profile.experience.length > 0 ? (
								<>
									{profile.experience.map((experience) => (
										<ProfileExperience
											key={experience._id}
											experience={experience}
										/>
									))}
								</>
							) : (
								<h4>No experience credentials</h4>
							)}
						</div>

						<div className='profile-edu bg-white p-2'>
							<h2 className='text-primary'>Education</h2>
							{profile.education.length > 0 ? (
								<>
									{profile.education.map((education) => (
										<ProfileEducation
											key={education._id}
											education={education}
										/>
									))}
								</>
							) : (
								<h4>No education credentials</h4>
							)}
						</div>

						{profile.githubusername && (
							<ProfileGithub
								username={profile.githubusername}
								repos={repos}
								dispatch={dispatch}
							/>
						)}
					</div>
				</>
			)}
		</section>
	)
}

export default Profile
