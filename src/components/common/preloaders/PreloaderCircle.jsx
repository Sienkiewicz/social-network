import React from 'react'
import preloader from '../../../assets/loaders/giphy.gif';

const Preloader = () => {
	return (
		<div className='circlePreloader'>
			<img alt='' src={preloader} />
		</div>
	)
}

export default Preloader
