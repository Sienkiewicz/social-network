import React, {FC} from 'react'
import preloader from '../../../assets/loaders/giphy.gif';

const Preloader: FC = () => {
	return (
		<div className='circlePreloader'>
			<img alt='' src={preloader} />
		</div>
	)
}

export default Preloader
