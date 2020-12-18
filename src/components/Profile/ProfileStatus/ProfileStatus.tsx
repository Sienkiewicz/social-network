import React, { ChangeEvent } from 'react'
import s from './ProfileStatus.module.scss'

type Props = {
  status: string
  userId: number
  authId: number | null

  updateUserStatus: (status: string) => void
}
type TState = {
  editMode: boolean
  status: string
  userId: number
}

class ProfileStatus extends React.Component<Props, TState> {
  state: TState = {
    editMode: false,
    status: this.props.status,
    userId: this.props.userId,
  }

  activateEditMode = (): void => {
    this.setState({
      editMode: true,
    })
  }

  deactivateEditMode = (): void => {
    this.setState({
      editMode: false,
    })
    this.props.updateUserStatus(this.state.status)
  }

  onStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      status: e.currentTarget.value,
    })
  }

  componentDidUpdate = (prevProps: Props): void => {
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status })
    }
  }

  render() {
    return (
      <div className={s.container}>
        {!this.state.editMode ? (
          <div>
            <b>Status:</b>
            <span
              className={s.status}
              onDoubleClick={
                +this.props.userId === this.props.authId
                  ? this.activateEditMode
                  : (): void => {}
              }
            >
              {' '}
              {this.props.status || '#######'}
            </span>
          </div>
        ) : (
          <div className={s.overlay}>
            <input
              className={s.editStatus}
              onChange={this.onStatusChange}
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              value={this.state.status}
            />
          </div>
        )}
      </div>
    )
  }
}

export default ProfileStatus
