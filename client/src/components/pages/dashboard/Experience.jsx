import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteExperience } from '../../../redux/profileSlice'

const Experience = ({ experience }) => {
	const formatDate = (date) => {
		return new Intl.DateTimeFormat().format(new Date(date))
	}
	const dispatch = useDispatch()
	const experiences = experience.map((exp) => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td className='hide-sm'>{exp.title}</td>
			<td>
				{formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Now'}
			</td>
			<td>
				<button
					onClick={() => dispatch(deleteExperience(exp._id))}
					className='btn btn-danger'
				>
					Delete
				</button>
			</td>
		</tr>
	))

	return (
		<>
			<h2 className='my-2'>Experience Credentials</h2>
			<table className='table'>
				<thead>
					<tr>
						<th>Company</th>
						<th className='hide-sm'>Title</th>
						<th className='hide-sm'>Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</>
	)
}

export default Experience
