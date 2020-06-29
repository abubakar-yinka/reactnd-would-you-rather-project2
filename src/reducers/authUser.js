import { SET_AUTH_USER } from '../actions/authedUser';

export default function authedUser(state = null, action) {
  if (action.type === SET_AUTH_USER) {
    return action.id;
  }
  return state;
}
