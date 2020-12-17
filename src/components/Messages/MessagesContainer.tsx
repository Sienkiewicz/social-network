import Messages from './Messages';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';


export default compose(
  withAuthRedirect
)(Messages);
