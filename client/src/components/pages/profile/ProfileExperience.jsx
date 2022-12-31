import React from 'react'

const ProfileExperience = ({
	experience: { company, title, location, current, to, from, description },
}) => {
	const formatDate = (date) => {
		return new Intl.DateTimeFormat().format(new Date(date))
	}
	return (
		<div>
			<h3 className='text-dark'>{company}</h3>
			<p>
				{formatDate(from)} - {to ? formatDate(to) : 'Now'}
			</p>
			<p>
				<strong>Position: </strong> {title}
			</p>
			<p>
				<strong>Location: </strong> {location}
			</p>
			{description && (
				<p>
					<strong>Description: </strong> {description}
				</p>
			)}
		</div>
	)
}

export default ProfileExperience
