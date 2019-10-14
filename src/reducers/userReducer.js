import * as actionTypes from '../actions/types'

const INITIAL_USER_STATE = {
  currentUser: null,
  isLoading: true,
}

export const userReducer = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false,
      }
    default:
      return state
  }
}
