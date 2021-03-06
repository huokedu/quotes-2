import { handleActions } from 'redux-actions'
// import createReducer from 'utils/createReducer'
import Firebase from 'firebase'
import constants from 'utils/constants'

const ref = new Firebase(constants.FIREBASE)
let authData = ref.getAuth() || {}
let profile = {}

// ------------------------------------
// Constants
// ------------------------------------
const GET_PROFILE = 'GET_PROFILE'
const FETCH_STARTED = 'FETCH_STARTED'

// ------------------------------------
// Actions
// ------------------------------------
// export const login = () => ({ type: LOGIN })
export const fetch = (id) => {
  const ref = new Firebase(constants.FIREBASE).child('users').child(authData.uid)
  return (dispatch) => {
    ref.on('value', snapshot => dispatch({
      type: GET_PROFILE,
      payload: dataFromSnapshot(snapshot)
    }))
  }
}

export const getProfile = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_STARTED })
    dispatch(fetch(id))
  }
}

function dataFromSnapshot (snapshot) {
  let data = snapshot.val()
  return data
}

export const actions = {
  fetch,
  getProfile
}

// ------------------------------------
// Reducer
// ------------------------------------
// export default createReducer({}, {
//   [LOGIN]: (state) => authData
// })
//

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [GET_PROFILE]: (state, { payload }) => payload
}, profile)
