import React from 'react';
import s from './ProfileStatus.module.scss'

class ProfileStatus extends React.Component {
	state = {
		editMode: false,
		status: this.props.status,
		userId: this.props.userId,
	};

	activateEditMode = () => {
		this.setState({
			editMode: true,
		});
	};

	deactivateEditMode = () => {
		this.setState({
			editMode: false,
		});
		this.props.updateUserStatus(this.state.status);
	};

	onStatusChange = (e) => {
		this.setState({
			status: e.currentTarget.value,
		});
	};

	componentDidUpdate = (prevProps) => {
		if (prevProps.status !== this.props.status) {
			this.setState({ status: this.props.status });
		}
	};


render() {
	return (
		<div className={s.container}>
			{!this.state.editMode ? (
				<div>
					<span
						className={s.status}
						onDoubleClick={this.activateEditMode}
					>
						{' '}
						{this.props.status || '#######'}
					</span>
				</div>
			) : (
					<div className={s.overlay}>
						<div>
							<input
								className={s.editStatus}
								onChange={this.onStatusChange}
								autoFocus={true}
								onBlur={this.deactivateEditMode}
								value={this.state.status}
							/>
						</div>
					</div>
				)}
		</div>
	);
}
}



export default ProfileStatus;
