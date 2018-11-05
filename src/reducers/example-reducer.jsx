const INITIAL_STATE = {
  users: []
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'GET_USERS':
      return {
        users: action.users.data
      }
    default:
      return state
  }
}