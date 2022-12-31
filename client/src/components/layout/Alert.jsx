import React from 'react'
import { useSelector } from 'react-redux'

export const Alert = () => {
	const alerts = useSelector((state) => state.alerts)
	return (
		<div className='alert-wrapper'>
			{alerts.map((alert) => (
				<div key={alert.id} className={`alert alert-${alert.type}`}>
					{alert.msg}
				</div>
			))}
		</div>
	)
}
