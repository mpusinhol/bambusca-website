import usersApi from '../api/example-api';

export function getUsers() {
  return function(dispatch) {
    return usersApi.getUsers().then(users => {
      dispatch(getUsersSuccess(users))
    }).catch(error => {
      console.log(error)
      throw(error)
    })
  }
}

function getUsersSuccess(users) {
  return { type: 'GET_USERS', users }
}