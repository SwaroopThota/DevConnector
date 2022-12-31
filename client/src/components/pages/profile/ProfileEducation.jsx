import React from 'react'

const ProfileEducation = ({
	education: { school, degree, fieldOfStudy, to, from, description },
}) => {
	const formatDate = (date) => {
		return new Intl.DateTimeFormat().format(new Date(date))
	}
	return (
		<div>
			<h3 className='text-dark'>{school}</h3>
			<p>
				{formatDate(from)} - {to ? formatDate(to) : 'Now'}
			</p>
			<p>
				<strong>Degree: </strong> {degree}
			</p>
			<p>
				<strong>Field Of Study: </strong> {fieldOfStudy}
			</p>
			{description && (
				<p>
					<strong>Description: </strong> {description}
				</p>
			)}
		</div>
	)
}

export default ProfileEducation
